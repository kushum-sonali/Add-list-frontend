import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import{ useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
function Signup(){
  const [userName, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const handleInputchange=(e)=>{
  const name= e.target.name;
  const value= e.target.value;
  if(name=="userName"){
    setUserName(value);
  }
  else if(name=="email"){
    setEmail(value);
  }
  else if(name=="password"){
    setPassword(value);
  } 
}
const handleSubmit=async()=>{
  try {
    console.log(userName,email, password);
    if(!userName || !email || !password){
      toast.error("Please Fill All The Details");
      return;
    }
    const result = await fetch("http://localhost:5000/signup", {
        method: "POST",
        body: JSON.stringify({
            username: userName,
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
    localStorage.setItem("User", JSON.stringify(data));
    if (data) {
        toast.success('Signup Success')
        navigate('/login')
    }
}
catch (e) {
    console.log(e); ``
}
}
    return (
        <>
         <div className="container">
          <div className="card w-100">
            <div className="card-header">Signup </div>
            <div className=" card-body">
              <form onSubmit={(e)=>{
                e.preventDefault();
              }}>
                <div>
                <label htmlFor="name" className="form-label" >UserName</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter name"
                    aria-describedby="nameHelp"
                    name="userName"
                    onChange={handleInputchange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" >Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter email"
                  onChange={handleInputchange}
                  name="email"
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
                    <div className="signup-footer mb-2">
                      <p>DO you have any account? </p>
                     <Link to="/login">Login</Link>
                    </div>
              </form>
            </div>
            </div>
            </div>
        </>
    )
}
export default Signup ;