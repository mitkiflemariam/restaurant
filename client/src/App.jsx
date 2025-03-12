import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Home from "./components/main/Home";
import { Toaster } from "./components/ui/toaster";

function App({ children }) {
  return (
    <>
        <BrowserRouter>
          <div className="relative min-h-screen flex flex-col dark:bg-[#1F1F1F]">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            {children}
            <Toaster />
          </div>
        </BrowserRouter>
    </>
  );
}

export default App;
