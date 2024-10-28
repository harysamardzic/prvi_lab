declare namespace NodeJS {
    interface ProcessEnv {
      FE_URL: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      AUDIENCE: string;
      PORT: number;
      RESOURCE_SERVER_URL: string;

    }
  }
  