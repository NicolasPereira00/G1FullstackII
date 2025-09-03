const { z } = require('zod');

const createUserSchema = z.object({
  body: z.object({
    nome: z.string().min(1, 'nome é obrigatório'),
    senha: z.string().min(1, 'senha é obrigatória'),
    tipo: z.string().min(1, 'tipo é obrigatório'),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    nome: z.string().min(1).optional(),
    senha: z.string().min(1).optional(),
    tipo: z.string().min(1).optional(),
  }),
});

const idParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'id deve ser numérico'),
  }),
});

module.exports = { createUserSchema, updateUserSchema, idParamSchema };
