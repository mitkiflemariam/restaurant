const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
    // default: '0000'
  },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., "Starter", "Main Course"
  //   restaurantId: { type: Number, required: true, ref: "Restaurant" }, // Reference to Restaurant
  image: { type: String }, // Image URL (Cloudinary or local)
  available: { type: Boolean, default: true }, // Availability status
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FoodItem = mongoose.model("FoodItem", foodItemSchema);
module.exports = FoodItem;
