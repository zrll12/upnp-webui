import {Applications} from "~~/server/utils/drizzle";

export default eventHandler(async (event) => {
  const route: Applications = await readBody(event);

  if (route.contact === "" || route.name === "") {
    throw createError({
      statusCode: 400,
      statusMessage: "Contact, name are required fields."
    });
  }

  await useDrizzle()
    .insert(tables.applications)
    .values(route)
})
