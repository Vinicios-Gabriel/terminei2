const { knex } = require('../../Database/connection');

async function deleteProduct(req, res) {
  const { id } = req.params;

  const userId = req.user.id;

  try {
    const product = await knex('produtos').select('*').where({ usuario_id: userId, id: id });
    if (!product.length) {
      return res.status(400).json({ mensagem: 'Produto não encontrado.' });
    }

    await knex('produtos').where({ usuario_id: userId, id: id }).del();

    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = deleteProduct;
