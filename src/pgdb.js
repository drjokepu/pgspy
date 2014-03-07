var pg = require('pg').native;
var Q = require('q');

function withPg(fn) {
	var deferred = Q.defer();
	pg.connect(global.config.pgConnrectionString, function(err, client, done) {
		Q
			.fcall(function() {
				return fn(client);
			})
			.then(function(res) {
				deferred.resolve(res);
			}, function(err) {
				deferred.reject(err);
			})
			.fin(function() {
				done(true);
			});
	});
	return deferred.promise;
}

function getLongRunningQueries() {
	var commandText =
		"select query_start, query " +
		"from pg_catalog.pg_stat_activity " +
		"where state <> 'idle' and query_start <= now()";

	return withPg(function(client) {
		return Q.ninvoke(client, "query", commandText)
			.then(function(res) {
				return res.rows;
			});
	});
}

module.exports = {
	getLongRunningQueries: getLongRunningQueries
};
