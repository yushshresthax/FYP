const mongoose = require('mongoose');
const {Schema, model} = mongoose

//User Table
const userSchema = new Schema({
    name: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default:'user',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  
    token:{
      type: String,
      required: false,
    },
    donations:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      }
    ]
    
  });
  

  //Destinations Type
 // Define the Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});



// Define the Organization schema
const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
});


const riderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  
});


// Define the Item schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true

  },
  location:{
    lat:{
      type:String,
    },
    lng:{
      type:String
    }
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider',
    required: false

  },
  status:{
    type: Number,
    default:0
  }
}, {
  timestamps: true // Add timestamps for createdAt and updatedAt fields
});

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});



const User = mongoose.model('User', userSchema);
const Organization = mongoose.model('Organization', organizationSchema);
const Item = mongoose.model('Item', itemSchema);
const Category = mongoose.model('Category', categorySchema);
const Rider = mongoose.model('Rider', riderSchema);
const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = {
  User,
  Item,
  Category,
  Organization,Rider,FAQ
};