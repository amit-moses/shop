import axios from "axios";
import { useState } from "react";
import Loader from "../Loader";
import { MdDelete, MdModeEdit, MdSave } from "react-icons/md";

function Product({
  product,
  refi,
  category,
  api_url,
  visable,
  setProductsList,
  productList,
}) {
  const [editor, setEditor] = useState(false);
  const [ed_name, setEditorName] = useState(product.name);
  const [ed_price, setEditorPrice] = useState(product.price);
  const [ed_cat, setEditorCat] = useState(product.category);
  const [ed_stock, setEditorStock] = useState(product.stock);
  const [ed_image_file, setImage] = useState(null);
  const [pr_loader, setploader] = useState(false);

  function setSaveOrEditor() {
    if (editor) {
      const product_to_update = ed_image_file
        ? {
            id: product.id,
            name: ed_name,
            price: ed_price,
            stock: ed_stock,
            category: ed_cat,
            image: ed_image_file,
          }
        : {
            id: product.id,
            name: ed_name,
            price: ed_price,
            stock: ed_stock,
            category: ed_cat,
          };
      console.log(product_to_update);
      setploader(true);
      axios
        .put(api_url + "/product/" + product.id + "/", product_to_update, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          const mok = !editor;
          setEditor(mok);
          setploader(false);
          setImage(null);
          refi();
        });
    } else {
      const mok = !editor;
      setEditor(mok);
    }
  }
  function category_name_by_id(id) {
    const data = category.find((item) => item.id === id);
    if (data) {
      return data.name;
    } else {
      return "";
    }
  }
  function del_func() {
    const last_id = category.id;
    setploader(true);
    axios.delete(api_url + "/product/" + product.id + "/").then((res) => {
      const deleted_arr = productList.filter((item) => item.id !== last_id);
      setProductsList(deleted_arr);
      setploader(-1);
      refi();
    });
  }
  return (
    <>
      {(visable && pr_loader!==-1) && (
        <tr>
          <td>
            <input
              type="text"
              onChange={(e) => setEditorName(e.target.value)}
              disabled={editor ? false : true}
              className={editor ? "form-control" : "form-control-plaintext"}
              value={ed_name}
            ></input>
          </td>
          <td>
            <input
              type="number"
              step="0.01"
              onChange={(e) => setEditorPrice(e.target.value)}
              disabled={editor ? false : true}
              className={editor ? "form-control" : "form-control-plaintext"}
              value={ed_price}
            ></input>{" "}
          </td>
          <td>
            <input
              type="number"
              onChange={(e) => setEditorStock(e.target.value)}
              disabled={editor ? false : true}
              className={editor ? "form-control" : "form-control-plaintext"}
              value={ed_stock}
            ></input>
          </td>
          <td>
            {editor ? (
              <select
                value={ed_cat}
                onChange={(e) => setEditorCat(e.target.value)}
                aria-label="Default select example"
                className="form-select"
              >
                {category.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            ) : (
              <label className="form-control-plaintext">
                {category_name_by_id(product.category)}
              </label>
            )}
          </td>
          <td>
            {editor ? (
              <input
                multiple={false}
                accept="image/*"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="form-control"
              ></input>
            ) : (
              <img
                style={{ height: "35px" }}
                alt="..."
                className="img-fluid"
                src={'https://storage.googleapis.com/shop-react-a.appspot.com/'+product.image}
              />
            )}
          </td>
          {pr_loader ? (
            <td>
              <Loader loaderSize={8} inCart={""} isLoad={true} />
            </td>
          ) : (
            <>
              <td>
                <button
                  disabled={pr_loader}
                  onClick={() => setSaveOrEditor()}
                  type="button"
                  className="btn btn-primary"
                >
                  {editor ? <MdSave /> : <MdModeEdit />}
                </button>
              </td>
              <td>
                <button
                  disabled={pr_loader}
                  onClick={del_func}
                  type="button"
                  className="btn btn-danger"
                >
                  <MdDelete />
                </button>
              </td>
            </>
          )}
        </tr>
      )}
    </>
  );
}

export default Product;
