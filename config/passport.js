const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    User.findOne({ where : { email: email }}).then(function (user) {
        const salt = user.salt;
        const hash = user.hash;
        if (!user || !User.validatePassword(password, salt, hash)) {
            return done(null, false, { errors: { 'email o contraseña': 'equivocado(a)' } });
        }
        return done(null, user);
    }).catch(done);
}));