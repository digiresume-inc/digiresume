declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export const extractTextFromPDF = async (file: File) => {
  try {
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
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';

    // Extract text from all pages
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      const pageText = textContent.items.map((item: any) => item.str).join(' ');

      fullText += pageText;
    }

    return fullText;
  } catch (err) {
    console.error('Error extracting text:', err);
    throw new Error('Failed to extract text from PDF');
  }
};
