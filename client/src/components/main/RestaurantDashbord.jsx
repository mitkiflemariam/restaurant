import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Order from "@/pages/Order";
import { Link } from "react-router-dom";

// Helper function to get appropriate food images if no image is provided
const getDefaultFoodImage = (category, name) => {
  // Convert to lowercase for easier matching
  const itemCategory = (category || "").toLowerCase();
  const itemName = (name || "").toLowerCase();

  if (itemName.includes("salmon")) {
    return "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fHww";
  }

  if (itemName.includes("steak")) {
    return "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RlYWt8ZW58MHx8MHx8fDA%3D";
  }

  if (itemName.includes("pasta") || itemName.includes("tagliatelle")) {
    return "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhc3RhfGVufDB8fDB8fHww";
  }

  // Default food image for any other items
  return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D";
};

const RestaurantDashBoard = () => {
  // Featured dishes shown directly without API call
  const featuredDishes = [
    {
      _id: 1,
      name: "Pan-Seared Salmon",
      description:
        "Wild-caught salmon fillet with lemon herb butter, served with seasonal vegetables",
      price: 28,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    },
    {
      _id: 2,
      name: "Prime Ribeye Steak",
      description:
        "28-day aged ribeye with truffle mashed potatoes and red wine reduction",
      price: 42,
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
    },
    {
      _id: 3,
      name: "Truffle Tagliatelle",
      description:
        "House-made pasta with black truffle cream sauce and aged parmesan",
      price: 26,
      image:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2032&auto=format&fit=crop",
    },
  ];

  return (
    <main className="flex flex-col w-full min-h-screen bg-white p-6 shadow-md">
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center absolute inset-0"></div>
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            {/* {restaurant.name} || Restaurant Name */}
            Restaurant Name
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
            {/* {restaurant.description} || Restaurant description */}
             Restaurant description
          </p>
          <Dialog>
            <Link to="/order" aria-label="order" className="w-full">
              <Button
                className="text-white px-10 py-6 rounded-md font-medium"
                variant="default"
              >
                Order Today!
              </Button>
            </Link>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl"></DialogTitle>
                <DialogDescription>
                  Select your preferred date, time and party size.
                </DialogDescription>
              </DialogHeader>
              <Order />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Today's Special
            </h2>
            <div className="w-20 bg-black h-1 mb-6"></div>
            <p className="text-gray-600 text-center max-w-2xl">
              Our chef's selection of exquisite dishes, prepared with the finest
              ingredients and culinary expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <Card
                key={dish._id}
                className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{dish.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{dish.description}</p>
                  <p className="font-bold mt-4 text-lg">${dish.price}</p>
                </CardContent>
                <CardFooter>
                  <Link to="/order" className="w-full">
                    <Button className="text-white px-10 py-6 w-full rounded-md font-medium">
                      Add to Order
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium tracking-wide mb-2">OUR STORY</h4>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  A Culinary Journey Since 2010
                </h2>
              </div>
              <p className="text-gray-600">
                At our restaurant, every dish tells a story—our story. Our
                journey began with a simple dream: to bring together the warmth
                of family traditions and the vibrant energy of modern culinary
                art. Founded in the heart of our community, our restaurant was
                born out of a passion for exceptional food and sustainable
                practices.
              </p>
              <p className="text-gray-600">
                Inspired by cherished recipes passed down through generations,
                we set out to create a space where classic flavors meet
                innovative techniques. Our chefs dedicate themselves to sourcing
                the freshest local ingredients and transforming them into
                dishes. We invite you to be a part of our continuing journey, to
                taste the love and dedication that goes into every meal, and to
                create memories that last a lifetime.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden h-64 lg:h-80">
                <img
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070&auto=format&fit=crop"
                  alt="Restaurant Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64 lg:h-80 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1550367363-ea12860cc124?q=80&w=2070&auto=format&fit=crop"
                  alt="Fine Dining Experience"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RestaurantDashBoard;
