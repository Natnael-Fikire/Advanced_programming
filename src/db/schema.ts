import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Users Entity [cite: 11]
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
});

// Posts Entity [cite: 12]
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  // Relationship: Post belongs to one user [cite: 16, 20]
  userId: integer('user_id').references(() => users.id).notNull(),
});

// Comments Entity [cite: 13]
export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  text: text('text').notNull(),
  // Relationship: Comment belongs to one post [cite: 18, 20]
  postId: integer('post_id').references(() => posts.id).notNull(),
});