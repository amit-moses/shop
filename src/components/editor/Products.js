import React, { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import Loader from "../Loader";

function Products({
  api_url,
  productsList,
  categoryList,
  setProductsList,
  refresh,
}) {
  const [pr_name, setProductName] = useState("");
  const [pr_price, setProductPrice] = useState(0);
  const [pr_stock, setProductStock] = useState(0);
  const [pr_cat, setProductCat] = useState(1);
  const [pr_image1, setProductImage1] = useState();
  const [filter, setFilter] = useState(0);
  const [load_add, setLoad] = useState(false);
  const [search, setSearchKey] = useState("");

  const first = categoryList[0];
  useEffect(() => {
    if (first) {
      setProductCat(first.id);
    }
  }, [first]);

  function help_filter(myproduct) {
    let to_return = filter
      ? parseInt(myproduct.category) === parseInt(filter)
      : true;
    if (search)
      return (
        to_return && myproduct.name.toLowerCase().includes(search.toLowerCase())
      );
    else return to_return;
  }

  function addProduct() {
    setLoad(true);
    const product_to_add = {
      name: pr_name,
      price: pr_price,
      stock: pr_stock,
      category: pr_cat,
      image: pr_image1,
    };
    console.log(product_to_add);
    axios
      .post(api_url + "/products/", product_to_add, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        refresh();
        setProductName("");
        setProductPrice(0);
        setProductCat(1);
        setProductStock(0);
        setProductImage1();
        setLoad(false);
      })
      .catch((res) => {
        console.log(res);
        setLoad(false);
      });
  }
  function handleSubmit(event) {
    event.preventDefault();
    addProduct();
  }

  return (
    <>
      <div className="row col-md-12">
        <div className="col-md-8">
          <input
            id="inp7"
            type="text"
            placeholder="search by product name"
            className="form-control mb-3"
            onChange={(e) => setSearchKey(e.target.value)}
          ></input>
        </div>
        <div className="col-md-4">
          <select
            onChange={(e) => setFilter(parseInt(e.target.value))}
            aria-label="Default select example"
            className="form-select mb-3"
          >
            <option value="0">all</option>
            {categoryList.map((item, index) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-md-4">
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              id="inp1"
              value={pr_name}
              type="text"
              className="form-control"
              onChange={(e) => setProductName(e.target.value)}
            ></input>
            <label htmlFor="inp1">product name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="inp2"
              value={pr_price}
              type="number"
              step="0.01"
              className="form-control"
              onChange={(e) => setProductPrice(e.target.value)}
            ></input>
            <label htmlFor="inp2">product price</label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="inp3"
              value={pr_stock}
              type="number"
              className="form-control"
              onChange={(e) => setProductStock(e.target.value)}
            ></input>
            <label htmlFor="inp3">product stock</label>
          </div>

          <div className="form-floating mb-3">
            <select
              id="inp4"
              value={pr_cat}
              type="number"
              className="form-select"
              onChange={(e) => setProductCat(e.target.value)}
            >
              {categoryList.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
            <label htmlFor="inp4">category</label>
          </div>

          <div className="form-floating mb-3">
            <input
              multiple={false}
              accept="image/*"
              id="inp9"
              type="file"
              className="form-control"
              onChange={(e) => setProductImage1(e.target.files[0])}
            ></input>
            <label htmlFor="inp5">image</label>
          </div>

          <br />
          <input
            className="btn btn-primary"
            value={"add"}
            type="submit"
          ></input>
          {load_add && <Loader loaderSize={8} inCart={""} isLoad={true} />}
        </form>
      </div>

      <div className="col-md-8">
        <table className="table table-striped" border="1">
          <thead className="thead-dark">
            <tr>
              <th scope="col">name</th>
              <th scope="col">price</th>
              <th scope="col">stock</th>
              <th scope="col">category</th>
              <th scope="col">image</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="tablebody">
            {productsList.map((product, index) => (
              <Product
                productList={productsList}
                setProductsList={setProductsList}
                visable={help_filter(product)}
                refi={refresh}
                api_url={api_url}
                key={index}
                category={categoryList}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
