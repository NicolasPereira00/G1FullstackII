-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product_images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_product_images" ("id", "isPrimary", "productId", "sortOrder", "url") SELECT "id", "isPrimary", "productId", "sortOrder", "url" FROM "product_images";
DROP TABLE "product_images";
ALTER TABLE "new_product_images" RENAME TO "product_images";
CREATE INDEX "product_images_productId_sortOrder_idx" ON "product_images"("productId", "sortOrder");
CREATE TABLE "new_product_variants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "ean" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "price" DECIMAL,
    CONSTRAINT "product_variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_product_variants" ("color", "ean", "id", "price", "productId", "size", "sku", "stock") SELECT "color", "ean", "id", "price", "productId", "size", "sku", "stock" FROM "product_variants";
DROP TABLE "product_variants";
ALTER TABLE "new_product_variants" RENAME TO "product_variants";
CREATE UNIQUE INDEX "product_variants_sku_key" ON "product_variants"("sku");
CREATE UNIQUE INDEX "product_variants_ean_key" ON "product_variants"("ean");
CREATE UNIQUE INDEX "product_variants_productId_size_color_key" ON "product_variants"("productId", "size", "color");
CREATE TABLE "new_variant_images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "variantId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "variant_images_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_variant_images" ("id", "isPrimary", "sortOrder", "url", "variantId") SELECT "id", "isPrimary", "sortOrder", "url", "variantId" FROM "variant_images";
DROP TABLE "variant_images";
ALTER TABLE "new_variant_images" RENAME TO "variant_images";
CREATE INDEX "variant_images_variantId_sortOrder_idx" ON "variant_images"("variantId", "sortOrder");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
