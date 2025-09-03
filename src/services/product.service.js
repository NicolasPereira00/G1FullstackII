const repo = require('../repositories/product.repository');
const { NotFoundError } = require('../utils/httpErrors');

async function list(query) {
  const { nome, valor, quantidade } = query || {};
  const filters = {
    ...(nome ? { nome } : {}),
    ...(valor !== undefined ? { valor } : {}),
    ...(quantidade !== undefined ? { quantidade } : {}),
  };
  return repo.findAll(filters);
}

async function getById(id) {
  const item = await repo.findById(id);
  if (!item) throw new NotFoundError('Produto não encontrado.');
  return item;
}

async function create(data) {
  return repo.create(data);
}

async function update(id, data) {
  await getById(id);
  return repo.update(id, data);
}

async function remove(id) {
  await getById(id);
  return repo.remove(id);
}

module.exports = { list, getById, create, update, remove };
