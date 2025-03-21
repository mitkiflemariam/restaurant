const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const Order = require("../models/order");
const FoodItem = require("../models/fooditem");

// Create a new restaurant
router.post("/restaurants", async (req, res) => {
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

// Get all restaurants
router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("orders");
    res.status(200).json(restaurants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching restaurants", error: error.message });
  }
});

// Create a new order for a restaurant
// router.post('/orders', async (req, res) => {
//   try {
//     const { restaurantId, items, totalAmount } = req.body;

//     // Verify restaurant exists
//     const restaurant = await Restaurant.findById(restaurantId);
//     if (!restaurant) {
//       return res.status(404).json({ message: 'Restaurant not found' });
//     }

//     // Create and save the order
//     const order = new Order({
//       restaurant: restaurantId,
//       items,
//       totalAmount
//     });
//     await order.save();

//     // Link order to restaurant
//     restaurant.orders.push(order._id);
//     await restaurant.save();

//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating order', error: error.message });
//   }
// });

router.post("/orders", async (req, res) => {
  try {
    const { userId, restaurantId, items } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    // Calculate total amount based on food items
    let totalAmount = 0;
    for (const item of items) {
      const foodItem = await FoodItem.findById(item.foodItem);
      if (!foodItem || foodItem.restaurant.toString() !== restaurantId) {
        return res.status(400).json({ message: "Invalid food item" });
      }
      totalAmount += foodItem.price * (item.quantity || 1);
    }

    const order = new Order({
      user: userId,
      restaurant: restaurantId,
      items,
      totalAmount,
    });
    await order.save();

    restaurant.orders.push(order._id);
    await restaurant.save();

    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

// Get all orders for a specific restaurant
router.get("/restaurants/:id/orders", async (req, res) => {
  try {
    const orders = await Order.find({ restaurant: req.params.id });
    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this restaurant" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

// Update order status
router.put("/orders/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
});

// Delete an order
router.delete("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Remove order reference from restaurant
    await Restaurant.updateOne(
      { _id: order.restaurant },
      { $pull: { orders: order._id } }
    );
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
});

module.exports = router;
