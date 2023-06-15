require("dotenv").config() // Load ENV Variables
const express = require('express');
const connect=require('./database/init');
const api=require('./routes/api');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const {init} = require('./socketio');



connect()
.then(()=>{
  const cors = require('cors');
  
  const app = express();
  app.use(express.static('public'));
  app.use(cors());

  //for api
  app.use(bodyParser.json());
  app.use(express.urlencoded({extended: true}))
  
 
  app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
  }));


  //routes
  app.use('/api',api);

  const http = require('http').Server(app);


  init(http).then((data)=>{
  }).catch((err)=>{
    console.log(err);
  })
  
    
}).catch((err)=>{
  console.error(err);
});