import { Hono } from 'hono';
import userRoute from './routes/users';
import postRoute from './routes/posts';
import commentRoute from './routes/comments';

const app = new Hono();

// Modular Sub-routing Integration [cite: 6, 8]
app.route('/users', userRoute);
app.route('/posts', postRoute);
app.route('/comments', commentRoute);

app.get('/', (c) => c.text('Modular API is Active'));

export default {
  port: 3000,
  fetch: app.fetch,
};