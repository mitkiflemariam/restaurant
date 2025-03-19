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
import Login from "./components/main/Signin";
import SignUp from "./components/main/Signup";
import ResetPassword from "./components/main/resetpassword";
import RequestReset from "./components/main/RequestReset";

// import swaggerDocs from "@/lib/swagger";

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
              <Route path="/request-reset" element={<RequestReset />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
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
