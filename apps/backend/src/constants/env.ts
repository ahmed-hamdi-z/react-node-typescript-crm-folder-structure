
const getEnv = (key: string, defaultValue?: string) => {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}

export const NODE_ENV = getEnv('NODE_ENV', 'development');
export const PORT = getEnv('PORT', '6000');
export const MONGODB_URI = getEnv('MONGODB_URI');
export const AUTH_COOKIE = getEnv('AUTH_COOKIE');
export const JWT_SECRET = getEnv('JWT_SECRET');
export const APT_SECRET = getEnv('APT_SECRET');