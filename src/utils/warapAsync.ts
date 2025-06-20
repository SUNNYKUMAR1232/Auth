  import { Request, Response, NextFunction } from 'express';
  export function wrapAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown> | void) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  } 