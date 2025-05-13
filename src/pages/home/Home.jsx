import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./home.css";
import Testimonials from '../../components/testimonials/Testimonials';

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h3>"Learning That Makes Sense — Right From the Start."</h3>
          <p>We don’t just teach you what to do—we explain why it matters. Our lessons are structured to give you a deep understanding that sticks.</p>
          <button className="common-button" onClick={() => navigate("/courses")}>Let's Get Started</button> 
        </div>
      </div>
      <Testimonials />
    </div>
  )
}

export default Home