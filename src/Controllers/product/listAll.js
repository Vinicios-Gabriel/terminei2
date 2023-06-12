const { knex } = require('../../Database/connection');

async function listAll(req, res) {
  try {
    const product = await knex('produtos').select('*');
    if (!product.length) {
      return res.status(400).json({ mensagem: 'Sem produtos cadastrados.' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = listAll;
