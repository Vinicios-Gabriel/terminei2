const { knex } = require('../../Database/connection');

async function listByUserId(req, res) {
  const userId = req.user.id;

  try {
    const products = await knex('produtos').select('*').where('usuario_id', userId);
    if (!products.length) {
      return res.status(400).json({ mensagem: 'Usuário não possui produtos cadastrados.' });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = listByUserId;
