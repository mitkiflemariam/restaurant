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
// const getDefaultFoodImage = (category, name) => {
//   // Convert to lowercase for easier matching
//   const itemCategory = (category || "").toLowerCase();
//   const itemName = (name || "").toLowerCase();

//   // Common food category images
//   if (itemCategory.includes("appetizer") || itemCategory.includes("starter")) {
//     return "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwZXRpemVyfGVufDB8fDB8fHww";
//   }

//   if (itemCategory.includes("main") || itemCategory.includes("entree")) {
//     return "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D";
//   }

//   if (itemCategory.includes("dessert") || itemCategory.includes("sweet")) {
//     return "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzc2VydHxlbnwwfHwwfHx8MA%3D%3D";
//   }

//   if (itemCategory.includes("beverage") || itemCategory.includes("drink")) {
//     return "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHJpbmtzfGVufDB8fDB8fHww";
//   }

//   // Specific food item matching
//   if (itemName.includes("pizza")) {
//     return "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl6emF8ZW58MHx8MHx8fDA%3D";
//   }

//   if (itemName.includes("burger")) {
//     return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww";
//   }

//   if (itemName.includes("pasta") || itemName.includes("spaghetti")) {
//     return "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhc3RhfGVufDB8fDB8fHww";
//   }

//   if (itemName.includes("salad")) {
//     return "https://images.unsplash.com/photo-1547496502-affa22d38842?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbGFkfGVufDB8fDB8fHww";
//   }

//   if (itemName.includes("fish") || itemName.includes("salmon")) {
//     return "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fHww";
//   }

//   if (itemName.includes("steak")) {
//     return "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RlYWt8ZW58MHx8MHx8fDA%3D";
//   }

//   if (itemName.includes("cake")) {
//     return "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D";
//   }

//   if (itemName.includes("ice cream")) {
//     return "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aWNlJTIwY3JlYW18ZW58MHx8MHx8fDA%3D";
//   }

//   // Default food image for any other items
//   return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D";
// };

const getDefaultFoodImage = (category, name) => {
  return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWRkfDJ8fHxlbnwwfHx8fHw%3D";
};

const Order = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load cart from location state or localStorage
  useEffect(() => {
    if (location.state && location.state.cart) {
      setCart(location.state.cart);
      localStorage.setItem("orderCart", JSON.stringify(location.state.cart));
    } else {
      // Try to load from localStorage
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

        // Group items by category
        const itemsByCategory = response.data.reduce((acc, item) => {
          const category = item.category || "Other";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {});

        // Transform to the format used by our component
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

        // Fallback to default categories if API fails
        setMenuCategories([
          {
            id: 1,
            name: "Appetizers",
            items: [
              {
                id: 101,
                name: "Garlic Bread",
                description: "Freshly baked bread with garlic butter and herbs",
                price: 5.99,
                image:
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                id: 102,
                name: "Mozzarella Sticks",
                description: "Golden-fried mozzarella with marinara sauce",
                price: 7.99,
                image:
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
            ],
          },
          {
            id: 2,
            name: "Main Courses",
            items: [
              {
                id: 201,
                name: "Margherita Pizza",
                description:
                  "Classic pizza with tomato sauce, mozzarella, and basil",
                price: 12.99,
                image:
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
            ],
          },
        ]);
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

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-8">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <p>Loading menu items...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4 border border-red-300 rounded">
              {error}
            </div>
          ) : menuCategories.length === 0 ? (
            <div className="text-center p-4">
              <p>No menu items available at the moment.</p>
            </div>
          ) : (
            menuCategories.map((category) => (
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
                          src={
                            item.image ||
                            // getDefaultFoodImage(item.category, item.name)
                            getDefaultFoodImage()
                          }
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.target.src = getDefaultFoodImage();
                            // item.category,
                            // item.name
                          }}
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{item.name}</CardTitle>
                          <span className="font-semibold text-lg">
                            $
                            {typeof item.price === "number"
                              ? item.price.toFixed(2)
                              : item.price}
                          </span>
                        </div>
                        <CardDescription>
                          {item.description}
                          {item.restaurant &&
                            typeof item.restaurant === "object" && (
                              <div className="text-xs mt-1 text-gray-500">
                                From: {item.restaurant.name}
                              </div>
                            )}
                        </CardDescription>
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

        {/* Order Status */}
        <div className="md:col-span-1">
          {/* <Card className="sticky top-4"> */}
          <Card className="fixed top-19">
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
