import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import hashUtils from "../hashUtils"
import { signupInputs, signinInputs } from '@tanmaygupta22003/medium-common';


const user = new Hono<{
    Bindings : {
        DATABASE_URL: string,
        JWT_SECRET: string
    }    
}>;

user.post('/signup', async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const { success, error } = signupInputs.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "SignUp: Invaild Inputs",
      type: 'error'
    });
  }

  const hashInfo = await hashUtils.hashPassword(body.password);

  try {
    const user = await prisma.user.create({
      data: {
        name: body?.name,
        email: body.email,
        password: hashInfo.hashedPassword,
        salt: hashInfo.salt
      }
    })

    const jwtToken = await sign({id: user.id}, c.env.JWT_SECRET); 

    return c.json({jwtToken});
  } catch (error) {
      c.status(403);
      return c.json({ message: "Error Occurred While Sigining Up"});    
  }
})


user.post('/signin', async (c) => {
   const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const { success } = signinInputs.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Invaild Inputs At Signin"
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      }
    })

    if (!user) {
      c.status(403);
      return c.json({error: "User Does not exist"})
    }    

    if (!await hashUtils.matchPassword(body.password, user.password, user.salt)) {
      c.status(403);
      return c.json({error: "Invalid Password"});
    }

    const jwtToken = await sign({id: user.id }, c.env.JWT_SECRET);
    return c.json({jwtToken});
    
  } catch (error) {
    c.status(403);
    return c.json({ error: "Logging In failed"});
  }
})


export default user;