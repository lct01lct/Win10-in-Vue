/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string;
  readonly VITE_BACKEND_ROOT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
