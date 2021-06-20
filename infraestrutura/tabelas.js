class Tabelas{
    init(conexao){
        this.conexao = conexao
        this.criarAtendimentos()
    }
    
    criarAtendimentos(){
        const sql = "CREATE TABLE IF NOT EXISTS Atendimentos (id serial, cliente char(50) NOT NULL, pet char(20), servico char(20) NOT NULL, data timestamp NOT NULL, dataCriacao timestamp NOT NULL, status char(20) NOT NULL, observacoes text, PRIMARY KEY(id))"
        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            } else{
                console.log("Tabela Atendimentos criada com sucesso")
            }
        })
    }
}


module.exports = new Tabelas