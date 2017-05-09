//Created by: Ing. Nathan Francine Soto
const utils = require('./utils.js');
const config = require('config');
const moment = require('moment-timezone');
const dse = require('dse-driver');
const jwt = require('jwt-simple');

exports.errorHandler = function(err, req, res, next) {
    if (err.status === 503)
        err = utils.error(503);
    if (!err.status)
        err = utils.error(500)
    var status = err.status || 500;
    res.status(status).json({
        error: {
            errorCode: err.errorCode,
            errorType: err.errorType,
            code: err.code,
            description: err.description,
        }
    });
}
exports.error = function(code, description) {
    var err = new Error();
    err.status = code;
    switch (code) {
        case 400:
            err.errorCode = 400;
            err.errorType = 'MSJ';
            err.code = 001;
            err.description = 'Error en mensaje de entrada.';
            break;
        case 401:
            err.errorCode = 401;
            err.errorType = 'MSJ';
            err.code = 001;
            err.description = 'Authentication required.';
            break;
        case 403:
            err.errorCode = 403;
            err.errorType = 'NEG';
            err.code = 003;
            err.description = 'Request cannot be completed.';
            break;
        case 404:
            err.errorCode = 404;
            err.errorType = 'MSJ';
            err.code = 002;
            err.description = 'Trying to access a resource that do not exists.';
            break;
        case 429:
            err.errorCode = 429;
            err.description = 'Limit is exceeded.';
            break;
        case 500:
            err.errorCode = 500;
            err.description = 'Internal server error.';
            break;
        case 503:
            err.errorCode = 503;
            err.errorType = 'COM';
            err.code = 003;
            err.description = 'No hay comunicacion con el servicio.';
            break;
        case 504:
            err.errorCode = 504;
            err.errorType = 'COM';
            err.code = 003;
            err.description = 'No hay comunicacion con el servicio.';
            break;
        default:
            err.description = 'Unknow error.';
    }
    if (!description)
        return err;
    else {
        err.description = description;
        return err;
    }
}
exports.error503 = function(req, res, next) {
    next(utils.error(503));
}
exports.error404 = function(req, res, next) {
    next(utils.error(404));
}
exports.haltOnTimedout = function(req, res, next) {
    if (!req.timedout)
        next();
}
exports.haltOnTimedout = function(req, res, next) {
    if (!req.timedout)
        next();
}
exports.convertTimezone = function(date) {
    var newDate = moment.tz(date, config.get('timezone.default'));
    if (newDate.isValid())
        return newDate.format();
}
exports.getClientDse = function() {
    var clientDse = new dse.Client({
        contactPoints: config.get('cassandra.host')
    });
    return clientDse;
}
