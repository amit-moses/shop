import axios from "axios";
import { useState } from "react";
import Loader from "../Loader";

function SelectedUser({ user_list, act_num, setAct, api_url, refi, selector, selecti}) {
  const mystyle = act_num ? (act_num === 1 ? "primary" : "danger") : "";
  const [title, setTitle] = useState("");
  const [message, setMes] = useState("");
  const [loader, setLoad] = useState(false);

  function del_users(){
    setLoad(true);
    axios.put(api_url + "customers/", {deluser:user_list}).then((res) => {
        setAct(false);
        setLoad(false);
        selector(selecti+1);
        refi(res.data.users);
      }).catch(error => {
        setLoad(false);
        console.log(error);
      });

  }
  function send_email(){
    setLoad(true);
    axios
        .post(api_url + "customers/", {
          params: {title_mail: title, message_mail: message, to_mail: user_list},
        })
        .then((res) => {
          setTitle("");
          setMes("");
          setLoad(false);
          setAct(false)
        })
        .catch((error) => {
          console.log(error);
        });
  }
  return (
    <>
      {act_num && (
        <div className={"alert alert-" + mystyle} role="alert">
          <div
            className={"form-control col-md-12 border p-2 border-" + mystyle}
            style={{ maxHeight: "115px", overflowY: "auto" }}
          >
            <p style={{ marginRight: "4px" }} className="btn btn-sm">
              {act_num === 2 ? "Delete " : "send mail to "}users:
            </p>
            {user_list.map((cust, index) => (
              <p
              key={index}
                style={{ marginRight: "4px" }}
                className={"btn btn-sm btn-" + mystyle}
              >
                {cust.username}
              </p>
            ))}
          </div>

          {act_num === 2 ? (
            <button
            disabled={loader}
              type="button"
              className="btn btn-danger mt-3"
              onClick={() => del_users()}
            >
              delete selected users
            </button>
          ) : (
            <>
              <div className="form-floating mb-3 mt-3">
                <input
                disabled={loader}
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                  type="username"
                  placeholder="title"
                  className="form-control border-primary"
                  id="floatingInput"
                ></input>
                <label htmlFor="floatingInput">title</label>
              </div>
              <div className="form-floating">
                <textarea
                value={message}
                disabled={loader}
                onChange={(e)=> setMes(e.target.value)}
                  className="form-control border-primary"
                  placeholder="message"
                  id="floatingTextarea2"
                  style={{height: "130px", resize: "none"}}
                ></textarea>
                <label htmlFor="floatingTextarea2">message</label>
              </div>


              <button
              disabled={loader}
                type="button"
                className="btn btn-primary mt-3"
                onClick={() =>  send_email()}
              >
                send
              </button>
            </>
          )}
          <button
          disabled={loader}
            style={{ marginLeft: "4px", marginRight:"4px" }}
            type="button"
            className="btn btn-secondary mt-3"
            onClick={() => setAct(false)}
          >
            cancel
          </button>
          <Loader isLoad={loader} inCart={""} loaderSize={8}/>
        </div>
      )}
    </>
  );
}

export default SelectedUser;
