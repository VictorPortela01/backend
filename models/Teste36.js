const Sequelize = require('sequelize')
const db = require('./db')
 

const Teste36 = db.define('teste36', {
  cpf: {
    type: Sequelize.STRING,
    allowNull: false
  },
  codigo: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  taxaRespostaRating: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  avaliacaoRating: {
    type: Sequelize.STRING,
    allowNull: true
  },
  apotamentoBeesDel: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tml: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  vales: {
    type: Sequelize.STRING,
    allowNull: true
  },
  boleto: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  devolucao: {
    type: Sequelize.STRING,
    allowNull: true
  },
  aderenciaRaio: {
    type: Sequelize.STRING,
    allowNull: true
  },
  combustivel: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  avarias: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tendencias: {
    type: Sequelize.STRING,
    allowNull: true
  },
}, {
  freezeTableName: true
})
// Teste36.sync({ force: true });



module.exports = Teste36
