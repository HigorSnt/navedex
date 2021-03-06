import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { TOKEN_INVALID, TOKEN_REQUIRED } from '../constants/messages';

export default async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: TOKEN_REQUIRED });
  }

  const [, token] = authHeader.split(' ');

  try {
    const key = process.env.SECRET || '';
    const decoded = verify(token, key) as string;

    req.loggedUser = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({ error: TOKEN_INVALID });
  }
}
