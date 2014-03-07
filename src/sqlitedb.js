var sqlite = require('sqlite-fts');
var Q = require('q');

function withSqlite(fn) {
	var deferred = Q.defer();
	var db = new sqlite.Database("db.sqlite");
	Q
		.ninvoke(db, 'open')
		.then(function() {
			return fn(db);
		})
		.then(function(res) {
			deferred.resolve(res);
		}, function(err) {
			deferred.reject(err);
		})
		.fin(function() {
			db.close();
		});

	return deferred.promise;
}

function begin(db) {
	return Q.ninvoke(db, 'execute', 'begin transaction');
}

function commit(db) {
	return Q.ninvoke(db, 'execute', 'commit transaction');
}


function createQueriesTable(db) {
	return Q.ninvoke(
		db,
		'execute',
		'create table if not exists query(' +
		'id integer not null primary key autoincrement, ' +
		'query text not null unique, ' +
		'count integer not null default 0, ' +
		'date_added datetime not null default current_timestamp)');
}

function logQueries(queries) {
	return withSqlite(function(db) {
		return Q
			.fcall(function() {
				return begin(db);
			})
			.then(function() {
				return createQueriesTable(db);
			})
			.then(function() {
				return logQueriesInDb(queries, db);
			})
			.then(function() {
				return commit(db);
			});
	});
}

function logQueriesInDb(queries, db) {
	queries.forEach(function(query) {
		logQuery(query, db);
	});
}

function logQuery(query, db) {
	return Q
		.ninvoke(db, 'execute', 'select 1 from query where query = ?', [query.query])
		.then(function(rows) {
			if (rows.length === 1) {
				return Q.ninvoke(db, 'execute', 'update query set count = count + 1 where query = ?', [query.query]);
			} else {
				return Q.ninvoke(db, 'execute', 'insert into query (query) values (?)', [query.query]);
			}
		});
}

module.exports = {
	logQueries: logQueries
};
