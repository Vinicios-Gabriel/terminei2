const { knex } = require('../../Database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtPassword = require('../../jwtPassword');

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos devem estar preenchidos.' });
  }

  try {
    const findUser = await knex('usuarios').select('*').where('email', email);
    if (!findUser.length) {
      return res.status(400).json({ mensagem: 'Email ou senha incorretos.' });
    }

    const verifyPassword = await bcrypt.compare(senha.toString(), findUser[0].senha);

    if (!verifyPassword) {
      return res.status(400).json({ mensagem: 'Email ou senha incorretos.' });
    }

    const token = jwt.sign({ id: findUser[0].id }, jwtPassword, { expiresIn: '12h' });

    return res.status(200).json({ id: findUser[0].id, name: findUser[0].nome_loja, token });
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = login;
