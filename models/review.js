const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = require('../config/db')

const Review = sequelize.define('Review', {
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    saleID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    comment: {
        type: DataTypes.STRING(1000),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Review.sync({ alter: true });

module.exports = Review;