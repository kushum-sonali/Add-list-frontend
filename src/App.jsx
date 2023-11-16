import React, {useState,lazy,Suspense}from "react";
// import Signup from "./components/Signup";
// import Login from "./components/login";

const Signup= lazy(()=>import("./components/Signup"));
const Login=lazy(()=>import("./components/login"));
import { ToastContainer, toast } from 'react-toastify';
import Todo from "./pages/Todo";
import { Routes,Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App(){
  return (
    <>
    <Routes>
    <Route path="/" element={<Suspense><Signup/></Suspense>} />
      <Route path="/signup" element={<Suspense><Signup/></Suspense>} />
      <Route path="/login" element={<Suspense><Login/></Suspense>}/>
      <Route path="/todo" element={<Todo/>}/>
    </Routes>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}
export default App;
