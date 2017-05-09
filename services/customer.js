//Created by: Ing. Nathan Francine Soto
const dse = require('dse-driver');
const Log = require('log');
const fs = require('fs');
const config = require('config');
const moment = require('moment');

var log = new Log('info', fs.createWriteStream(config.get('logs.log')));
var SubscriberInfo = require('../models/SubscriberInfo');
var utils = require('../utils.js');


exports.customer = function(req, res, next) {
    res.status(200).json('hello tigo');
}
