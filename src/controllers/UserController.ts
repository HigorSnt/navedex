import { Request, Response } from 'express';
import { generateHash } from '../utils/auth';
import { UserService } from '../services';

const service = new UserService();

export default class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const password_hash = await generateHash(password);

    const user = await service.create({ email, password_hash });

    return res.status(201).json(user[0]);
  }
}
