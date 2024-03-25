import "./Signup.css";
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useState } from "react";
import { useNavigate} from "react-router-dom";

function Signup() {

  let { register, handleSubmit } = useForm();
  let[err,setErr] = useState('')
  let navigate = useNavigate();

 async function onRegister(obj){
    console.log(obj);
    //make HTTP post req
    if(obj.role === 'user'){
      let res = await axios.post('http://localhost:4000/user-api/register',obj);
      console.log(res);
      if(res.data.message === 'New User Created'){
        console.log("User Registration Successful");
        //navigate to signin component
        navigate('/signin')
        setErr('')
      }
      else{
        setErr(res.data.message);
      }
    }
    //make HTTP post req
    if(obj.role === 'author'){
      let res = await axios.post('http://localhost:4000/author-api/register',obj);
      console.log(res);
      if(res.data.message === 'New Author Created'){
        console.log("Author Registration Successful");
        //navigate to signin component
        navigate('/signin')
        setErr('')
      }
      else{
        setErr(res.data.message);
      }
    }
  }

  return (
    <div>
      
      <p className="display-3 text-center text-info">SignUp</p>

      {err.length !==0 && <p className="text-danger fs-4 text-center">{err}</p>}

      <form className="w-50 bg-light p-3 m-auto mt-5" onSubmit={handleSubmit(onRegister)}>
        {/* two radios for user role */}
        <div className="mb-3">
          <label>Register as</label>
          <div className="form-check">
            <input
              type="radio"
              {...register("role")}
              id="user"
              className="form-check-input"
              value='user'
            />
            <label htmlFor="user" className="form-check-label">User</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              {...register("role")}
              id="author"
              className="form-check-input"
              value='author'
            />
            <label htmlFor="author" className="form-check-label">Author</label>
          </div>
        </div>
        {/* username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" {...register("username")} id="username" className="form-control" />
        </div>
        {/* password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" {...register("password")} id="password" className="form-control" />
        </div>
        {/* email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" {...register("email")} id="email" className="form-control" />
        </div>
        {/* submit button */}
        <button type="submit" className="btn btn-success">Register</button>
      </form>
    </div>
  );
}

export default Signup;