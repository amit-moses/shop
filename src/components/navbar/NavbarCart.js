import { Link } from "react-router-dom"

function NavbarCart() {
return (
  <>
  <nav className="navbar navbar-expand-lg "></nav>
  <nav className="navbar navbar-expand-lg "></nav>
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="#!">
        React Shop
        </a>
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