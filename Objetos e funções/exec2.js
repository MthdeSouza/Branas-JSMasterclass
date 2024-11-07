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

const query = "create table author (id number, name string, age number, city string, state string, country string)";


let regExp = /^create table ([a-z]+) \((.+)\)$/;
let result = regExp.exec(query);
let tableName = result[1];
let columns = result[2].split(",");

const columnObject = {};

for (let key in columns) {
  let keyandvalue = columns[key].trim().split(" ");
  columnObject[keyandvalue[0]] = keyandvalue[1]
}

const database = {
  tables: {
    [tableName]: {
      columns: columnObject,
      data: []
    }
  }
}

console.log(JSON.stringify(database, undefined, " "))