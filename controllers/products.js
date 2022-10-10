const { Sequelize, DataTypes, Op } = require('sequelize');
const Product = require('../models/products');

function createProduct(req, res) {
    const body = req.body;
    Product.create(body)
    .then(producto => 
        res.status(201).send(producto)
    )
    .catch(() => 
        res.status(400).send('Error')
    )
}

function getAllProducts(req, res) {
    Product.findAll()
    .then(products => 
        res.status(200).send(products)
    )
    .catch(() => 
        res.status(400).send('Error')
    )
}

function getAllProductsBySeller(req,res)
{
  const id = req.params.id;
  Product.findAll({where:{
    sellerID: { [Op.eq]: id}
  }
  })
  .then(products => 
    res.status(200).send(products)  
  )
  .catch(() => 
        res.status(400).send('Error')
    )
}

function getProductById(req, res) {
  const id = req.params.id;
  Product.findOne({
    where: {
      id: id
    }
  })
  .then(products => 
      res.status(200).send(products)
  )
  .catch(() => 
        res.status(400).send('Error')
    )
}

function updateProduct(req, res) {
    const body = req.body;
    const id = req.params.id;
    Product.update(body, {
      where: {
        id: id
      }
    })
    .then(product =>
      res.status(201).send(product)
    )
    .catch(() => 
      res.status(400).send('Error')
    )
}

function deleteProduct(req, res) {
  const id = req.params.id;
  Product.destroy({
    where: {
      id: id
    }
  })
  .then(r =>
    res.status(201).send(`Se elimino el producto ${id}`)
  )
  .catch(() => 
        res.status(400).send('Error')
    )
}

module.exports = {
  createProduct,
  getAllProducts,
  getAllProductsBySeller,
  getProductById,
  updateProduct,
  deleteProduct
}