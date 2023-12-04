import Categories from "./Categories";
import Products from "./Products";
import { useEffect, useState } from "react";
import axios from "axios";
import Promocodes from "./Promocodes";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ActiveCarts from "./ActiveCarts";
import Customers from "./Customers";

function Edit({
  api_url,
  productsList,
  categoryList,
  refi,
  setCategoryList,
  setProductsList,
}) {
  const [promoList, setPromoList] = useState([]);
  const [cart_list, setCarts] = useState([]);
  const [customers_list, setCustomers] = useState([]);
  const [refresh_promo, setRefresh_promo] = useState(0);
  const [load, setLoad] = useState(true);
  const token = localStorage.getItem("token");
  const navigate_to = useNavigate();

  useEffect(() => {
    try {
      if (!token || !jwtDecode(token).is_staff) {
        navigate_to("/");
      }
    } catch (error) {
      console.error(error);
    }
  }, [token, navigate_to]);

  function ref_promo() {
    setRefresh_promo(refresh_promo + 1);
  }
  useEffect(() => {
    if (api_url && token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(api_url + "/promo/")
        .then((res) => {
          setPromoList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(api_url + "/carts/")
        .then((res) => {
          setCarts(res.data);
          setLoad(false);
        })
        .catch((error) => {
          console.log(error);
        });

        axios
        .get(api_url + "/customers/")
        .then((res) => {
          setCustomers(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [refresh_promo, api_url, token]);

  return (
    <>
      <section className="py-2 container">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item mt-1" style={{ marginRight: "10px" }}>
            <a className="navbar-brand" href="https://shop-react.onrender.com/">
              <img style={{ height: "30px" }} src="/logo192.png" alt="..." />
              React Shop
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Edit products
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Edit categories
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Edit promocodes
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-carts-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-carts"
              type="button"
              role="tab"
              aria-controls="pills-carts"
              aria-selected="false"
            >
              Active carts
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-customers-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-customers"
              type="button"
              role="tab"
              aria-controls="pills-customers"
              aria-selected="false"
            >
              Customers
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="row col-md-12">
              <Products
                refresh={refi}
                productsList={productsList}
                setProductsList={setProductsList}
                categoryList={categoryList}
                api_url={api_url}
              />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div className="row col-md-12">
              <Categories
                setCategoryList={setCategoryList}
                api_url={api_url}
                categoryList={categoryList}
                refresh={refi}
              />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            <div className="row col-md-12">
              <Promocodes
                api_url={api_url}
                promoList={promoList}
                setPromoList={setPromoList}
                refresh={ref_promo}
              />
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="pills-carts"
            role="tabpanel"
            aria-labelledby="pills-carts-tab"
          >
            <div className="row col-md-12">
              <ActiveCarts api_url={api_url} load={load} carts_list={cart_list} />
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="pills-customers"
            role="tabpanel"
            aria-labelledby="pills-customers-tab"
          >
            <div className="row col-md-12">
              <Customers setCustomers={setCustomers} customers_list={customers_list} api_url={api_url}/>
            </div>
          </div>


        </div>
      </section>
    </>
  );
}

export default Edit;
