import { Link } from "react-router-dom";
import Loader from "../Loader";
import { jwtDecode } from "jwt-decode";
import { FaRegUser } from "react-icons/fa";

function Navbar({
  cartitems,
  categories,
  filter_func,
  myfilter,
  search,
  nav_loader,
  logout,
}) {
  const token = localStorage.getItem("token");
  const token_dec = token? jwtDecode(token): null;
  function check_session(token) {
    if (token) {
      const expirationTime = token_dec.exp * 1000;
      const currentTime = Date.now();
      return currentTime < expirationTime;
    }
    return false;
  }
  const staff = check_session(token) ? token_dec.is_staff : false;

  function get_cat_name() {
    if (myfilter) {
      const query = categories.filter(
        (cat) => parseInt(myfilter) === parseInt(cat.id)
      );
      if (query.length) return query[0].name;
      else return "err";
    } else return "All Proudcts";
  }
  return (
    <>
      <nav
        style={{ marginTop: "10px" }}
        className="navbar navbar-expand-lg "
      ></nav>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container px-4 px-lg-5">
          <Link className="navbar-brand" to="/">
            <img style={{ height: "30px" }} src="/logo192.png" alt="..." />
            React Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <input
                className="form-control"
                id="code"
                placeholder="search"
                onChange={(e) => search(e.target.value)}
              />
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {get_cat_name()}
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => filter_func(0)}
                    >
                      All Products
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button
                        key={index}
                        className="dropdown-item"
                        onClick={() => filter_func(category.id)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            {check_session(token) && (
              <h5 style={{ marginRight: "15px" }}>
                hello, {token_dec.username}
              </h5>
            )}
            {staff && (
              <div className="d-flex" style={{ marginLeft: "9px" }}>
                <Link to="/edit" className="btn btn-outline-dark">
                  edit
                </Link>
              </div>
            )}
            <div className="d-flex" style={{ marginLeft: "9px" }}>
              <Link to="/mycart" className="btn btn-outline-dark">
                {nav_loader ? (
                  <Loader inCart={""} isLoad={true} loaderSize={8} />
                ) : (
                  <>
                    Cart
                    <span className="badge bg-dark text-white ms-1 rounded-pill">
                      {cartitems.length}
                    </span>
                  </>
                )}
              </Link>
            </div>
            <div className="d-flex" style={{ marginLeft: "9px" }}>
              {token ? (
                <button
                  onClick={() => logout()}
                  className="btn btn-outline-dark"
                >
                  <i className="bi-cart-fill me-1"></i>
                  Log-out
                </button>
              ) : (
                <Link to="/login" className="btn btn-outline-dark">
                  <i className="bi-cart-fill me-1"></i>
                  <FaRegUser/> Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
