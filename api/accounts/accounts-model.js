const db = require("../../data/db-config.js")

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where('id',id).first()
}

async function create({name, budget}) {
  const [id] = await db('accounts').insert({name, budget})
  return getById(id)
}

async function updateById(id,{name, budget}) {
  await db('accounts').where('id',id).update({name,budget})
  return getById(id)
}

async function deleteById(id) {
  const deletedAccount = await getById(id)
  await db('accounts').where('id',id).delete()
  return deletedAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

// getAll resolves to an array of accounts (or an empty array)
// getById resolves to an account by the given id
// create resolves to the newly created account
// updateById resolves to the updated account
// deleteById resolves to the deleted account