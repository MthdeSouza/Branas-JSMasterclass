// Exercício 6
// Objetivo
// Implemente o método "select". Para isso, é necessário extrair as informações a partir do comando, filtrando os dados pela cláusula "where" e montando os objetos de acordo com as colunas selecionadas.

// Instruções
// Dada o comando:
// select name, age from author where id = 1
// Crie um método chamado "select".
// Na função "execute", invoque o método "select".
// No método "select", retorne todos os registros considerando apenas as colunas selecionadas.
// Extraia a cláusula where do comando.
// Crie as variáveis columnWhere e valueWhere.
// Filtre os registros conforme a cláusula where.

// Cenário
// database.execute("create table author (id number, name string, age number, city string, state string, country string)");
// database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
// database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
// database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
// database.execute("select name, age from author");
// database.execute("select name, age from author where id = 1");


// Resultado
// [{
//     "name": "Douglas Crockford",
//     "age": "62"
// }, {
//     "name": "Linus Torvalds",
//     "age": "47"
// }, {
//     "name": "Martin Fowler",
//     "age": "54"
// }]
// [{
//     "name": "Douglas Crockford",
//     "age": "62"
// }, ]

// Dicas
// Você pode utilizar a operação Array.prototype.map para converter um array em outro e ainda a operação Array.prototype.filter para filtrar os dados. Você pode querer ignorar um grupo de captura, para isso utiliza a notação ?: dentro do grupo, por exemplo (?: where (.+))?
// Conteúdo abordado neste exercício

// in
// for/of
// Object
// Array
// Array.prototype.push
// Array.prototype.filter
// Array.prototype.map
// Array.prototype.forEach

const DatabaseError = function (statement, message) {
  this.statement = statement;
  this.message = message;
};
const database = {
  tables: {},
  createTable(statement) {
    const regexp = /create table ([a-z]+) \((.+)\)/;
    const parsedStatement = statement.match(regexp);
    let [, tableName, columns] = parsedStatement;
    this.tables[tableName] = {
      columns: {},
      data: []
    };
    columns = columns.split(",");
    for (let column of columns) {
      column = column.trim().split(" ");
      const [name, type] = column;
      this.tables[tableName].columns[name] = type;
    }
  },
  insert(statement) {
    const regexp = /insert into ([a-z]+) \((.+)\) values \((.+)\)/;
    const parsedStatement = statement.match(regexp);
    let [, tableName, columns, values] = parsedStatement;
    columns = columns.split(", ");
    values = values.split(", ");
    let row = {};
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const value = values[i];
      row[column] = value;
    }
    this.tables[tableName].data.push(row);
  },
  select(statement) {
    const regexp = /select (.+) from (\w+)(?: where (.+))?/;
    const parsedStatement = statement.match(regexp);
    let [, columns, tableName, where] = parsedStatement;
    columns = columns.split(", ");
    let result = [];

    if (where) {
      const [columnWhere, valueWhere] = where.split(" = ");
      where = { [columnWhere]: valueWhere };
      result = this.tables[tableName].data.filter(row => {
        return row[columnWhere] === valueWhere;
      })
    } else {
      result = this.tables[tableName].data;
    }

    result = result.map(obj =>
      columns.reduce((acc, column) => {
        if (column in obj) {
          acc[column] = obj[column];
        }
        return acc;
      }, {})

    )
    console.log(result)
    return result
  },
  execute(statement) {
    if (statement.startsWith("create table")) {
      return this.createTable(statement);
    }
    if (statement.startsWith("insert")) {
      return this.insert(statement);
    }
    if (statement.startsWith("select")) {
      return this.select(statement);
    }
    const message = `Syntax error: "${statement}"`;
    throw new DatabaseError(statement, message);
  }
};
try {
  database.execute("create table author (id number, name string, age number, city string, state string, country string)");
  database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
  database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
  database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
  database.execute("select name, age from author");
  database.execute("select name, age from author where id = 1");
  console.log(JSON.stringify(database, undefined, "  "));
} catch (e) {
  console.log(e.message);
}
