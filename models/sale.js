const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = require('../config/db')

const Sale = sequelize.define('Sale', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    sellerID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    buyerID:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Sale.sync({ alter: true });

module.exports = Sale;