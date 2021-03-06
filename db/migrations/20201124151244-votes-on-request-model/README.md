# Migration `20201124151244-votes-on-request-model`

This migration has been generated by namorim-pc at 11/24/2020, 3:12:44 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "VotesOnRequest" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "requestId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("userId","requestId")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201124143019-request-title-is-mandatory..20201124151244-votes-on-request-model
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
@@ -22,8 +22,10 @@
     role           String    @default("user")
     sessions       Session[]
     products       Product[]
     requests       Request[]
+
+    votesOnRequest VotesOnRequest[]
 }
 model Session {
     id                 Int       @id @default(autoincrement())
@@ -59,5 +61,20 @@
     product     Product  @relation(fields: [productId], references: [id])
     productId   Int
     user        User?    @relation(fields: [userId], references: [id])
     userId      Int?
+
+    votesOnRequest VotesOnRequest[]
 }
+
+model VotesOnRequest {
+    createdAt DateTime @default(now())
+    updatedAt DateTime @updatedAt
+
+    request   Request @relation(fields: [requestId], references: [id])
+    requestId Int
+
+    user   User @relation(fields: [userId], references: [id])
+    userId Int
+
+    @@id([userId, requestId])
+}
```


