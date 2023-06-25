export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development';
      PORT: string;
      PREFIX: string;
    }
  }
}
