const {nanoid} = require('nanoid');
const store = require("../../../store/dummy");
const auth = require("../auth");

const TABLE = "user";

module.exports = (injectedStore = store) => {
  function list() {

    return injectedStore.list(TABLE);
    
  }

  function get(ID) {
    ID = parseInt(ID);
    if (isNaN(ID)) {
      throw new Error("El valor no es un numero");
    }

    return injectedStore.get(TABLE, ID);

  }

  async function upsert(body) {
    const user = {
      id: body.id || nanoid(),
      name: body.name,
      username: body.username,
    };

    if (body.password || body.usernme) {
      await auth.upsert({
        id: user.id,
        username: body.username,
        password: body.password,
      })
    }

    return injectedStore.upsert(TABLE, user);

  }

  return {
    list,
    get,
    upsert,
  };
};
