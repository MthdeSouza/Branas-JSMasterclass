// Exercício 4
// Objetivo

// Lance uma exceção caso o comando não exista, interrompendo o fluxo de execução.

// Instruções
// Crie uma função construtora chamada "DatabaseError" que recebe dois parâmetros: "statement" e "message".
// Dentro do método "execute", caso o comando passado por parâmetro não exista, instancie a função construtora "DatabaseError", lançando-a como um erro.
// Envolva a chamada para o objeto "database" em um bloco try/catch imprimindo a propriedade "message" do objeto "DatabaseError".

// Cenário
// database.execute("create table author (id number, name string, age number, city string, state string, country string)");
// database.execute("select id, name from author");

// Resultado
// "Syntax error: 'select id, name from author'"

// Dicas
// Não esqueça de utilizar o operador new para instanciar a função construtora "DatabaseError" e de utilizar Template Literals para montar a mensagem de erro.

// Conteúdo abordado neste exercício
// new
// throw
// try
// catch
// Template Literals
// Constructor Function


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
    } else {
      throw new DatabaseError(statement, `Syntax error: '${statement}'`)
    }
  }
};


try {
  database.execute("create table author (id number, name string, age number, city string, state string, country string)");
  database.execute("select id, name from author");
  console.log(JSON.stringify(database, undefined, "  "));
} catch (e) {
  console.log(e.message)
}


