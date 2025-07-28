import {eq} from "drizzle-orm";

export const generateToken = (length: number) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }
  return `${randomString}$${Date.now()}`;
};

export const validateToken = async (token: string) => {
  const tokenParts = token.split("$");
  const issued = parseInt(tokenParts[1], 10);

  if (Date.now() > issued + 1000 * 60 * 60 * 24 * 15) {
    // 15 days
    return { valid: false, user: null };
  }

  const users = await useDrizzle()
    .select()
    .from(tables.users)
    .where(eq(tables.users.token, token))
    .limit(1);

  if (users.length === 0) {
    return { valid: false, user: null };
  }

  return { valid: true, user: users[0] };
};
