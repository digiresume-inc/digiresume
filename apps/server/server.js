const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests',
    message: 'Rate limit exceeded. Try again later.',
    retryAfter: '15 minutes'
  }
});
app.use('/api/', limiter);

// AI Models Configuration
const AI_MODELS = {
  HUGGINGFACE: {
    name: 'Hugging Face',
    endpoint: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
    headers: {
      'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    active: !!process.env.HUGGINGFACE_API_KEY
  },
  COHERE: {
    name: 'Cohere',
    endpoint: 'https://api.cohere.ai/v1/generate',
    headers: {
      'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    active: !!process.env.COHERE_API_KEY
  },
  GROQ: {
    name: 'Groq',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    active: !!process.env.GROQ_API_KEY
  },
  TOGETHER: {
    name: 'Together AI',
    endpoint: 'https://api.together.xyz/inference',
    headers: {
      'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    active: !!process.env.TOGETHER_API_KEY
  }
};

// Utility Functions
const createStructuredResponse = (success, data, error = null, metadata = {}) => {
  return {
    success,
    timestamp: new Date().toISOString(),
    data: data || null,
    error: error || null,
    metadata: {
      server: 'AI Integration API',
      version: '1.0.0',
      ...metadata
    }
  };
};

const sanitizeInput = (text) => {
  return text.trim().substring(0, 10000); // Limit input length
};

// AI Model Implementations
class AIModelManager {
  static async callHuggingFace(prompt, options = {}) {
    try {
      const response = await axios.post(AI_MODELS.HUGGINGFACE.endpoint, {
        inputs: prompt,
        parameters: {
          max_length: options.maxTokens || 150,
          temperature: options.temperature || 0.7,
          top_p: options.topP || 0.9,
          return_full_text: false
        }
      }, {
        headers: AI_MODELS.HUGGINGFACE.headers,
        timeout: 30000
      });

      return {
        text: response.data[0]?.generated_text || response.data.generated_text || '',
        model: 'Hugging Face DialoGPT',
        tokensUsed: response.data.length || 0
      };
    } catch (error) {
      throw new Error(`Hugging Face API Error: ${error.response?.data?.error || error.message}`);
    }
  }

  static async callCohere(prompt, options = {}) {
    try {
      const response = await axios.post(AI_MODELS.COHERE.endpoint, {
        prompt: prompt,
        max_tokens: options.maxTokens || 150,
        temperature: options.temperature || 0.7,
        k: 0,
        stop_sequences: [],
        return_likelihoods: 'NONE'
      }, {
        headers: AI_MODELS.COHERE.headers,
        timeout: 30000
      });

      return {
        text: response.data.generations[0]?.text || '',
        model: 'Cohere Generate',
        tokensUsed: response.data.generations[0]?.token_count || 0
      };
    } catch (error) {
      throw new Error(`Cohere API Error: ${error.response?.data?.message || error.message}`);
    }
  }

  static async callGroq(prompt, options = {}) {
    try {
      const response = await axios.post(AI_MODELS.GROQ.endpoint, {
        model: 'llama3-8b-8192',
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: options.maxTokens || 150,
        temperature: options.temperature || 0.7,
        top_p: options.topP || 0.9,
        stream: false
      }, {
        headers: AI_MODELS.GROQ.headers,
        timeout: 30000
      });

      return {
        text: response.data.choices[0]?.message?.content || '',
        model: 'Groq Llama3-8B',
        tokensUsed: response.data.usage?.total_tokens || 0
      };
    } catch (error) {
      throw new Error(`Groq API Error: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  static async callTogether(prompt, options = {}) {
    try {
      const response = await axios.post(AI_MODELS.TOGETHER.endpoint, {
        model: 'togethercomputer/RedPajama-INCITE-Chat-3B-v1',
        prompt: prompt,
        max_tokens: options.maxTokens || 150,
        temperature: options.temperature || 0.7,
        top_p: options.topP || 0.9,
        stop: ['<human>', '</s>']
      }, {
        headers: AI_MODELS.TOGETHER.headers,
        timeout: 30000
      });

      return {
        text: response.data.output?.choices[0]?.text || '',
        model: 'Together AI RedPajama',
        tokensUsed: response.data.output?.usage?.total_tokens || 0
      };
    } catch (error) {
      throw new Error(`Together AI Error: ${error.response?.data?.error || error.message}`);
    }
  }

  static async generateResponse(prompt, modelPreference = 'auto', options = {}) {
    const sanitizedPrompt = sanitizeInput(prompt);
    const models = modelPreference === 'auto' ? 
      Object.keys(AI_MODELS).filter(key => AI_MODELS[key].active) : 
      [modelPreference.toUpperCase()];

    let lastError = null;

    for (const modelKey of models) {
      try {
        switch (modelKey) {
          case 'GROQ':
            return await this.callGroq(sanitizedPrompt, options);
          case 'COHERE':
            return await this.callCohere(sanitizedPrompt, options);
          case 'HUGGINGFACE':
            return await this.callHuggingFace(sanitizedPrompt, options);
          case 'TOGETHER':
            return await this.callTogether(sanitizedPrompt, options);
          default:
            continue;
        }
      } catch (error) {
        console.error(`${modelKey} failed:`, error.message);
        lastError = error;
        continue;
      }
    }

    throw lastError || new Error('No AI models available');
  }
}

// Routes
app.get('/', (req, res) => {
  res.json(createStructuredResponse(true, {
    message: 'AI Integration API Server',
    endpoints: {
      '/api/generate': 'POST - Generate AI response',
      '/api/models': 'GET - List available models',
      '/api/health': 'GET - Health check'
    }
  }));
});

app.get('/api/health', (req, res) => {
  const activeModels = Object.keys(AI_MODELS).filter(key => AI_MODELS[key].active);
  
  res.json(createStructuredResponse(true, {
    status: 'healthy',
    uptime: process.uptime(),
    activeModels: activeModels.length,
    models: activeModels.map(key => AI_MODELS[key].name)
  }));
});

app.get('/api/models', (req, res) => {
  const models = Object.entries(AI_MODELS).map(([key, config]) => ({
    id: key.toLowerCase(),
    name: config.name,
    active: config.active,
    endpoint: config.active ? 'Available' : 'Not configured'
  }));

  res.json(createStructuredResponse(true, { models }));
});

app.post('/api/generate', [
  body('prompt')
    .notEmpty()
    .withMessage('Prompt is required')
    .isLength({ min: 1 })
    .withMessage('Prompt must be minimum characters'),
  body('model')
    .optional()
    .isIn(['auto', 'groq', 'cohere', 'huggingface', 'together'])
    .withMessage('Invalid model selection'),
  body('options.maxTokens')
    .optional()
    .isInt({ min: 1, max: 2000 })
    .withMessage('Max tokens must be between 1 and 2000'),
  body('options.temperature')
    .optional()
    .isFloat({ min: 0, max: 2 })
    .withMessage('Temperature must be between 0 and 2')
], async (req, res) => {
  try {
    // Validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(createStructuredResponse(false, null, {
        type: 'validation_error',
        details: errors.array()
      }));
    }

    const { prompt, model = 'auto', options = {} } = req.body;
    const startTime = Date.now();

    const result = await AIModelManager.generateResponse(prompt, model, options);
    const responseTime = Date.now() - startTime;

    res.json(createStructuredResponse(true, {
      response: result.text,
      model: result.model,
      tokensUsed: result.tokensUsed,
      prompt: prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''),
    }, null, {
      responseTime: `${responseTime}ms`,
      requestId: Math.random().toString(36).substring(7)
    }));

  } catch (error) {
    console.error('Generation error:', error);
    
    res.status(500).json(createStructuredResponse(false, null, {
      type: 'generation_error',
      message: error.message,
      details: 'Failed to generate AI response'
    }));
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json(createStructuredResponse(false, null, {
    type: 'internal_server_error',
    message: 'An unexpected error occurred'
  }));
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json(createStructuredResponse(false, null, {
    type: 'not_found',
    message: 'Endpoint not found'
  }));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Integration Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  
  const activeModels = Object.keys(AI_MODELS).filter(key => AI_MODELS[key].active);
  console.log(`🤖 Active AI models: ${activeModels.length}`);
  
  if (activeModels.length === 0) {
    console.log('⚠️  No AI models configured. Please set up API keys in .env file');
  }
});

module.exports = app;