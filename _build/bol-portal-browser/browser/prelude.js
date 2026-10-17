// Runs first: gives the server modules the Node globals they expect, in the browser.
import { Buffer } from 'buffer';
globalThis.Buffer = globalThis.Buffer || Buffer;
globalThis.process = globalThis.process || { env: {}, cwd: () => '/' };
Object.assign(globalThis.process.env, { STORE: 'memory', APP_MODE: 'mock', AUTH_MODE: 'hub' });
