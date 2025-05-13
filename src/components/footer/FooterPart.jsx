import React from 'react'
import './footerpart.css'
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";

const FooterPart = () => {
  return (
    <footer>
           <div className="footer-container">
            <p>&copy; 2025 Learn From Basics! All rights reserved.</p>
            <p>Made with 🩶 by Saksham.</p>
            </div>
            <div className="socialMedia-link">
                <a href="https://www.instagram.com"><BiLogoInstagramAlt /> Instagram</a>
                <a href="https://twitter.com"><FaXTwitter /> Twitter</a>
                <a href="https://www.facebook.com"><ImFacebook2 /> Facebook</a>
            </div>
    </footer>
  )
}

export default FooterPart
