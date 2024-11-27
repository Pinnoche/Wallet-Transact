import React, { useState, useEffect } from "react";
import axios from "../axios";

function Wallet() {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");

  const fetchBalance = async () => {
    try {
      const response = await axios.get("/wallet/balance");
      setBalance(response.data.balance);
    } catch (err) {
      setError("Failed to fetch balance");
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Wallet</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {balance !== null ? (
        <p>Your balance: ${balance}</p>
      ) : (
        <p>Loading balance...</p>
      )}
    </div>
  );
}

export default Wallet;
