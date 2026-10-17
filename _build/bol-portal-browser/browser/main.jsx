// Browser-only entry for the portfolio: the API handlers run in the page instead of on a server.
import './prelude.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ROUTES } from '../server/routes.mjs';
import { loadPdfjs } from './pdfjs.js';
import App from '../src/App.jsx';
import '../src/styles.css';
import './demo.css';

const realFetch = window.fetch.bind(window);
async function callApi(path, init = {}) {
  const url = new URL(path.replace(/^\.?\//, ''), 'https://demo.invalid/');
  const target = ROUTES[url.pathname];
  if (!target) return Response.json({ error: 'Not found' }, { status: 404 });
  return target.fn(new Request(url, { method: init.method || 'GET', headers: init.headers, body: init.body }));
}
window.fetch = (input, init) => (typeof input === 'string' && /^\.?\/?api\//.test(input) ? callApi(input, init) : realFetch(input, init));

// Document links point at api/document. Render those PDFs in an in-page viewer.
const viewer = document.createElement('div');
viewer.className = 'demo-pdf'; viewer.hidden = true;
viewer.innerHTML = '<div class="demo-pdf-bar"><b></b><button type="button">Close</button></div><div class="demo-pdf-pages"></div>';
document.body.appendChild(viewer);
viewer.querySelector('button').onclick = () => { viewer.hidden = true; viewer.querySelector('.demo-pdf-pages').innerHTML = ''; };
document.addEventListener('click', async (e) => {
  const a = e.target.closest && e.target.closest('a[href*="api/document"]');
  if (!a) return;
  e.preventDefault();
  const pages = viewer.querySelector('.demo-pdf-pages');
  viewer.querySelector('b').textContent = a.textContent.trim() || 'Document';
  pages.innerHTML = '<p class="demo-pdf-msg">Building the PDF…</p>'; viewer.hidden = false;
  try {
    const res = await callApi(a.getAttribute('href'));
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Could not build that document.');
    const pdfjs = await loadPdfjs();
    const doc = await pdfjs.getDocument({ data: new Uint8Array(await res.arrayBuffer()), isEvalSupported: false }).promise;
    pages.innerHTML = '';
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i), vp = page.getViewport({ scale: 1.6 });
      const c = document.createElement('canvas'); c.width = vp.width; c.height = vp.height;
      await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise; pages.appendChild(c);
    }
  } catch (err) { pages.innerHTML = `<p class="demo-pdf-msg">${String(err.message || err)}</p>`; }
});

createRoot(document.getElementById('root')).render(<App />);
