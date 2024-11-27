import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Wallet from "./components/Wallet";
import Order from "./components/Order";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
