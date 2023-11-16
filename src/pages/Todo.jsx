import React, { useEffect } from "react";
import Card from 'react-bootstrap/Card';   
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "./Todo.css" 
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { saveTodo } from "../../store/TodoSlice";

function Todo(){
    const[title,setTitle]=useState("");
    const[time,setTime]=useState("");
    const[date,setDate]=useState("");
    const[description,setDescription]=useState("");
    const[decode,setDecode]=useState({});

    const dispatch=useDispatch();
    const user=useSelector((state)=>state.user);
    const todo=useSelector((state)=>state.todo.todoList);
    const navigate=useNavigate();
    const handleInputchange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        if(name=="title"){
            setTitle(value);
        }
        else if(name=="time"){ 
            setTime(value);
        }
        else if(name=="date"){
            setDate(value);
        }
        else if(name=="description"){
            setDescription(value);
        }
    }
    // localStorage.setItem("User", JSON.stringify(user));
    // const token=localStorage.getItem("User");
    // const decoded=jwt_decode(token);
    // console.log(decoded);
    localStorage.setItem("User", JSON.stringify(user));
    const token=localStorage.getItem("User");
    const decoded=jwtDecode(token);
    console.log(decoded);
    const handleSubmit=async()=>{
        try{
            console.log(title,time,date,description);
            if(!title || !time || !date || !description){
                toast.error("Please Fill All The Details");
                return;
            }
            const newTodo={title,time,date,description};
            // setTodo([...todo,newTodo]);
            const result=await fetch("http://localhost:5000/addtodo",{
                method:"POST",
                body:JSON.stringify({
                    title:title,
                    time:time,
                    date:date,
                    description:description
                }),
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            });
            const data=await result.json();
            dispatch(saveTodo({
                title:title,
                time:time,
                date:date,
                description:description
            }));
            console.log("hello user",user);
            console.log(data);
            if(data){
                toast.success("Todo Added Successfully");
                clear();
            }

        }
        catch(e){
            console.log(e);
        }
    }
    function clear(){
        setTitle("");
        setTime("");
        setDate("");
        setDescription("");
        dispatch({type:"delete todo"});
    }
    useEffect(()=>{
        if(user){
            console.log(user)
        }
        else{
            navigate("/login");
        }
    }
    ,[]);

    return(
        <>
   
    <div className="main ">
        <div className="nav">
        <div className="profile text-white ">hello {localStorage.getItem("User") ? decoded.name : ""} 
        </div>
        </div>
        <div className="header ">
         <div className="card demo">
          <div className="card-title ">Todo App</div>
            <div className="card-body">
            <div className="mb-2">
                <input type="text" 
                    className="form-control"
                    placeholder="Enter title"
                    id="title"
                    name="title"
                    required
                    onChange={handleInputchange}
                    value={title}
                 />
            </div>
            <div className="mb-2">
                 <input type="time" 
                    className="form-control"
                    placeholder="Enter time"
                    id="time"
                    name="time"
                    required
                    onChange={handleInputchange}
                    value={time}
                 />
            </div>
            <div className="mb-2" >
                <input type="date" 
                    className="form-control"
                    placeholder="Enter date"
                    id="date"
                    name="date"
                    required
                    onChange={handleInputchange}
                    value={date}
                 />
            </div>
            <div className="mb-2">
                <textarea type="text"
                    className="form-control"
                    placeholder="Enter description"
                    id="description"
                    name="description"
                    required
                    onChange={handleInputchange}
                    value={description}
                    />
            </div>

        
            <div className="card-footer">
                <Button className="btn btn-primary " onClick={
                    handleSubmit
                }>Add</Button>
                <Button className="btn btn-danger mx-2" onClick={clear}>clear</Button>
                </div>
                </div>
                </div>

       
 </div>
        <div className="store">
        {todo?.map((item,index)=>{
            return(
                <div className="card map" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{item.time}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{item.date}</h6>
                        <p className="card-text">{item.description}</p>
                        <div className="card-footer">
                        <div className="mb-1">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">Done</label>
            </div>
                            <Button className="btn btn-primary ">Edit</Button>
                            <Button className="btn btn-danger mx-3 ">Delete</Button>
                        </div>
                    </div>
                </div>
            )
        })
        }
        </div>
        <div className="logout">
        <Button className="btn btn-danger" onClick={()=>{
                localStorage.removeItem("User");
                navigate("/login");
            }}>Logout</Button></div>
    </div>
        </>
    );
}
export default Todo;