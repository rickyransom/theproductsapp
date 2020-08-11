import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Homepage(props) {
  const [products, updProducts] = useState([]);

  const [sortedProducts, updSortedProducts] = useState([]);

  useEffect(() => {
    updProducts(props.prodData);
    updSortedProducts(props.prodData);
  }, [props.prodData]);

  useEffect(() => { });

  const handleChange = (e) => {
    const results = [...sortedProducts].filter((product) => {
      if (product.name.toUpperCase().includes(e.target.value.toUpperCase())) {
        return true;
      }
    });
    updProducts(results);
  };

  const sortArr = () => {
    const arrSort = [...products].sort((a, b) => {
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      } else {
        return 0;
      }
    });
    return arrSort;
  };

  const sortArrPrice = () => {
    const arrSort = [...products].sort((a, b) => {
      return a.price - b.price;
    });
    return arrSort;
  };

  const handleSelect = (e) => {
    e.preventDefault();
    if (e.target.value === "alphaAscend") {
      updProducts(sortArr());
    } else if (e.target.value === "alphaDescend") {
      updProducts(sortArr().reverse());
    } else if (e.target.value === "priceAscend") {
      updProducts(sortArrPrice());
    } else if (e.target.value === "priceDescend") {
      updProducts(sortArrPrice().reverse());
    }
  };

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search"
        onChange={handleChange}
      />
      <br />
      <label htmlFor="sort">
        SORT BY:
        <select name="sort" onChange={handleSelect}>
          <option value="alphaAscend">Alphabetically, A-Z</option>
          <option value="alphaDescend">Alphabetically, Z-A</option>
          <option value="priceAscend">Price, low to high</option>
          <option value="priceDescend">Price, high to low</option>
        </select>
      </label>
      <div className="product-display">
        {products[0] &&
          products.map((product) => {
            return (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="product-card">
                  <img src={product.imgURL} />
                  <p className="product-card-name">{product.name}</p>
                  <p className="price">${product.price}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Homepage;