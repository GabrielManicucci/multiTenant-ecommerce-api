import { FastifyInstance } from "fastify";
import { Register } from "./controllers";

export function UserRoutes(app: FastifyInstance) {
  app.post("/users", Register);
}
