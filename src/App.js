import { BrowserRouter, Routes, Route } from "react-router-dom";

import Edit from "./components/editor/Edit";
import Home from "./components/home/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import Cart from "./components/checkout/Cart";
import { jwtDecode } from "jwt-decode";
import LoginRegister from "./components/login/LoginRegister";

function App() {
  const [cartData, setCartData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [totalPay, setTotalPay] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [my_cart1, setCartId] = useState(localStorage.getItem('cart_id'));
  const api_url = "http://127.0.0.1:8000/"   
  // const api_url = "https://shop-rest.onrender.com/"

  function setMyCart(data, save){
      setCartList(data.cartitem); 
      setTotalPay(data.total);
      setCartData((({ cartitem, ...rest }) => rest)(data));
      if(save){localStorage.setItem("cart_id", data.id);}
      setCartId(data.id);
  }

  function user_cart1(my_cart, my_token){
    axios.defaults.headers.common["Authorization"] = `Bearer ${my_token}`;
    axios.get(api_url + "usercart/", {
      params: {cart_id: my_cart1}
    }).then((res) => {
      setMyCart(res.data, false);
      setLoader(false);
    }).catch(error => {
      console.log(error);
    });
  }

  function user_cart2(my_cart){
    axios.post(api_url + "token/refresh/", { refresh: localStorage.getItem('refresh') })
    .then((res) => {
      console.log(res.data)
      const new_token  = res.data.access;
      localStorage.setItem("token", new_token);
      user_cart1(my_cart, new_token)
    }).catch(error => {
      console.log(error);
    });
  }

  function user_cart_out(){
    logout();
    guest_cart();
  }

  function guest_cart(my_cart){
    axios.get(api_url + "cart/" + my_cart + "/").then((res) => {
      setMyCart(res.data, true);
      setLoader(false);
    }).catch(error => {
      console.log("this cart dosen't belong to you");
      localStorage.removeItem('cart_id');
      setCartId(0);
      setLoader(false);
    });
  }

  function check_session(token){
    const expirationTime = jwtDecode(token).exp * 1000;
    const currentTime = Date.now();
    return currentTime < expirationTime
  }

  function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
    if(parseInt(my_cart1) === parseInt(localStorage.getItem('cart_id'))){localStorage.removeItem('cart_id');}
    window.location.reload();
  }

  function refresh_func(){
    const my_token = localStorage.getItem('token');
    const my_refresh = localStorage.getItem('refresh');
    setLoader(my_token || my_cart1);
    if(my_token && my_refresh){
      console.log(check_session(my_token));
      if(!check_session(my_refresh)){user_cart_out();}
      else if(check_session(my_token)){user_cart1(my_cart1,my_token);}
      else{user_cart2(my_cart1);}
    }
    else if(my_cart1){guest_cart(my_cart1)}
  }

  useEffect(() => {
    refresh_func();
  }, []);
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home logout={logout} nav_loader={loader} cart_id={my_cart1} productsList={productsList} setProductsList={setProductsList} categoryList={categoryList} setCategoryList={setCategoryList} set_cart={setMyCart} api_url={api_url} cartList={cartList} />} />
        <Route path="/edit" element={<Edit api_url={api_url} />} />
        <Route path="/login" element={<LoginRegister refi={refresh_func} api_url={api_url}/>} />
        <Route path="/mycart" element={<Cart data_loader={loader} api_url={api_url} set_cart={setMyCart} cartList={cartList} total_to_pay={totalPay} cart_data={cartData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
