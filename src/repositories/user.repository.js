const { prisma } = require('../config/prisma');

async function findAll() {
  return prisma.usuario.findMany({ orderBy: { id: 'asc' } });
}

async function findById(id) {
  return prisma.usuario.findUnique({ where: { id } });
}

async function create(data) {
  const { nome, senha, tipo } = data;
  return prisma.usuario.create({ data: { nome, senha, tipo } });
}

async function update(id, data) {
  const payload = {};
  if (data.nome !== undefined) payload.nome = data.nome;
  if (data.senha !== undefined) payload.senha = data.senha;
  if (data.tipo !== undefined) payload.tipo = data.tipo;

  return prisma.usuario.update({ where: { id }, data: payload });
}

async function remove(id) {
  return prisma.usuario.delete({ where: { id } });
}

module.exports = { findAll, findById, create, update, remove };
