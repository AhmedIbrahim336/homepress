const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const featuresSchema = new Schema({
  parking: {
    type: Boolean,
    default: false,
  },
  security: {
    type: Boolean,
    default: false,
  },
  cctv: {
    type: Boolean,
    default: false,
  },
  conferenceHall: {
    type: Boolean,
    default: false,
  },
  heating: {
    type: Boolean,
    default: false,
  },
  cooling: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['Active', 'Sold'],
  },
  stories: {
    type: String,
    required: [true, 'Stores Is requried'],
    enum: ['Multi Family', 'Single Family'],
    default: 'Single',
  },
  swimmingPool: {
    type: Number,
    required: [true, 'Swimming Pools Number Is requried'],
    default: 0,
  },
  garage: {
    type: Number,
    required: [true, 'Beds Number is required'],
  },
  builtYear: {
    type: Number,
    required: [true, 'Built Year Number is required'],
  },
});
const PropertySchema = new Schema(
  {
    type: {
      type: String,
      requried: [true, 'Property type is requried'],
      enum: ['Apartments', 'Offices', 'Houses', 'Townhome', 'Studio'],
    },
    title: {
      type: String,
      required: [true, 'Property Title is required'],
    },
    price: {
      type: Number,
      required: [true, 'Property price  is required'],
    },
    discount: {
      type: Number,
      required: [true, 'Property Discount  is required'],
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    address: {
      type: String,
      requried: [true, 'Address is required'],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        index: '2dsphere',
      },
      formatedAddress: String,
    },
    images: [
      {
        type: String,
        required: [true, 'Images is requries'],
        trim: true,
      },
    ],
    rooms: {
      type: Number,
      required: [true, 'Rooms Number is required'],
    },
    beds: {
      type: Number,
      required: [true, 'Beds Number is required'],
    },
    baths: {
      type: Number,
      required: [true, 'baths Number is required'],
    },
    area: {
      type: Number,
      required: [true, 'Area  is required'],
    },
    priceForSqft: {
      type: Number,
      required: [true, 'Rooms Number is required'],
    },
    features: featuresSchema,
    amenities: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;
