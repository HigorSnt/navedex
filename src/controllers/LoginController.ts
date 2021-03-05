import { Request, Response } from 'express';
import { LOGIN_ERROR } from '../constants/messages';
import { UserService } from '../services';
import { checkPassword, generateToken } from '../utils/auth';

const service = new UserService();

export default class LoginController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await service.findByEmail(email);

    if (!user) {
      return res.status(401).json({ error: LOGIN_ERROR });
    }

    if (!(await checkPassword(password, user.password_hash))) {
      return res.status(401).json({ error: LOGIN_ERROR });
    }

    return res.json({
      token: await generateToken(user.email),
    });
  }
}
