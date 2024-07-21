import React from 'react';
import Logo from './Logo';
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
                <p>Don't miss out! Be the first to know about exciting new developments.</p>
                <form className="d-flex justify-content-evenly">
                  <input type="email" className="form-control rounded" placeholder="Your email" />
                  <input type="submit" className="SubscribeButton btn btn-primary rounded" />
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
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={["fab", "twitter"]} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={["fab", "instagram"]} />
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
