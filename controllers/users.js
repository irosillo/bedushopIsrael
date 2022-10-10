const { Sequelize, DataTypes, Op } = require('sequelize');
const User = require('../models/users');
const passport = require('passport');

function createUser(req, res, next) {
    const body = req.body,
          password = body.password,
          card = body.card;
          
    delete body.password;
    delete body.card;
    
    const user = User.build(body);
    pass = User.createPassword(password);
    user.card = User.createCard(card);
    user.salt = pass.salt;
    user.hash = pass.hash;
    user.save().then(user => {
        return res.status(201).json(User.toAuthJSON(user))
    }).catch(next)
}

function getUser(req, res, next) {
    User.findOne({where : { username : req.auth.username}})
    .then(user  => {
        if (!user) {
            return res.status(401).send("No se encontró el usuario.")
        }

        let creditCard = User.getCard(user.card);
        for(let i = 0; i < creditCard.length-4; i++) {
            let str = creditCard.split('');
            str[i] = '*';
            creditCard = str.join('');
        }

        const response = {
            username: user.username,
            name: user.name,
            surname: user.surname,
            email: user.email,
            address: user.address,
            card: creditCard,
            type: user.type
        }
        
        return res.json(response);
    }).catch(next);
}

function updateUser(req, res, next) {
    let body = req.body;
    
    delete body.salt;
    delete body.hash;
    
    if("card" in body) {
        body.card = User.createCard(body.card);
    }
    
    User.update(body, { where : { username: req.auth.username }})
    .then(user => {
        res.status(201).send(`Se modifico el usuario ${user}`)
    }).catch(next)
}

function deleteUser(req, res) {
    User.destroy({
        where: {
            username: req.auth.username
        }
    })
    .then(user =>
        res.status(201).send(`Se elimino el usuario ${user}`)
    )
}

function login(req, res, next) {
    if (!req.body.email) {
        return res.status(422).json({ error: "El email es requerido" });
    }
    
    if (!req.body.password) {
        return res.status(422).json({ error: "La contraseña es requerida" });
    }
    
    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err) { 
            return next(err); 
        }
        
        if (user) {
            user.token = User.generateJWT(user);
            return res.json({ user: User.toAuthJSON(user) });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  login
}