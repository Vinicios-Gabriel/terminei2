const { deleteFile } = require('../../Uploads/storage');
const { knex } = require('../../Database/connection');

async function deleteImg(req, res) {
  const { id } = req.params;

  try {
    const file = await knex('produtos').select('*').where('id', id);
    if (!file.length) {
      return res.status(400).json({ mensagem: 'Arquivo não encontrado.' });
    }

    await deleteFile(file[0].path);

    return res.status(200).json();
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = deleteImg;
