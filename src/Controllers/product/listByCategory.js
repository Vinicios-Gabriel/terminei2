const { knex } = require('../../Database/connection');

async function listByCategory(req, res) {
  const { category } = req.params;
  const { pd } = req.query;

  try {
    const product = await knex('produtos').select('*').whereNot('id', Number(pd)).andWhere('categoria_id', Number(category)).limit(4);
    if (!product.length) {
      return res.status(400).json({ mensagem: 'Sem produtos cadastrados.' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = listByCategory;
