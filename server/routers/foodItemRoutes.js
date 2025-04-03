const express = require("express");
const FoodItem = require("../models/fooditem"); // Ensure correct path
const Restaurant = require("../models/Restaurant");
const router = express.Router();

// Create a new food item
// router.post("/", async (req, res) => {
//   try {
//     const { name, price, category } = req.body;

//     // Validate required fields
//     if (!name || !price || !category) {
//       return res
//         .status(400)
//         .json({ error: "Missing required fields: name, price, category" });
//     }

//     const foodItem = new FoodItem(req.body);
//     await foodItem.save();
//     res.status(201).json(foodItem);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, restaurantId, image } =
      req.body;

    // Log incoming data for debugging (optional, remove in production)
    console.log({ name, price, category, restaurantId, description });

    // Validate required fields
    if (!name || !price || !category || !restaurantId) {
      return res.status(400).json({
        error: "Missing required fields: name, price, category, restaurantId",
      });
    }

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Create new food item with explicit fields
    const foodItem = new FoodItem({
      name,
      price,
      category,
      restaurant: restaurantId,
      description: description || "", // Default to empty string if not provided
      image,
    });

    // Save the food item
    await foodItem.save();

    // Link food item to restaurant
    restaurant.foodItems.push(foodItem._id);
    await restaurant.save();

    // Respond with the created food item
    res.status(201).json(foodItem);
  } catch (error) {
    // Enhanced error handling
    console.error("Error creating food item:", error);
    res.status(500).json({
      message: "Error creating food item",
      error: error.message,
    });
  }
});
// Get a single food item by ID
router.get("/:id", async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    if (!foodItem)
      return res.status(404).json({ message: "Food item not found" });
    res.json(foodItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Update a food item
router.put("/:id", async (req, res) => {
  try {
    const foodItem = await FoodItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!foodItem)
      return res.status(404).json({ message: "Food item not found" });
    res.json(foodItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a food item
router.delete("/:id", async (req, res) => {
  try {
    const foodItem = await FoodItem.findByIdAndDelete(req.params.id);
    if (!foodItem)
      return res.status(404).json({ message: "Food item not found" });
    res.json({ message: "Food item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/restaurant/food-items", async (req, res) => {
  try {
    const { name, price, restaurantId, description } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const foodItem = new FoodItem({
      name,
      price,
      restaurant: restaurantId,
      description,
    });
    await foodItem.save();
    restaurant.foodItems.push(foodItem._id);
    await restaurant.save();
    res.status(201).json(foodItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating food item", error: error.message });
  }
});

router.get("/restaurants/:id/food-items", async (req, res) => {
  try {
    const foodItems = await FoodItem.find({ restaurant: req.params.id });
    res.status(200).json(foodItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching food items", error: error.message });
  }
});

module.exports = router;
