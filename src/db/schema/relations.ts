import { relations } from "drizzle-orm";
import {
  productTable,
  roleTable,
  storeTable,
  userStoreTable,
  userTable,
} from "./schema";

export const userRelations = relations(userTable, ({ one, many }) => ({
  role: one(roleTable, {
    fields: [userTable.role_id],
    references: [roleTable.role_id],
  }),
  userStores: many(userStoreTable),
}));

export const roleRelations = relations(roleTable, ({ many }) => ({
  users: many(userTable),
}));

export const storeRelations = relations(storeTable, ({ many }) => ({
  userStores: many(userStoreTable),
  products: many(productTable),
}));

export const userStoreRelations = relations(userStoreTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userStoreTable.user_id],
    references: [userTable.user_id],
  }),
  store: one(storeTable, {
    fields: [userStoreTable.store_id],
    references: [storeTable.store_id],
  }),
}));

export const productRelations = relations(productTable, ({ one }) => ({
  store: one(storeTable, {
    fields: [productTable.store_id],
    references: [storeTable.store_id],
  }),
}));
