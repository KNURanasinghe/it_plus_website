'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    aboutUs: false,
    services: false
  });
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Load external CSS if not already loaded
    const bootstrapLink = document.querySelector('link[href*="bootstrap"]');
    if (!bootstrapLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css';
      document.head.appendChild(link);
    }

    const fontAwesomeLink = document.querySelector('link[href*="font-awesome"]');
    if (!fontAwesomeLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      document.head.appendChild(link);
    }
  }, []);

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close any open dropdowns when toggling mobile menu
    setIsDropdownOpen({ aboutUs: false, services: false });
  };

  // Enhanced navigation handler
  const handleServiceNavigation = (sectionId, subcategoryId = null) => {
    // Prevent multiple rapid clicks
    if (isNavigating) return;
    setIsNavigating(true);
    
    const currentPath = window.location.pathname;
    const targetId = subcategoryId || sectionId;
    
    // Close dropdown and mobile menu immediately
    setIsDropdownOpen({ aboutUs: false, services: false });
    setIsMobileMenuOpen(false);
    
    if (currentPath === '/services') {
      // We're already on services page - smooth scroll to section
      console.log('Header: Scrolling to section:', targetId);
      
      // Update hash first
      window.history.replaceState(null, null, `#${targetId}`);
      
      // Wait a moment then scroll
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerHeight = 148; // Header + green bar height
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const elementTop = rect.top + scrollTop;
          const finalPosition = Math.max(0, elementTop - headerHeight - 20);
          
          window.scrollTo({
            top: finalPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // Navigate to services page with hash
      console.log('Header: Navigating to services with hash:', targetId);
      window.location.href = `/services#${targetId}`;
    }
    
    // Reset navigation flag
    setTimeout(() => setIsNavigating(false), 1000);
  };

  return (
    <>
      <style jsx>{`
        .header-container {
          position: relative;
          z-index: 1000;
        }
        
        .navbar-custom {
          background: #360065;
          height: 112px;
          padding: 0;
          position: relative;
        }
        
        .navbar-brand {
          display: flex;
          align-items: center;
          padding: 0;
          margin-left: 39px;
        }

        .logo-image {
          width: 196px;
          height: 127px;
          object-fit: contain;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          background: white;
          padding: 10px 20px;
          border-radius: 10px;
          margin-left: 39px;
        }
        
        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #360065;
          margin: 0;
        }
        
        .logo-subtitle {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: #360065;
          margin: 0;
          line-height: 1;
        }
        
        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 30px;
          margin: 0 auto;
        }
        
        .nav-item {
          position: relative;
        }
        
        .nav-link {
          color: white !important;
          font-size: 16px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          padding: 15px 0;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: color 0.3s ease;
          cursor: pointer;
        }
        
        .nav-link:hover {
          color:rgb(245, 149, 32) !important;
        }
        
        .dropdown-arrow {
          font-size: 12px;
          transition: transform 0.3s ease;
        }
        
        .dropdown-arrow.open {
          transform: rotate(180deg);
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-right: 39px;
        }
        
        .btn-contact {
          border: 4px solid rgb(245, 149, 32) ;
          border-radius: 50px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          padding: 8px 25px;
          background: transparent;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .btn-contact:hover {
          background: rgb(245, 149, 32) ;
          color: #360065;
        }
        
        .search-icon {
          width: 47px;
          height: 47px;
          background: rgb(245, 149, 32) ;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #360065;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .search-icon:hover {
          background: white;
        }
        
        .green-bar {
          background: rgb(245, 149, 32);
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 39px; /* Changed to match logo and contact button margins */
          position: relative;
        }
        
        .green-bar-text {
          color: #360065;
          font-size: 16px;
          font-weight: 400;
          font-family: 'Outfit', sans-serif;
          margin: 0;
        }
        
        .green-bar-text.left {
          /* Align with logo start position */
          position: absolute;
          left: 39px;
        }
        
        .green-bar-text.right {
          /* Align with contact button end position */
          position: absolute;
          right: 39px;
        }
        
        .dropdown-menu-custom {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: #360065;
          border: none;
          border-radius: 0 0 20px 20px;
          padding: 20px 0;
          min-width: 800px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .dropdown-menu-custom.show {
          opacity: 1;
          visibility: visible;
        }
        
        .dropdown-content {
          display: flex;
          justify-content: space-between;
          padding: 0 40px;
        }
        
        .dropdown-column {
          flex: 1;
          margin: 0 20px;
        }
        
        .dropdown-column h6 {
          color: rgb(245, 149, 32) ;
          font-size: 18px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          margin-bottom: 15px;
          border-bottom: 2px solid rgb(245, 149, 32) ;
          padding-bottom: 8px;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        
        .dropdown-column h6:hover {
          color: white;
        }
        
        .dropdown-item-custom {
          color: white;
          font-size: 14px;
          font-weight: 400;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          display: block;
          padding: 8px 0;
          transition: color 0.3s ease;
          position: relative;
          cursor: pointer;
        }
        
        .dropdown-item-custom:hover {
          color: rgb(245, 149, 32) ;
          padding-left: 10px;
        }
        
        .dropdown-item-custom:before {
          content: '▶';
          color: rgb(245, 149, 32) ;
          font-size: 8px;
          margin-right: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .dropdown-item-custom:hover:before {
          opacity: 1;
        }
        
        .simple-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: #360065;
          border: none;
          border-radius: 0 0 15px 15px;
          padding: 15px 0;
          min-width: 200px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .simple-dropdown.show {
          opacity: 1;
          visibility: visible;
        }
        
        .simple-dropdown .dropdown-item-custom {
          padding: 10px 20px;
          margin: 0;
        }
        
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          margin-right: 20px;
          cursor: pointer;
          padding-top: 50px;
          z-index: 1001; /* Ensure it's above mobile menu */
          position: relative;
        }

        /* Mobile Menu Overlay */
        .mobile-menu-overlay {
          position: fixed;
          top: 0; /* Changed from 148px to 0 to cover entire screen */
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-menu-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0; /* Changed from 148px to 0 to start from top */
          left: 0;
          right: 0;
          background: #360065;
          max-height: 100vh; /* Changed to full height */
          overflow-y: auto;
          transform: translateY(-100%);
          transition: transform 0.3s ease;
          z-index: 1000;
          padding-top: 148px; /* Add padding to account for header space */
        }

        .mobile-menu.show {
          transform: translateY(0);
        }

        /* Mobile Menu Header - NEW */
        .mobile-menu-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 148px; /* Same as header height */
          background: #360065;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          border-bottom: 1px solid rgba(245, 149, 32, 0.3);
        }

        .mobile-menu-logo {
          width: 150px;
          height: auto;
        }

        .mobile-close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 28px;
          cursor: pointer;
          padding: 10px;
          transition: color 0.3s ease;
        }

        .mobile-close-btn:hover {
          color: rgb(245, 149, 32);
        }

        .mobile-nav-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-nav-link {
          color: white;
          font-size: 16px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover {
          background: rgba(245, 149, 32, 0.1);
          color: rgb(245, 149, 32);
        }

        .mobile-dropdown {
          background: rgba(0, 0, 0, 0.2);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .mobile-dropdown.show {
          max-height: 600px; /* Adjust as needed */
        }

        .mobile-dropdown-item {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          font-weight: 400;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          padding: 12px 40px;
          display: block;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-dropdown-item:hover {
          background: rgba(245, 149, 32, 0.1);
          color: rgb(245, 149, 32);
        }

        /* Services Mobile Dropdown - Special Layout */
        .mobile-services-dropdown {
          padding: 0;
        }

        .mobile-service-category {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .mobile-service-category:last-child {
          border-bottom: none;
        }

        .mobile-category-title {
          color: rgb(245, 149, 32);
          font-size: 16px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          padding: 15px 20px;
          background: rgba(245, 149, 32, 0.1);
          margin: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-category-title:hover {
          background: rgba(245, 149, 32, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .navbar-custom .container-fluid {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
          }

          .navbar-brand {
            margin-left: 0;
          }

          .header-actions {
            margin-right: 0;
          }

          .mobile-toggle {
            display: block;
          }
          
          .navbar-nav {
            display: none; /* Hide desktop nav */
          }
          
          .btn-contact {
            padding: 6px 15px;
            font-size: 14px;
          }
        }

        @media (max-width: 768px) {
          .green-bar {
            height: auto;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 10px 20px;
            gap: 0;
          }

          .green-bar-text.left,
          .green-bar-text.right {
            position: static;
            text-align: center;
            width: 100%;
          }

          .green-bar-text {
            font-size: 14px;
            text-align: center;
            flex: none;
            width: 100%;
            white-space: normal;
            overflow: visible;
            text-overflow: unset;
          }
        }

        @media (max-width: 480px) {
          .green-bar {
            padding: 8px 15px;
          }

          .green-bar-text {
            font-size: 12px;
          }

          .navbar-brand .logo-image {
            width: 150px;
            height: auto;
          }

          .btn-contact {
            padding: 6px 15px;
            font-size: 14px;
          }
        }
      `}</style>

      <div className="header-container">
        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'show' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'show' : ''}`}>
          {/* Mobile Menu Header with Close Button */}
          <div className="mobile-menu-header">
            <img 
              src="/images/it_plus_logo.png" 
              alt="IT Plus Logo" 
              className="mobile-menu-logo"
            />
            {/* <button 
              className="mobile-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button> */}
          </div>

          {/* About Us */}
          <div className="mobile-nav-item">
            <div 
              className="mobile-nav-link"
              onClick={() => toggleDropdown('aboutUs')}
            >
              About Us
              <i className={`fas fa-chevron-down dropdown-arrow ${isDropdownOpen.aboutUs ? 'open' : ''}`}></i>
            </div>
            <div className={`mobile-dropdown ${isDropdownOpen.aboutUs ? 'show' : ''}`}>
              <div className="mobile-dropdown-item" onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDropdownOpen({ aboutUs: false, services: false });
                window.location.href = '/about';
              }}>About us</div>
              <div className="mobile-dropdown-item" onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDropdownOpen({ aboutUs: false, services: false });
                window.location.href = '/careers';
              }}>Careers</div>
              <div className="mobile-dropdown-item" onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDropdownOpen({ aboutUs: false, services: false });
                window.location.href = '/contact';
              }}>Contact us</div>
            </div>
          </div>

          {/* Services */}
          <div className="mobile-nav-item">
            <div 
              className="mobile-nav-link"
              onClick={() => toggleDropdown('services')}
            >
              Services
              <i className={`fas fa-chevron-down dropdown-arrow ${isDropdownOpen.services ? 'open' : ''}`}></i>
            </div>
            <div className={`mobile-dropdown mobile-services-dropdown ${isDropdownOpen.services ? 'show' : ''}`}>
              {/* Technology */}
              <div className="mobile-service-category">
                <h6 className="mobile-category-title" onClick={() => handleServiceNavigation('technology')}>Technology</h6>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('technology', 'enterprise-networking')}>Enterprise Networking</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('technology', 'managed-wifi-solutions')}>Managed Wi-Fi Solutions</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('technology', 'ip-pbx-solutions')}>IP PBX Solutions</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('technology', 'firewall-solutions')}>Firewall Solutions</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('technology', 'information-security')}>Information Security</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('technology', 'servers-virtualization')}>Servers & Virtualization</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('technology', 'storage-solutions')}>Storage Solutions</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('technology', 'vpn-brand-connectivity')}>VPN and Brand Connectivity</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('technology', 'video-conferencing')}>Video Conferencing</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('technology', 'cctv-solutions')}>CCTV Solutions</div>
              </div>

              {/* Cloud */}
              <div className="mobile-service-category">
                <h6 className="mobile-category-title" onClick={() => handleServiceNavigation('cloud')}>Cloud</h6>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('cloud', 'itplus-cloud-vps')}>ITPlus Cloud - Cloud VPS</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('cloud', 'itplus-shield-cloud-protect')}>ITPlus Shield - Cloud Protect</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('cloud', 'itplus-backup-cloud-backup')}>ITPlus Backup - Cloud Backup</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('cloud', 'itplus-virtual-cloud-virtual')}>ITPlus Virtual - Cloud Virtual</div>
              </div>

              {/* Software */}
              <div className="mobile-service-category">
                <h6 className="mobile-category-title" onClick={() => handleServiceNavigation('software')}>Software</h6>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('software', 'custom-software-development')}>Custom Software Development</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('software', 'web-application-development')}>Web Application Development</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('software', 'mobile-app-development')}>Mobile App Development</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('software', 'erp-systems')}>ERP Systems</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('software', 'payroll-hr-systems')}>Payroll & HR Systems</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('software', 'pos-solutions')}>POS Solutions</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('software', 'api-integration-services')}>API Integration Services</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('software', 'software-maintenance-support')}>Software Maintenance & Support</div>
              </div>

              {/* IT Support */}
              <div className="mobile-service-category">
                <h6 className="mobile-category-title" onClick={() => handleServiceNavigation('it-support')}>IT Support</h6>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('it-support', 'onsite-remote-support')}>Onsite & Remote Support</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('it-support', 'it-helpdesk')}>IT Helpdesk</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('it-support', 'annual-maintenance-service')}>Annual Maintenance Service</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('it-support', 'it-consultant-project-management')}>IT Consultant & Project Management</div>
                <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('it-support', 'it-staff-outsourcing')}>IT Staff Outsourcing</div>
              </div>
            </div>
          </div>

          {/* Other Navigation Items */}
          <div className="mobile-nav-item">
            <a href="/academic" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Academic</a>
          </div>
          <div className="mobile-nav-item">
            <a href="/blog" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Blog</a>
          </div>
          <div className="mobile-nav-item">
            <a href="/gallery" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Gallery</a>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="navbar navbar-expand-lg navbar-custom">
          <div className="container-fluid px-0">
            {/* Logo */}
            <a className="navbar-brand" href="/">
               <img 
               src="/images/it_plus_logo.png" 
               alt="IT Plus Logo" 
               className="logo-image"
               />
            </a>
            
            {/* Mobile Toggle */}
            <button 
              className="mobile-toggle" 
              type="button"
              onClick={toggleMobileMenu}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
            
            {/* Desktop Navigation Links */}
            <div className="navbar-nav">
              {/* About Us Dropdown */}
              <div className="nav-item">
                <div 
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('aboutUs');
                  }}
                >
                  About Us
                  <i className={`fas fa-chevron-down dropdown-arrow ${isDropdownOpen.aboutUs ? 'open' : ''}`}></i>
                </div>
                <div className={`simple-dropdown ${isDropdownOpen.aboutUs ? 'show' : ''}`}>
                  <div className="dropdown-item-custom" onClick={() => {
                    setIsDropdownOpen({ aboutUs: false, services: false });
                    window.location.href = '/about';
                  }}>About us</div>
                  <div className="dropdown-item-custom" onClick={() => {
                    setIsDropdownOpen({ aboutUs: false, services: false });
                    window.location.href = '/careers';
                  }}>Careers</div>
                  <div className="dropdown-item-custom" onClick={() => {
                    setIsDropdownOpen({ aboutUs: false, services: false });
                    window.location.href = '/contact';
                  }}>Contact us</div>
                </div>
              </div>

              {/* Services Dropdown */}
              <div className="nav-item">
                <div 
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('services');
                  }}
                >
                  Services
                  <i className={`fas fa-chevron-down dropdown-arrow ${isDropdownOpen.services ? 'open' : ''}`}></i>
                </div>
                <div className={`dropdown-menu-custom ${isDropdownOpen.services ? 'show' : ''}`}>
                  <div className="dropdown-content">
                    {/* Technology Column */}
                    <div className="dropdown-column">
                      <h6 onClick={() => handleServiceNavigation('technology')}>Technology</h6>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('technology', 'enterprise-networking')}>Enterprise Networking</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('technology', 'managed-wifi-solutions')}>Managed Wi-Fi Solutions</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('technology', 'ip-pbx-solutions')}>IP PBX Solutions</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('technology', 'firewall-solutions')}>Firewall Solutions</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('technology', 'information-security')}>Information Security</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('technology', 'servers-virtualization')}>Servers & Virtualization</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('technology', 'storage-solutions')}>Storage Solutions</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('technology', 'vpn-brand-connectivity')}>VPN and Brand Connectivity</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('technology', 'video-conferencing')}>Video Conferencing</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('technology', 'cctv-solutions')}>CCTV Solutions</div>
                    </div>

                    {/* Cloud Column */}
                    <div className="dropdown-column">
                      <h6 onClick={() => handleServiceNavigation('cloud')}>Cloud</h6>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('cloud', 'itplus-cloud-vps')}>ITPlus Cloud - Cloud VPS</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('cloud', 'itplus-shield-cloud-protect')}>ITPlus Shield - Cloud Protect</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('cloud', 'itplus-backup-cloud-backup')}>ITPlus Backup - Cloud Backup</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('cloud', 'itplus-virtual-cloud-virtual')}>ITPlus Virtual - Cloud Virtual</div>
                    </div>

                    {/* Software Column */}
                    <div className="dropdown-column">
                      <h6 onClick={() => handleServiceNavigation('software')}>Software</h6>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('software', 'custom-software-development')}>Custom Software Development</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('software', 'web-application-development')}>Web Application Development</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('software', 'mobile-app-development')}>Mobile App Development</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('software', 'erp-systems')}>ERP Systems</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('software', 'payroll-hr-systems')}>Payroll & HR Systems</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('software', 'pos-solutions')}>POS Solutions</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('software', 'api-integration-services')}>API Integration Services</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('software', 'software-maintenance-support')}>Software Maintenance & Support</div>
                    </div>

                    {/* IT Support Column */}
                    <div className="dropdown-column">
                      <h6 onClick={() => handleServiceNavigation('it-support')}>IT Support</h6>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('it-support', 'onsite-remote-support')}>Onsite & Remote Support</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('it-support', 'it-helpdesk')}>IT Helpdesk</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('it-support', 'annual-maintenance-service')}>Annual Maintenance Service</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('it-support', 'it-consultant-project-management')}>IT Consultant & Project Management</div>
                      <div className="dropdown-item-custom" onClick={() => handleServiceNavigation('it-support', 'it-staff-outsourcing')}>IT Staff Outsourcing</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Navigation Items */}
              <div className="nav-item">
                <a href="/academic" className="nav-link">Academic</a>
              </div>
              <div className="nav-item">
                <a href="/blog" className="nav-link">Blog</a>
              </div>
              <div className="nav-item">
                <a href="/gallery" className="nav-link">Gallery</a>
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="header-actions">
              <button className="btn-contact">Contact Us</button>
            </div>
          </div>
        </nav>

        {/* Green Bar */}
        <div className="green-bar">
          <p className="green-bar-text left">Join ITPlus at Connect Brasil and discover how you can transform your business</p>
          <p className="green-bar-text right">
  <i className="fas fa-arrow-right" style={{marginRight: '8px'}}></i>
  Learn More
</p>
        </div>
      </div>
    </>
  );
}