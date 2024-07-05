import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  id: text('id').primaryKey().unique(),
  username: text('username').notNull().unique(),
  email: text('email').unique().notNull(),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;
