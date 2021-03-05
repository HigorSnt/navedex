import { Router } from 'express';
import { LoginController, UserController } from './controllers';

const routes = Router();
const userController = new UserController();
const loginController = new LoginController();

routes.post('/users', userController.store);
routes.post('/login', loginController.login);

export default routes;
