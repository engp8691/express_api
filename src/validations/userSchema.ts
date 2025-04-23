import * as yup from 'yup';

export const createUserSchema = yup.object({
  name: yup.string().required().min(2),
  email: yup.string().email().required(),
});


export const loginSchema = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const userResponseSchema = yup.object({
  id: yup.string().uuid().required(),
  email: yup.string().email().required(),
  name: yup.string().required(),
  userRoles: yup.array().of(
    yup.object({
      id: yup.string().uuid().required(),
      name: yup.string().required(),
    })
  ).required(),
});

export const allUsersResponseSchema = yup.array().of(userResponseSchema);
