import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/braintreepaymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const BraintreePayment = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        setInfo({ clientToken: info.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const showBraintreeDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add some product to cart</h3>
        )}
      </div>
    );
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getFinalAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          console.log("PAYMENT SUCCESS", response);
          setInfo({ ...info, success: response.success, loading: false });

          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };

          createOrder(userId, token, orderData);

          cartEmpty(() => {
            console.log("CART EMPTY");
          });
          setReload(!reload);
        })
        .catch((err) => {
          console.log("PAYMENT FAIL", err);
          setInfo({ loading: false, success: false });
        });
    });
  };

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Your total is {getFinalAmount()}$</h3>
      {showBraintreeDropIn()}
    </div>
  );
};

export default BraintreePayment;
