// Browser version of code39Png: draw with bwip-js onto a canvas and return PNG bytes.
import bwipjs from 'bwip-js';
export async function code39Png(text) {
  const canvas = document.createElement('canvas');
  bwipjs.toCanvas(canvas, { bcid: 'code39', text: String(text), scale: 3, height: 9, includetext: false, paddingwidth: 12, backgroundcolor: 'FFFFFF' });
  const blob = await new Promise((r) => canvas.toBlob(r, 'image/png'));
  return new Uint8Array(await blob.arrayBuffer());
}
