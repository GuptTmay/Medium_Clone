import z from 'zod';


export const signupInputs = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
})

export const signinInputs = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const createPostInputs = z.object({
  title: z.string(),
  content: z.string()
})

export const updatePostInputs = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  id: z.string().uuid()
})

export const getBlukPostInputs = z.object({
  id: z.string().uuid()
})


export type signupInputs = z.infer<typeof signupInputs> 
export type signinInputs = z.infer<typeof signinInputs> 

export type createPostInputs = z.infer<typeof createPostInputs>
export type updatePostInputs = z.infer<typeof updatePostInputs>
export type getBlukPostInputs = z.infer<typeof getBlukPostInputs>
