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
  const [my_cart_id, setCartId] = useState(0);
  const [refresh_add, setRefresh] = useState(0);
  const [refresh_items, setRefreshItems] = useState(0);
  const api_url = "https://shop-rest.onrender.com/";
  // const api_url = "http://127.0.0.1:8000/";
  

  function setMyCart(data) {
    setCartList(data.cartitem);
    setTotalPay(data.total);
    setCartId(data.id);
    setCartData((({ cartitem, ...rest }) => rest)(data));
    if (!data.buyer) {
      localStorage.setItem("cart_id", data.id);
    }
  }

  function check_session(token) {
    const expirationTime = jwtDecode(token).exp * 1000;
    const currentTime = Date.now();
    return currentTime < expirationTime;
  }

  function logout() {
    const my_token = localStorage.getItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    const cart_id_user = parseInt(jwtDecode(my_token).cart_id);
    if (
      !cart_id_user ||
      cart_id_user === parseInt(localStorage.getItem("cart_id"))
    ) {
      localStorage.removeItem("cart_id");
    }
    window.location.reload();
  }

  function refresh_func() {
    setRefresh(refresh_add + 1);
  }
  function refresh_func_item() {
    setRefreshItems(refresh_items + 1);
  }

  useEffect(() => {
    function updateProducts(api) {
      axios
        .get(api + "products/")
        .then((res) => {
          setProductsList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function updateCategorey(api) {
      axios
        .get(api + "category/")
        .then((res) => {
          setCategoryList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    updateCategorey(api_url);
    updateProducts(api_url);
  }, [refresh_items]);

  useEffect(() => {
    function get_token_cart(my_cart) {
      axios
        .post(api_url + "token/refresh/", {
          refresh: localStorage.getItem("refresh"),
        })
        .then((res) => {
          const new_token = res.data.access;
          localStorage.setItem("token", new_token);
          get_cart(my_cart, new_token);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function get_cart(my_cart, req_token) {
      setLoader(true);
      const api_to = req_token ? "usercart" : "cart/" + (my_cart ? my_cart : 0);
      if (req_token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${req_token}`;
      }
      axios
        .get(api_url + api_to + "/", { params: { cart_id: my_cart } })
        .then((res) => {
          setMyCart(res.data);
          setLoader(false);
        })
        .catch((error) => {
          localStorage.removeItem("cart_id");
          setCartId(0);
          setLoader(false);
          console.log(error);
        });
    }
    const my_token = localStorage.getItem("token");
    const my_refresh = localStorage.getItem("refresh");
    const my_cart_id = localStorage.getItem("cart_id");
    if (my_token && my_refresh) {
      if (!check_session(my_refresh)) {
        logout();
      } else if (check_session(my_token)) {
        get_cart(my_cart_id, my_token);
      } else {
        get_token_cart(my_cart_id);
      }
    } else if (my_cart_id) {
      get_cart(my_cart_id, my_token);
    }
  }, [refresh_add, refresh_items]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              logout={logout}
              nav_loader={loader}
              cart_id={my_cart_id}
              productsList={productsList}
              categoryList={categoryList}
              set_cart={setMyCart}
              api_url={api_url}
              cartList={cartList}
            />
          }
        />
        <Route
          path="/edit"
          element={
            <Edit
              api_url={api_url}
              productsList={productsList}
              setProductsList={setProductsList}
              categoryList={categoryList}
              refi={refresh_func_item}
              setCategoryList={setCategoryList}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginRegister
              setCartId={setCartId}
              refi={refresh_func}
              api_url={api_url}
            />
          }
        />
        <Route
          path="/mycart"
          element={
            <Cart
              data_loader={loader}
              api_url={api_url}
              set_cart={setMyCart}
              cartList={cartList}
              total_to_pay={totalPay}
              cart_data={cartData}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
