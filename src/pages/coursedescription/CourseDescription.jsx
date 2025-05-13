import React, { useEffect, useState } from 'react'
import "./courseDescription.css"
// import { server } from '../../main'
import { useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../../context/UserContext';
import Loading from '../../components/loading/Loading';

const CourseDescription = ({user}) => {

    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false);

    const {fetchUser} = UserData();
    
    const {fetchCourse , fetchCourses, course, fetchMyCourse } = CourseData();

    useEffect(() => {
        fetchCourse(params.id);
    },[]);

    const checkoutHandler =  async () => {
        const token = localStorage.getItem("token")
        setLoading(true)

        const {data:{order}} = await axios.post(`${server}/api/course/checkout/${params.id}`,{},{
            headers:{
                token,
            }
        });
        const options = {
            "key": "rzp_test_tViR8AkOG7C3kx", // Enter the Key ID generated from the Dashboard
            //  "amount": order.id, // Amount is in currency subunits. Default currency is INR. Hence,       50000 refers to 50000 paise
             "currency": "INR",
             "name": "Learn From Basics!", //your business name
             "description": "An Online Learning Plateform..",
             "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response        of Step 1

             handler: async function (response){
                const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

                try {
                    const {data} = await axios.post(`${server}/api/verification/${params.id}`,{
                          razorpay_order_id,
                          razorpay_payment_id, 
                          razorpay_signature,
                    },{
                        headers: {
                            token,
                        }
                    });

                    await fetchUser();
                    await fetchCourses();
                    await fetchMyCourse();
                    toast.success(data.message);
                    setLoading(false);
                    navigate(`/payment-success/${razorpay_payment_id}`);

                } catch (error) {
                    toast.error(error.response.data.message);
                    setLoading(false);
                }
             },

             theme:{
                color: "#8a4baf",
             }
        };

        const razorpay = new window.Razorpay(options);

        razorpay.open();
    }

  return (
    <>
    {
        loading? <Loading /> : <>
        {course && 
        <div className="course-description">
           <div className="newcoursestyling">
             <div className="course-header">
                <img src={`${server}/${course.image}`} alt={course.title} className='course-image'/>
                <div className="course-info">
                    <h2>{course.title}</h2>
                    <p>Instructor : {course.createdBy}</p>
                    <p>Duration : {course.duration} Weeks</p>
                </div>
               <p>{course.description}.</p>
                <p>Let's get started with this course only at ₹{course.price}.</p>
                {
                    user && user.subscription.includes(course._id) ? (
                        <button className='common-button'
                        onClick={() => navigate(`/course/study/${course._id}`)}
                        >Start Learning!</button>
                    ) : (
                        <button className='common-button' onClick={checkoutHandler}>Buy Now!</button>
                    )
                }
               </div>
               
           </div>
        </div>}
    </>
    }
    </>
  )
}

export default CourseDescription