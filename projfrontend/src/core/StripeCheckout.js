import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        //
        console.log("stripe response", response);
        cartEmpty(() => {
          console.log("Cart emty");
        });
      })
      .catch((err) => console.log("stripe error", err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_nZQ89HYGYKYnkXKi7CEJ7E7L00pYxx7enA"
        token={makePayment}
        name="Buy Tshirts"
        amount={getFinalAmount() * 100}
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h1 className="text-white">Stripe Checkout {getFinalAmount()}</h1>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
