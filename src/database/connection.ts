import knex from 'knex';
import config from '../../knexfile';

const knexConfig = config.development;

export default knex(knexConfig);
// process.env.NODE_ENV === 'test'
