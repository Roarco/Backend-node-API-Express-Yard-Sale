const express = require('express');
const productsService = require('../services/products');
const validatorHandler = require('../middlewares/validator');
const{ createProductSchema, updatedProductSchema, getProductSchema } = require('../schema/products');

const router = express.Router();
const service = new productsService();

/* products */

//GET

router.get('/', async (req, res) =>  {
  const products = await service.find();
  res.json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) =>  {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
  }
    catch (err) {
      next(err); //se agrega el next para atrapar de forma explicita el error con el middleware
  }
})

//POST
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  });

// //PUT
// router.put('/:id', (req, res) =>  {
//   const { id } = req.params.id;
//   res.json({
//     id,
//     name: 'Producto 1',
//     price: '$100'
//   })
// })

//PATCH
router.patch('/update/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updatedProductSchema, 'body'),
  async (req, res, next) =>  {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedProduct = await service.update(id, body);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  })

//DELETE
router.delete('/delete/:id', async (req, res) =>  {
  const { id } = req.params;
  const deletedProduct = await service.delete(id);
  res.json(deletedProduct);
})

module.exports = router;
