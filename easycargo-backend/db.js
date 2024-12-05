const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const connectMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado ao MySQL');
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error);
    }
};

module.exports = {
    connectMongoDB,
    connectMySQL,
    sequelize
};