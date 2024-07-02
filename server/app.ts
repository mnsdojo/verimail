import { Hono } from "hono";
import { logger } from "hono/logger";

import { serveStatic } from "hono/bun";
import { validateRoute } from "./routes/validate";

const app = new Hono();
app.use("*", logger());

const apiRoutes = app.basePath("/api").route("/validate", validateRoute);

app.get("*", serveStatic({ root: "../client/dist" }));
app.get("*", serveStatic({ path: "../client/dist/index.html" }));

export default app;

export type Apptype = typeof apiRoutes;
