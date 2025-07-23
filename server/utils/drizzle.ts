import {drizzle} from 'drizzle-orm/d1'
import * as schema from '../database/schema'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), {schema})
}

export type Routes = typeof schema.routes.$inferSelect
export type Users = typeof schema.users.$inferSelect
export type Applications = typeof schema.applications.$inferSelect
