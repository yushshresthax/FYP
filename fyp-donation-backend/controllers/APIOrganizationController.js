const express = require('express');
const router = express.Router();
const { Organization } = require('../database/modal');
const fileUpload = require('express-fileupload');
const { uploadFile } = require('../helper');
// Get all organizations
router.get('/', async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.json(organizations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single organization
router.get('/:id', async (req, res) => {
    const organization = await Organization.findById(req.params.id);

    res.json(organization);
});

// Create a new organization
router.post('/', async (req, res) => {
    console.log(req.files);
    const organization = new Organization({
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        detail: req.body.detail,
        image:await uploadFile(req.files.image)
    });

    try {
        const newOrganization = await organization.save();
        res.status(201).json(newOrganization);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an existing organization
router.post('/update/:id', async (req, res) => {
    const organization = await Organization.findById(req.params.id);
    if(req.files!=undefined){
        organization.image=await uploadFile(req.files.image);
    }
    if (req.body.name != null) {
        organization.name = req.body.name;
    }

    if (req.body.address != null) {
        organization.address = req.body.address;
    }

    if (req.body.contact != null) {
        organization.contact = req.body.contact;
    }

    if (req.body.detail != null) {
        organization.detail = req.body.detail;
    }

    try {
        const updatedOrganization = await organization.save();
        res.json(updatedOrganization);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an organization
router.post('/delete/:id', async (req, res) => {
    try {
        await Organization.findByIdAndDelete(req.params.id);

        res.json({ message: 'Organization deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;