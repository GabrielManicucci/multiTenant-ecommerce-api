import { integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { v4 as uuidV4 } from "uuid";

export const userTable = pgTable("user", {
  user_id: varchar()
    .primaryKey()
    .$defaultFn(() => uuidV4()),
  name: varchar({ length: 255 }).notNull(),
  age: integer(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar().notNull(),
  role_id: varchar().references(() => roleTable.role_id, {
    onDelete: "set null",
  }),
});

export const roleTable = pgTable("role", {
  role_id: varchar()
    .primaryKey()
    .$defaultFn(() => uuidV4()),
  name: varchar(),
});

export const storeTable = pgTable("store", {
  store_id: varchar()
    .primaryKey()
    .$defaultFn(() => uuidV4()),
  name: varchar().notNull(),
  email: varchar().notNull(),
  cnpj: varchar().unique().notNull(),
});

export const userStoreTable = pgTable(
  "user_store",
  {
    user_id: varchar().references(() => userTable.user_id, {
      onDelete: "cascade",
    }),
    store_id: varchar().references(() => storeTable.store_id, {
      onDelete: "cascade",
    }),
  },
  (table) => ({
    pk: primaryKey({
      name: "user_store_id",
      columns: [table.user_id, table.store_id],
    }),
  })
);

export const productTable = pgTable("product", {
  product_id: varchar()
    .primaryKey()
    .$defaultFn(() => uuidV4()),
  name: varchar().notNull(),
  description: varchar(),
  price: integer().notNull(),
  store_id: varchar().references(() => storeTable.store_id),
});
