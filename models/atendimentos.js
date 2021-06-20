const moment = require("moment")
const conexao = require("../infraestrutura/conexao")


class Atendimento{
    adciona(atendimento){
        const dataCriacao = moment().format("YYYY-MM-DD hh:mm:ss")
        const data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD hh:mm:ss")
        const atendimentoDatado = {...atendimento, dataCriacao, data}
        console.log(typeof(atendimentoDatado))
        console.log(atendimentoDatado)
        const values = []
        values.push(atendimentoDatado["cliente"])
        values.push(atendimentoDatado["pet"])
        values.push(atendimentoDatado["servico"])
        values.push(atendimentoDatado["data"])
        values.push(atendimentoDatado["dataCriacao"])
        values.push(atendimentoDatado["status"])
        values.push(atendimentoDatado["observacoes"])
        console.log(typeof(values))
        console.log(values)
        const sql = "INSERT INTO Atendimentos(cliente, pet, servico, data, dataCriacao, status, observacoes) VALUES($1, $2, $3, $4, $5, $6, $7)"

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