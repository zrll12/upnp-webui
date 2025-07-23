import {Applications} from "~~/server/utils/drizzle";

export default eventHandler(async (event) => {
  const route: Applications = await readBody(event);

  await useDrizzle()
    .insert(tables.applications)
    .values(route)
})
