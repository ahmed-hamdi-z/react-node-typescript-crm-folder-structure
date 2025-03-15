export class HandelErrors extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HandelErrors';
  }
}
export class NotFound extends HandelErrors {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
export class OK extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OK';
  }
}
export class Created extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CREATED';
  }
}
export class BadRequest extends HandelErrors {
  constructor(message: string) {
    super(message);
    this.name = 'Bad Request';
  }
}
export class Unauthorized extends HandelErrors {
  constructor(message: string) {
    super(message);
    this.name = 'Unauthorized';
  }
}
export class Forbidden extends HandelErrors {
  constructor(message: string) {
    super(message);
    this.name = 'FORBIDDEN';
  }
}
export class Conflict extends HandelErrors {
  constructor(message: string) {
    super(message);
    this.name = 'CONFLICT';
  }
}
export class UnprocessableContent extends HandelErrors {
  constructor(message: string) {
    super(message);
    this.name = 'UNPROCESSABLE_CONTENT';
  }
}
export class TooManyRequests extends HandelErrors {
  constructor(message: string) {
    super(message);
    this.name = 'TOO_MANY_REQUESTS';
  }
}
export class Invalid extends HandelErrors {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidErroe';
  }
}
export class FailedError extends HandelErrors {
  constructor(message: string) {
    super(message);
    this.name = 'FailedError';
  }
}
export class AccessDenied extends HandelErrors {
  constructor(message: string) {
    super(message);
    this.name = 'AccessDenied';
  }
}