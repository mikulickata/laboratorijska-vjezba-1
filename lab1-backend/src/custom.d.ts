// custom.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      access_token?: string; // Opcionalno, jer token može biti prazan
    }
  }
}
