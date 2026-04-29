declare module "bun" {
  interface Env {
    DATABASE_URL: string;
  }
}

declare namespace Express {
  interface Request {
    start: number;
    id: string;
  }
}
