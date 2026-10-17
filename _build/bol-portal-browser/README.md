# Browser-only build of the Freight Returns BOL Portal

These files turn the BOL portal repo into a static demo that runs with no server:
the API handlers run inside the page, with Node built-ins swapped for browser shims.

To rebuild into `projects/bol-portal/`:

1. Copy `browser/`, `vite.browser.config.js` and `demo.html` into a checkout of
   FreightReturnBOLPortalExample, then run `npm install` and `npm install buffer@6.0.3`.
2. Apply three small source swaps in that checkout:
   - `lib/store.mjs`: `export const store = () => memoryStore();`
   - `lib/pdf/common.mjs`: replace `code39Png` with `export { code39Png } from '../../browser/barcode.js';`
     and remove the `bwip-js` import.
   - `lib/docparse.mjs`: load pdf.js with `await (await import('../browser/pdfjs.js')).loadPdfjs()`.
3. `npx vite build -c vite.browser.config.js`, then copy `dist-browser/assets/` and
   `dist-browser/demo.html` (renamed to `index.html`) into `projects/bol-portal/`.
