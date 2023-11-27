import { useState } from "react";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

function Login({loader, errMsg, login_func}) {
  const [ed_username, setUsername] = useState("");
  const [ed_password, setPassword] = useState("");
  const navigate_to = useNavigate('/');
  if(localStorage.getItem('refresh')){navigate_to('/');}
  return (
    <form method="POST" onSubmit={(event) => {event.preventDefault(); login_func(ed_username, ed_password);}}>
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
        <button disabled={loader} type="submit" className="btn btn-outline-dark form-control">Login</button>
    </form>
    
  )
}

export default Login