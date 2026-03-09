import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./auth/Login";
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
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
