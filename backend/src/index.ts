import { Hono } from 'hono'
import { cors } from 'hono/cors'
import user from './routes/user';
import post from './routes/post';

const app = new Hono().basePath('/api/v1');

app.use('*', async (c, next) => {

  const corsMiddlewareHandler = cors({
    origin: 'http://localhost:5173',
  });
  return corsMiddlewareHandler(c, next);
});


app.route('/user', user);
app.route('/post', post);

app.get('/test', (c) => {
  return c.text("Done Bro");
})

export default app
