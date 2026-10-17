export const existsSync = () => false;
export const readFileSync = () => { throw new Error('No file system in the browser demo.'); };
export const mkdirSync = () => {};
export default { existsSync, readFileSync, mkdirSync };
