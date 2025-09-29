const repo = require('../repositories/product.repository.v2');
const { prisma } = require('../config/prisma');
const { NotFoundError, AppError } = require('../utils/httpErrors');

async function list(paging, qs) { return repo.findAll({ ...paging, qs }); }

async function getById(id) {
  const x = await repo.findById(id);
  if (!x) throw new NotFoundError('Produto não encontrado.');
  return x;
}

async function create(data) {
  const [brand, category] = await Promise.all([
    prisma.brand.findUnique({ where: { id: Number(data.brandId) } }),
    prisma.category.findUnique({ where: { id: Number(data.categoryId) } }),
  ]);
  if (!brand) throw new AppError('brandId inválido: marca não encontrada.', 400);
  if (!category) throw new AppError('categoryId inválido: categoria não encontrada.', 400);

  return repo.create(data);
}

async function update(id, data) {
  await getById(id);
  if (data.brandId !== undefined) {
    const brand = await prisma.brand.findUnique({ where: { id: Number(data.brandId) } });
    if (!brand) throw new AppError('brandId inválido: marca não encontrada.', 400);
  }
  if (data.categoryId !== undefined) {
    const category = await prisma.category.findUnique({ where: { id: Number(data.categoryId) } });
    if (!category) throw new AppError('categoryId inválido: categoria não encontrada.', 400);
  }
  return repo.update(id, data);
}

async function remove(id) { await getById(id); return repo.remove(id); }

module.exports = { list, getById, create, update, remove };
