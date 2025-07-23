import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const routes = sqliteTable('routes', {
  id: integer('id').primaryKey({autoIncrement: true}),
  name: text('name').notNull().default(''),
  innerPort: integer('innerPort').notNull().unique(),
  outerPort: integer('outerPort').notNull().unique(),
  createdAt: integer('createdAt', {mode: "timestamp"}).notNull().$default(() => new Date()),
  updatedAt: integer('updatedAt', {mode: "timestamp"}).notNull().$onUpdate(() => new Date()),
})

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({autoIncrement: true}),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  createdAt: integer('createdAt', {mode: "timestamp"}).notNull().$default(() => new Date()),
  updatedAt: integer('updatedAt', {mode: "timestamp"}).notNull().$onUpdate(() => new Date()),
})

export const applications = sqliteTable('applications', {
  id: integer('id').primaryKey({autoIncrement: true}),
  name: text('name').notNull().default(''),
  innerPort: integer('innerPort').notNull().unique(),
  outerPort: integer('outerPort').notNull().unique(),
  contact: text('contact').notNull().default(''),
  description: text('description').notNull().default(''),
  status: integer('status').notNull().default(0),
  createdAt: integer('createdAt', {mode: "timestamp"}).notNull().$default(() => new Date()),
  updatedAt: integer('updatedAt', {mode: "timestamp"}).notNull().$onUpdate(() => new Date()),
})
