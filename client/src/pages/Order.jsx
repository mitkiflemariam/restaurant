import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Trash } from "lucide-react";

// Helper function to get appropriate food images based on category
const getDefaultFoodImage = (category, name) => {
  return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWRkfDJ8fHxlbnwwfHx8fHw%3D";
};

const Order = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Main Courses");

  // Load cart from location state or localStorage
  useEffect(() => {
    if (location.state && location.state.cart) {
      setCart(location.state.cart);
      localStorage.setItem("orderCart", JSON.stringify(location.state.cart));
    } else {
      const savedCart = localStorage.getItem("orderCart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
          localStorage.removeItem("orderCart");
        }
      }
    }
  }, [location]);

  // Fetch food items from API
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/food-items"
        );

        const itemsByCategory = response.data.reduce((acc, item) => {
          const category = item.category || "Other";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {});

        const categories = Object.keys(itemsByCategory).map(
          (categoryName, index) => ({
            id: index + 1,
            name: categoryName,
            items: itemsByCategory[categoryName],
          })
        );

        setMenuCategories(categories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching food items:", err);
        setError("Failed to load menu items. Please try again later.");
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const addToCart = (item) => {
    const newCart = cart.concat(item);
    setCart(newCart);
    localStorage.setItem("orderCart", JSON.stringify(newCart));
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("orderCart", JSON.stringify(newCart));
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total.toFixed(2);
  };

  return (
    <Card className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Menu</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar - Smaller width */}
        <div className="md:col-span-1 space-y-4">
          {menuCategories.map((category) => (
            <Button
              key={category.id}
              className="w-full"
              variant={
                category.name === selectedCategory ? "default" : "outline"
              }
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Food Items - Display selected category */}
        <div className="md:col-span-2 space-y-8">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <p>Loading menu items...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4 border border-red-300 rounded">
              {error}
            </div>
          ) : (
            menuCategories
              .filter((category) => category.name === selectedCategory)
              .map((category) => (
                <div key={category.id} className="space-y-4">
                  <h2 className="text-2xl font-semibold border-b pb-2">
                    {category.name}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {category.items.map((item) => (
                      <Card
                        key={item._id || item.id}
                        className="overflow-hidden flex flex-col h-full"
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={item.image || getDefaultFoodImage()}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            onError={(e) => {
                              e.target.src = getDefaultFoodImage();//ioe0928957821
                            }}
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl">
                              {item.name}
                            </CardTitle>
                            <span className="font-semibold text-lg">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="mt-auto">
                          <Button
                            onClick={() => addToCart(item)}
                            className="w-full"
                            disabled={!item.available}
                          >
                            {item.available !== false
                              ? "Add to Order"
                              : "Not Available"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Order Status - Third Column */}
        <div className=" md:col-span-1">
          <Card className="sticky top-0">
            <CardHeader>
              <CardTitle>Your Order</CardTitle>
              <CardDescription>
                {cart.length === 0
                  ? "Ready to order today?"
                  : `${cart.length} item(s) in your order`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                      </div>
                      <span>
                        ${item.price.toFixed(2)}
                        <Button
                          variant="ghost"
                          className="ml-3"
                          size="icon"
                          onClick={() => removeFromCart(index)}
                          aria-label="Remove item"
                        >
                          <Trash
                            size={1}
                            className="text-red-500 cursor-pointer"
                          />
                        </Button>
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${getTotalPrice()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Add to order from the menu to start
                </p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              {cart.length > 0 && (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    setCart([]);
                    localStorage.setItem("orderCart", JSON.stringify([]));
                  }}
                >
                  Clear All
                </Button>
              )}

              {cart.length > 0 ? (
                <Link
                  to="/confirmation"
                  state={{ cart }}
                  aria-label="Confirmation"
                  className="w-full"
                >
                  <Button className="w-full" variant="default">
                    Checkout
                  </Button>
                </Link>
              ) : (
                <Button className="w-full" disabled variant="default">
                  Checkout
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default Order;
