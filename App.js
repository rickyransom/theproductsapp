import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Product from "./Product";

import axios from "axios";
import "./App.css";

function App() {
  const [prodData, updProdData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        "https://products-api-01.herokuapp.com/api/products"
      );

      //console.log(data.data);
      updProdData(data.data);
    };
    getData();
  }, []);
  return (
    <div>
      <header>
        <Link to="/">
          <h1>ProductsApp</h1>
        </Link>
      </header>
      <div className="main-app">
        <Route exact path="/">
          <Homepage prodData={prodData} />
        </Route>
        <Route path="/product/:id" exact>
          <Product prodData={prodData} />
        </Route>
      </div>
    </div>
  );
}

export default App;
