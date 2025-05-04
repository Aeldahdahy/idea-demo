import React from 'react';
import Logo from '../Common/Logo';
import NavigationLinks from './NavigationLinks';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

// Add icons to the library
library.add(fas, fab);

function Footer() {
  return (
    <div className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 footerLogo">
            <Logo />
          </div>
          <div className="col-12 footerContainer">
            <div className="footerSection">
              <h2 className="footerHeaderSection">Navigation</h2>
              <div className="footerLinks">
                <NavigationLinks />
              </div>
            </div>
            <div className="footerDivider d-none d-md-block"></div>
            <div className="footerSection">
              <h2 className="footerHeaderSection">Our Newsletter</h2>
              <div className="subscribeSection">
                <h2>Subscribe to our newsletter</h2>
                <form className="mt-4">
                  <input type="email" className="form-control rounded" placeholder="Your email" />
                  <button type="button" class="mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Submit</button>
                </form>
              </div>
            </div>
            <div className="footerDivider d-none d-md-block"></div>
            <div className="footerSection">
              <h2 className="footerHeaderSection">Important Links</h2>
              <div className="footerLinks">
                <Link to="/faqs">FAQs</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/support">Support</Link>
              </div>
              <div className="footerSocialMediaIcons">
                <a href="https://www.facebook.com/share/1JUWs1jYhQ/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={["fab", "twitter"]} />
                </a>
                <a href="https://www.instagram.com/idea.x.venture?utm_source=qr&igsh=MW01cG1hYmF4MGliZg==" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={["fab", "instagram"]} />
                </a>
                <a href="https://www.linkedin.com/in/idea-venture-658978362?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
                </a>
                <a href="tel:+123456789" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={["fas", "phone"]} />
                </a>
                <a href="mailto:info@example.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={["fas", "envelope"]} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
