import { desc } from "drizzle-orm";

export default eventHandler(async (event) => {
	const routes = await useDrizzle()
		.select()
		.from(tables.routes)
		.orderBy(desc(tables.routes.updatedAt), desc(tables.routes.id));

	return routes;
});
