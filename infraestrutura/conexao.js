const Pool = require("pg").Pool
const conexao = new Pool({
    user: "postgres",
    host: "localhost",
    database: "alura-node-js",
    password: "210599",
    port: 5432,
})

module.exports = conexao