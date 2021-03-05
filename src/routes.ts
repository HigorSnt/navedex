import { Router } from 'express';
import { LoginController, UserController } from './controllers';
import authentication from './middlewares/authentication';
import { userValidation } from './middlewares/validator';

const routes = Router();
const userController = new UserController();
const loginController = new LoginController();

routes.post('/login', userValidation, loginController.login);
routes.post('/users', userValidation, userController.store);
routes.use(authentication);

export default routes;
