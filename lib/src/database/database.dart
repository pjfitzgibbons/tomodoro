import 'package:drift/native.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';

import 'package:drift/drift.dart';
import 'package:path/path.dart' as p;

part 'database.g.dart';

@DriftDatabase(
  include: {'tables.drift'},
)

class AppDb extends _$AppDb {
  AppDb() : super(_openConnection());

  @override
  int get schemaVersion => 1;

  Future<int> insertNewDog(DogsCompanion dog) => into(dogs).insert(dog);
}

LazyDatabase _openConnection() {
  return LazyDatabase(() async {
    final dbFolder = await getApplicationDocumentsDirectory();
    final file = File(p.join(dbFolder.path, 'db.sqlite'));
    return NativeDatabase(file);
  });
}

// final _contentsMemo = new AsyncMemoizer<String>();
//
// Future<String> contents() => _contentsMemo.runOnce(() {
//   return new File('somepath').readAsString() ;
// });
//
// final _conn = new AsyncMemoizer<Database>();
//
// Future<Database> conn() => _conn.runOnce(() {
//   var _db = openDatabase('doggie.db',
//     onCreate: (db, version) {
//       return db.execute(
//         'CREATE TABLE dogs(id INTEGER PRIMARY KEY, name TEXT, age INTEGER)'
//       );
//     },
//
//     version: 1,
//   );
// });
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