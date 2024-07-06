import { randomUUID } from 'crypto';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  id: text('id').primaryKey().unique(),
  username: text('username').notNull(),
  email: text('email').unique().notNull(),
});

export const spaceTable = pgTable('space_table', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$default(() => randomUUID()),
  spacename: text('spacename').notNull(),
  spaceUrl: text('spaceUrl').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  imageUrl: text('imageUrl'),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;
export type InsertSpace = typeof spaceTable.$inferInsert;
export type SelectSpace = typeof spaceTable.$inferSelect;
