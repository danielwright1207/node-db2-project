const db = require('../../data/db-config')
// const express = require('express')
// const knex =require('knex')
// const db = knex({
//   client: 'sqlite3',
//   connection: {
//     filename: '../data/migration/dealer.db3'
//   },
//   useNullAsDefault: true
// })
const getAll = () => {
 return db('cars');
}

const getById = (id) => {
  return db('cars').where('id', id).first();
}

const create = async (cars) => {
  const [id] = await db('cars').insert(cars, ['id', 'vin', 'make', 'model', 'mileage', 'title', 'transmission' ])
  return getById(id)
}
module.exports = {
  getAll, getById, create,
}