const router = require('express').Router();
const {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
} = require('../controllers/review')

router.get('/', getAllReviews)
router.post('/', createReview)
router.get('/:id&:productID',getReviewById)
router.put('/:id&:productID', updateReview)
router.delete('/:id&:productID', deleteReview)

module.exports = router;