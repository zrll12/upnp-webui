import {desc} from "drizzle-orm";

export const getRoutes = async (page: number, pageSize: number) => {
  const routes = await useDrizzle()
    .select()
    .from(tables.routes)
    .orderBy(desc(tables.routes.updatedAt), desc(tables.routes.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize)

  return routes
}
