import { Link } from "react-router-dom"

function NavbarCart() {
const my_username = localStorage.getItem('username');
return (
  <>
  <nav className="navbar navbar-expand-lg "></nav>
  <nav className="navbar navbar-expand-lg "></nav>
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" to="/">
        <img style={{height: "30px"}} src="/logo192.png" alt="..." />
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
              
        </ul>
        {my_username? <h5 style={{marginRight: "20px"}}>hello, {my_username}</h5>:""}
          <div className="d-flex">
            <Link to="/" className="btn btn-outline-dark">
              back
            </Link>
          </div>
        </div>
      </div>
    </nav>
  </>
)
}

export default NavbarCart