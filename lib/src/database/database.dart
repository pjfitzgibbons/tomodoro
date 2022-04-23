
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import 'package:async/async.dart';
import 'dart:io';

import '../datamodel/dog.dart';


final _contentsMemo = new AsyncMemoizer<String>();

Future<String> contents() => _contentsMemo.runOnce(() {
  return new File('somepath').readAsString() ;
});

final _conn = new AsyncMemoizer<Database>();

Future<Database> conn() => _conn.runOnce(() {
  var _db = openDatabase('doggie.db',
    onCreate: (db, version) {
      return db.execute(
        'CREATE TABLE dogs(id INTEGER PRIMARY KEY, name TEXT, age INTEGER)'
      );
    },

    version: 1,
  );
});

Future<void> insertDog(Dog dog) async {
  // Get a reference to the database.
  final db = await conn();

  // Insert the Dog into the correct table. You might also specify the
  // `conflictAlgorithm` to use in case the same dog is inserted twice.
  //
  // In this case, replace any previous data.
  await db.insert(
    'dogs',
    dog.toMap(),
    conflictAlgorithm: ConflictAlgorithm.replace,
  );
}