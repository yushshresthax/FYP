const { User, Category, Organization, FAQ, Rider, Item } = require('../database/modal');
const express = require('express');
const router = express.Router();

router.get("/donate", async (req, res) => {
    try {
        const donate = {
            categories: await Category.find(),
            orgs: await Organization.find(),
        }

        return res.json(donate);

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/dashboard", async (req, res) => {
    try {
        let data = {
            categories: await Category.find().count(),
            orgs: await Organization.find().count(),
            riders: await Rider.find().count(),
            donations: await Item.find().count(),
        }


        data.d=await Item.aggregate([
            
            // Group donations by day and count the number of donations for each day
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            // Sort by date in ascending order
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                    "_id.day": 1
                }
            }
        ]).exec();

        return res.json(data);

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/org", async (req, res) => {
    try {
        const orgs = await Organization.find();
        return res.json(orgs);

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/faq", async (req, res) => {
    try {
        const faqs = await FAQ.find();
        return res.json(faqs);

    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;