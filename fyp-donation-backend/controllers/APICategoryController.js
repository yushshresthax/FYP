const express = require('express');
const { Category } = require('../database/modal');
const router = express.Router();

// Create a new category
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get a specific category by ID
router.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    res.send(category);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update a category by ID
router.post('/update', async (req, res) => {
  

  try {
    const category = await Category.findById(req.body._id);
    if (!category) {
      return res.status(404).send();
    }
    category.name=req.body.name;
    await category.save();
    res.send(category);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Delete a category by ID
router.post('/del', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.body.id);
    if (!category) {
      return res.status(404).send();
    }
    res.send(category);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
