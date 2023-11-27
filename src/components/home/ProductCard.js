import axios from 'axios';
import Loader from '../Loader';
import { useState } from 'react';

function ProductCard({ product, in_cart, api_url, set_cart, cart_id }) {
  const [loader, setLoader] = useState(false);

  function update_cart(to_change){
    const urlm = cart_id ?cart_id:'0'
    const product_to_add = {
      product: product.id,
      quantity: to_change,
    };
    in_cart += to_change;
    setLoader(true);
    axios
      .put(api_url + "cart/"+urlm+"/", product_to_add)
      .then((res) => {
        if(!cart_id && !localStorage.getItem('token')){localStorage.setItem("cart_id", res.data.id);}
        set_cart(res.data)
        setLoader(false);
      });
  }
    const boxstyle = {
        width: "100%",
        height: "180px",
	    objectFit: "cover",
    }
  return (
    <div className="col mb-5">
      <div className="card h-100">
        {/* <!-- Product image--> */}
        <div style={{position: "relative"}}>
          <img style={boxstyle} className="card-img-top" src={product.image} alt="..." />
        </div>
        {/* <!-- Product details--> */}
        <div className="card-body p-4">
          <div className="text-center">
            {/* <!-- Product name--> */}
            <h5 className="fw-bolder">{product.name}</h5>
            {/* <!-- Product price--> */}$ {product.price}
          </div>
        </div>
        {/* <!-- Product actions--> */}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            {0 < in_cart? 
            <>
            <button disabled={loader} style={{marginRight: "10px", visibility: in_cart < product.stock? "visible": "hidden"}} onClick={() => update_cart(1)} className="btn btn-outline-dark mt-auto">+</button>
            <Loader isLoad={loader} inCart={in_cart < product.stock? in_cart: "last " + in_cart} loaderSize={8}/>
            <button disabled={loader} style={{marginLeft: "10px"}} onClick={() => update_cart(-1)} className="btn btn-outline-dark mt-auto">-</button>
            </>
            : 
            loader ? <Loader isLoad={true} inCart={''} loaderSize={8} />: 0 < product.stock? <button onClick={() => update_cart(1)} className="btn btn-outline-dark mt-auto">Add to cart</button>: <button disabled className="btn btn-outline-dark mt-auto">Out of stock</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
