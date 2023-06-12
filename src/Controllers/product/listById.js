const { knex } = require('../../Database/connection');

async function listById(req, res) {
  const { id } = req.params;

  try {
    const product = await knex('produtos').select('*').where('id', Number(id));

    if (!product.length) {
      return res.status(400).json({ mensagem: 'Produto não encontrado.' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = listById;
