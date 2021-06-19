const Atendimento = require("../models/atendimentos")


module.exports = app => {
    app.get("/atendimentos", (req, res) => res.send("Você está na rota de atendimentos e está realizado um GET"))


    app.post("/atendimentos", (req, res) => {
        const atendimento = req.body
        
        Atendimento.adciona(atendimento)
        res.send("Post atendimento")})
}