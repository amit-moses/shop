import { useState } from "react";
import NavbarCart from "../navbar/NavbarCart";
import Register from "./Register";
import Login from "./Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginRegister({ api_url, refi }) {
  const [isLogin, setLogin] = useState(true);
  const [errMsg, setErr] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate_to = useNavigate("/");
  if (localStorage.getItem("refresh")) {
    navigate_to("/");
  }

  function login(my_username, my_password) {
    setLoader(true);
    setErr(false);
    axios
      .post(api_url + "token/", {
        username: my_username,
        password: my_password,
      })
      .then((res) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.access}`;
        setErr(false);
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        refi();
        setLoader(false);
        navigate_to("/");
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        setErr(true);
      });
  }

  return (
    <div className="py-5 container text-center">
      <NavbarCart />
      <h1>{isLogin? "Login": "Register"}</h1>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          {isLogin ? (
            <Login login_func={login} loader={loader} errMsg={errMsg} />
          ) : (
            <Register
              login_func={login}
              setLoader={setLoader}
              loader={loader}
              api_url={api_url}
            />
          )}
          <button
            className="mt-3 link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover btn btn-link"
            onClick={() => setLogin(!isLogin)}
          >
            {isLogin
              ? "Don't you have yet account? register now"
              : "Do you have already account? log-in"}
          </button>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}

export default LoginRegister;
