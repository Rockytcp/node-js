const moment = require("moment")
const conexao = require("../infraestrutura/conexao")


class Atendimento{
    adciona(atendimento, res){
        const dataCriacao = moment().format("YYYY-MM-DD hh:mm:ss")
        const data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD hh:mm:ss")
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5
        const validacoes = [
            {
                nome: "data",
                valido: dataEhValida,
                mensagem: "Data deve ser maior ou igual a data atual"
            },
            {
                nome: "cliente",
                valido: clienteEhValido,
                mensagem: "Cliente deve ter pelo menos cinco caracteres"
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErrors = erros.length
        
        if(existemErrors){
            res.status(400).json(erros)
        } else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const values = []
            values.push(atendimentoDatado["cliente"])
            values.push(atendimentoDatado["pet"])
            values.push(atendimentoDatado["servico"])
            values.push(atendimentoDatado["data"])
            values.push(atendimentoDatado["dataCriacao"])
            values.push(atendimentoDatado["status"])
            values.push(atendimentoDatado["observacoes"])
            const sql = "INSERT INTO Atendimentos(cliente, pet, servico, data, dataCriacao, status, observacoes) VALUES($1, $2, $3, $4, $5, $6, $7)"

            conexao.query(sql, values, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                } else{
                    res.status(201).json(resultados)
                }
            })
        }

    }
    
    lista(res){
        const sql = "SELECT * FROM Atendimentos"

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) =>{
            const atendimento = resultados.rows[0]
            if(erro){
                res.status(400).json(erro)
            } else{
                res.status(200).json(atendimento)
            }
        })
    }
}

module.exports = new Atendimento