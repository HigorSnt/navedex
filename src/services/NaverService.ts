/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { QueryBuilder } from 'knex';
import { Navers, PersistentNavers, UpdateNavers } from '../@types';
import { NOT_ALLOWED, PROJECT_NOT_FOUND } from '../constants/messages';
import { NAVERS, NAVERS_PROJECTS, PROJECTS } from '../constants/tables';
import connection from '../database/connection';

export default class NaverService {
  async create(naver: Navers, projects: number[]): Promise<PersistentNavers> {
    try {
      const transaction = await connection.transaction();

      const insertedIds = await transaction(NAVERS)
        .returning('id')
        .insert(naver);
      const naver_id = insertedIds[0];

      const naverProjects = projects.map((project_id: number) => {
        return { naver_id, project_id };
      });

      await transaction(NAVERS_PROJECTS).insert(naverProjects);

      await transaction.commit();

      return { id: naver_id, ...naver, projects };
    } catch (error) {
      const e = { detail: PROJECT_NOT_FOUND };

      throw e;
    }
  }

  async show(id: number): Promise<PersistentNavers | null> {
    const naver = await connection(NAVERS)
      .andWhere('id', id)
      .select(
        'id',
        'name',
        'birthdate',
        'job_role',
        'admission_date',
        connection.raw(
          '(extract(Year from AGE(CURRENT_DATE, admission_date)) * 12) + extract(Month from AGE(CURRENT_DATE, admission_date)) as months_admission'
        )
      )
      .first();

    if (!naver) {
      return null;
    }

    const projects = await connection
      .select('p.id', 'p.name')
      .from({ p: PROJECTS })
      .join({ np: NAVERS_PROJECTS }, 'p.id', '=', 'np.project_id')
      .where('np.naver_id', id);

    return { ...naver, projects };
  }

  async index(
    name: any,
    job_role: any,
    admission_months: any,
    user: string
  ): Promise<Array<PersistentNavers>> {
    const navers = await connection
      .select(
        'id',
        'name',
        'birthdate',
        'job_role',
        'admission_date',
        connection.raw(
          '(extract(Year from AGE(CURRENT_DATE, admission_date)) * 12) + extract(Month from AGE(CURRENT_DATE, admission_date)) as months_admission'
        )
      )
      .from(NAVERS)
      .where('user', user)
      .where((qb: QueryBuilder) => {
        if (name) {
          qb.andWhere(
            connection.raw('lower(name)'),
            'like',
            `%${name.toLowerCase()}%`
          );
        }

        if (job_role) {
          qb.andWhere(
            connection.raw('lower(job_role)'),
            'like',
            `%${job_role.toLowerCase()}%`
          );
        }

        if (admission_months) {
          qb.andWhere(
            connection.raw(
              '(extract(Year from AGE(CURRENT_DATE, admission_date)) * 12) + extract(Month from AGE(CURRENT_DATE, admission_date))'
            ),
            '<=',
            admission_months
          );
        }
      });

    return navers;
  }

  async update(
    updateNaver: UpdateNavers,
    user: string,
    naver_id: number
  ): Promise<PersistentNavers> {
    try {
      let naver = await connection(NAVERS)
        .where('id', naver_id)
        .select('*')
        .first();

      if (naver.user === user) {
        const transaction = await connection.transaction();

        naver = await transaction(NAVERS)
          .where('id', naver_id)
          .update(
            {
              ...updateNaver,
              projects: undefined,
            },
            ['id', 'name', 'admission_date', 'job_role', 'birthdate']
          );

        if (updateNaver.projects.length > 0) {
          await transaction(NAVERS_PROJECTS).where('naver_id', naver_id).del();
          await transaction(NAVERS_PROJECTS).insert(
            updateNaver.projects.map(project_id => {
              return { naver_id, project_id };
            })
          );
        }

        await transaction.commit();

        return { ...naver[0], ...updateNaver };
      } else {
        throw new Error(NOT_ALLOWED);
      }
    } catch (error) {
      const e = { detail: PROJECT_NOT_FOUND };
      throw e;
    }
  }

  async delete(id: number, user: string): Promise<boolean> {
    const result = await connection(NAVERS)
      .where('id', id)
      .andWhere('user', user)
      .del();

    return result !== 0;
  }
}
