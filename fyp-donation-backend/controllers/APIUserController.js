const { User, Item } = require('../database/modal');
const express = require('express');
const { uploadFile } = require('../helper');
const { saltRounds,SECRET_KEY } = require('../constants');
const jwt = require('jsonwebtoken');
const router = express.Router();

const bcrypt = require('bcrypt');
router.post("/set", async (req, res) => {
    try {
        let { name, userId } = req.body;
        const user = await User.findById(userId);
        let image="";
        if(req.files){

            image = await uploadFile(req.files.image0);
        }
        user.name = name;
        user.image = image;
        await user.save();
        res.json({ email: user.email, id: user._id, name: user.name, image: user.image,phone: user.phone })
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get("/donations/:id", async (req, res) => {
    try {
        const donations = await Item.find({ user: req.params.id }).populate('user').populate('category').populate('organization').exec();

        return res.json(donations);
    } catch (error) {

    }
});

router.get("/donation/:id", async (req, res) => {
    try {
        const donations = await Item.findOne({ _id: req.params.id }).populate('user').populate('category').populate('organization').exec();

        return res.json(donations);
    } catch (error) {

    }
});

router.post("/donate", async (req, res) => {
    try {
        let data = req.body;
        data.location = JSON.parse(data.location);
        const user = await User.findById(data.userId);
        if(req.files){

            data.photo = await uploadFile(req.files.image);
        }else{
            data.photo="";
        }
        data.user = user;
        const item = await Item.create(data);
        if (user.donations == undefined || user.donations == null) {
            user.donations = [item];
        } else {
            user.donations.push(item);
        }
        user.save();
        console.log(data);

        res.json({})
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post('/pass', async (req, res) => {
    try {
        const {  newpassword, password,userId } = req.body;
        console.log({  newpassword, password,userId });
        const user=await User.findById(userId);
        const hashedPassword = bcrypt.hashSync(newpassword, saltRounds);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({status:false, message: 'Current password is incorrect' });
        }

        user.password=hashedPassword;
        await user.save();

        
        return res.send({ sucess:true  });
    } catch (err) {

       
        res.status(500).send(err);
    }
});

router.post('/update', async (req, res) => {
    try {
        const {  name, phone,userId } = req.body;
       
        const user=await User.findById(userId);
        user.name=name;
        user.phone=phone;
        await user.save();
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '7d' });
        return res.send({ token, user: { email: user.email, id: user._id,name:user.name,role:user.role,phone: user.phone  } });

    } catch (err) {

       console.log(err);
        res.status(500).send(err);
    }
});
module.exports = router;