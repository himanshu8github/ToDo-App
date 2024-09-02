const express = require('express');
const router = express.Router();
const itemController = require('../controller/item.controller.js');
const getItem = require('../middleware/item.js');

router.get('/', itemController.getAllItems);
router.get('/:id', getItem, itemController.getItemById);
router.post('/', itemController.createItem);
router.put('/:id', getItem, itemController.updateItem);
router.delete('/:id', getItem, itemController.deleteItem);

module.exports = router;
