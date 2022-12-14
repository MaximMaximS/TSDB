export function genValidatorMessage(path: string, kind: string) {
  return `${path} is not valid (${kind})`;
}

export class ValidatorError extends Error {
  kind;
  path;
  constructor(path: string, kind: string) {
    super(genValidatorMessage(path, kind));
    this.name = "ValidatorError";
    this.kind = kind;
    this.path = path;
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

export class ServerError extends Error {
  full: Error;
  constructor(error: Error | string) {
    if (error instanceof Error) {
      super(error.message);
      this.full = error;
    } else {
      super(error);
      this.full = new Error(error);
    }
    this.name = "ServerError";
  }
}

export class NotFoundError extends Error {
  constructor() {
    super("NotFound");
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends Error {
  constructor() {
    super("Forbidden");
    this.name = "ForbiddenError";
  }
}

export class ConflictError extends Error {
  path;
  constructor(path: string) {
    super(`Conflict`);
    this.name = "ConflictError";
    this.path = path;
  }
}
