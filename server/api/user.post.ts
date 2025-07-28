import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import {validateToken, generateToken} from "~~/server/utils/token";

export default eventHandler(async (event) => {
  const { username, password } = (await readBody(event)) as {
    username: string;
    password: string;
  };

  const users = await useDrizzle()
    .select()
    .from(tables.users)
    .where(eq(tables.users.username, username))
    .limit(1);
  if (users.length === 0) {
    throw createError({
      statusCode: 4011,
      statusMessage: "User not found",
    });
  }

  const passwordInDb = users[0].password;
  if (passwordInDb.endsWith("$")) {
    // Not hashed
    if (passwordInDb.substring(0, passwordInDb.length - 1) !== password) {
      throw createError({
        statusCode: 4012,
        statusMessage: "Invalid password",
      });
    }

    // Password updated, so old token should be invalidated
    const hashed = bcrypt.hashSync(password, 10);
    const token = generateToken(16);
    await useDrizzle()
      .update(tables.users)
      .set({ token, password: hashed })
      .where(eq(tables.users.username, username));
    return { token, username: username };
  }

  // Hashed password
  if (!bcrypt.compareSync(password, passwordInDb)) {
    throw createError({
      statusCode: 4012,
      statusMessage: "Invalid password",
    });
  }

  // Generate token
  let token = users[0].token || "";
  if (!(await validateToken(token)).valid) {
    token = generateToken(16);
    await useDrizzle()
      .update(tables.users)
      .set({ token })
      .where(eq(tables.users.username, username));
  }

  return { token };
});
