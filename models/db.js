const Sequelize = require('sequelize')

const sequelize = new Sequelize('u312179767_meu_banco','u312179767_meu_usuario', 'Dis@1004719', {
    host:"srv1894.hstgr.io",
    dialect:"mysql"
})



module.exports = sequelize;