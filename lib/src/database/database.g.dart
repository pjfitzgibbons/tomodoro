// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'database.dart';

// **************************************************************************
// MoorGenerator
// **************************************************************************

// ignore_for_file: unnecessary_brace_in_string_interps, unnecessary_this
class Dog extends DataClass implements Insertable<Dog> {
  final int id;
  final String? name;
  final int? age;
  Dog({required this.id, this.name, this.age});
  factory Dog.fromData(Map<String, dynamic> data, {String? prefix}) {
    final effectivePrefix = prefix ?? '';
    return Dog(
      id: const IntType()
          .mapFromDatabaseResponse(data['${effectivePrefix}id'])!,
      name: const StringType()
          .mapFromDatabaseResponse(data['${effectivePrefix}name']),
      age: const IntType()
          .mapFromDatabaseResponse(data['${effectivePrefix}age']),
    );
  }
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    if (!nullToAbsent || name != null) {
      map['name'] = Variable<String?>(name);
    }
    if (!nullToAbsent || age != null) {
      map['age'] = Variable<int?>(age);
    }
    return map;
  }

  DogsCompanion toCompanion(bool nullToAbsent) {
    return DogsCompanion(
      id: Value(id),
      name: name == null && nullToAbsent ? const Value.absent() : Value(name),
      age: age == null && nullToAbsent ? const Value.absent() : Value(age),
    );
  }

  factory Dog.fromJson(Map<String, dynamic> json,
      {ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return Dog(
      id: serializer.fromJson<int>(json['id']),
      name: serializer.fromJson<String?>(json['name']),
      age: serializer.fromJson<int?>(json['age']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'name': serializer.toJson<String?>(name),
      'age': serializer.toJson<int?>(age),
    };
  }

  Dog copyWith({int? id, String? name, int? age}) => Dog(
        id: id ?? this.id,
        name: name ?? this.name,
        age: age ?? this.age,
      );
  @override
  String toString() {
    return (StringBuffer('Dog(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('age: $age')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(id, name, age);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is Dog &&
          other.id == this.id &&
          other.name == this.name &&
          other.age == this.age);
}

class DogsCompanion extends UpdateCompanion<Dog> {
  final Value<int> id;
  final Value<String?> name;
  final Value<int?> age;
  const DogsCompanion({
    this.id = const Value.absent(),
    this.name = const Value.absent(),
    this.age = const Value.absent(),
  });
  DogsCompanion.insert({
    this.id = const Value.absent(),
    this.name = const Value.absent(),
    this.age = const Value.absent(),
  });
  static Insertable<Dog> custom({
    Expression<int>? id,
    Expression<String?>? name,
    Expression<int?>? age,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (name != null) 'name': name,
      if (age != null) 'age': age,
    });
  }

  DogsCompanion copyWith(
      {Value<int>? id, Value<String?>? name, Value<int?>? age}) {
    return DogsCompanion(
      id: id ?? this.id,
      name: name ?? this.name,
      age: age ?? this.age,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (name.present) {
      map['name'] = Variable<String?>(name.value);
    }
    if (age.present) {
      map['age'] = Variable<int?>(age.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('DogsCompanion(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('age: $age')
          ..write(')'))
        .toString();
  }
}

class Dogs extends Table with TableInfo<Dogs, Dog> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  Dogs(this.attachedDatabase, [this._alias]);
  final VerificationMeta _idMeta = const VerificationMeta('id');
  late final GeneratedColumn<int?> id = GeneratedColumn<int?>(
      'id', aliasedName, false,
      type: const IntType(),
      requiredDuringInsert: false,
      $customConstraints: 'NOT NULL PRIMARY KEY AUTOINCREMENT');
  final VerificationMeta _nameMeta = const VerificationMeta('name');
  late final GeneratedColumn<String?> name = GeneratedColumn<String?>(
      'name', aliasedName, true,
      type: const StringType(),
      requiredDuringInsert: false,
      $customConstraints: '');
  final VerificationMeta _ageMeta = const VerificationMeta('age');
  late final GeneratedColumn<int?> age = GeneratedColumn<int?>(
      'age', aliasedName, true,
      type: const IntType(),
      requiredDuringInsert: false,
      $customConstraints: '');
  @override
  List<GeneratedColumn> get $columns => [id, name, age];
  @override
  String get aliasedName => _alias ?? 'dogs';
  @override
  String get actualTableName => 'dogs';
  @override
  VerificationContext validateIntegrity(Insertable<Dog> instance,
      {bool isInserting = false}) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('name')) {
      context.handle(
          _nameMeta, name.isAcceptableOrUnknown(data['name']!, _nameMeta));
    }
    if (data.containsKey('age')) {
      context.handle(
          _ageMeta, age.isAcceptableOrUnknown(data['age']!, _ageMeta));
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  Dog map(Map<String, dynamic> data, {String? tablePrefix}) {
    return Dog.fromData(data,
        prefix: tablePrefix != null ? '$tablePrefix.' : null);
  }

  @override
  Dogs createAlias(String alias) {
    return Dogs(attachedDatabase, alias);
  }

  @override
  bool get dontWriteConstraints => true;
}

abstract class _$AppDb extends GeneratedDatabase {
  _$AppDb(QueryExecutor e) : super(SqlTypeSystem.defaultInstance, e);
  late final Dogs dogs = Dogs(this);
  @override
  Iterable<TableInfo> get allTables => allSchemaEntities.whereType<TableInfo>();
  @override
  List<DatabaseSchemaEntity> get allSchemaEntities => [dogs];
}
