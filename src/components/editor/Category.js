import axios from "axios";
import { useState } from "react";
import Loader from "../Loader";

function Category({ category, api_url, refi, categoryList, setCategoryList }) {
  const [editor, setEditor] = useState(false);
  const [ed_name, setEditorName] = useState(category.name);
  const [ed_des, setEditorDes] = useState(category.description);
  const [ca_loader, setcaloader] = useState(false);

  function setSaveOrEditor() {
    if (editor) {
      const category_to_update = {
        id: category.id,
        name: ed_name,
        description: ed_des,
      };
      setcaloader(true);
      axios
        .put(api_url + "category/" + category.id + "/", category_to_update)
        .then(function (response) {
          const mok = !editor;
          setEditor(mok);
          setcaloader(false);
        });
    } else {
      console.log(api_url + "category/" + category.id + "/");
      const mok = !editor;
      setEditor(mok);
    }
  }

  function del_func() {
    const last_id = category.id;
    setcaloader(true);
    axios.delete(api_url + "category/" + category.id + "/").then((res) => {
      const deleted_arr = categoryList.filter((item) => item.id !== last_id);
      setCategoryList(deleted_arr);
      refi();
      setcaloader(false);
    });
  }
  return (
    <>
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
            type="text"
            onChange={(e) => setEditorDes(e.target.value)}
            disabled={editor ? false : true}
            className={editor ? "form-control" : "form-control-plaintext"}
            value={ed_des}
          ></input>{" "}
        </td>
        {ca_loader ? (
          <td>
            <Loader loaderSize={8} inCart={""} isLoad={true} />
          </td>
        ) : (
          <>
            <td>
              <button
              disabled={ca_loader}
                onClick={() => setSaveOrEditor()}
                type="button"
                className="btn btn-primary"
              >
                {editor ? "Save" : "Edit"}
              </button>
            </td>
            <td>
              <button
              disabled={ca_loader}
                onClick={del_func}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </>
        )}
      </tr>
    </>
  );
}

export default Category;
