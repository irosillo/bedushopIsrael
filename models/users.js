const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = require('../config/db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate:{
            isLowercase: true,
            is: /^[a-zA-Z0-9]+$/
        }
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    direction: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    salt: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hash: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    card: {
        type: DataTypes.TEXT
    },
    seller: {
        type: DataTypes.BOOLEAN,
    }
}, {
    freezeTableName: false,
    timestamps: false
});

Users.createPassword = function (password) {
    salt = crypto.randomBytes(16).toString("hex");
    hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
    return { salt: salt, hash: hash }
}

Users.validatePassword = function (password, salt, hash) {
    const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
    return hash === hashVerify;
}

Users.generateJWT = function(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    
    return jwt.sign({
        id: user._id,
        username: user.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
}

Users.toAuthJSON = function(user){
    return {
        username: user.username,
        email: user.email,
        token: Users.generateJWT(user)
    };
}

Users.createCard = function(text) {
    const algorithm = 'aes-256-ctr';
    const key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
    
    return encrypted.toString('hex')
}

Users.getCard = function(text) {
    const algorithm = 'aes-256-ctr';
    let key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(text, 'hex')), decipher.final()])
    
    return decrpyted.toString()
}

module.exports = Users;