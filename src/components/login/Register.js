import axios from "axios";
import { useState } from "react";
import Loader from "../Loader";

function Register({api_url, loader, setLoader, login_func}) {
   const [ed_username, setUsername] = useState("");
   const [er_username, setErUsername] = useState();
   const [ed_password, setPassword] = useState("");
   const [ed_repassword, setRePassword] = useState("");
   const [er_password, setErPassword] = useState("");
   const [ed_email, setEmail] = useState("");
   const [er_email, setErEmail] = useState("");
   
   function valid_register(){
    setErUsername("");
    setErPassword("");
    setErEmail("");
    let valid = true;
    let pass_prob ="";
    if(ed_password.length < 6 || ed_repassword.length < 6){pass_prob += "Password must be at least 6 chars! ";valid=false;}
    if(ed_password !== ed_repassword){pass_prob += "Passwords don't match! ";valid=false;}
    setErPassword(pass_prob);
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(ed_email)) {
        setErEmail("Invalid email address! ");
        valid=false;
    }
    if(ed_username.length < 4){setErUsername("User must be at least 4 chars! ");valid=false;}
    return valid;
   }
   function register_func(){
    setLoader(true);
    axios
          .post(api_url+"register/", {
            username: ed_username,
            email: ed_email,
            password: ed_password,
          })
          .then((res) => {
            if(res.data){login_func(ed_username, ed_password);}
          }).catch(error => {
            const user_errors = error.response.data["username"];
            if(user_errors){setErUsername(user_errors.join(''))}
            setLoader(false);
          });
   }
  return (
    <form method="POST" onSubmit={(event) => {event.preventDefault(); if(valid_register()){register_func();}}}>
        <Loader loaderSize={10} isLoad={loader}/>
        {(er_username || er_email || er_password) && 
          <div className="alert alert-danger" role="alert">
            <div>{er_username}</div>
            <div>{er_password}</div>
            <div>{er_email}</div>
          </div>}
        <div className="form-floating mb-3 mt-3">
          <input onChange={(e) => {setUsername(e.target.value); setErUsername();}} type="username" placeholder="Username" className={er_username?"form-control is-invalid":"form-control"} id="floatingInput"></input>
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3 mt-3">
          <input onChange={(e) => {setEmail(e.target.value); setErEmail();}} type="email" placeholder="Email" className={er_email?"form-control is-invalid":"form-control"} id="floatingInput1"></input>
          <label htmlFor="floatingInput1">Email</label>
        </div>
        <div className="form-floating mb-3">
            <input onChange={(e) => {setPassword(e.target.value); setErPassword();}} type="password" className={er_password?"form-control is-invalid":"form-control"} id="floatingPassword" placeholder="Password"></input>
            <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
            <input onChange={(e) => {setRePassword(e.target.value); setErPassword();}} type="password" className={er_password?"form-control is-invalid":"form-control"} id="floatingPassword1" placeholder="Password again"></input>
            <label htmlFor="floatingPassword1">Password again</label>
        </div>
        <button disabled={loader} type="submit" className="btn btn-outline-dark form-control">Register</button>
    </form>
  )
}

export default Register