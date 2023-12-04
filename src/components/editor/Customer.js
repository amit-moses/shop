import { format } from "date-fns";
import { useEffect, useState } from "react";
import { TfiWrite } from "react-icons/tfi";

function Customer({ customer, visable, add_to, select_all, selector }) {
  const [selected, setSelected] = useState(false);
  useEffect(()=>{
      setSelected(select_all);
  },[select_all]);

  useEffect(()=>{
    setSelected(false);
},[selector]);

  function my_target(isselect){
    add_to(isselect, customer);
    setSelected(isselect);
  }
  
  return (
    <>
      {visable && (
        <>
          <tr onClick={()=> {const newselect = !selected ;setSelected(newselect); my_target(newselect)}} className={selected?"table-primary" : ""}>
            <td colSpan="1">
              <input
              checked={selected}
                type="checkbox"
                onChange={(e) => {my_target(e.target.checked)}}
              ></input>
            </td>
            <td colSpan="1">{customer.username}</td>
            <td colSpan="1">{customer.email}</td>
            <td colSpan="1">{customer.carts}</td>
            <td colSpan="1">
              {format(new Date(customer.applied), "dd/MM/yyyy")}
            </td>
            <td colSpan="1">
              {format(new Date(customer.last_login), "dd/MM/yyyy")}
            </td>
            <td colSpan="1">{customer.is_staff ? <TfiWrite />: ""}</td>
          </tr>
        </>
      )}
    </>
  );
}

export default Customer;
