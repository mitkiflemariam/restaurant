import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const getDefaultFoodImage = (category, name) => {
  const itemCategory = (category || "").toLowerCase();
  const itemName = (name || "").toLowerCase();

  // Common food category images
  if (itemCategory.includes("appetizer") || itemCategory.includes("starter")) {
    return "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwZXRpemVyfGVufDB8fDB8fHww";
  }

  if (itemCategory.includes("main") || itemCategory.includes("entree")) {
    return "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D";
  }

  if (itemCategory.includes("dessert") || itemCategory.includes("sweet")) {
    return "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzc2VydHxlbnwwfHwwfHx8MA%3D%3D";
  }

  if (itemCategory.includes("beverage") || itemCategory.includes("drink")) {
    return "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHJpbmtzfGVufDB8fDB8fHww";
  }

  if (itemName.includes("pizza")) {
    return "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl6emF8ZW58MHx8MHx8fDA%3D";
  }

  if (itemName.includes("burger")) {
    return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww";
  }

  if (itemName.includes("pasta") || itemName.includes("spaghetti")) {
    return "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhc3RhfGVufDB8fDB8fHww";
  }

  return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D";
};

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const orderNumber = Math.floor(100000 + Math.random() * 900000); // Order number that is generic

  useEffect(() => {
    if (location.state && location.state.cart) {
      setCart(location.state.cart);
    }
  }, [location]);

  const orderDetails = {
    number: orderNumber,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    estimatedDelivery: "30-45 minutes",
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total.toFixed(2);
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check />
        </div>
        <CardTitle className="text-2xl font-bold">Order Confirmed!</CardTitle>
        <CardDescription>
          Thank you for your order. We've received your request and are
          preparing it now.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Order Number:</div>
              <div className="font-medium text-right">
                {orderDetails.number}
              </div>
              <div className="text-muted-foreground">Date:</div>
              <div className="font-medium text-right">{orderDetails.date}</div>
              <div className="text-muted-foreground">Time:</div>
              <div className="font-medium text-right">{orderDetails.time}</div>
              <div className="text-muted-foreground">Est. Delivery:</div>
              <div className="font-medium text-right">
                {orderDetails.estimatedDelivery}
              </div>
            </div>
          </div>

          {cart.length > 0 && (
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-semibold">Order Items</h3>
              <div className="space-y-2">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm border-b pb-2 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded overflow-hidden">
                        <img
                          src={
                            item.image ||
                            getDefaultFoodImage(item.category, item.name)
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = getDefaultFoodImage(
                              item.category,
                              item.name
                            );
                          }}
                        />
                      </div>
                      <span>{item.name}</span>
                      {item.restaurant &&
                        typeof item.restaurant === "object" && (
                          <span className="text-xs text-gray-500">
                            ({item.restaurant.name})
                          </span>
                        )}
                    </div>
                    <span className="font-medium">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold pt-2">
                  <span>Total</span>
                  <span>${getTotalPrice()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">Delivery Instructions</h3>
            <p className="text-sm text-muted-foreground">
              Your order will be prepared according to your specifications.
              You'll receive updates about your order status via email or text
              message.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 sm:flex-row justify-center sm:space-x-2 sm:space-y-0">
        <Button variant="outline" className="w-24" asChild>
          <Link to="/" aria-label="login">
            Home
          </Link>
        </Button>
        <Button variant="default" className="w-24" asChild>
          <Link to="/order" aria-label="login">
            Order Again
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Confirmation;
