import { useState } from "react";
import axios from 'axios';
import Loader from "../Loader";


function Total({set_cart, api_url, cart_data}) {
  const [ed_promo, setPromo] = useState("");
  const [errorMsg, setError] = useState();
  const [loader, setLoader] = useState(false);


  function update_promo(promo){
    setError();
    setLoader(Boolean(promo));
    axios.post(api_url + "/updatepromo/" + cart_data.id + "/", {promocode: promo})
    .then((res) => {
      set_cart(res.data);
      if(promo !== -1 ){
        if(res.data.promocode){
          if(res.data.promocode.code !== promo ){setError(promo);}
        } 
        else {setError(promo);}
        setPromo("");
      }
      setLoader(false);
    }).catch(error => {
      setLoader(false);
      console.log(error);
    });
    
  }
  return (
    <div className="col-md-3 summary navbar-light bg-light">
      <div>
        <h5>
          <b>Summary</b>
        </h5>
      </div>
      <hr></hr>

      <form>
        <p>SHIPPING</p>
        <select>
          <option className="text-muted">Standard-Delivery- $ 5.00</option>
        </select>
        <p>GIVE CODE</p>
        <div className="input-group">
          <input value={ed_promo} id="code" placeholder="Enter your code" className="form-control rounded-0" onChange={(e) => setPromo(e.target.value)} />
          <div className="input-group-append">
            <button onClick={() => update_promo(ed_promo)} className="btn btn-outline-dark rounded-0" type="button">update</button>
          </div>
        </div>
        {loader && <div className="text-center">
          <Loader isLoad={true} inCart={''} loaderSize={10}/>
        </div>}
        {errorMsg && <div className="alert alert-danger" role="alert">
          {errorMsg} is not available!
        </div>}
        

        {cart_data.promocode && 
        <div className="alert alert-success" role="alert">
          <button type="button" className="btn btn-outline-dark" onClick={() => update_promo(-1)}>
              <span aria-hidden="true">&times;</span>
            </button>
            &nbsp;&nbsp;&nbsp;
          {cart_data.promocode.code} &nbsp; {cart_data.promocode.discount + '%'}
          </div>}
      </form>

      <div
        className="row"
        style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
      >
        <div className="col">{cart_data.promocode ? "PRICE BEFORE": "TOTAL PRICE"} </div>
        <div className="col text-right">$ {cart_data.promocode ? <del>{cart_data.total_before + 5} </del> : cart_data.total_before + 5} </div>  
      </div>

      {cart_data.promocode && 
        <div
        className="row"
        style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
      >
        <div className="col">TOTAL PRICE</div>
        <div className="col text-right">$ {cart_data.total + 5} </div>  
      </div>}
      <button className="btn btn-outline-dark">CHECKOUT</button>

    </div>
  );
}

export default Total;
