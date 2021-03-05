import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export async function generateHash(str: string): Promise<string> {
  return await hash(str, 10);
}

export async function checkPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(password, hash);
}

export async function generateToken(email: string): Promise<string> {
  const key = process.env.SECRET || '';
  return sign(email, key);
}
