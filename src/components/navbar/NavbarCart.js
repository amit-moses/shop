import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function NavbarCart() {
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
  return (
    <>
      <nav className="navbar navbar-expand-lg "></nav>
      <nav className="navbar navbar-expand-lg "></nav>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4"></ul>
            {check_session(token) && (
              <h5 style={{ marginRight: "15px" }}>
                hello, {token_dec.username}
              </h5>
            )}
            {staff && (
              <div className="d-flex" style={{ marginRight: "9px" }}>
                <Link to="/edit" className="btn btn-outline-dark">
                  edit
                </Link>
              </div>
            )}
            <div className="d-flex">
              <Link to="/" className="btn btn-outline-dark">
                <IoIosArrowBack/> back
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarCart;
