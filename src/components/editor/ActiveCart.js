import { format } from "date-fns";
import { useState } from "react";
import ActiveCartRow from "./ActiveCartRow";

function ActiveCart({ cart, visable }) {
  const [more, setMore] = useState(false);

  return (
    <>
      {visable && (
        <>
          <tr>
            <td colspan="1">
              {format(new Date(cart.create_date), "dd/MM/yyyy")}
            </td>
            <td colspan="1">{cart.buyer ? cart.buyer : "annonymous"}</td>
            <td colspan="1">{cart.promocode && cart.promocode.code}</td>
            <td colspan="1">{cart.cartitem && cart.cartitem.length}</td>
            <td colspan="1">{cart.total_before}</td>
            <td colspan="1">{cart.total}</td>
            <td colspan="1">{cart.is_paid ? "paid" : "unpaid"}</td>
            <td colspan="1">
              <button
                onClick={() => {
                  const to_change = !more;
                  setMore(to_change);
                }}
                type="button"
                className={more ? "btn btn-secondary" : "btn btn-primary"}
              >
                {more ? "hide" : "items"}
              </button>
            </td>
          </tr>

          {more &&
            cart.cartitem.map((item, index) => (
              <ActiveCartRow cartitem={item} />
            ))}
        </>
      )}
    </>
  );
}

export default ActiveCart;
