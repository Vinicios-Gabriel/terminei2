const { knex } = require('../../Database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtPassword = require('../../jwtPassword');

async function signUp(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      mensagem: 'Todos os campos devem estar preenchidos.',
    });
  }

  try {
    const findEmail = await knex('usuarios').select('*').where('email', email);
    if (findEmail.length) {
      return res.status(400).json({ mensagem: 'Usuário já cadastrado.' });
    }

    const hash = await bcrypt.hash(senha.toString(), 10);

    const newUser = await knex('usuarios').returning(['id', 'nome_loja']).insert({ nome_loja: nome, email, senha: hash });
    if (!newUser) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }

    return res.status(201).json();
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = signUp;
