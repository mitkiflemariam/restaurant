const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

router.post("/", async (req, res) => {
  try {
    const { name, location } = req.body;
    const restaurant = new Restaurant({ name, location });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating restaurant", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("orders foodItems");
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

module.exports = router;
