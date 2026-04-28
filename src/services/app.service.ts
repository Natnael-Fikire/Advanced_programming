/// <reference types="@types/bun" />
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite, { schema });

export const userService = {
  create: (name: string) => db.insert(schema.users).values({ name }).returning(),
  getAll: () => db.query.users.findMany(),
};

export const postService = {
  create: (title: string, content: string, userId: number) => 
    db.insert(schema.posts).values({ title, content, userId }).returning(),
  getAll: () => db.query.posts.findMany(),
  // Requirement: Fetch posts for a specific user 
  getByUser: (userId: number) => 
    db.query.posts.findMany({ where: eq(schema.posts.userId, userId) }),
};

export const commentService = {
  create: (text: string, postId: number) => 
    db.insert(schema.comments).values({ text, postId }).returning(),
  getAll: () => db.query.comments.findMany(),
  // Requirement: Fetch comments for a specific post [cite: 34]
  getByPost: (postId: number) => 
    db.query.comments.findMany({ where: eq(schema.comments.postId, postId) }),
};