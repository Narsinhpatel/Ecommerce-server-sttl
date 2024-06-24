import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: [true,"Product name is requird"],
  
  },
  price: {
    type: Number,
    required:  [true,"Price is requird"],
    min: [0, "Price must be at least 0"],
    max: [1000000, "Price must be at most 100000"],
   
  },
  description: {
    type: String,

    default:"",
  },
  image: {
    type: String,
   default:""
  },
  quantity:{
    type:Number,
    default:100
  }


});

export const Product = model("Product", productSchema);