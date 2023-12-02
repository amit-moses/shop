import { useEffect, useState } from "react";
import Loader from "../Loader";
import Customer from "./Customer";
import { MdDelete, MdEmail } from "react-icons/md";
import SelectedUser from "./SelectedUser";

function Customers({ customers_list, api_url, setCustomers }) {
  const [search, setSearchKey] = useState("");
  const [user_list, setUsersSend] = useState([]);
  const [select_all, setSelectAll] = useState(false);
  const [rest_list, setRest]= useState(1);
  const [myAct, setAct] = useState(false);

  async function refi(usern){
    const newlt = customers_list.filter((item) => !usern.includes(item.username));
    setCustomers(newlt)
  }
  useEffect(() => {
    if (customers_list.length) {
      setUsersSend(select_all ? customers_list : []);
    }
  }, [customers_list, select_all]);

  function mangelist(toadd, cust) {
    const newlst = toadd
      ? [...user_list, cust]
      : user_list.filter((item) => item.username !== cust.username);
    setUsersSend(newlst);
  }
  return (
    <div className="col-md-12">
      <SelectedUser selecti={rest_list} selector={setRest} refi={refi} user_list={user_list} act_num={myAct} setAct={setAct} api_url={api_url}/>

      <button type="button" className="btn btn-primary mb-2" onClick={() => setAct(1)}>
        <MdEmail />
      </button>

      <button style={{marginLeft:"4px"}} type="button" className="btn btn-danger mb-2" onClick={() => setAct(2)}>
        <MdDelete />
      </button>

      <Loader loaderSize={8} inCart={""} isLoad={!customers_list.length} />
      <div className="col-md-12">
        <input
          id="inp7"
          type="text"
          placeholder="search by buyer username"
          className="form-control mb-3"
          onChange={(e) => setSearchKey(e.target.value)}
        ></input>
      </div>

      <table className="table" border="1">
        <thead className="thead-dark">
          <tr>
            <th colSpan="1" scope="col">
              <input
                checked={select_all}
                type="checkbox"
                onChange={(e) => {
                  setSelectAll(e.target.checked);
                }}
              ></input>
            </th>
            <th colSpan="1" scope="col">
              username
            </th>
            <th colSpan="1" scope="col">
              email
            </th>
            <th colSpan="1" scope="col">
              carts
            </th>
            <th colSpan="1" scope="col">
              applied
            </th>
            <th colSpan="1" scope="col">
              last login
            </th>
            <th colSpan="1" scope="col">
              staff
            </th>
            <th colSpan="1" scope="col"></th>
          </tr>
        </thead>
        <tbody id="tablebody">
          {customers_list.map((cust, index) => (
            <Customer
            selector={rest_list}
              select_all={select_all}
              add_to={mangelist}
              key={index}
              customer={cust}
              visable={
                search
                  ? cust.username.toLowerCase().includes(search.toLowerCase())
                  : true
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
