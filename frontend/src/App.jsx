import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
