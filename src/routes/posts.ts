import { Hono } from 'hono';
import { postService } from '../services/app.service';

const posts = new Hono();

posts.post('/', async (c) => {
  const { title, content, userId } = await c.req.json();
  return c.json(await postService.create(title, content, userId), 201); // Create post [cite: 31]
});

posts.get('/', async (c) => {
  return c.json(await postService.getAll()); // Retrieve posts [cite: 31]
});

posts.get('/user/:id', async (c) => {
  const userId = parseInt(c.req.param('id'));
  return c.json(await postService.getByUser(userId)); // Specific user posts 
});

export default posts;