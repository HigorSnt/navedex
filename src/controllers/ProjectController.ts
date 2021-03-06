import { Request, Response } from 'express';
import { ProjectService } from '../services';

const service = new ProjectService();

export default class ProjectController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const { name, navers } = req.body;
      const user = req.loggedUser;

      const project = await service.create({ name, user }, navers);
      return res.status(201).json(project);
    } catch (error) {
      console.error(error);
      return res.status(400).send();
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { name } = req.query;
    const user = req.loggedUser;
    const projects = await service.index(name, user);
    return res.json(projects);
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const project = await service.show(Number(id));

      if (!project) {
        return res.status(404).send();
      }

      return res.json(project);
    } catch (error) {
      console.error(error);
      return res.status(404).send();
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, navers } = req.body;
      const { id } = req.params;
      const user = req.loggedUser;
      const project = await service.update(name, navers, user, Number(id));

      return res.json(project);
    } catch (error) {
      console.error(error);
      return res.status(400).send();
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = req.loggedUser;
      const deleted = await service.delete(Number(id), user);

      if (deleted) {
        return res.status(200).send();
      } else {
        return res.status(400).send();
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send();
    }
  }
}
