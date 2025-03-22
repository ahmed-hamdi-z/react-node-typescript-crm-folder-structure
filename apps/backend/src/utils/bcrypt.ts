import bcrypt from "bcryptjs";

/**
 * Hashes the given value using the bcrypt algorithm with a given cost factor (or 10 by default).
 * @param value The value to be hashed.
 * @param salt The cost factor for the hashing algorithm. Defaults to 10.
 * @returns The hashed value.
 * @throws If there is an error during hashing.
 */
export const hashValue = async (value: string, salt?: number) =>
  bcrypt.hash(value, salt || 10);

/**
 * Compares a given value with a hashed value using bcrypt to determine if they match.
 * @param value The plain text value to compare.
 * @param hashedValue The hashed value to compare against.
 * @returns A promise that resolves to true if the values match, or false otherwise.
 */
export const compareValue = async (value: string, hashedValue: string) =>
  bcrypt.compare(value, hashedValue).catch(() => false);
