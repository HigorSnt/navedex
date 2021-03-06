import { QueryBuilder } from 'knex';
import { PersistentProject, Project } from '../@types';
import { NOT_ALLOWED } from '../constants/messages';
import { NAVERS, NAVERS_PROJECTS, PROJECTS } from '../constants/tables';
import connection from '../database/connection';

export default class ProjectService {
  async create(
    project: Project,
    navers: number[] = []
  ): Promise<PersistentProject> {
    const transaction = await connection.transaction();

    const insertedIds = await transaction(PROJECTS)
      .returning('id')
      .insert(project);
    const project_id = insertedIds[0];

    await transaction(NAVERS_PROJECTS).insert(
      navers.map(naver_id => {
        return { naver_id, project_id };
      })
    );

    await transaction.commit();

    return { id: project_id, ...project, navers };
  }

  async index(name: any, user: string): Promise<Array<PersistentProject>> {
    return await connection(PROJECTS)
      .where('user', user)
      .where((qb: QueryBuilder) => {
        if (name) {
          qb.andWhere(
            connection.raw('lower(name)'),
            'like',
            `%${name.toLowerCase()}%`
          );
        }
      })
      .select('*');
  }

  async show(id: number): Promise<PersistentProject | null> {
    const project = (await connection(PROJECTS)
      .where('id', id)
      .select(['id', 'name'])
      .first()) as PersistentProject;

    if (!project) {
      return null;
    }

    const navers = await connection
      .select('n.id', 'n.name', 'n.birthdate', 'n.job_role', 'n.admission_date')
      .from({ n: NAVERS })
      .join({ np: NAVERS_PROJECTS }, 'n.id', '=', 'np.naver_id')
      .where('np.project_id', id);

    return { ...project, navers };
  }

  async update(
    name: string,
    navers: number[],
    user: string,
    project_id: number
  ): Promise<PersistentProject> {
    let project = await connection(PROJECTS)
      .where('id', project_id)
      .select('*')
      .first();

    if (project.user === user) {
      const transaction = await connection.transaction();

      project = await transaction(PROJECTS).where('id', project_id).update(
        {
          name,
        },
        ['id', 'name']
      );

      if (navers.length > 0) {
        await transaction(NAVERS_PROJECTS)
          .where('project_id', project_id)
          .del();
        await transaction(NAVERS_PROJECTS).insert(
          navers.map(naver_id => {
            return { naver_id, project_id };
          })
        );
      }

      await transaction.commit();

      return { ...project[0], navers };
    } else {
      throw new Error(NOT_ALLOWED);
    }
  }

  async delete(id: number, user: string): Promise<boolean> {
    const result = await connection(PROJECTS)
      .where('id', id)
      .andWhere('user', user)
      .del();

    return result !== 0;
  }
}
