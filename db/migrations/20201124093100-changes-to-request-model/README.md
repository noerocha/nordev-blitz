# Migration `20201124093100-changes-to-request-model`

This migration has been generated by namorim-pc at 11/24/2020, 9:31:00 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER,

    FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Request" ("id", "createdAt", "updatedAt", "title", "description", "productId", "userId") SELECT "id", "createdAt", "updatedAt", "title", "description", "productId", "userId" FROM "Request";
DROP TABLE "Request";
ALTER TABLE "new_Request" RENAME TO "Request";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201120154003-added-relations-to-product-and-request-models..20201124093100-changes-to-request-model
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
     provider = "sqlite"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
@@ -53,11 +53,11 @@
 model Request {
     id          Int      @id @default(autoincrement())
     createdAt   DateTime @default(now())
     updatedAt   DateTime @updatedAt
-    title       String
-    description String
-    product     Product? @relation(fields: [productId], references: [id])
-    productId   Int?
+    title       String?
+    description String?
+    product     Product  @relation(fields: [productId], references: [id])
+    productId   Int
     user        User?    @relation(fields: [userId], references: [id])
     userId      Int?
 }
```

