import React, { useState } from 'react'
import "./auth.css"
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../context/UserContext';
import { CourseData } from '../../context/CourseContext';

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const{ fetchMyCourse } =CourseData();
  
  const submitHandeler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  }
  return (
    <div className="auth-page">
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={submitHandeler}>
                <label htmlFor="email">Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />

                <label htmlFor="password">Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />

                <button disabled={btnLoading} type='submit' className="common-button" >
                  {btnLoading ? "Please Wait..." : "Login"}
                </button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    </div>
  )
}

export default Login