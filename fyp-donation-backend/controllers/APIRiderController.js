const express = require('express');
const router = express.Router();
const { Rider } = require('../database/modal');
// Get all riders
router.get('/', async (req, res) => {
    try {
        const riders = await Rider.find();
        res.json(riders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single rider
router.get('/:id', async (req, res) => {
    const rider = await Rider.findById(req.params.id);

    res.json(rider);
});

// Create a new rider
router.post('/', async (req, res) => {
    const rider = new Rider({
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        detail: req.body.detail
    });

    try {
        const newRider = await rider.save();
        res.status(201).json(newRider);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an existing organization
router.post('/update/:id', async (req, res) => {
    const rider = await Rider.findById(req.params.id);
    if (req.body.name != null) {
        rider.name = req.body.name;
    }

    if (req.body.address != null) {
        rider.address = req.body.address;
    }

    if (req.body.contact != null) {
        rider.contact = req.body.contact;
    }

    if (req.body.detail != null) {
        rider.detail = req.body.detail;
    }

    try {
        const updatedRider = await rider.save();
        res.json(updatedRider);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an rider
router.post('/delete/:id', async (req, res) => {
    try {
        await Rider.findByIdAndDelete(req.params.id);

        res.json({ message: 'Organization deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;