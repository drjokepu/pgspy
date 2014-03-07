// var sqlite3 = require('sqlite3');
// var Q = require('q');
// 
// function withSqlite(fn) {
// 	var deferred = Q.defer();
// 	var db = new sqlite3.Database("db.sqlite");
// 	Q
// 		.fcall(function() {
// 			return fn(db);
// 		})
// 		.then(function(res) {
// 			deferred.resolve(res);
// 		}, function(err) {
// 			deferred.reject(err);
// 		})
// 		.fin(function() {
// 			db.close();
// 		});
// 
// 	return deferred.promise;
// }
// 
// function begin(db) {
// 	console.log('begin');
// 	db.run('begin transaction');
// }
// 
// function commit(db) {
// 	console.log('commit');
// 	db.run('commit transaction');
// }
// 
// function createQueriesTable(db) {
// 	db.run(
// 		'create table if not exists query(' +
// 		'id integer not null primary key autoincrement, ' +
// 		'query text not null unique, ' +
// 		'count integer not null default 0, ' +
// 		'date_added datetime not null default current_timestamp)');
// }

function logQueries(queries) {
	// return withSqlite(function(db) {
	// 	db.serialize(function() {
	// 		begin(db);
	// 		createQueriesTable(db);
	// 		logQueriesInDb(queries, db);
	// 		commit(db);
	// 	});
	// });
}

// function logQueriesInDb(queries, db) {
// 	queries.forEach(function(query) {
// 		logQuery(query, db);
// 	});
// }
// 
// function logQuery(query, db) {
// 	db.all('select 1 from query where query = ?', query.query, function(err, rows) {
// 		if (err !== null) throw err;
// 		if (rows.length === 1) {
// 			db.run('update query set count = count + 1 where query = ?', query.query);
// 		} else {
// 			db.run('insert into query (query) values (?)', query.query);
// 		}
// 	});
// }

module.exports = {
	logQueries: logQueries
};
