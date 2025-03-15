import crypto from 'crypto';
import { APT_SECRET } from '../constants/env';

export const randomString = () => crypto.randomBytes(128).toString('base64');

/**
 * Returns a hash of the given salt and password, using the APT_SECRET
 * environment variable. This is used to validate user credentials.
 *
 * @param {string} salt - The salt value.
 * @param {string} password - The password value.
 * @returns {string} The hash value.
 */
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(APT_SECRET).digest('hex');
};

export const HashPasswords = (salt: string, password: string, hash: string) => {
    return authentication(salt, password) === hash;
};