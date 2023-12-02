import { format } from "date-fns";
import { useState } from "react";
import ActiveCartRow from "./ActiveCartRow";
import { MdRemoveShoppingCart, MdShoppingCart } from "react-icons/md";

function ActiveCart({ cart, visable }) {
  const [more, setMore] = useState(false);

  return (
    <>
      {visable && (
        <>
          <tr>
            <td colSpan="1">
              {format(new Date(cart.create_date), "dd/MM/yyyy")}
            </td>
            <td colSpan="1">{cart.buyer ? cart.buyer : "annonymous"}</td>
            <td colSpan="1">{cart.promocode && cart.promocode.code}</td>
            <td colSpan="1">{cart.cartitem && cart.cartitem.length}</td>
            <td colSpan="1">{cart.total_before}</td>
            <td colSpan="1">{cart.total}</td>
            <td colSpan="1">{cart.is_paid ? "paid" : "unpaid"}</td>
            <td colSpan="1">
              <button
                onClick={() => {
                  const to_change = !more;
                  setMore(to_change);
                }}
                type="button"
                className={more ? "btn btn-secondary" : "btn btn-primary"}
              >
                {more ? <MdRemoveShoppingCart /> : <MdShoppingCart />}
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
