import { Hono } from 'hono';
import { commentService } from '../services/app.service';

const comments = new Hono();

comments.post('/', async (c) => {
  const { text, postId } = await c.req.json();
  return c.json(await commentService.create(text, postId), 201); 
});

comments.get('/', async (c) => {
  return c.json(await commentService.getAll()); 
});

comments.get('/post/:id', async (c) => {
  const postId = parseInt(c.req.param('id'));
  return c.json(await commentService.getByPost(postId)); 
});

export default comments;