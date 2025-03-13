import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Order = () => {
  const [cart, setCart] = useState([]);

  const menuCategories = [
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
        {
          id: 103,
          name: "Bruschetta",
          description:
            "Toasted baguette topped with tomatoes, basil, and olive oil",
          price: 6.99,
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
          description: "Classic pizza with tomato sauce, mozzarella, and basil",
          price: 12.99,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 202,
          name: "Spaghetti Carbonara",
          description:
            "Spaghetti with eggs, parmesan, pancetta, and black pepper",
          price: 14.99,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 203,
          name: "Grilled Salmon",
          description:
            "Fresh salmon fillet with lemon butter sauce and seasonal vegetables",
          price: 18.99,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    },
    {
      id: 3,
      name: "Desserts",
      items: [
        {
          id: 301,
          name: "Tiramisu",
          description:
            "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
          price: 6.99,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 302,
          name: "Chocolate Lava Cake",
          description:
            "Warm chocolate cake with a molten center, served with vanilla ice cream",
          price: 7.99,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 303,
          name: "Cheesecake",
          description: "New York style cheesecake with berry compote",
          price: 6.99,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    },
    {
      id: 4,
      name: "Beverages",
      items: [
        {
          id: 401,
          name: "Soft Drinks",
          description: "Cola, lemon-lime soda, or root beer",
          price: 2.99,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 402,
          name: "Iced Tea",
          description: "Freshly brewed, sweetened or unsweetened",
          price: 2.99,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 403,
          name: "Coffee",
          description: "Regular or decaf",
          price: 3.49,
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    },
  ];

  const addToCart = (item) => {
    setCart(cart.concat(item));
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total.toFixed(2);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Menu</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-8">
          {menuCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <h2 className="text-2xl font-semibold border-b pb-2">
                {category.name}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden flex flex-col h-full"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{item.name}</CardTitle>
                        <span className="font-semibold text-lg">
                          ${item.price}
                        </span>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                      <Button
                        onClick={() => addToCart(item)}
                        className="w-full"
                      >
                        Add to Order
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Order Status */}
        <div className="md:col-span-1">
          <Card className="sticky top-4">
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
                        <button
                          onClick={() => removeFromCart(index)}
                          className="ml-2 text-red-500 hover:text-red-700 text-xs bg-red-100 hover:bg-red-200 px-[0.3em] rounded-sm"
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                      <span>${item.price.toFixed(2)}</span>
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
                  onClick={() => setCart([])}
                >
                  Clear All
                </Button>
              )}

              {cart.length > 0 ? (
                <Link
                  to="/confirmation"
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
    </div>
  );
};

export default Order;
