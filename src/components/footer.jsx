import React from "react";
import '../../public/styles/footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return(
        <div>
            <footer>Copyright © {currentYear}</footer>
        </div>
    )
}

export default Footer;