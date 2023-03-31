-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Authentication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publicKey" TEXT NOT NULL,
    "credentialId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Authentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Authentication" ("createdAt", "credentialId", "id", "publicKey", "userId") SELECT "createdAt", "credentialId", "id", "publicKey", "userId" FROM "Authentication";
DROP TABLE "Authentication";
ALTER TABLE "new_Authentication" RENAME TO "Authentication";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
