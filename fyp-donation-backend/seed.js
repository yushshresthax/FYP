require("dotenv").config() // Load ENV Variables
const bcrypt = require('bcrypt');

const { User, Post, Like, Comment } = require('./database/modal');
const connect = require('./database/init');


let user = { name: 'Bob', email: 'bob@example.com', password: 'password', role: 'admin' };
    

const saltRounds = 10;

connect()
    .then(async () => {

        const hashedPassword = bcrypt.hashSync(user.password, saltRounds);

        const data={...user,password:hashedPassword};
        await User.create(data);




    })
    .catch((err) => {
        console.log('cannot connect to server', err);;
    });
