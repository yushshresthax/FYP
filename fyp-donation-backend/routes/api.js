const express = require('express');
const router = express.Router();

const AuthController=require('../controllers/AuthController');
const UserController=require('../controllers/APIUserController');
const CategoryController=require('../controllers/APICategoryController');
const OrganizationController=require('../controllers/APIOrganizationController');
const RiderController=require('../controllers/APIRiderController');

const GeneralController = require('../controllers/APIGeneralController');

const DonationController = require('../controllers/APIDonationController');
const FAQController = require('../controllers/APIFaqController');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.use('/user',UserController);
router.use('/category',CategoryController);
router.use('/organizations',OrganizationController);
router.use('/riders',RiderController);

router.use('/general',GeneralController);
router.use('/donation',DonationController);
router.use('/faq',FAQController);
module.exports = router;