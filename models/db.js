const Sequelize = require('sequelize')

const sequelize = new Sequelize('metas','u312179767_meu_usuario', 'Dis@1004719', {
    host:"https://auth-db1894.hstgr.io/index.php?db=u312179767_meu_banco",
    dialect:"mysql"
})



module.exports = sequelize;