import {asc, desc} from "drizzle-orm";
import {validateToken} from "~~/server/utils/token";

export default eventHandler(async (event) => {
  const params = getQuery(event);
  const token = getRequestHeader(event, "Authorization");

  const {page, size} = params;
  const offset = (Number(page) - 1) * Number(size);
  const limit = Number(size);

  if (!await validateToken(token || '')) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const count = await useDrizzle().$count(tables.applications);
  const applications = await useDrizzle()
    .select()
    .from(tables.applications)
    .limit(limit)
    .offset(offset)
    .orderBy(asc(tables.applications.status), desc(tables.applications.updatedAt), desc(tables.applications.id));

  return {count, data: applications};
});
