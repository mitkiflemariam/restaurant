const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., "Starter", "Main Course"
  //   restaurantId: { type: Number, required: true, ref: "Restaurant" }, // Reference to Restaurant
  image: { type: String }, // Image URL (Cloudinary or local)
  available: { type: Boolean, default: true }, // Availability status
});

const FoodItem = mongoose.model("FoodItem", foodItemSchema);
module.exports = FoodItem;
