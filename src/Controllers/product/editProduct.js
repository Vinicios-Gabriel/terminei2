const { knex } = require('../../Database/connection');

async function editProduct(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  const { titulo, estoque, preco, categoria_id, descricao, url, path } = req.body;

  const items = [titulo, estoque, preco, categoria_id, descricao];

  for (const item of items) {
    if (!item) {
      return res.status(400).json({ mensagem: 'Todos os campos devem estar preenchidos.' });
    }
  }

  try {
    const product = await knex('produtos').select('*').where({ usuario_id: userId, id: id });
    if (!product.length) {
      return res.status(400).json({ mensagem: 'Produto não encontrado.' });
    }

    if (!url) {
      const url = product.url;
      const path = product.path;
    }

    const newProduct = await knex('produtos')
      .returning('*')
      .where({ usuario_id: userId, id: id })
      .update({
        titulo,
        estoque: Number(estoque),
        preco: Number(preco),
        categoria_id: Number(categoria_id),
        descricao,
        url,
        path,
      });

    return res.status(200).json(newProduct);
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = editProduct;
