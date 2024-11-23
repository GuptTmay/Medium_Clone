import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwtAuth } from "../middleware/middleware";
import { createPostInputs, getBlukPostInputs, updatePostInputs } from "@tanmaygupta22003/medium-common";

const post = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    },
    Variables : {
      userId: string;
    }
}>();

post.use('/*', jwtAuth);

post.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();
  const userId = c.get('userId');

  const { success } = createPostInputs.safeParse(body);
  
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invail Inputs while Creating post"
    })
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      }
    }) 
    
    return c.json({
      id: post.id
    })
  } catch (error) {
    return c.json({
      message: "Something went wrong while saving the post"
    })
  }
});


post.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();

  const { success } = updatePostInputs.safeParse(body);
  
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invail Inputs while updating post"
    })
  }

  try {
    await prisma.post.update({
      where: {
        id: body.id,
        authorId: c.get('userId')
      },
      data: {
        title: body.title,
        content: body.content,
      }
    })
  
    return c.json({
      message: 'Post Updated'
    })
  } catch (error) {
    return c.json({
      message: "Something went wrong while modifing the post"
    })
  }
});


post.get('/bluk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const posts = await prisma.post.findMany({});
    return c.json({posts});
  } catch (error) {
    return c.json({
      message: "Retiving all posts failed"
    })
  }
});


post.get('/:id', async (c) => {
  const postId = c.req.param('id');
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const { success } = getBlukPostInputs.safeParse({ id: postId });

  if (!success) {
    return c.json({
      message: "Invail Inputs",
      api: "Bluk Post"
    })
  }


  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId
      }
    })
    
    return c.json(post)
  } catch (error) {
    return c.json({
      message: "Retiving post data failed"
    })
  }
});



export default post;