// Exercício 12

// Objetivo

// Utilize async/await para tratar as chamadas para as promises.

// Instruções
// Crie uma função utilizando async.
// Invoque cada uma das funções execute utilizando await incluindo o Promise.all.
// Envolva as chamadas em um bloco try/catch para tratar as exceções.

// Conteúdo abordado neste exercício
// Async/Await
// Promises
// try/catch

import Database from './database.mjs'

try {
  const database = new Database()
  database.execute("create table author (id number, name string, age number, city string, state string, country string)")
    .then(() => {
      return Promise.all([
        database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)"),
        database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)"),
        database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)")
      ]).then(() => {
        return database.execute("select name, age from author").then((result) => {
          console.log(JSON.stringify(result, undefined, "  "));
        })
      })

    })
} catch (e) {
  console.log("error: ", e.message);
}
