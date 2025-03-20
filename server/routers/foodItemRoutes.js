const express = require("express");
const FoodItem = require("../models/fooditem"); // Ensure correct path
const router = express.Router();

// Create a new food item
router.post("/", async (req, res) => {
  try {
    const { name, price, category } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, price, category" });
    }

    const foodItem = new FoodItem(req.body);
    await foodItem.save();
    res.status(201).json(foodItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

module.exports = router;
