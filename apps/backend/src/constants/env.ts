import dotenv from "dotenv";

dotenv.config();
const getEnv = (key: string, defaultValue?: string) => {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}

export const NODE_ENV = getEnv('NODE_ENV', 'development');
export const APP_ORIGIN = getEnv('APP_ORIGIN', 'http://localhost:3000');
export const PORT = getEnv('PORT', '6000');
export const MONGODB_URI = getEnv('MONGODB_URI', 'MONGODB_URI');
export const AUTH_COOKIE = getEnv('AUTH_COOKIE', 'AUTH_COOKIE');
export const JWT_SECRET = getEnv('JWT_SECRET', 'JWT_SECRET');
export const APT_SECRET = getEnv('APT_SECRET', 'APT_SECRET'); 
export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET', 'JWT_REFRESH_SECRET');