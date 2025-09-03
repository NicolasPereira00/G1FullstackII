const { Router } = require('express');
const controller = require('../controllers/product.controller');
const { validate } = require('../middlewares/validate.middleware');
const {
  createProductSchema,
  updateProductSchema,
  queryProductSchema,
  idParamSchema
} = require('../validators/product.validators');

const router = Router();

router.get('/', validate(queryProductSchema, 'query'), controller.list);

router.get('/:id', validate(idParamSchema, 'params'), controller.getById);

router.post('/', validate(createProductSchema), controller.create);

router.put('/:id', validate(idParamSchema, 'params'), validate(updateProductSchema), controller.update);

router.delete('/:id', validate(idParamSchema, 'params'), controller.remove);

module.exports = router;
