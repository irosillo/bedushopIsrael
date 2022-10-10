const { Sequelize, DataTypes, Op } = require('sequelize');
const Review = require('../models/review');

function createReview(req, res) {
    const body = req.body;
    Review.create(body)
    .then(review => 
        res.status(201).send(review)
    )
    .catch(() => 
        res.status(400).send('Error')
    )
}

function getAllReviews(req, res) {
    Review.findAll()
    .then(review => 
        res.status(200).send(review)
    )
    .catch(() => 
        res.status(400).send('Error')
    )
}

function getReviewById(req,res)
{
    const id = req.params.id;
    Review.findByPk(id)
    .then(review => 
        res.status(200).send(review)    
    )
    .catch(() => 
        res.status(400).send('Error')
    )
}

function updateReview(req,res)
{
    const body = req.body;
    const id = req.params.id;
    Review.update(body, {
        where: {
        id: id
        }
    })
    .then(review =>
        res.status(201).send(review)
    )
    .catch(() => 
        res.status(400).send('Error')
    )
}

function deleteReview(req, res) {
    const id = req.params.id;
    Review.destroy({
      where: {
        id: id
      }
    })
    .then(r =>
      res.status(201).send(`Se elimino la reseña ${id}`)
    )
    .catch(() => 
          res.status(400).send('Error')
      )
  }

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
  }