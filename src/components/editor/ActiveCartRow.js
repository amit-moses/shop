function ActiveCartRow({ cartitem, api_url }) {
  const totalfor = cartitem.product.price * cartitem.quantity;
  return (
    <tr className="table-primary">
      <td colSpan="1">
        <img
          style={{ height: "35px" }}
          alt="..."
          className="img-fluid"
          src={'https://storage.googleapis.com/shop-react-a.appspot.com/'+cartitem.product.image}
        />
      </td>
      <td colSpan="3">
        <div className="row">{cartitem.product.name}</div>
        <div className="row">$ {cartitem.product.price}</div>
      </td>
      <td colSpan="2">{cartitem.quantity}</td>
      <td colSpan="2">$ {totalfor.toFixed(2)}</td>
    </tr>
  );
}

export default ActiveCartRow;
