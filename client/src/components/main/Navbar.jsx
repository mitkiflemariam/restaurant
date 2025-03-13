import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-6 px-8">
      <div className="text-2xl font-bold">
        <Link to="/" aria-label="Home">
          Restaurant
        </Link>
      </div>

      <div className="flex space-x-8">
        <Link to="/admin" aria-label="Admin Dashboard">
          Admin Dashboard
        </Link>

        <Link to="/customer" aria-label="Customer Dashboard">
          Customer Dashboard
        </Link>

        <Link to="/checkout" aria-label="checkout">
          Checkout
        </Link>

        <Link to="/confirmation" aria-label="confirmation">
          Confirmation
        </Link>

        <Link to="/order" aria-label="order">
          Order
        </Link>
      </div>
      <div className="flex gap-4">
        <Button variant="ghost" className="w-24">
          Sign in
        </Button>
        <Button variant="default" className="w-24">
          Sign up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
