const router = require('express').Router();
const {
    createProduct,
    getAllProducts,
    getAllProductsBySeller,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/products')

router.get('/', getAllProducts)
router.post('/', createProduct)
router.get('/seller/:id',getAllProductsBySeller)
router.get('/:id', getProductById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router;