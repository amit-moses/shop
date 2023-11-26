import axios from "axios";
import NavbarCart from "../navbar/NavbarCart"
import { useState } from "react";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

function Login({api_url, refi}) {
  const [ed_username, setUsername] = useState("");
  const [ed_password, setPassword] = useState("");
  const [errMsg, setErr] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate_to = useNavigate('/');
  function login(){
    setLoader(true);
    setErr(false);
    axios
          .post(api_url+"token/", {
            username: ed_username,
            password: ed_password,
          })
          .then((res) => {
            setErr(false);
            localStorage.setItem("token", res.data.access);
            localStorage.setItem("username", ed_username);
            refi();
            // axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
            setLoader(false);
            navigate_to('/');
          }).catch(error => {
            console.log(error)
            setLoader(false);
            setErr(true);
          });
  }
  return (
    <div className="py-5 container text-center">
        <NavbarCart/>
        <Loader loaderSize={10} isLoad={loader}/>
        {errMsg? 
          <div className="alert alert-danger" role="alert">
            username or password wrong
          </div>
        : ""}        
        <div className="form-floating mb-3 mt-3">
          <input onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Username" className="form-control" id="floatingInput"></input>
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
            <label htmlFor="floatingPassword">Password</label>
        </div>
        <button disabled={loader} onClick={() => login()} className="btn btn-outline-dark form-control">Login</button>
        
    </div>
    
  )
}

export default Login