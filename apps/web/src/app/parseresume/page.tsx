'use client';
import { useState } from 'react';

// Extend Window interface to include pdfjsLib
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export default function PDFTextExtractor() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const extractTextFromPDF = async (file: File) => {
    try {
      // Load PDF.js library dynamically
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      
      if (!window.pdfjsLib) {
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      // Set worker source
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      
      // Extract text from all pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        
        fullText += `Page ${i}:\n${pageText}\n\n`;
      }
      
      return fullText;
    } catch (err) {
      console.error('Error extracting text:', err);
      throw new Error('Failed to extract text from PDF');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');
    setText('');

    try {
      const extractedText = await extractTextFromPDF(file);
      setText(extractedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const clearText = () => {
    setText('');
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">PDF Text Extractor</h1>
      
      <div className="mb-6">
        <input 
          type="file" 
          accept="application/pdf" 
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={loading}
        />
      </div>

      {loading && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            <span className="text-blue-700">Extracting text from PDF...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {text && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Extracted Text:</h2>
            <button
              onClick={clearText}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
          </div>
          
          <div className="bg-gray-50 border rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
              {text}
            </pre>
          </div>
          
          <div className="text-sm text-gray-500">
            Character count: {text.length}
          </div>
        </div>
      )}
    </div>
  );
}