import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (location.state && location.state.cart) {
      setCart(location.state.cart);
    } else {
      navigate("/order");
    }
  }, [location, navigate]);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);

    if (newCart.length === 0) {
      navigate("/order");
    }
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total.toFixed(2);
  };

  const handleConfirmOrder = () => {
    navigate("/confirmation", { state: { cart } });
  };

  const handleBackToOrder = () => {
    navigate("/order", { state: { cart } });
  };

  return (
    <Card className="container mx-auto p-8 max-w-4xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Checkout</CardTitle>
        <CardDescription>Review your order before confirming</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Food Items */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Order Items
            </h2>
            {cart.length > 0 ? (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <Card key={index} className="flex overflow-hidden">
                    <div className="w-24 h-24 shrink-0">
                      <img
                        src={item.images}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between p-4">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {item.description}
                        </p>
                        {item.restaurant && (
                          <p className="text-xs text-gray-400 mt-1">
                            From:{" "}
                            {typeof item.restaurant === "object"
                              ? item.restaurant.name
                              : "Restaurant"}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold">
                          ${item.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Remove item"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                Your cart is empty
              </p>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>$2.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>
                      ${(parseFloat(getTotalPrice()) * 0.07).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>
                        $
                        {(
                          parseFloat(getTotalPrice()) +
                          2.99 +
                          parseFloat(getTotalPrice()) * 0.07
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button
                  className="w-full"
                  onClick={handleConfirmOrder}
                  disabled={cart.length === 0}
                >
                  Confirm Order
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleBackToOrder}
                >
                  Back to Menu
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Checkout;
