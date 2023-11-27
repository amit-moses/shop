import axios from "axios";
import NavbarCart from "../navbar/NavbarCart";
import CartRow from "./CartRow";
import Total from "./Total";
import Loader from "../Loader";
import { useState } from "react";

function Cart({ cartList, set_cart, api_url, cart_data, data_loader }) {
  const [loader, setLoader] = useState(false);
  function clear_cart(){
    setLoader(true);
    axios.delete(api_url + "cart/" + cart_data.id + "/").then((res) => {
      setLoader(false);
      set_cart(res.data);
      window.history.back();
    }).catch(error => {
      setLoader(false);
      console.log(error);
    });
  }
  return (
    <>
      <NavbarCart />
      <div className="mycart">
        <div className="">
          <div className="row">
            <div className="col-md-9 cart">
              <div className="title">
                <div className="row">
                  <div className="col">
                    <h4>
                      <b>Shopping Cart</b>
                    </h4>
                  </div>
                  <div className="col align-self-center text-right text-muted">
                  {data_loader? <Loader isLoad={true} loaderSize={10} inCart={""}/>:
                    <>{cartList.length} items</>
                  }
                  </div>
                  <div className="col align-self-center text-right text-muted">
                  {cartList.length? <button onClick={clear_cart} className="btn btn-outline-dark">{loader? <Loader loaderSize={8} isLoad={true} inCart={""}/>: "Clear cart"}</button>: ""}
                  </div>
                </div>
              </div>
              {cartList.sort((a, b) => a.id - b.id).map((cartitem, index) => (
                <CartRow
                cart_id={cart_data.id}
                api_url={api_url}
                  key={index}
                  cartitem={cartitem}
                  set_cart={set_cart}
                />
              ))}
            </div>
            {cartList.length ? <Total price={cart_data.total} api_url={api_url} set_cart={set_cart} cart_data={cart_data} /> : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
