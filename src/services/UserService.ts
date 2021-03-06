import connection from '../database/connection';
import { USERS } from '../constants/tables';
import { PersistentUser, User } from '../@types';

export default class UserService {
  async create(user: User): Promise<void> {
    await connection(USERS).insert(user);
  }

  async findByEmail(email: string): Promise<PersistentUser> {
    return await connection(USERS).where('email', email).select('*').first();
  }
}
