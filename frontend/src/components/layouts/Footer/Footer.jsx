import React from "react";
import playStore from "../../../images/footer/playstore.png";
import appStore from "../../../images/footer/Appstore.png";
import "./Footer.css";
const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="Appstore" />
            </div>

            <div className="midFooter">
                <h1>NutriNavigator.</h1>
                <p>Your Guide to Organic Delights and Nutritional Insight</p>

                <p>Copyrights {new Date().getFullYear()} &copy; Rez_Wizardry</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://www.linkedin.com/in/rezoan-ahmed-abir-2ba462279/">
                    LinkedIn
                </a>
                <a href="https://github.com/REZ-OAN">GitHub</a>
                <a href="https://www.facebook.com/ahmedabir02">Facebook</a>
            </div>
        </footer>
    );
};

export default Footer;
