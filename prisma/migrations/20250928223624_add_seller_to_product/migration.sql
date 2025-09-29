-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT,
    "price" DECIMAL NOT NULL,
    "brandId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "sellerId" INTEGER,
    "gender" TEXT,
    "modelCode" TEXT,
    "material" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_products" ("brandId", "categoryId", "createdAt", "description", "gender", "id", "isActive", "material", "modelCode", "name", "price", "slug", "updatedAt") SELECT "brandId", "categoryId", "createdAt", "description", "gender", "id", "isActive", "material", "modelCode", "name", "price", "slug", "updatedAt" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
CREATE INDEX "products_name_idx" ON "products"("name");
CREATE INDEX "products_brandId_idx" ON "products"("brandId");
CREATE INDEX "products_categoryId_idx" ON "products"("categoryId");
CREATE INDEX "products_sellerId_idx" ON "products"("sellerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
