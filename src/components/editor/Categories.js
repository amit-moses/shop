import axios from "axios";
import Category from "./Category";
import { useState } from "react";
import Loader from "../Loader";

function Categories({api_url, categoryList, refresh, setCategoryList}) {
    const [ca_name, setCategoryName] = useState("");
    const [ca_des, setCategoryDes] = useState("");
    const [load_add, setLoad] = useState(false);

    function addCategory() {
      setLoad(true);
      const category_to_add = {
        name: ca_name,
        description: ca_des
      };
      axios
        .post(api_url + "/category/", category_to_add)
        .then((res) => {
          console.log(res.data);
          refresh();
          setCategoryName("");
          setCategoryDes("");
          setLoad(false);
        }).catch((res) =>{
            console.log(res)
            setLoad(false);
        });
    }
    function handleSubmit(event) {
      event.preventDefault();
      addCategory();
    }
  
    return (
      <>
      <div className="container">
      </div>
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                id="inp1"
                value={ca_name}
                type="text"
                className="form-control"
                onChange={(e) => setCategoryName(e.target.value)}
              ></input>
              <label htmlFor="inp1">category name</label>
            </div>
  
            <div className="form-floating mb-3">
              <input
                id="inp5"
                value={ca_des}
                type="text"
                className="form-control"
                onChange={(e) => setCategoryDes(e.target.value)}
              ></input>
              <label htmlFor="inp5">category description</label>
            </div>
  
            <br />
            <input
              className="btn btn-primary"
              value={"add"}
              type="submit"
              disabled={load_add}
            ></input>
            {load_add && <Loader loaderSize={8} inCart={""} isLoad={true}/>}
          </form>
        </div>
            
        <div className="col-md-8">
          <table className="table table-striped" border="1">
            <thead className="thead-dark">
              <tr>
                <th scope="col">name</th>
                <th scope="col">description</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody id="tablebody">
              {categoryList.map((category, index) => (
                <Category setCategoryList={setCategoryList} categoryList={categoryList} refi={refresh} api_url={api_url} key={index} category={category} />
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
}

export default Categories