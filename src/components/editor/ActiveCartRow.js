function ActiveCartRow({ cartitem }) {
  const totalfor = cartitem.product.price * cartitem.quantity;
  return (
    <tr>
      <td colspan="1">
        <img
          style={{ height: "35px" }}
          alt="..."
          className="img-fluid"
          src={cartitem.product.image}
        />
      </td>
      <td colspan="3">
        <div className="row">{cartitem.product.name}</div>
        <div className="row">$ {cartitem.product.price}</div>
      </td>
      <td colspan="2">{cartitem.quantity}</td>
      <td colspan="2">$ {totalfor.toFixed(2)}</td>
    </tr>
  );
}

export default ActiveCartRow;
