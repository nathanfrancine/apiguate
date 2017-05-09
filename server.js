//Created by: Ing. Nathan Francine Soto
const express = require('express')
const bodyParser = require('body-parser')
const timeout = require('connect-timeout')
const config = require('config');
var serviceCustomer = require('./services/customer.js');
var utils = require('./utils.js');

const port = process.env.PORT || config.get('localServer.port')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(timeout(config.get('localServer.timeout')))

const router = express.Router()

//services
router.get(config.get('localServer.servicePathCostumer'), serviceCustomer.customer);

app.use('/', router);
app.get('*', utils.error404)
app.use(utils.errorHandler);
app.listen(config.get('localServer.port'), config.get('localServer.host'))
