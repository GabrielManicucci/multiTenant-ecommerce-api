import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { database } from "../db/drizzle";
import { roleTable, userTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function Register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.email().nonempty(),
    password: z.string().min(6).nonempty(),
    roleId: z.string().optional(),
    age: z.number().optional(),
  });

  const { name, email, password, roleId, age } = bodySchema.parse(request.body);

  try {
    const emailExists = await database.query.userTable.findFirst({
      where: eq(userTable.email, email),
    });

    if (emailExists) {
      reply.status(401).send({ error: "EMAIL_ALREADY_EXISTS" });
    }

    if (roleId) {
      const roleExists = await database.query.roleTable.findFirst({
        where: eq(roleTable.role_id, roleId),
      });

      if (!roleExists) {
        reply.status(401).send({ error: "ROLE_NOT_EXISTS" });
      }
    }

    const [user] = await database
      .insert(userTable)
      .values({ name, email, password, age, role_id: roleId })
      .returning();

    reply.status(201).send(user);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Internal Server Error" });
  }
}
