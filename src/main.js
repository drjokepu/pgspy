var q = require('q');
var pgdb = require('./pgdb.js');
var sqlitedb = require('./sqlitedb.js');

function main() {
	pgdb.getLongRunningQueries()
		.then(sqlitedb.logQueries)
		.done();
}

module.exports = main;
