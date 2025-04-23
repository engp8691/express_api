import * as yup from 'yup'

export const createRoleSchema = yup.object({
  name: yup.string().required().min(2),
})
