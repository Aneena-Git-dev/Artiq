import React, { useState } from "react";
import "../Styles/AuthPage.css";
import Login from "../Components/Login";
import Register from '../Components/Register';
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const switchToLogin = ()=> {
    setIsLogin(true);
  }

  return (
    <div className="auth-page">
      <div className="auth-box shadow-lg p-4 rounded-3">
        <h2 className="text-center mb-4">{isLogin ? "Login" : "Register"}</h2>

     
          {!isLogin ? (
            <div className="mb-3">
              {/* <label className="form-label">Username</label>
              <input type="text" className="form-control" placeholder="Enter username" /> */}

               <Register switchToLogin={ switchToLogin}/>
            </div>
          ) : (

            <div>
            <Login />
          </div>
          )}

       
          {/* <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
          </div>

          <button type="submit" className="btn btn-pink w-100">
            {isLogin ? "Login" : "Register"}
          </button> */}

        <div className="text-center mt-3">
          {isLogin ? (
            <>
              <p>Don’t have an account?</p>
              <p
                className="toggle-text"
                onClick={() => setIsLogin(false)}
              >
                Register here
              </p>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <p
                className="toggle-text"
                onClick={() => setIsLogin(true)}
              >
                Login here
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
