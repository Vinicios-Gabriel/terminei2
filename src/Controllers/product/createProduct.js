const { knex } = require('../../Database/connection');

async function createProduct(req, res) {
  const { titulo, estoque, preco, categoria_id, descricao, url, path } = req.body;
  const userId = req.user.id;
  const items = [titulo, estoque, preco, categoria_id, descricao, url, path];

  for (const item of items) {
    if (!item) {
      return res.status(400).json({ mensagem: 'Todos os campos devem estar preenchidos.' });
    }
  }

  try {
    const product = await knex('produtos')
      .returning('*')
      .insert({
        usuario_id: Number(userId),
        titulo,
        estoque: Number(estoque),
        preco: Number(preco),
        categoria_id: Number(categoria_id),
        descricao,
        url,
        path,
      });

    if (!product.length) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = createProduct;
