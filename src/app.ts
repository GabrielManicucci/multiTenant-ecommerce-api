import fastify from "fastify";
import { UserRoutes } from "./user/routes";

export const app = fastify();

app.register(UserRoutes);
