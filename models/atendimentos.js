const conexao = require("../infraestrutura/conexao")


class Atendimento{
    adciona(atendimento){
        console.log(typeof(atendimento))
        console.log(atendimento)
        const values = []
        let item
        for(item in atendimento ){
            values.push(atendimento[item])
        }
        console.log(typeof(values))
        console.log(values)
        const sql = "INSERT INTO Atendimentos(cliente, pet, servico, status, observacoes) VALUES($1, $2, $3, $4, $5)"

        conexao.query(sql, values, (erro, resultados) => {
            if(erro){
                console.log(erro)
            } else{
                console.log(resultados)
            }
        })
    }
}

module.exports = new Atendimento