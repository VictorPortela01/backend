const Sequelize = require('sequelize')

const sequelize = new Sequelize('metas','root', '', {
    host:"localhost",
    dialect:"mysql"
})



module.exports = sequelize;