const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const User = require("../models/userModel");

const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const { name, location, owner } = req.body;

    // Log input
    console.log("req.body:", req.body);
    console.log("owner:", owner);

    // Validate owner
    if (!owner) {
      return res.status(400).json({ message: "Owner is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ message: "Invalid owner ID format" });
    }

    // Check if the owner exists and has the correct role
    const existingOwner = await User.findById(owner);
    console.log("existingOwner:", existingOwner);
    if (!existingOwner || existingOwner.role !== "owner") {
      return res.status(400).json({ message: "Invalid owner ID or role" });
    }

    const restaurant = new Restaurant({ name, location, owner });
    await restaurant.save();

    // Debug saved document
    const savedRestaurant = await Restaurant.findById(restaurant._id);
    console.log("Saved restaurant:", savedRestaurant.toObject());

    // Ensure owner is included
    res.status(201).json(restaurant.toObject()); // Use toObject to bypass transforms
  } catch (error) {
    console.error("Error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid data format",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Error creating restaurant",
      error: error.message,
    });
  }
});




router.get("/", async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you use JWT and middleware sets req.user
    const restaurants = await Restaurant.find({ owner: userId }).populate(
      "orders foodItems"
    );
    res.status(200).json(restaurants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching restaurants", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // const restaurant = await Restaurant.findById(req.params.id).select('name location');
    const restaurant = await Restaurant.findById(req.params.id);
    // const restaurant = await Restaurant.findById(req.params.id).populate(
    //   "orders foodItems"
    // );
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant  not found" });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a restaurant
router.put("/:id", async (req, res) => {
  try {
    const { name, location } = req.body;

    // Basic validation
    if (!name && !location) {
      return res.status(400).json({
        message: "At least one field (name or location) is required to update",
      });
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name }), // Only include fields that are provided
        ...(location && { location }),
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      }
    );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.json(restaurant);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid restaurant ID",
      });
    }
    res.status(500).json({
      message: "Error updating restaurant",
      error: error.message,
    });
  }
});

// Delete a restaurant
router.delete("/:id", async (req, res) => {
  // console.log("id: " + id);
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    console.log("restaurant: " + restaurant);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(204).send(); // No content response for successful delete
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid restaurant ID" });
    }
    res.status(500).json({
      message: "Error deleting restaurant",
      error: error.message,
    });
  }
});

module.exports = router;
