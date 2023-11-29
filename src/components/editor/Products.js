import React, { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import Loader from "../Loader";

function Products({api_url, productsList, categoryList, setProductsList, refresh}) {
  const [pr_name, setProductName] = useState("");
  const [pr_price, setProductPrice] = useState(0);
  const [pr_stock, setProductStock] = useState(0);
  const [pr_cat, setProductCat] = useState(1);
  const [pr_image, setProductImage] = useState("");
  const [filter, setFilter] = useState(0);
  const [load_add, setLoad] = useState(false);
  const first = categoryList[0]
useEffect(()=>{
  if(first){
    setProductCat(first.id);
  }
},[first]);
  function filter_cat(){
    if(parseInt(filter)) return productsList.filter((item)=>parseInt(item.category) === parseInt(filter));
    else return productsList;
  }

  function addProduct() {
    setLoad(true);
    const product_to_add = {
      name: pr_name,
      price: pr_price,
      stock: pr_stock,
      category: pr_cat,
      image: pr_image
    };
    axios
      .post(api_url + "products/", product_to_add)
      .then((res) => {
        setProductName("");
        setProductPrice(0);
        setProductCat(1);
        setProductStock(0);
        setProductImage("")
        refresh();
        setLoad(false);
      }).catch((res)=>{
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
    <div className="container">
    <select
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Default select example"
            className="form-select col-md-12 mb-3"
          >
            <option
                value="0"
              >
                all
              </option>
            {categoryList.map((item, index) => (
              <option
                value={item.id}
                key={index}
              >
                {item.name}
              </option>
            ))}
          </select>
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
              <option
                value={item.id}
                key={index}
              >
                {item.name}
              </option>
            ))}
            </select>
            <label htmlFor="inp4">category</label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="inp5"
              value={pr_image}
              type="text"
              className="form-control"
              onChange={(e) => setProductImage(e.target.value)}
            ></input>
            <label htmlFor="inp5">product image url</label>
          </div>

          <br />
          <input
            className="btn btn-primary"
            value={"add"}
            type="submit"
          ></input>
          {load_add && <Loader loaderSize={8} inCart={""} isLoad={true}/>}
        </form>
      </div>
          
      <div className="col-md-8">
        <table className="table table-striped" border="1">
          <thead className="thead-dark">
            <tr>
              <th scope="col">name</th>
              <th scope="col">price</th>
              <th scope="col">stock</th>
              <th scope="col">product category</th>
              <th scope="col">url image</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="tablebody">
            {filter_cat().map((product, index) => (
              <Product refi={refresh} productList={productsList} setProductsList={setProductsList} api_url={api_url} key={index} category={categoryList} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
