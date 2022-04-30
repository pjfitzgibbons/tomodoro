
import 'dart:developer';

import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import 'package:async/async.dart';
import 'dart:io';

import '../datamodel/dog.dart';
import 'database.dart' show conn;

insertDog(Dog dog) async {
  final _conn = await conn();
  _conn.insert(
    'dogs',
    dog.toMap(),
    conflictAlgorithm: ConflictAlgorithm.replace,
  );
}


allDogs() async {
  final _conn = await conn();
  return _conn.query('dogs');
}