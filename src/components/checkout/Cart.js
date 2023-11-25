import axios from "axios";
import NavbarCart from "../navbar/NavbarCart";
import CartRow from "./CartRow";
import Total from "./Total";
import Cookies from "js-cookie";

function Cart({ cartList, set_cart, api_url, cart_data }) {
  function clear_cart(){
    axios.delete(api_url + "cart/" + Cookies.get("cart_id") + "/").then((res) => {
      console.log(res.data)
      set_cart(res.data)
      window.history.back();
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
                    {cartList.length} items
                  </div>
                  <div className="col align-self-center text-right text-muted">
                  {cartList.length? <button onClick={clear_cart} className="btn btn-outline-dark">Clear cart</button>: ""}
                  </div>
                </div>
                

              </div>
              {cartList.sort((a, b) => a.id - b.id).map((cartitem, index) => (
                <CartRow
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
