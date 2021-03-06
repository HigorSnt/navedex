import { celebrate, Joi } from 'celebrate';

export const userValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim().empty().email().required().messages({
      'string.base': 'Email must be a string.',
      'string.empty': 'Email cannot be empty.',
      'string.email': 'Email invalid.',
      'any.required': 'Email is required.',
    }),
    password: Joi.string().trim().empty().required().messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password cannot be empty.',
      'any.required': 'Password is required.',
    }),
  }),
});

export const listNavers = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  query: {
    admission_months: Joi.number(),
    name: Joi.string(),
    job_role: Joi.string(),
  },
});

export const getAndDeleteNaver = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

export const createNaver = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().empty().required().messages({
      'string.base': 'Name must be a string.',
      'string.empty': 'Name cannot be empty.',
      'any.required': 'Name is required.',
    }),
    birthdate: Joi.string().required().messages({
      'any.required': 'birthdate is required.',
    }),
    admission_date: Joi.string().required().messages({
      'any.required': 'admission_date is required',
    }),
    job_role: Joi.string().empty().required().messages({
      'string.base': 'job_role must be a string.',
      'string.empty': 'job_role cannot be empty.',
      'any.required': 'job_role is required.',
    }),
    projects: Joi.array().items(Joi.number()),
  }),
});

export const updateNaver = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().empty().messages({
      'string.base': 'Name must be a string.',
      'string.empty': 'Name cannot be empty.',
    }),
    birthdate: Joi.string(),
    admission_date: Joi.string(),
    job_role: Joi.string().empty().messages({
      'string.base': 'job_role must be a string.',
      'string.empty': 'job_role cannot be empty.',
    }),
    projects: Joi.array().items(Joi.number()),
  }),
});

export const listProjects = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  query: {
    name: Joi.string(),
  },
});

export const getAndDeleteProject = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

export const createProject = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().empty().required().messages({
      'string.base': 'name must be a string.',
      'string.empty': 'name cannot be empty.',
      'string.required': 'name is required',
    }),
    navers: Joi.array().items(Joi.number()),
  }),
});

export const updateProject = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().empty().messages({
      'string.base': 'name must be a string.',
      'string.empty': 'name cannot be empty.',
    }),
    navers: Joi.array().items(Joi.number()),
  }),
});
