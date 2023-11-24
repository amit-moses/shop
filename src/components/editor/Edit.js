import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
function Edit({api_url}) {
  return (
    <>
      <div className="container">
        <Header text="Products app" subtext={3} />
        <div className="row col-md-12">
          <Products api_url={api_url} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Edit;
