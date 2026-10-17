export const join = (...p) => p.filter(Boolean).join('/').replace(/\/+/g, '/');
export const resolve = (...p) => join(...p);
export const dirname = (p) => p.replace(/\/[^/]*$/, '') || '.';
export default { join, resolve, dirname };
