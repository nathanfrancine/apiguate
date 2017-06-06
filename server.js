//Created by: Ing. Nathan Francine Soto
const express = require('express')
var serviceCustomer = require('./services/customer.js');
var app = express()
var router = express.Router()

//services
app.get('/', function (req, res) {
  res.send('api Guatemala')
})

app.get('/hello',serviceCustomer.customer)
app.listen(8080,'0.0.0.0')
