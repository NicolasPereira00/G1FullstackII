const { prisma } = require('../config/prisma');

function toNumberOr(v, fallback = undefined) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function buildWhere(qs = {}) {
  const where = {};
  const { q, brandId, categoryId, minPrice, maxPrice, onlyActive } = qs;

  if (q && q.trim()) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
      { material: { contains: q } },
      { modelCode: { contains: q } },
      { brand: { name: { contains: q } } },
      { category: { name: { contains: q } } },
    ];
  }

  if (brandId) where.brandId = Number(brandId);
  if (categoryId) where.categoryId = Number(categoryId);
  if (onlyActive === 'true') where.isActive = true;

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  return where;
}

async function findAll({ skip, take, orderBy, qs } = {}) {
  const where = buildWhere(qs);

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        brand: true,
        category: true,
        images: true,
        variants: { include: { images: true } },
      },
      skip,
      take,
      orderBy: orderBy || { id: 'asc' },
    }),
    prisma.product.count({ where }),
  ]);

  return { items, total };
}

async function findById(id) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      brand: true,
      category: true,
      images: true,
      variants: { include: { images: true } },
    },
  });
}

function pickCreatePayload(data = {}) {
  return {
    name: data.name,
    description: data.description ?? null,
    price: toNumberOr(data.price, 0),
    brandId: toNumberOr(data.brandId),
    categoryId: toNumberOr(data.categoryId),
    gender: data.gender ?? null,
    modelCode: data.modelCode ?? null,
    material: data.material ?? null,
    isActive: typeof data.isActive === 'boolean' ? data.isActive : true,
    slug: data.slug ?? null,
  };
}

function pickUpdatePayload(data = {}) {
  const out = {};
  if (data.name !== undefined) out.name = data.name;
  if (data.description !== undefined) out.description = data.description ?? null;
  if (data.price !== undefined) out.price = toNumberOr(data.price);
  if (data.brandId !== undefined) out.brandId = toNumberOr(data.brandId);
  if (data.categoryId !== undefined) out.categoryId = toNumberOr(data.categoryId);
  if (data.gender !== undefined) out.gender = data.gender ?? null;
  if (data.modelCode !== undefined) out.modelCode = data.modelCode ?? null;
  if (data.material !== undefined) out.material = data.material ?? null;
  if (data.isActive !== undefined) out.isActive = !!data.isActive;
  if (data.slug !== undefined) out.slug = data.slug ?? null;
  return out;
}

async function create(data) {
  const payload = pickCreatePayload(data);
  return prisma.product.create({
    data: payload,
    include: {
      brand: true,
      category: true,
      images: true,
      variants: { include: { images: true } },
    },
  });
}

async function update(id, data) {
  const payload = pickUpdatePayload(data);
  return prisma.product.update({
    where: { id },
    data: payload,
    include: {
      brand: true,
      category: true,
      images: true,
      variants: { include: { images: true } },
    },
  });
}

async function remove(id) {
  return prisma.product.delete({ where: { id } });
}

async function createVariant(productId, data) {
  return prisma.productVariant.create({
    data: { ...data, productId: Number(productId) },
  });
}

async function updateVariant(variantId, data) {
  return prisma.productVariant.update({
    where: { id: Number(variantId) },
    data,
  });
}

async function deleteVariant(variantId) {
  return prisma.productVariant.delete({
    where: { id: Number(variantId) },
  });
}

async function findVariantById(variantId) {
  return prisma.productVariant.findUnique({ where: { id: Number(variantId) } });
}

async function createImage(productId, data) {
  return prisma.productImage.create({
    data: { ...data, productId: Number(productId) },
  });
}
async function updateImage(imageId, data) {
  return prisma.productImage.update({
    where: { id: Number(imageId) }, data,
  });
}
async function deleteImage(imageId) {
  return prisma.productImage.delete({
    where: { id: Number(imageId) },
  });
}
async function findImageById(imageId) {
  return prisma.productImage.findUnique({ where: { id: Number(imageId) } });
}

async function createVariantImage(variantId, data) {
  return prisma.variantImage.create({
    data: { ...data, variantId: Number(variantId) },
  });
}
async function updateVariantImage(imageId, data) {
  return prisma.variantImage.update({
    where: { id: Number(imageId) }, data,
  });
}
async function deleteVariantImage(imageId) {
  return prisma.variantImage.delete({
    where: { id: Number(imageId) },
  });
}
async function findVariantImageById(imageId) {
  return prisma.variantImage.findUnique({ where: { id: Number(imageId) } });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  createVariant,
  updateVariant,
  deleteVariant,
  findVariantById,
  createImage,
  updateImage,
  deleteImage,
  findImageById,
  createVariantImage,
  updateVariantImage,
  deleteVariantImage,
  findVariantImageById,
};
