import { Request, Response, NextFunction } from 'express';

export const auditLogger = (req: Request, _res: Response, next: NextFunction) => {
  const entry = {
    method: req.method,
    path: req.originalUrl,
    time: new Date().toISOString(),
    ip: req.ip,
    user: (req as any).user?.id,
  };
  console.log('[AUDIT]', JSON.stringify(entry));
  next();
};

