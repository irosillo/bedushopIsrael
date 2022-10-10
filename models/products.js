const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = require('../config/db')

const Products = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    sellerID:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false
    },
    quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: ""
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: ""
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Products.sync({ alter: true });

module.exports = Products;