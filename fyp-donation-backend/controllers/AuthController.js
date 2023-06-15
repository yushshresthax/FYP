const { User } = require('../database/modal');
const { SECRET_KEY, saltRounds } = require('./../constants');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendMail } = require('../mailer');

exports.frontLoginView=async(req,res)=>{
  // if(req.session.token!=null || req.session.token!=undefined){
  //   res.redirect('/dashboard/index');
  // }else{

    res.render('login',{layout:false});
  // }

  
};
exports.frontLogin= async(req,res)=>{
  
  try {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(req.body);
    if (email == undefined || password == undefined) {
       res.redirect('/dashboard/login');
    }

    const user = await User.findOne({ email: email });
    if (user==null ) {
      res.redirect('/dashboard/login');
    }

    if(user.role=='user'){
      res.redirect('/dashboard/login');

    }else{

      if (!bcrypt.compareSync(password, user.password)) {
        res.redirect('/dashboard/login');
      }else{
        console.log(user);
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '7d' });
        req.session.token=token;
          res.redirect('/dashboard/index');
  
      }
    }

  } catch (err) {

    console.error(err);
    return res.redirect('/dashboard/login');

  }
}

exports.register = async (req, res) => {

  try {
    console.log(req.body);

    const { name,email,phone, password } = req.body;
    let user=await User.findOne({email});
    if(user!=null){
      return res.status({status:false,message:"The Email is already in use"});
    }
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    user = await User.create({ email: email, password: hashedPassword, name:name,phone:phone, role:"user"});
    sendMail(email,"Welcome to Donation",`
    Thank you for registering with Sahyogh, the platform that allows you to donate from your doorstep. To ensure the security of your account and the safety of your donations, we need to verify your email address.Thank you for joining us in our mission to make a difference in the world!
    `);
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '7d' });
    return res.send({ token, user: { email: user.email, id: user._id,name:user.name,role:user.role,phone:user.phone },status:true });
  } catch (err) {

   
    res.status(500).send(err);
  }

};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (email == undefined || password == undefined) {
      return res.status(500).send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ email: email });
    if (user==null) {
      console.log(user);
      return res.status(401).send({ message: 'Username or password is invalid' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ message: 'Username or password is invalid' });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '7d' });

    console.log(user);
    return res.send({ token,  user: { email: user.email, id: user._id,role:user.role,name:user.name ,phone:user.phone } });



  } catch (err) {


    res.status(500).send(err);
  }
};
