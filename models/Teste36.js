const Sequelize = require('sequelize')
const db = require('./db')
 

const Teste36 = db.define('teste36', {
  cpf: {
    type: Sequelize.STRING,
    allowNull: false
    // A condição que puxa as duas planilhas.
  },
  codigo: {
    type: Sequelize.INTEGER,
    allowNull: false 
    // Aqui deveria ser unique:true mas tem códigos de motorista e ajudante que são iguais.
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
    // A condição que puxa as duas planilhas.
  },
  rating: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tml: {
    type: Sequelize.STRING,
    allowNull: true
  },
  vales: {
    type: Sequelize.STRING,
    allowNull: true
  },
  boleto: {
    type: Sequelize.STRING,
    allowNull: true
  },
  devolução: {
    type: Sequelize.STRING,
    allowNull: true
  },
  combustivel: {
    type: Sequelize.STRING,
    allowNull: true
  },
  avarias: {
    type: Sequelize.STRING,
    allowNull: true
  },
  cxEntregue: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tendencias: {
    type: Sequelize.STRING,
    allowNull: true
  },
}, {
  freezeTableName: true // Evita a pluralização do nome da tabela)
})
// Teste36.sync({ force: true });



module.exports = Teste36
