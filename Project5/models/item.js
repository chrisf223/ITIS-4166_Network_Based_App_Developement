const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    condition: {
      type: String,
      required: [true, 'Condition is required'],
      enum: ['New', 'Like New', 'Good', 'Worn', 'Damaged'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    size: {
      type: String,
      required: [true, 'Size is required'],
    },
    totalOffers: {
      type: Number,
      default: 0,
    },
    highestOffer: {
      type: Number,
      default: 0,
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
      default: true,
    },
  },
  { timestamps: true }
);

//collection name is items in the database
module.exports = mongoose.model('Item', itemSchema);
