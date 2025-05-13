import React from 'react'
import { MdDashboardCustomize } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";
import "./account.css";
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Account = ({user}) => {
  const {setIsAuth, setUser} = UserData();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  return (
    <div>
      {user && (
        <div className='profile'>
        <h2>My Profile</h2>
        <div className="profile-info">
            <p><strong>Name - {user.name}</strong></p>
            <p><strong>Email - {user.email}</strong></p>

            <button className='common-button' onClick={()=>navigate(`/${user._id}/dashboard`)}><MdDashboardCustomize /> Dashboard</button>
            <br />
            {
              user.role === "admin" && (<button className='common-button' onClick={()=>navigate(`/admin/dashboard`)}><MdDashboardCustomize />Admin Dashboard</button>)
            }
            <br />
            <button className='common-button' onClick={logoutHandler} style={{backgroundColor: "#f00058", color: "white"}}><RiLogoutBoxRFill /> Logout </button>
        </div>
    </div>
      )}
    </div>
  )
}

export default Account