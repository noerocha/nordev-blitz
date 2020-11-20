# Migration `20201120153553-product-and-request-models`

This migration has been generated by namorim-pc at 11/20/2020, 3:35:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
)

PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" INTEGER,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("id", "createdAt", "updatedAt", "name") SELECT "id", "createdAt", "updatedAt", "name" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201119165316-products..20201120153553-product-and-request-models
--- datamodel.dml
+++ datamodel.dml
@@ -1,45 +1,57 @@
 // This is your Prisma schema file,
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
-  provider = "sqlite"
-  url = "***"
+    provider = "sqlite"
+    url = "***"
 }
 generator client {
-  provider = "prisma-client-js"
+    provider = "prisma-client-js"
 }
 // --------------------------------------
 model User {
-  id             Int       @default(autoincrement()) @id
-  createdAt      DateTime  @default(now())
-  updatedAt      DateTime  @updatedAt
-  name           String?
-  email          String    @unique
-  hashedPassword String?
-  role           String    @default("user")
-  sessions       Session[]
+    id             Int       @id @default(autoincrement())
+    createdAt      DateTime  @default(now())
+    updatedAt      DateTime  @updatedAt
+    name           String?
+    email          String    @unique
+    hashedPassword String?
+    role           String    @default("user")
+    sessions       Session[]
+    products       Product[]
 }
 model Session {
-  id                 Int       @default(autoincrement()) @id
-  createdAt          DateTime  @default(now())
-  updatedAt          DateTime  @updatedAt
-  expiresAt          DateTime?
-  handle             String    @unique
-  user               User?     @relation(fields: [userId], references: [id])
-  userId             Int?
-  hashedSessionToken String?
-  antiCSRFToken      String?
-  publicData         String?
-  privateData        String?
-}
+    id                 Int       @id @default(autoincrement())
+    createdAt          DateTime  @default(now())
+    updatedAt          DateTime  @updatedAt
+    expiresAt          DateTime?
+    handle             String    @unique
+    user               User?     @relation(fields: [userId], references: [id])
+    userId             Int?
+    hashedSessionToken String?
+    antiCSRFToken      String?
+    publicData         String?
+    privateData        String?
+}
 model Product {
-  id        Int      @default(autoincrement()) @id
-  createdAt DateTime @default(now())
-  updatedAt DateTime @updatedAt
-  name      String   
+    id          Int      @id @default(autoincrement())
+    createdAt   DateTime @default(now())
+    updatedAt   DateTime @updatedAt
+    name        String
+    description String?
+    User        User?    @relation(fields: [userId], references: [id])
+    userId      Int?
 }
+
+model Request {
+    id          Int      @id @default(autoincrement())
+    createdAt   DateTime @default(now())
+    updatedAt   DateTime @updatedAt
+    title       String
+    description String
+}
```

