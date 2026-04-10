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
<Toaster
  position="top-center"
  gutter={10}
  toastOptions={{
    duration: 3500,
    style: {
      background: '#ffffff',
      color: '#071952',
      border: '1px solid #daeef2',
      borderRadius: '16px',
      fontSize: '13px',
      fontWeight: '500',
      boxShadow: '0 8px 32px rgba(7,25,82,0.12)',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
     
    },
    success: {
      iconTheme: { primary: '#088395', secondary: '#ffffff' },
      style: {
        borderLeft: '4px solid #37B7C3',
        borderRadius: '16px',
      },
    },
    error: {
      iconTheme: { primary: '#ef4444', secondary: '#ffffff' },
      style: {
        borderLeft: '4px solid #ef4444',
        borderRadius: '16px',
      },
    },
  }}
/>
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
