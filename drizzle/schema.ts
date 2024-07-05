import { randomUUID } from 'crypto';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  id: text('id').primaryKey().unique(),
  username: text('username').notNull().unique(),
  email: text('email').unique().notNull(),
});

export const spaceTable = pgTable('space_table', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$default(() => randomUUID()),
  spaceUrl: text('spaceUrl').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;
