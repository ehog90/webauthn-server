/*
  Warnings:

  - You are about to drop the column `challenge` on the `Authentication` table. All the data in the column will be lost.
  - Added the required column `credentialId` to the `Authentication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicKey` to the `Authentication` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Authentication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publicKey" TEXT NOT NULL,
    "credentialId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Authentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Authentication" ("createdAt", "id", "userId") SELECT "createdAt", "id", "userId" FROM "Authentication";
DROP TABLE "Authentication";
ALTER TABLE "new_Authentication" RENAME TO "Authentication";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
