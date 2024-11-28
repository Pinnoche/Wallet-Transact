import React, { useState, useEffect } from "react";
import axios from "../axios";

function Wallet() {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(""); 
  const [recipientId, setRecipientId] = useState(""); 
  const [transferAmount, setTransferAmount] = useState(""); 
  const [transferSuccess, setTransferSuccess] = useState(""); 

  // Fetch wallet balance
  const fetchBalance = async () => {
    try {
      const response = await axios.get("/wallet/balance");
      setBalance(response.data.balance);
      setError("");
    } catch (err) {
      setError("Failed to fetch balance");
    }
  };

  // Perform fund transfer
  const handleTransfer = async (e) => {
    e.preventDefault(); 
    setError(""); 
    setTransferSuccess(""); 

 
    if (!recipientId || !transferAmount) {
      setError("Please provide both recipient ID and transfer amount.");
      return;
    }
    if (parseFloat(transferAmount) <= 0) {
      setError("Transfer amount must be greater than 0.");
      return;
    }

    try {
      const response = await axios.post("/wallet/transfer", {
        recipient_id: recipientId,
        amount: parseFloat(transferAmount),
      });
      setTransferSuccess(response.data.message || "Transfer successful!");
      fetchBalance(); 
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to complete the transfer."
      );
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Wallet</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {transferSuccess && <p style={{ color: "green" }}>{transferSuccess}</p>}
      {balance !== null ? (
        <p>Your balance: ${balance}</p>
      ) : (
        <p>Loading balance...</p>
      )}

      {/* Transfer Form */}
      <form onSubmit={handleTransfer}>
        <h3>Transfer Funds</h3>
        <div>
          <label>Recipient ID:</label>
          <input
            type="number"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            placeholder="Enter recipient ID"
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
}

export default Wallet;
