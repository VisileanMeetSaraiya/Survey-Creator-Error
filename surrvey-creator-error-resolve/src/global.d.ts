// src/global.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_ENV: "development" | "production";
    REACT_APP_FEATURE_X?: string;
    VITE_AG_GRID_LICENSE_KEY:string
  }
}

interface ImportMetaEnv {
  readonly REACT_APP_API_URL: string;
  readonly REACT_APP_ENV: string;
  readonly REACT_APP_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
