import React from 'react'
import "./auth.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserData } from '../../context/UserContext'

const Verify = () => {
  const [otp, setOtp] = useState("");
  const {btnLoading, verifyOtp}= UserData();
  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
    // Call the API to verify the OTP
  }
  return (
    <div className="auth-page">
        <div className="auth-form">
            <h2>Verify Account</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="otp">Verification Code/OTP</label>
                <input type="number" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required />

                <button disabled={btnLoading} type="submit" className="common-button">
                    {btnLoading ? "Please Wait.." : "Verify"}
                </button>
            </form>

            <p>Go to  <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Verify