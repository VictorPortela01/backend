const Sequelize = require('sequelize')
const db = require('./db');

const User = db.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Aqui tinha um unique:true mas tem códigos de motorista e ajudante igual.
    },
    função: {
        type: Sequelize.STRING,
        allowNull: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: true
        // A senha não está sendo utilizada no momento
    }
})

module.exports = User

//Para criar usuarios é só descomentar e criar com nodemon
// Usuario.crete({
//cpf : "",
//nome : "",
//senha :
//})

//Verificar se há alguma diferença na tabela, realizada a alteração
//User.sync({ alter: false })
// .then(() => {
//     console.log("Tabela sicronizada com sucesso.")
// })
// .catch(err => {
//     console.error("Erro ao sicronizar tabela:",err)
//  })


