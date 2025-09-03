const { z } = require('zod');

const createProductSchema = z.object({
  body: z.object({
    nome: z.string().min(1, 'nome é obrigatório'),
    valor: z.number({ invalid_type_error: 'valor deve ser número' }).or(z.string()).transform(Number),
    quantidade: z.number({ invalid_type_error: 'quantidade deve ser número' }).or(z.string()).transform(Number),
  }),
});

const updateProductSchema = z.object({
  body: z.object({
    nome: z.string().min(1).optional(),
    valor: z.number().or(z.string()).transform((v) => (v === undefined ? v : Number(v))).optional(),
    quantidade: z.number().or(z.string()).transform((v) => (v === undefined ? v : Number(v))).optional(),
  }),
});

const queryProductSchema = z.object({
  query: z.object({
    nome: z.string().optional(),
    valor: z.string().optional(),
    quantidade: z.string().optional(),
  }),
});

const idParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'id deve ser numérico'),
  }),
});

module.exports = { createProductSchema, updateProductSchema, queryProductSchema, idParamSchema };
