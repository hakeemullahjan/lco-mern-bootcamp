import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Title Page" description="Welcome to the T-shirt Store">
      <div className="row text-center">
        <h1 className="text-white">All of Tshirts</h1>
        <div className="row">
          {products &&
            products.map((product, index) => {
              return (
                <div className="col-4 mb-4" key={index}>
                  <Card product={product} />
                </div>
              );
            })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
