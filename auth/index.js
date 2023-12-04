const jwt = require('jsonwebtoken');
const config = require('../config')
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: function(req, owner){
    const decode = decodeHeader(req);
    
    if (decode.id !== owner) {
      throw error('No tienes el permiso', 401)
    } 

  },
}

function getToken(auth){
  if (!auth) throw new Error('no se envio el token');
  if (auth.indexOf("Bearer ") === -1) throw new Error("Formato invalido");
  
  let token = auth.substring(7)
  
  return token;
}

function decodeHeader(req){
  const authorization = req.headers.authorization;
  const token = getToken(authorization);
  const decode = verify(token);
  return decode;
}

module.exports = {
  sign,
  check,
};