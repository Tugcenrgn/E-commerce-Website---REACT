import { useContext, useEffect, useState } from "react";
import Axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import "./signinScreen.css";

export default function SigninScreen() {
    const navigate = useNavigate();
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { state, dispatch: contextDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler =  () => {
     if(username.current.value == "abc" && password.current.value == "123"){
      contextDispatch({ type: 'USER_SIGNIN'});
     }
     
    };

    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [navigate, redirect, userInfo]);

    return(
        <div className="signinScreen-container">
          <div className="signin-container">
          <title>Sign in</title>

          <h1 className="signin-header">Sign In</h1>
          <div className="form">
          <form>
            <div className="input-container">
              <label>User Name </label>
              <input type="text" className="username" required 
              onChange={(e) => setUsername(e.target.value)}/>
              
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" className="pass" required
              onChange={(e) => setPassword(e.target.value)} />
              
            </div>
            <div className="input-container">
              <button type="submit" onSubmit={submitHandler} className="submit-btn">Sign In</button>
            </div>

            <div className="input-container">
              New customer ?{' '}
              <Link className="create-account" to={`/signup?redirect=${redirect}`}>Create Account</Link>
            </div>
          </form>
        </div>
        </div>
        </div>
    )
}