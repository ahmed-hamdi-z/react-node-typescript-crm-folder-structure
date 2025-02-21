import { z } from 'zod';

import {
  loginSchema,
  registerSchema,
  roleSchema,
  tokenSchema,
} from "./auth/userSchemas";

// Export all schemas
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type TokenInput = z.infer<typeof tokenSchema>;
export type RoleInput = z.infer<typeof roleSchema>;
