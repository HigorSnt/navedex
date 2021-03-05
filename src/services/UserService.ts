import connection from '../database/connection';
import { USERS } from '../constants/tables';
import { User } from '../@types';

export default class UserService {
  async create(user: User): Promise<Array<User>> {
    return await connection(USERS).returning(['id', 'email']).insert(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await connection(USERS).where('email', email).select('*').first();
  }
}
