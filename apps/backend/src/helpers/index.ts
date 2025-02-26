import crypto from 'crypto';

const APT_SECRET = process.env.APT_SECRET! || 'secret';

export const randomString = () => crypto.randomBytes(128).toString('base64');

export const authentication = ( salt: string, password: string ) =>{
    return crypto.createHmac('sha256', [salt, password].join('/')).update(APT_SECRET).digest('hex');
};

