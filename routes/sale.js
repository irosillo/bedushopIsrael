const router = require('express').Router();
const {
    createSale,
    getAllSales,
    getSaleById,
    getSalesBySeller,
    deleteSaleProduct,
    deleteWholeSale
} = require('../controllers/sale')

router.get('/', getAllSales)
router.post('/', createSale)
router.get('/seller/:id',getSalesBySeller)
router.get('/:id', getSaleById)
router.delete('/:id/product/:productID', deleteSaleProduct)
router.delete('/:id', deleteWholeSale)

module.exports = router;