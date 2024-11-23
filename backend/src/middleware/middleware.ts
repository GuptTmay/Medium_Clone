import { verify } from 'hono/jwt'
import { createMiddleware } from 'hono/factory'

const jwtAuth = createMiddleware<{
    Bindings: {
        JWT_SECRET: string;
    }
    Variables: {
      userId: string
    }
}>(async (c, next) => {
  
  const authToken = c.req.header("Authorization") || "";
  const token = authToken.split(' ')[1];

  try {
    const response = await verify(token, c.env.JWT_SECRET);
    if (!response || typeof response.id !== 'string') throw Error;
    
    c.set('userId', response.id);

    await next();
  } catch (error) {

    c.status(403);
    return c.json({message: "Authenication failed"});
  }
})

export { jwtAuth }