import { randomUUID } from 'crypto';
import { sql } from 'drizzle-orm';
import { date, pgTable, text } from 'drizzle-orm/pg-core';

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

export const testimonial = pgTable('testimonial_table', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$default(() => randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  testimonial: text('testimonial').notNull(),
  images: text('images')
    .array()
    .default(sql`'{}'::text[]`),
  video: text('video'),
  spaceId: text('space_id')
    .notNull()
    .references(() => spaceTable.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  createdAt: date('data').$default(() => new Date().toDateString()),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;
export type InsertSpace = typeof spaceTable.$inferInsert;
export type SelectSpace = typeof spaceTable.$inferSelect;
export type SelectTestimonial = typeof testimonial.$inferSelect;
export type InsertTestimonial = typeof testimonial.$inferInsert;
