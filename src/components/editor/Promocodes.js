import axios from "axios";
import { useState } from "react";
import Promo from "./Promo";
import Loader from "../Loader";

function Promocodes({api_url, promoList, setPromoList, refresh}) {
    const [p_code, setCode] = useState("");
    const [p_dis, setDis] = useState();
    const [load_add, setLoad] = useState(false);

    function addPromo() {
      setLoad(true);
      const promo_to_add = {
        code: p_code,
        used: false,
        discount: parseInt(p_dis)
      };
      axios
        .post(api_url + "promo/", promo_to_add)
        .then((res) => {
          console.log(res.data);
          refresh();
          setCode("");
          setDis("");
          setLoad(false);
        }).catch((res) =>{
            console.log(res);
            setLoad(false);
        });
    }
    function handleSubmit(event) {
      event.preventDefault();
      addPromo();
    }
  
    return (
      <>
      <div className="container">
      </div>
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                id="inp1"
                value={p_code}
                type="text"
                className="form-control"
                onChange={(e) => setCode(e.target.value)}
              ></input>
              <label htmlFor="inp1">code</label>
            </div>
  
            <div className="form-floating mb-3">
              <input
                id="inp5"
                value={p_dis}
                min="0" 
                max="100"
                type="number"
                className="form-control"
                onChange={(e) => setDis(e.target.value)}
              ></input>
              <label htmlFor="inp5">discount</label>
            </div>
  
            <br />
            <input
              className="btn btn-primary"
              value={"add"}
              type="submit"
            ></input>
            {load_add && <Loader loaderSize={8} inCart={""} isLoad={true}/>}
          </form>
        </div>
            
        <div className="col-md-8">
          <table className="table table-striped" border="1">
            <thead className="thead-dark">
              <tr>
                <th scope="col">code</th>
                <th scope="col">discount</th>
                <th scope="col">used</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody id="tablebody">
              {promoList.map((promo, index) => (
                <Promo promo={promo} key={index} api_url={api_url} promoList={promoList} setPromoList={setPromoList} refi={refresh}/>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
}

export default Promocodes