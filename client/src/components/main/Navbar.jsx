import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/AuthContext";
// import { ShoppingBag } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCart } from "lucide-react";
import Profile from "./Profile";

const Navbar = () => {
  const { isLoggedIn, userName, role, ownerId, logout } =
    useContext(AuthContext);
  const [cartTotal, setCartTotal] = useState("0");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRestaurant = async () => {
      if (role === "owner") {
        try {
          const res = await fetch("http://localhost:3000/api/restaurants"); // Adjust if needed
          console.log("the id is ...", ownerId);
          const data = await res.json();

          // If user owns only one restaurant:
          // setRestaurant(data[0]);
          // setRestaurant(data);

          // If you want to filter based on owner ID, do it here if backend doesn't
          // Example:
          if (Array.isArray(data)) {
            const myRestaurant = data.find((r) => r.owner === ownerId);
            console.log(myRestaurant);
            setRestaurant(myRestaurant);
            navigate("/restaurantdashboard");
          } else {
            console.error("Expected an array but got:", data);
          }
        } catch (error) {
          console.error("Failed to fetch restaurant:", error);
        }
      }
    };

    fetchRestaurant();
  }, [role]);

  useEffect(() => {
    // Function to update cart data from Order page state
    const updateCartData = () => {
      const handler = setInterval(() => {
        const orderState = localStorage.getItem("orderCart");
        if (orderState) {
          try {
            const cart = JSON.parse(orderState);
            if (Array.isArray(cart) && cart.length > 0) {
              // Set item count
              setCartItemCount(cart.length);

              // Calculate total price
              let total = 0;
              cart.forEach((item) => {
                total += Number(item.price);
              });
              setCartTotal(total.toFixed(2));
            } else {
              setCartItemCount(0);
              setCartTotal("0");
            }
          } catch (e) {
            setCartItemCount(0);
            setCartTotal("0");
          }
        }
      }, 1000);

      return () => clearInterval(handler);
    };

    const cleanup = updateCartData();
    return cleanup;
  }, []);

  const handleLogout = () => {
    logout();
  };

  // Derive initials from userName (e.g., "John Doe" -> "JD")
  const getInitials = (name) => {
    if (!name) return "UN";
    const nameParts = name.split(" ");
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  // User object for Profile component
  const user = {
    imageUrl: null, // Replace with actual image URL if available in AuthContext
    name: userName,
    initials: getInitials(userName),
  };

  return (
    <nav className="flex bg-[#171717] text-white justify-between items-center px-8 py-4">
      {/* <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 flex justify-between items-center py-4 px-8 shadow-md"> */}
      <div className="text-2xl font-bold">
        {role === "owner" ? (
          // <Link to="#"{`/restaurant/${restaurant?._id}`} aria-label="Restaurant">
          <Link to="/restaurantdashboard" aria-label="Restaurant">
            {restaurant?.logo ? (
              <img
                src={restaurant.logo}
                alt={restaurant.name}
                className="h-10 w-auto"
              />
            ) : (
              restaurant?.name || "Restaurant"
              // getRestaurant()?.name || "Restaurant"
            )}
          </Link>
        ) : (
          <Link to="/" aria-label="Home">
            CCL EAT
          </Link>
        )}
      </div>

      <div className="flex space-x-8">
        {role === "owner" ? (
          <>
            <Link to="/restaurantdashboard" aria-label="home">
              Home
            </Link>
            <Link
              // to={`/restaurant/${restaurant?._id}/foods`}
              to={"/restorantadmin"}
              aria-label="Food Items"
            >
              Restaurant Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link to="/" aria-label="home">
              Home
            </Link>
            <Link to="/order" aria-label="order">
              Order
            </Link>

            {role === "admin" && (
              <Link to="/admin" aria-label="Admin Dashboard">
                Admin Dashboard
              </Link>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-6">
        {role === "customer" && (
          <Link
            to="/order"
            className="relative flex items-center group hover:bg-gray-800 px-3 py-1.5 rounded-lg transition-colors"
            aria-label="Shopping Cart"
          >
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-orange-500 group-hover:text-orange-400 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium rounded-full min-h-5 min-w-5 px-1 flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </div>
            <div className="ml-2 flex flex-col">
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                Cart
              </span>
              {cartTotal !== "0" && (
                <span className="text-xs text-orange-400 group-hover:text-orange-300 transition-colors">
                  ${parseFloat(cartTotal).toFixed(2)}
                </span>
              )}
            </div>
          </Link>
        )}
        {isLoggedIn ? (
          <div className="flex space-x-8 items-center">
            <p>Welcome, {userName || "User"}!</p>
            <Profile user={user} />
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          role !== "owner" && (
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
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
