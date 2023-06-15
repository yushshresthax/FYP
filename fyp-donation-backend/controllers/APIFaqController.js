const express = require('express');
const { Category, FAQ } = require('../database/modal');
const router = express.Router();

// GET all FAQs
router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new FAQ
router.post('/', async (req, res) => {
  const faq = new FAQ({
    question: req.body.question,
    answer: req.body.answer
  });

  try {
    const newFAQ = await faq.save();
    res.status(201).json(newFAQ);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.post('/update/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (req.body.question != null) {
      faq.question = req.body.question;
    }
    if (req.body.answer != null) {
      faq.answer = req.body.answer;
    }

    const updatedFAQ = await faq.save();
    res.json(updatedFAQ);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/delete/:id', async (req, res) => {


  try {
    await FAQ.findByIdAndDelete(req.params.id);

    res.json({ status: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
