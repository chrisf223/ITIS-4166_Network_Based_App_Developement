const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    seller: {
      type: String,
      required: [true, 'Seller is required'],
    },
    condition: {
      type: String,
      required: [true, 'Condition is required'],
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
    },
    size: {
      type: String,
      required: [true, 'Size is required'],
    },
    offers: {
      type: String,
      required: [true, 'Offers are required'],
    },
    details: {
      type: String,
      required: [true, 'Details are required'],
      maxlength: [100, 'content should have 100 characters or less']
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    active: {
      type: Boolean,
      required: [true, 'Active status is required'],
    },
  },
  { timestamps: true }
);

//collection name is items in the database
module.exports = mongoose.model('Item', itemSchema);
