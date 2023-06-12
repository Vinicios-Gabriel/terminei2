const { knex } = require('../Database/connection');
const jwt = require('jsonwebtoken');
const jwtPassword = require('../jwtPassword');

async function verifyLogin(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: 'Não autorizado.' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, jwtPassword);
    let findUser = await knex('usuarios').where('id', id);

    if (!findUser.length) {
      return res.status(403).json({ mensagem: 'Não autorizado.' });
    }

    const { senha: _, ...data } = findUser[0];

    req.user = data;

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
  }
}

module.exports = {
  verifyLogin,
};
