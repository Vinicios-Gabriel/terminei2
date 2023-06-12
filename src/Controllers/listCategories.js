const { knex } = require('../Database/connection');

async function listCategories(req, res) {
  try {
    const categories = await knex('categorias').select('*');

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = listCategories;
