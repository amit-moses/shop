import axios from "axios";
import Loader from "../Loader";
import { useState } from "react";

function CartRow({cartitem, set_cart, api_url, cart_id}) {
  const [loader, setLoader] = useState(false);
    function update_cart(to_change){
        const urlm = cart_id?cart_id:'0'
        const product_to_add = {
          product: cartitem.product.id,
          quantity: to_change,
        };
        setLoader(true);
        axios
          .put(api_url + "cart/"+urlm+"/", product_to_add)
          .then((res) => {
            if(!cart_id){localStorage.setItem("cart_id", res.data.id);}
            set_cart(res.data);
            setLoader(false);
          }).catch(error => {
            console.log("this cart dosen't belong to you");
            localStorage.removeItem('cart_id');
            setLoader(false);
            window.location.reload();
          });
      }
      const totalfor = cartitem.product.price * cartitem.quantity;
  return (
    <div className="row border-top border-bottom">
      <div className="row main align-items-center">
        <div className="col-2">
          <img
            alt="..."
            className="img-fluid"
            src={cartitem.product.image}
          />
        </div>
        <div className="col">
          <div className="row">{cartitem.product.name}</div>
          <div className="row">$ {cartitem.product.price}</div>
        </div>

        <div className="col">
        <button disabled={loader} style={{marginRight: "3px", visibility: cartitem.quantity < cartitem.product.stock? "visible": "hidden"}} onClick={() => update_cart(1)} className="btn btn-outline-dark mt-auto text-center btn-m">+</button>
        <Loader isLoad={loader} inCart={cartitem.quantity < cartitem.product.stock? cartitem.quantity: "last " + cartitem.quantity} loaderSize={7}/>
        <button disabled={loader} style={{marginLeft: "3px"}} onClick={() => update_cart(-1)} className="btn btn-outline-dark mt-auto text-center btn-m">-</button>
        </div>

        <div className="col">
          $ {totalfor.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default CartRow;
