const { prisma } = require('../config/prisma');

function safeNum(v) {
  if (v === undefined || v === null || v === '') return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function buildWhere(filters) {
  const where = {};
  if (filters.nome) where.nome = { contains: String(filters.nome), mode: 'insensitive' };

  const v = safeNum(filters.valor);
  const q = safeNum(filters.quantidade);
  if (v !== undefined) where.valor = v;
  if (q !== undefined) where.quantidade = q;

  return where;
}

async function findAll(filters = {}) {
  return prisma.produto.findMany({
    where: buildWhere(filters),
    orderBy: { id: 'asc' },
  });
}

async function findById(id) {
  return prisma.produto.findUnique({ where: { id } });
}

async function create(data) {
  const { nome } = data;
  const valor = safeNum(data.valor);
  const quantidade = safeNum(data.quantidade);
  return prisma.produto.create({
    data: { nome, valor, quantidade },
  });
}

async function update(id, data) {
  const payload = {};
  if (data.nome !== undefined) payload.nome = data.nome;
  const valor = safeNum(data.valor);
  const quantidade = safeNum(data.quantidade);
  if (valor !== undefined) payload.valor = valor;
  if (quantidade !== undefined) payload.quantidade = quantidade;

  return prisma.produto.update({ where: { id }, data: payload });
}

async function remove(id) {
  return prisma.produto.delete({ where: { id } });
}

module.exports = { findAll, findById, create, update, remove };
