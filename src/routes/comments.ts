import { Hono } from 'hono';
import { commentService } from '../services/app.service';

const comments = new Hono();

comments.post('/', async (c) => {
  const { text, postId } = await c.req.json();
  return c.json(await commentService.create(text, postId), 201); // Create comment [cite: 32]
});

comments.get('/', async (c) => {
  return c.json(await commentService.getAll()); // Retrieve comments
});

comments.get('/post/:id', async (c) => {
  const postId = parseInt(c.req.param('id'));
  return c.json(await commentService.getByPost(postId)); // Specific post comments [cite: 34]
});

export default comments;