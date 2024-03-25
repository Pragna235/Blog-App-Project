import { createContext, useState } from "react";
import axios from "axios";

//create context obj
export const loginContext = createContext();

function LoginProvider({ children }) {
  let [currentUserDetails, setCurrentUserDetails] = useState({
    userLoginStatus: false,
    currentUser: {},
    err: "",
  });

  async function loginUser(credObj) {
    if (credObj.role === "user") {
      let res = await axios.post(
        "http://localhost:4000/user-api/login",
        credObj
      );

      console.log(res);
      if (res.data.message === "Login Success") {
        //navigate to user profile
        //console.log("User Logged In");
        //save token in session storage
        sessionStorage.setItem('token',res.data.token);
        //update state


        setCurrentUserDetails({
          ...currentUserDetails,
          currentUser: res.data.user,
          userLoginStatus: true,
        });

      } else {
        setCurrentUserDetails({
          ...currentUserDetails,
          err: res.data.message,
          userLoginStatus: false,
          currentUser: {},
        });
      }
    }

    if (credObj.role === "author") {
        let res = await axios.post(
          "http://localhost:4000/author-api/login",
          credObj
        );
  
        console.log(res);
        if (res.data.message === "Login Success") {
          //navigate to user profile
          
          //console.log("Author Logged In");
          //save token in session storage
          sessionStorage.setItem('token',res.data.token);
        //update state
          setCurrentUserDetails({
            ...currentUserDetails,
            currentUser: res.data.author,
            userLoginStatus: true,
          });
          console.log(currentUserDetails.currentUser)
        } else {
          setCurrentUserDetails({
            ...currentUserDetails,
            err: res.data.message,
            userLoginStatus: false,
            currentUser: {},
          });
        }
      }
  }

  return (
    <loginContext.Provider value={{ currentUserDetails, loginUser }}>
      {children}
    </loginContext.Provider>
  );
}

export default LoginProvider;