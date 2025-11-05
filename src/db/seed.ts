import { database } from "./drizzle";
import { roleTable } from "./schema";
import { eq } from "drizzle-orm";

async function runSeed() {
  console.log("Iniciando o seed das roles...");

  const roles = ["admin", "user"];

  for (const roleName of roles) {
    const existingRole = await database.query.roleTable.findFirst({
      where: eq(roleTable.name, roleName),
    });

    if (!existingRole) {
      await database.insert(roleTable).values({
        name: roleName,
      });
      console.log(`Role '${roleName}' criada com sucesso.`);
    } else {
      console.log(`Role '${roleName}' já existe. Pulando.`);
    }
  }

  console.log("Seed de roles concluído.");
}

runSeed().catch((err) => {
  console.error("Erro ao executar o seed:", err);
  process.exit(1);
});
