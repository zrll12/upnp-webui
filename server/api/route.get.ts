import { desc } from "drizzle-orm";

export default eventHandler(async () => {
  const routes = await useDrizzle()
    .select()
    .from(tables.routes)
    .orderBy(desc(tables.routes.updatedAt), desc(tables.routes.id));

  return routes;
});
