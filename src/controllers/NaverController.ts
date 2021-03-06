import { Request, Response } from 'express';
import { NaverService } from '../services';

const service = new NaverService();

export default class NaverController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name,
        birthdate,
        job_role,
        admission_date,
        projects = [],
      } = req.body;
      const user = req.loggedUser;

      const naver = await service.create(
        {
          name,
          birthdate,
          job_role,
          admission_date,
          user,
        },
        projects
      );

      return res.status(201).json(naver);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: error.detail });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const naver = await service.show(Number(id));

      if (!naver) {
        return res.status(404).send();
      }

      return res.json(naver);
    } catch (error) {
      console.error(error);
      return res.status(404).send();
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { name, admission_months, job_role } = req.query;
    const user = req.loggedUser;
    const navers = await service.index(name, job_role, admission_months, user);

    return res.json(navers);
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, job_role, projects, admission_date } = req.body;
      const { id } = req.params;
      const user = req.loggedUser;
      const naver = await service.update(
        { name, job_role, projects, admission_date },
        user,
        Number(id)
      );

      return res.json(naver);
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
