import axios from "axios";
import { useState } from "react";
import Loader from "../Loader";

function Promo({promo, api_url, promoList, setPromoList, refi}) {
    const [editor, setEditor] = useState(false);
    const [ed_code, setCode] = useState(promo.code);
    const [ed_used, setUsed] = useState(promo.used);
    const [ed_dis, setDis] = useState(promo.discount);
    const [ca_loader, setcaloader] = useState(false);
  
    function setSaveOrEditor() {
      if (editor) {
        const promo_to_update = {
          id: promo.id,
          code: ed_code,
          used: Boolean(ed_used),
          discount: parseInt(ed_dis),
        };
        setcaloader(true);
        axios
          .put(api_url + "promo/" + promo.id + "/", promo_to_update)
          .then(function (response) {
            const mok = !editor;
            setEditor(mok);
            setcaloader(false);
          });
      } else {
        const mok = !editor;
        setEditor(mok);
      }
    }
  
    function del_func() {
      const last_id = promo.id;
      setcaloader(true);
      axios.delete(api_url + "promo/" + promo.id + "/").then((res) => {
        const deleted_arr = promoList.filter((item) => item.id !== last_id);
        setPromoList(deleted_arr);
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
              onChange={(e) => setCode(e.target.value)}
              disabled={editor ? false : true}
              className={editor ? "form-control" : "form-control-plaintext"}
              value={ed_code}
            ></input>
          </td>
          <td>
            <input
              type="number"
              onChange={(e) => setDis(e.target.value)}
              disabled={editor ? false : true}
              className={editor ? "form-control" : "form-control-plaintext"}
              value={ed_dis}
              min="0" 
              max="100"
            ></input>{" "}
          </td>
          <td>
          <div className="form-check form-switch">
            <input
              type="checkbox"
              onChange={() => setUsed(!ed_used)}
              disabled={editor ? false : true}
              checked={ed_used}
              className="form-check-input"
            ></input>
            </div>
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

export default Promo