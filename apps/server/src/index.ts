import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import axios, { AxiosError, AxiosHeaderValue } from 'axios';
import { body, validationResult } from 'express-validator';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests',
    message: 'Rate limit exceeded. Try again later.',
    retryAfter: '15 minutes',
  },
});
app.use('/api/', limiter);

const createStructuredResponse = (success: boolean, data: any, error: any, metadata = {}) => {
  return {
    success,
    timestamp: new Date().toISOString(),
    data: data || null,
    error: error || null,
    metadata: {
      server: 'LF Server',
      version: '1.0.0',
      ...metadata,
    },
  };
};

const ROUTER_AI = {
  name: 'Router AI',
  endpoint: 'https://openrouter.ai/api/v1/chat/completions',
  headers: {
    Authorization: `Bearer ${process.env.ROUTER_API_KEY}`,
    'HTTP-Referer': 'https://digiresu.me',
    'X-Title': 'Digiresume',
    'Content-Type': 'application/json',
  },
  active: !!process.env.ROUTER_API_KEY,
};

interface ResumeRequestBody {
  prompt?: string;
  model?: string;
  text?: string;
}

interface RouterAIResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

app.post(
  '/api/resume',
  [
    body('prompt')
      .notEmpty()
      .withMessage('Prompt is required')
      .isLength({ min: 1 })
      .withMessage('Prompt must be minimum characters'),
    body('model')
      .optional()
      .isIn([
        'deepseek/deepseek-r1-0528:free',
        'meta-llama/llama-4-maverick:free',
        'deepseek/deepseek-chat-v3-0324:free',
        'google/gemma-3-27b-it:free',
        'mistralai/mistral-nemo:free',
      ])
      .withMessage('Invalid model selection'),
  ],
  async (
    req: express.Request<{}, any, ResumeRequestBody>,
    res: express.Response
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(
          createStructuredResponse(false, null, {
            type: 'validation_error',
            details: errors.array(),
          })
        );
        return;
      }
      const { prompt, model = 'google/gemma-3-27b-it:free'} = req.body;
      const response: RouterAIResponse = await axios.post(
        ROUTER_AI.endpoint,
        {
          model: model,
          messages: [
            {
              role: 'system',
              content: `You are a structured resume parser.
                 From the given resume text, extract only the following fields as a JSON object:
                 
                 full_name
                 headline: (headline of linkedin profile like Founder & CEO at Google)
                 shortbio: (give a short consize form of the summary in pdf if there or generate a short bio based on profile like 30-40 words)
                 skills: list of { logo, label, value, category } objects (based on top skills or mentioned tools, logo should be empty string '')
                 country: (if mentioned) also get country two digit code and format lets say if country is India then final  value should be India-IN more examples: Bangladesh-BD, Brazil-BR
                 geo_info: {city: "", state: ""} get values of state and city if mentioned in profile or empty values
                 profile_link: { url, text } — based on any portfolio or personal site link
                 experience: array of { a: index, company: company name string, company_link: company url if any, company url, skills_used: array of { logo, label, value, category } like skills used in company logo should be empty string '', contribution: breif info on contribution to company string, roles: [array as multiple roles amy be there in each company each with start_date(format(MM/YYYY), end_date(format(MM/YYYY) - end_date should be "" empty string is currently_working is true, headline: role name(ex: Frontend Dev, Sr Backend Developer,) location: job location (india, us),location_type: string "On-site | Hybrid | Remote", employment_type: string "Full-time | Part-time | Self-employed | Freelance | Internship | Trainee", currently_working: "true | false" - boolean] } -- for empty values use empty string like ''
                 socials: array of { url } all urls should be formatted with https:// at start if not present
                 company (current or most important one)
                 education: (highest degree or most recent institution format data as object {university: (name of university) string, branch: (the branch major like computer science MBA, etc) string, start_date: (format MM/YYYY) string, end_date: (format MM/YYYY) string, grade: (if menetioned or default to 'A') string}`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
        },
        {
          headers: ROUTER_AI.headers,
        }
      );
      res.status(200).json(createStructuredResponse(true, response.data, null));
    } catch (err: any) {
      res.status(500).json(
        createStructuredResponse(false, null, {
          type: 'router_api_error',
          message: err.response?.data?.message || err.message,
        })
      );
    }
  }
);

app.get('/api/health', (req, res) => {
  res.json(
    createStructuredResponse(
      true,
      {
        status: process.env.ROUTER_API_KEY ? 'healthy' : 'Down',
        uptime: process.uptime(),
        activeModels: 1,
        model: ROUTER_AI.name,
      },
      null
    )
  );
});

app.listen(PORT, () => {
  console.log(`🚀 LF Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
