const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create Item
// @access  Public
router.post('/', (req, res) => {
  const { name } = req.body;
  const newItem = new Item({
    name
  });

  newItem.save()
    .then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete Item
// @access  Public
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Item.findById(id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
