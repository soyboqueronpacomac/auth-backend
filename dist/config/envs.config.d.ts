import 'dotenv/config';
export declare const envs: {
    PORT: number;
    NODE_ENV: "development" | "production" | "test";
    DATABASE_URL: string;
    REDIS_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    FRONTEND_URL: string;
    ALLOWED_ORIGINS: string[];
};
