import { BrowserRouter, Routes, Route } from "react-router-dom";

import Edit from "./components/editor/Edit";
import Home from "./components/home/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import Cart from "./components/checkout/Cart";
import Login from "./components/login/Login";
import { jwtDecode } from "jwt-decode";

function App() {
  const [cartData, setCartData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [totalPay, setTotalPay] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loader, setLoader] = useState(false);
  const api_url = "https://shop-rest.onrender.com/"
  

  function setMyCart(data){
      setCartList(data.cartitem); 
      setTotalPay(data.total);
      setCartData((({ cartitem, ...rest }) => rest)(data));
      localStorage.setItem("cart_id", data.id);
      console.log(data);
  }

  function user_cart(my_cart, my_token){
    axios.get(api_url + "usercart/" + jwtDecode(my_token).user_id + "/", {
      params: {cart_id: my_cart}
    }).then((res) => {
      setMyCart(res.data);
      setLoader(false);
    });
  }
  function guest_cart(my_cart){
    axios.get(api_url + "cart/" + my_cart + "/").then((res) => {
      setMyCart(res.data);
      setLoader(false);
    });
  }

  function refresh_func(){
    setLoader(localStorage.getItem('cart_id') || localStorage.getItem('username'));
    const my_token = localStorage.getItem('token');
    const my_cart = localStorage.getItem('cart_id')
    if(my_token){user_cart(my_cart,my_token)}
    else if(my_cart){guest_cart(my_cart)}
  }
  useEffect(() => {
    refresh_func();
  }, []);
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home nav_loader={loader} cart_id={localStorage.getItem('cart_id')} productsList={productsList} setProductsList={setProductsList} categoryList={categoryList} setCategoryList={setCategoryList} set_cart={setMyCart} api_url={api_url} cartList={cartList} />} />
        <Route path="/edit" element={<Edit api_url={api_url} />} />
        <Route path="/login" element={<Login refi={refresh_func} api_url={api_url}/>} />
        <Route path="/mycart" element={<Cart api_url={api_url} set_cart={setMyCart} cartList={cartList} total_to_pay={totalPay} cart_data={cartData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
