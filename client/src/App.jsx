import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Home from "./components/main/Home";
import { Toaster } from "./components/ui/toaster";
import { MainLayout } from "./components/layout/MainLayout";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Order from "./pages/Order";
import Login from "./components/main/signin";
import SignUp from "./components/main/signup";

function App({ children }) {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <div className="relative flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/customer" element={<CustomerDashboard />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/order" element={<Order />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
            {children}
            <Toaster />
          </div>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
