const express = require("express")
const CarRouter = require('./cars/cars-router')
const server = express()
server.use(express.json())
server.use('/api/cars', CarRouter)
// DO YOUR MAGIC

module.exports = server
