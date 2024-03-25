import "./Signin.css";
import { useForm } from "react-hook-form";
import { useContext ,useEffect} from "react";
import { loginContext } from "../../contexts/LoginContextProvider";
import {useNavigate} from 'react-router-dom'

function Signin() {
  let { register, handleSubmit } = useForm();
  let navigate=useNavigate()
  const { currentUserDetails, setCurrentUserDetails, loginUser } = useContext(loginContext);

  function onLogin(credObj) {
    loginUser(credObj);
    
  }

  

  useEffect(()=>{

    try {
      
      if(currentUserDetails.currentUser.role === 'user'){
        if(currentUserDetails.userLoginStatus===true){
          navigate('/user-profile')
        }
      }
      if(currentUserDetails.currentUser.role === 'author'){
        if(currentUserDetails.userLoginStatus===true){
          navigate('/author-profile')
        }
      }
    } catch (error) {
      console.log(error)
      
    }

    
  },[currentUserDetails.userLoginStatus])

  return (
    <div>
      <p className="display-3 text-center text-info">SignIn</p>
      {currentUserDetails.err.length !== 0 && (
        <p className="text-danger fs-3 text-center">{currentUserDetails.err}</p>
      )}
      <form
        className="w-50 bg-light p-3 m-auto mt-5"
        onSubmit={handleSubmit(onLogin)}
      >
        {/* two radios for user role */}
        <div className="mb-3">
          <label>Login as</label>
          <div className="form-check">
            <input
              type="radio"
              {...register("role")}
              id="user"
              className="form-check-input"
              value="user"
            />
            <label htmlFor="user" className="form-check-label">
              User
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              {...register("role")}
              id="author"
              className="form-check-input"
              value="author"
            />
            <label htmlFor="author" className="form-check-label">
              Author
            </label>
          </div>
        </div>
        {/* username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            id="username"
            className="form-control"
          />
        </div>
        {/* password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            id="password"
            className="form-control"
          />
        </div>

        {/* submit button */}
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
}

export default Signin;