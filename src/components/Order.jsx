import React, { useState } from "react";
import axios from "../axios";

const Order = () => {
  const [amount, setAmount] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleOrder = async (e) => {
    e.preventDefault();

    if (parseFloat(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/order/initiate", {
        amount: parseFloat(amount),
      });
      setOrderStatus(response.data.message || "Order initiated successfully.");
      setOrderId(response.data.order.id);
    } catch (err) {
      setError(err.response ? err.response.data.error : "Something went wrong");
      setOrderStatus("");
    } finally {
      setLoading(false); 
    }
  };

  const checkOrderStatus = async () => {
    if (!orderId) {
      setError("No order ID found.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`/order/status/${orderId}`);
      setOrderStatus(`Order Status: ${response.data.order.status}`);
    } catch (err) {
      setError(
        err.response ? err.response.data.error : "Failed to fetch order status."
      );
      setOrderStatus(""); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Place Order</h2>

      <form onSubmit={handleOrder}>
        <div>
          <label>Order Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Initiate Order"}
        </button>
      </form>

      {orderStatus && <p>{orderStatus}</p>}

      {orderId && (
        <div>
          <button onClick={checkOrderStatus} disabled={loading}>
            {loading ? "Fetching Status..." : "Check Order Status"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Order;
