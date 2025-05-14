// NavigationLinks.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavigationLinks({ isAuthenticated, role, clientRole }) {
  // Public links for unauthenticated users
  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/invest', label: 'Invest' },
    { to: '/fundraising', label: 'Capital raising' },
    { to: '/stories', label: 'Blogs' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact Us' },
  ];

  // Investor-specific links
  const investorLinks = [
    { to: '/client-portal/investor', label: 'Home' },
    { to: '/client-portal/investor/myInvestments', label: 'My Investments' },
    { to: '/client-portal/investor/stories', label: 'Blogs' },
    { to: '/client-portal/investor/about', label: 'About Us' },
    { to: '/client-portal/investor/contact', label: 'Contact Us' },
  ];

  // Entrepreneur-specific links
  const entrepreneurLinks = [
    { to: '/client-portal/entrepreneur', label: 'Home' },
    { to: '/client-portal/entrepreneur/myProjects', label: 'My Projects' },
    { to: '/client-portal/entrepreneur/stories', label: 'Blogs' },
    { to: '/client-portal/entrepreneur/about', label: 'About Us' },
    { to: '/client-portal/entrepreneur/contact', label: 'Contact Us' },
  ];

  // Select links based on authentication and role
  let links = publicLinks;
  if (isAuthenticated && role === 'client') {
    links = clientRole === 'Investor' ? investorLinks : entrepreneurLinks;
  }

  return (
    <>
      {links.map((link, index) => (
        <React.Fragment key={link.to}>
          <Link to={link.to} className="nav-link">{link.label}</Link>
          {index < links.length - 1 && <span className="divider">|</span>}
        </React.Fragment>
      ))}
    </>
  );
}

export default NavigationLinks;