import { Hono } from "hono";

export const validateRoute = new Hono().get("/validate", async (c) => {
  return c.json({ name: "manish" });
});
