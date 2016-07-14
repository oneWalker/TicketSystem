var mongo = require('mongoskin');
var serverOptions = {
    'auto_reconnect' : true,
    'poolSize' : 1
};

var db = mongo.db('mongodb://localhost/dfc', serverOptions);

var dbClient = module.exports;

dbClient.getdbClient = function () {
    return db;
};