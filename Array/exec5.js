// Exercício 5


// Objetivo


// Implemente o método "insert". Para isso, é necessário, como sempre, extrair as informações a partir do comando, converter as informações em um objeto e inserir no array "data" da tabela correspondente.



// Instruções


// Dados os comandos:



// insert into author (id, name, age) values (1, Douglas Crockford, 62)
// insert into author (id, name, age) values (2, Linus Torvalds, 47)
// insert into author (id, name, age) values (3, Martin Fowler, 54)


// No objeto "database", crie um método chamado "insert", que recebe o comando por parâmetro.
// Na função "execute", invoque o método "insert".
// Extraia o nome da tabela para a variável "tableName", as colunas para a variável "columns" e os valores para a variável "values".
// Manipule os valores dentro "columns" e "values", separando-os um a um.
// Crie um objeto chamado "row" com base nas colunas e valores.
// Insira o objeto em "data".


// Cenário


// database.execute("create table author (id number, name string, age number, city string, state string, country string)");
// database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
// database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
// database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");


// Resultado


// {
//   "tables": {
//     "author": {
//       "columns": {
//         "id": "number",
//         "name": "string",
//         "age": "number",
//         "city": "string",
//         "state": "string",
//         "country": "string"
//       },
//       "data": [{
//         "id": "1",
//         "name": "Douglas Crockford",
//         "age": "62"
//       }, {
//         "id": "2",
//         "name": "Linus Torvalds",
//         "age": "47"
//       }, {
//         "id": "3",
//         "name": "Martin Fowler",
//         "age": "54"
//       }]
//     }
//   }
// }


// Dicas


// Utilize um for, com índice, para percorrer ao mesmo tempo o array de colunas e de valores. Utilize a operação push para incluir no array "data". Não se esqueça de utilizar destructuring para extrair os dados de dentro do array.



// Conteúdo abordado neste exercício


// Function
// for
// if
// Array.prototype.push
// String.prototype.startsWith
// this
// Method Notation
// Destructuring
// String.prototype.match
// String.prototype.split
// String.prototype.trim
// RegExp
// RegExp - Groups
// RegExp - Capture Groups
// RegExp - Quantifiers
// RegExp - Metacharacters
// RegExp - Escape


const DatabaseError = function (statement, message) {
  this.statement = statement;
  this.message = message;
}

const database = {
  tables: {},
  createTable(statement) {

    const regexp = /create table ([a-z]+) \((.+)\)/;
    const parsedStatement = statement.match(regexp);
    const tableName = parsedStatement[1];
    this.tables[tableName] = {
      columns: {},
      data: []
    }
    let columns = parsedStatement[2];
    columns = columns.split(",");

    for (let column of columns) {
      column = column.trim().split(" ");
      const name = column[0];
      const type = column[1];
      this.tables[tableName].columns[name] = type;
    }
  },
  execute(statement) {
    if (statement.startsWith("create table")) {
      return this.createTable(statement)
    } else if (statement.startsWith("insert into")) {
      return this.insert(statement)
    }
    throw new DatabaseError(statement, `Syntax error: '${statement}'`)

  },
  insert(statement) {
    const regexp = /insert into ([a-z]+) \((.+)\) values \((.+)\)/;
    const parsedStatement = statement.match(regexp);
    let [, tableName, columns, values] = parsedStatement;

    columns = columns.split(", ")
    values = values.split(", ")

    let row = {}

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i]
      const value = values[i]

      row[column] = value
    }

    this.tables[tableName].data.push(row)

  }
};


try {
  database.execute("create table author (id number, name string, age number, city string, state string, country string)");
  database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
  database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
  database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
  console.log(JSON.stringify(database, undefined, "  "));
} catch (e) {
  console.log(e.message)
}


