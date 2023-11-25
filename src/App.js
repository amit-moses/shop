import { BrowserRouter, Routes, Route } from "react-router-dom";

import Edit from "./components/editor/Edit";
import Home from "./components/home/Home";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Cart from "./components/checkout/Cart";

function App() {
  const [cartData, setCartData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [totalPay, setTotalPay] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const api_url = "https://shop-rest.onrender.com/"
  function setMyCart(data){
      setCartList(data.cartitem); 
      setTotalPay(data.total);
      setCartData((({ cartitem, ...rest }) => rest)(data));
  }
  useEffect(() => {
    if(Cookies.get("cart_id")){
      axios.get(api_url + "cart/" + Cookies.get("cart_id") + "/").then((res) => {
        setMyCart(res.data)
    });
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home productsList={productsList} setProductsList={setProductsList} categoryList={categoryList} setCategoryList={setCategoryList} set_cart={setMyCart} api_url={api_url} cartList={cartList} />} />
        <Route path="/edit" element={<Edit api_url={api_url} />} />
        <Route path="/mycart" element={<Cart api_url={api_url} set_cart={setMyCart} cartList={cartList} total_to_pay={totalPay} cart_data={cartData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
