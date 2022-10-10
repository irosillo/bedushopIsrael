const { Sequelize, DataTypes, Op } = require('sequelize');
const Sale = require('../models/sale');

function createSale(req, res) {
    const body = req.body;
    Sale.create(body)
    .then(sale => 
        res.status(201).send(sale)
    )
    .catch(() => 
        res.status(400).send('Error')
    )
}

function getAllSales(req, res) {
    Sale.findAll()
    .then(sale => 
        res.status(200).send(sale)
    )
    .catch(() => 
        res.status(400).send('Error')
    )
}

function getSaleById(req,res){
    const id = req.params.id;
    Sale.findAll({
        where: {
            id: {[Op.eq]: id}
        }
    }).then(sale =>
        res.status(200).send(sale)
    )
    .catch(() => 
    res.status(400).send('Error')
    )
}

function getSalesBySeller(req,res){
    const sellerID = req.params.id;
    Sale.findAll({
        where: {
            sellerID: {[Op.eq]: sellerID}
        }
    }).then(sale =>
        res.status(200).send(sale)
    )
    .catch(() => 
    res.status(400).send('Error')
    )
}

function deleteSaleProduct(req, res) {
    const id = req.params.id;
    const productId = req.params.productId;
    Sale.destroy({
      where: {
        id: {[Op.eq]: id},
        productID: {[Op.eq]:productId}
      }
    })
    .then(r =>
      res.status(201).send(`Se elimino la venta ${id} con el producto ${productId}`)
    )
    .catch(() => 
          res.status(400).send('Error')
      )
}

function deleteWholeSale(req,res){
    const id = req.params.id;
    Sale.destroy({
        where: {
          id: {[Op.eq]: id}
        }
      })
      .then(r =>
        res.status(201).send(`Se elimino la venta ${id} con el producto ${productId}`)
      )
      .catch(() => 
            res.status(400).send('Error')
        )
}

module.exports = {
    createSale,
    getAllSales,
    getSaleById,
    getSalesBySeller,
    deleteSaleProduct,
    deleteWholeSale
}

