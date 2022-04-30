import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import 'package:async/async.dart';

import 'dart:developer' show log;

var _connMem;

conn() async {
  if (_connMem != null) return _connMem;

  final dbPath = await getDatabasesPath();
  final path = join(dbPath, 'tomodoro.db');

  _connMem = openDatabase(
    path,
    onCreate: (db, version) {
      return db.execute(
          'CREATE TABLE dogs(id INTEGER PRIMARY KEY, name TEXT, age INTEGER)');
    },
    version: 1,
  );
  log('Database is connected from ${path}');
  return _connMem;
}
//
// Future<void> insertDog(Dog dog) async {
//   // Get a reference to the database.
//   final db = await conn();
//
//   // Insert the Dog into the correct table. You might also specify the
//   // `conflictAlgorithm` to use in case the same dog is inserted twice.
//   //
//   // In this case, replace any previous data.
//   await db.insert(
//     'dogs',
//     dog.toMap(),
//     conflictAlgorithm: ConflictAlgorithm.replace,
//   );
// }
