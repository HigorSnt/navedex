export interface User {
  email: string;
  password_hash: string;
}

declare global {
  namespace Express {
    interface Request {
      loggedUser: string;
    }
  }
}
