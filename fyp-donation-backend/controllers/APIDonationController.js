const { User, Category, Organization, Item, Rider } = require('../database/modal');
const express = require('express');
const router = express.Router();

router.get("/:status",async (req, res)=>{
    try { 
        const items=await Item.find({status:req.params.status})
        .populate('category').populate('organization').populate('user').exec();
        return res.json(items);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get("/single/:id",async (req, res)=>{
    try { 
        const items=await Item.findById(req.params.id)
        .populate('category').populate('organization').populate('user').exec();
        return res.json(items);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post("/rider/:id",async (req, res)=>{
    try { 

        const item=await Item.findById(req.params.id);
        item.rider=req.body.rider;
        item.status=1;
        await item.save();        
        return res.json({status:true});
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get("/complete/:id",async (req, res)=>{
    try { 

        const item=await Item.findById(req.params.id);
        item.status=2;
        await item.save();        
        return res.json({status:true});
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


module.exports = router;