import { Hono } from 'hono';
import { userService } from '../services/app.service';

const users = new Hono();

users.post('/', async (c) => {
  const { name } = await c.req.json();
  return c.json(await userService.create(name), 201);
});

users.get('/', async (c) => {
  return c.json(await userService.getAll());
});

export default users;