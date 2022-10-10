const router = require('express').Router();
const {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login
} = require('../controllers/users')
const auth = require('./auth');

router.get('/', auth.required, getUser)
router.post('/', createUser)
router.post('/login', login)
router.put('/', auth.required, updateUser)
router.delete('/', auth.required, deleteUser)

module.exports = router;