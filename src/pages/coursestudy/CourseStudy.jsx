import React, { useEffect } from 'react';
import "./coursestudy.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';


const CourseStudy = ({user}) => {
    const params = useParams()

    const { fetchCourse , course } = CourseData()
    const navigate = useNavigate();

    if(user && user.role !== "admin" && !user.subscription.includes(params.id)) return navigate("/");

    useEffect(()=>{
        fetchCourse(params.id)
    },[]);
  return (
    <>{course && <div className='course-study-page'>
      
      <div className="mainDiv">
        <div className="imgAndTitle">
        <img className='image' src={`${server}/${course.image}`} alt="Course Image" width={350}/>
        <h2>{course.title}</h2>
      </div>
      <div className="others">
        <h4>{course.description}</h4>
        <h5>By - {course.createdBy}</h5>
        <h5>Duration - {course.duration} Weeks</h5>
        <Link to={`/lectures/${course._id}`} className='common-button'><h2>Go to Lectures</h2></Link>
      </div>
      </div>
      
      
    </div> }</>
  );
};

export default CourseStudy; 