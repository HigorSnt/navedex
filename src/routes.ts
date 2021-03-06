import { Router } from 'express';
import {
  LoginController,
  NaverController,
  ProjectController,
  UserController,
} from './controllers';
import authentication from './middlewares/authentication';
import {
  createNaver,
  createProject,
  getAndDeleteNaver,
  getAndDeleteProject,
  listNavers,
  listProjects,
  updateNaver,
  updateProject,
  userValidation,
} from './middlewares/validator';

const routes = Router();
const userController = new UserController();
const loginController = new LoginController();
const naverController = new NaverController();
const projectController = new ProjectController();

routes.post('/login', userValidation, loginController.login);
routes.post('/users', userValidation, userController.store);

routes.use(authentication);

routes.post('/navers', createNaver, naverController.store);
routes.get('/navers', listNavers, naverController.index);
routes.get('/navers/:id', getAndDeleteNaver, naverController.show);
routes.put('/navers/:id', updateNaver, naverController.update);
routes.delete('/navers/:id', getAndDeleteNaver, naverController.delete);

routes.post('/projects', createProject, projectController.store);
routes.get('/projects', listProjects, projectController.index);
routes.get('/projects/:id', getAndDeleteProject, projectController.show);
routes.put('/projects/:id', updateProject, projectController.update);
routes.delete('/projects/:id', getAndDeleteProject, projectController.delete);

export default routes;
