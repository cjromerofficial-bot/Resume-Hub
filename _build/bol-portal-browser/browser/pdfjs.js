// pdf.js for the browser demo, with its worker shipped as a local file.
import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url';
export async function loadPdfjs() {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  return pdfjs;
}
