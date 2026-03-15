import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Pharmacy from "./pages/Pharmacy";
import Emergency from "./pages/Emergency";
import ICU from "./pages/ICU";
import Pediatrics from "./pages/pediatrics";
import Surgery from "./pages/Surgery";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
  
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/icu" element={<ICU />} />
          <Route path="/pediatrics" element={<Pediatrics />} />
          <Route path="/surgery" element={<Surgery />} />

        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
