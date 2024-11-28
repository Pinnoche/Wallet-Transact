import { Navigate } from "react-router-dom";
import { useState } from "react";

function Welcome() {
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [redirectWallet, setRedirectWallet] = useState(false);
  const [redirectOrder, setRedirectOrder] = useState(false);

  return (
    <div>
      Welcome
      <br />
      <br />
      <button onClick={() => setRedirectLogin(true)}>Login</button>
      {redirectLogin && <Navigate to="/login" />}
      <br />
      <br />
      <br />
      <button onClick={() => setRedirectWallet(true)}>Go to Wallet</button>
      {redirectWallet && <Navigate to="/wallet" />}
      <br />
      <br />
      <br />
      <button onClick={() => setRedirectOrder(true)}>Check Order</button>
      {redirectOrder && <Navigate to="/order" />}
    </div>
  );
}

export default Welcome;
