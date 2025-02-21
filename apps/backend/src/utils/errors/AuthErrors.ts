export class AuthError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'AuthError';
    }
  }
  
  export class UserNotFoundError extends AuthError {
    constructor() {
      super('User not found');
      this.name = 'UserNotFoundError';
    }
  }
  
  export class InvalidCredentialsError extends AuthError {
    constructor() {
      super('Invalid credentials');
      this.name = 'InvalidCredentialsError';
    }
  }
  
  export class AccessDeniedError extends AuthError {
    constructor() {
      super('Access denied');
      this.name = 'AccessDeniedError';
    }
  }
  
  export class InvalidTokenError extends AuthError {
    constructor() {
      super('Invalid token');
      this.name = 'InvalidTokenError';
    }
  }
  
  export class LogoutFailedError extends AuthError {
    constructor() {
      super('Logout failed');
      this.name = 'LogoutFailedError';
    }
  }