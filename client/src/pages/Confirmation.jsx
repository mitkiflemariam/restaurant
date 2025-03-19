import React from "react";
import { useNavigate } from "react-router-dom";
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

const Confirmation = () => {
  const navigate = useNavigate();
  const orderNumber = Math.floor(100000 + Math.random() * 900000); // Order number that is generic

  const orderDetails = {
    number: orderNumber,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    estimatedDelivery: "30-45 minutes",
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  const handleOrder = () => {
    navigate("/order");
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
        <Button
          variant="outline"
          onClick={handleReturnHome}
          className="w-full sm:w-auto"
        >
          Return to Home
        </Button>
        <Button onClick={handleOrder} className="w-full sm:w-auto">
          Order Again
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Confirmation;
