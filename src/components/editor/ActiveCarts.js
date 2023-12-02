import { useState } from "react";
import Loader from "../Loader";
import ActiveCart from "./ActiveCart";

function ActiveCarts({ carts_list, load }) {
  const [filter, setFilter] = useState(0);
  const [search, setSearchKey] = useState("");

  function help_filter(mycart) {
    let to_return = filter
      ? filter === 1
        ? mycart.is_paid
        : !mycart.is_paid
      : true;
    if (search) {
      if (mycart.buyer) {
        return (
          to_return && mycart.buyer.toLowerCase().includes(search.toLowerCase())
        );
      } else return false;
    } else return to_return;
  }

  return (
    <div className="row col-md-12">
      <div className="col-md-8">
        <input
          id="inp7"
          type="text"
          placeholder="search by buyer username"
          className="form-control mb-3"
          onChange={(e) => setSearchKey(e.target.value)}
        ></input>
      </div>
      <div className="col-md-4">
        <select
          onChange={(e) => setFilter(parseInt(e.target.value))}
          aria-label="Default select example"
          className="form-select mb-3"
        >
          <option value="0">all</option>
          <option value="1">paid</option>
          <option value="2">unpaid</option>
        </select>
        {load && <Loader loaderSize={8} inCart={""} isLoad={true} />}
      </div>
      <table className="table" border="1">
        <thead className="thead-dark">
          <tr>
            <th colSpan="1" scope="col">
              created
            </th>
            <th colSpan="1" scope="col">
              buyer
            </th>
            <th colSpan="1" scope="col">
              promocode
            </th>
            <th colSpan="1" scope="col">
              products
            </th>
            <th colSpan="1" scope="col">
              total price
            </th>
            <th colSpan="1" scope="col">
              total to pay
            </th>
            <th colSpan="1" scope="col">
              status
            </th>
            <th colSpan="1" scope="col"></th>
          </tr>
        </thead>
        <tbody id="tablebody">
          {carts_list.map((mycart, index) => (
            <ActiveCart
              cart={mycart}
              key={index}
              visable={help_filter(mycart)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActiveCarts;
