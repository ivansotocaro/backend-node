const db = {
  'user': [
    {id: 1, name: "Ivan Soto"},
    {id: 2, name: "AndresSoto"},
  ],
}

async function list(table) {
  return await db[table] || [];
}

async function get(table, ID) {
  let col = await list(table);
  return col.find(item => item.id === ID) || null;
}

async function upsert(table, data) {
  if(!db[table]) {
    db[table] = [];
  }
  db[table].push(data);
}

async function remove(table, ID) {E
  return true;
}

async function query(table, query){
  let col = await list(table);
  let keys = Object.keys(query);
  let key = keys[0]
  return col.find((item) => item[key] === query[key]) || null;
}


module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
}