"use client";
import React from "react";

import DATA from "./data";
import reducer from "./reducer";
import StoreItem from "./StoreItem";
import CheckoutFlow from "./CheckoutFlow";
import "./styles.css";

const CART_KEY = "cart";

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(reducer, []);

  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (typeof localStorage !== undefined) {
      const json = localStorage.getItem(CART_KEY);
      if (json) {
        const cart = JSON.parse(json);
        dispatch({
          type: "load-cart",
          cart,
        });
      }
      setIsLoaded(true);
    }
  }, []);

  React.useEffect(() => {
    if (typeof localStorage !== undefined) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items]);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: "add-item",
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          isLoaded={isLoaded}
          taxRate={0.15}
          handleDeleteItem={(item) =>
            dispatch({
              type: "delete-item",
              item,
            })
          }
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
