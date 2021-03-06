export interface User {
  email: string;
  password_hash: string;
}

export interface PersistentUser extends User {
  id: number;
}

export interface Navers {
  name: string;
  birthdate: Date;
  job_role: string;
  admission_date: Date;
  user: string;
}

export interface PersistentNavers extends Navers {
  id: number;
  projects: number[];
}

export interface UpdateNavers {
  name: string;
  job_role: string;
  projects: number[];
  admission_date: Date;
}

export interface Project {
  name: string;
  user?: string;
}

export interface PersistentProject extends Project {
  id: number;
  navers?: number[] | Navers[];
}

declare global {
  namespace Express {
    interface Request {
      loggedUser: string;
    }
  }
}
