const bcrypt = require('bcrypt')
const auth = require('../../../auth')

const TABLE = "auth";

module.exports = (injectedStore = require("../../../store/dummy")) => {
  function list() {
    return injectedStore.list(TABLE);
  }

  async function login({ username, password }) {
    const data = await injectedStore.query(TABLE, { username });
    const passwordIsValid = await bcrypt.compare(password, data.password);
    if(!passwordIsValid) {
      throw new Error('Correo o contraseña invalida');
    }
    
    return auth.sign(data);
  }

  async function upsert({id, username, password}) {
    const authData = {
      id,
    };

    if (username) {
      authData.username = username;
    }

    if (password) {
      authData.password = await bcrypt.hash(password, 5);
    }

    return injectedStore.upsert(TABLE, authData);
  }

  return {
    upsert,
    login,
  };
};
