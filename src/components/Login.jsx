import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {login} from "../../store/UserSlice";
function Login(){
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const dispatch = useDispatch();
const handleInputchange=(e)=>{
  const name= e.target.name;
  const value= e.target.value;
  if(name=="email"){
    setEmail(value);
  }
  else if(name=="password"){
    setPassword(value);
  }
}
const handleSubmit=async()=>{
try{
  const result = await fetch("http://localhost:5000/login", {
    method: "POST",
    body: JSON.stringify({
        email: email,
        password: password
    }),
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },



});

const data = await result.json();
console.log(data);

if (data) {
    toast.success('Login Success')
    navigate('/todo')
    dispatch(login(data.token));
}
}
catch(e){
  console.log(e);
}
}
    return(
        <>
        <div className=" container">
        <div className="card w-100">
            <div className="card-header">Login</div>
            <div className=" card-body">
              <form onSubmit={(e)=>{
                e.preventDefault();
              }}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" >Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter email"
                  name="email"
                  onChange={handleInputchange}
                   aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control"onChange={handleInputchange}
                  name="password"
                  placeholder ="Enter password"id="password"/>
                </div>
                <button type="submit" className="btn btn-primary w-100 text-center" 
                onClick={handleSubmit}
                >
                    Submit</button>
              </form>
            </div>
            </div>

        </div>
        </>
    );

}
export default Login;