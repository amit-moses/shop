import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Navbar from "../navbar/Navbar";
import Loader from "../Loader";

function Home({cartList, api_url, set_cart, productsList, categoryList, cart_id, nav_loader, logout}) {
  const [filter, setFilter] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  
  function help_filter(myproduct){
    let to_return = filter? parseInt(myproduct.category) === parseInt(filter): true;
    if(searchKey) return to_return && myproduct.name.toLowerCase().includes(searchKey.toLowerCase());
    else return to_return;
  }
  
  function quantity_in_cart(id_pro){
    const query = cartList.filter((item)=>parseInt(item.product.id) === parseInt(id_pro));
    if(query.length) return parseInt(query[0].quantity);
    else return 0;
  }

  return (
    <div>
      {/* <!-- Navigation--> */}
      <Navbar logout={logout} nav_loader={nav_loader} cartitems={cartList} categories={categoryList} filter_func={setFilter} myfilter={filter} search={setSearchKey}/>
      {/* <!-- Section--> */}
      <section className="py-5">
        {0 === productsList.length? <div className="text-center">
          <Loader isLoad={true} inCart={''} loaderSize={10}/>
        </div> : ""}
      
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {productsList.filter((item)=> help_filter(item)).map((product, index) => (
            <ProductCard cart_id={cart_id} set_cart={set_cart} api_url={api_url} key={index} product={product} in_cart={quantity_in_cart(product.id)}/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
