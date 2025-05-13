import React from 'react' 
import "./paymentsuccess.css";
import { Link, useParams } from 'react-router-dom';

const PaymentSuccess = ({user}) => {
    const params = useParams()
  return (
    <div className='payment-success-page'>
        {user && <div className="success-Message">
            <h2>Payment Successful!</h2>
            <p>Your Course Subscription has been Activated..</p>
            <p>Reference No. - {params.id}</p>
            <Link to={`/${user._id}/dashboard`} className='common-button'>Go to Dashboard</Link>
        </div> }
    </div>
  )
}

export default PaymentSuccess