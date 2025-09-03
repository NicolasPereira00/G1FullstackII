const service = require('../services/product.service');

async function list(req, res, next) {
  try {
    const produtos = await service.list(req.query);
    return res.json(produtos);
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const produto = await service.getById(id);
    return res.json(produto);
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const novo = await service.create(req.body);
    return res.status(201).json(novo);
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const atualizado = await service.update(id, req.body);
    return res.json(atualizado);
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    await service.remove(id);
    return res.json({ message: 'Produto removido com sucesso.' });
  } catch (err) { next(err); }
}

module.exports = { list, getById, create, update, remove };
