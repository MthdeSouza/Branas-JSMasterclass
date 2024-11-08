// Exercício 3


// Objetivo


// Crie dois métodos no objeto "database" chamados de "createTable" e "execute". O comando "createTable" já foi implementado no exercício anterior, mova o código e utilize o método "execute" para invocar dinamicamente o método "createTable".



// Instruções


// No objeto "database", crie uma função chamada "createTable", que recebe o comando por parâmetro.
// Mova o código responsável por criar a tabela para dentro do método "createTable".
// Crie uma função chamada "execute", invocando dinamicamente a função "createTable".


// Cenário


// database.execute("create table author (id number, name string, age number, city string, state string, country string)");


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
//       "data": []
//     }
//   }
// }


// Dicas


// Não se esqueça de utilizar o "this" para referenciar a propriedade "tables" do objeto "database". Você pode utilizar a operação String.prototype.startsWith para verificar se o comando começa com "create table" e realizar a chamada para o método "createTable".



// Conteúdo abordado neste exercício


// Function
// if
// String.prototype.startsWith
// this
// Method Notation


// Exercício 2

// Objetivo
// Com base no nome da tabela e nas colunas, monte uma estrutura de objetos para armazenar tanto a definição da tabela quanto os dados.

// Instruções
// Dado o comando:

// create table author (id number, name string, age number, city string, state string, country string)

// Crie um objeto chamado "database".
// Dentro do objeto "database", crie um objeto chamado "tables".
// Dentro do objeto "tables", crie um objeto com o nome da tabela.
// Dentro do objeto criado com o nome da tabela, crie um objeto chamado "columns", onde as chaves são representadas pelo nome da coluna e o valor pelo tipo.
// Dentro do objeto criado com nome da tabela, crie um array chamado "data".
// Exiba o conteúdo do objeto "database" utilizando JSON.stringify

// Resultado
// {
//     "tables": {
//         "author": {
//             "columns": {
//                 "id": "number",
//                 "name": "string",
//                 "age": "number",
//                 "city": "string",
//                 "state": "string",
//                 "country": "string"
//             },
//             "data": []
//         }
//     }
// }


// Dicas
// Percorra as colunas com for/of e utilize a notação de [] tanto para criar e acessar as propriedades nos objetos. É possível utilizar um parâmetro na operação JSON.stringify para formatar o objeto. Para isso, passe como terceiro parâmetro alguns espaços em branco ou o caracter tab.

// Conteúdo abordado neste exercício

// Object
// for/of
// String.prototype.trim()
// JSON.stringify


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
    }
  }
};

database.execute("create table author (id number, name string, age number, city string, state string, country string)");

console.log(JSON.stringify(database, undefined, "  "));
