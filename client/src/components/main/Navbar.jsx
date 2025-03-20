import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { AuthContext } from "@/AuthContext";
// import { ShoppingBag } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const { isLoggedIn, userName, role, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="flex bg-[#171717] text-white justify-between items-center px-8 py-4">
      {/* <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 flex justify-between items-center py-4 px-8 shadow-md"> */}
      <div className="text-2xl font-bold">
        <Link to="/" aria-label="Home">
          Restaurant
        </Link>
      </div>

      <div className="flex space-x-8">
        {role === "admin" && (
          <Link to="/admin" aria-label="Admin Dashboard">
            Admin Dashboard
          </Link>
        )}

        {/* <Link to="/customer" aria-label="Customer Dashboard">
          Customer Dashboard
        </Link> */}

        {/* <Link to="/checkout" aria-label="checkout">
          Checkout
        </Link> */}

        <Link to="/" aria-label="home">
          Home
        </Link>

        <Link to="/confirmation" aria-label="confirmation">
          Confirmation
        </Link>

        <Link to="/order" aria-label="order">
          Order
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/order" className="relative" aria-label="Shopping Cart">
          {/* <ShoppingBag className="h-6 w-6 text-white" /> */}
          <FontAwesomeIcon
            icon={faShoppingCart}
            style={{ color: "orange" }}
            size="2x"
          />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            0
          </span>
        </Link>
        {isLoggedIn ? (
          <div className="flex space-x-8">
            <p>Welcome, {userName || "User"}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button variant="ghost" className="w-24" asChild>
              <Link to="/login" aria-label="login">
                Sign in
              </Link>
            </Button>

            <Button variant="ghost" className="w-24" asChild>
              <Link to="/signup" aria-label="sign up">
                Sign up
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
