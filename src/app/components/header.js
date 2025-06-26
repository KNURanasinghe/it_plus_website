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

    // Close mobile menu when window is resized to desktop
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen({ aboutUs: false, services: false });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          height: auto;
          min-height: 112px;
          padding: 0;
          position: relative;
        }
                
        .navbar-brand {
          display: flex;
          align-items: center;
          padding: 0;
          margin-left: clamp(15px, 4vw, 39px);
        }

        .logo-image {
          width: clamp(120px, 20vw, 196px);
          height: clamp(75px, 15vw, 127px);
          object-fit: contain;
        }
                
        .logo-container {
          display: flex;
          align-items: center;
          background: white;
          padding: 10px 20px;
          border-radius: 10px;
          margin-left: clamp(15px, 4vw, 39px);
        }
                
        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(18px, 3vw, 24px);
          font-weight: 700;
          color: #360065;
          margin: 0;
        }
                
        .logo-subtitle {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(10px, 2vw, 12px);
          font-weight: 400;
          color: #360065;
          margin: 0;
          line-height: 1;
        }
                
        .navbar-nav {
          display: flex;
          align-items: center;
          gap: clamp(15px, 3vw, 30px);
          margin: 0 auto;
        }
                
        .nav-item {
          position: relative;
        }
                
        .nav-link {
          color: white !important;
          font-size: clamp(14px, 2vw, 16px);
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          padding: 15px 0;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: color 0.3s ease;
          cursor: pointer;
          white-space: nowrap;
        }
                
        .nav-link:hover {
          color: #33FF94 !important;
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
          gap: clamp(10px, 2vw, 20px);
          margin-right: clamp(15px, 4vw, 39px);
        }
                
        .btn-contact {
          border: 4px solid #33FF94;
          border-radius: 50px;
          color: white;
          font-size: clamp(12px, 2vw, 16px);
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          padding: clamp(6px, 1vw, 8px) clamp(15px, 3vw, 25px);
          background: transparent;
          transition: all 0.3s ease;
          cursor: pointer;
          white-space: nowrap;
        }
                
        .btn-contact:hover {
          background: #33FF94;
          color: #360065;
        }
                
        .search-icon {
          width: clamp(35px, 6vw, 47px);
          height: clamp(35px, 6vw, 47px);
          background: #33FF94;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #360065;
          font-size: clamp(16px, 3vw, 20px);
          cursor: pointer;
          transition: all 0.3s ease;
        }
                
        .search-icon:hover {
          background: white;
        }
                
        .green-bar {
          background: #33FF94;
          height: auto;
          min-height: 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(8px, 2vw, 0) clamp(15px, 4vw, 58px);
          flex-wrap: wrap;
          gap: 10px;
        }
                
        .green-bar-text {
          color: #360065;
          font-size: clamp(12px, 2vw, 16px);
          font-weight: 400;
          font-family: 'Outfit', sans-serif;
          margin: 0;
          text-align: center;
          flex: 1;
        }
                
        .contact-now-btn {
          background: #360065;
          color: white;
          border: none;
          border-radius: 20px;
          font-size: clamp(11px, 2vw, 14px);
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          padding: 5px 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
                
        .contact-now-btn:hover {
          background: #15145F;
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
          min-width: clamp(300px, 80vw, 800px);
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
          padding: 0 clamp(20px, 4vw, 40px);
          flex-wrap: wrap;
        }
                
        .dropdown-column {
          flex: 1;
          margin: 0 clamp(10px, 2vw, 20px);
          min-width: 180px;
        }
                
        .dropdown-column h6 {
          color: #33FF94;
          font-size: clamp(16px, 2.5vw, 18px);
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          margin-bottom: 15px;
          border-bottom: 2px solid #33FF94;
          padding-bottom: 8px;
          cursor: pointer;
          transition: color 0.3s ease;
        }
                
        .dropdown-column h6:hover {
          color: white;
        }
                
        .dropdown-item-custom {
          color: white;
          font-size: clamp(12px, 2vw, 14px);
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
          color: #33FF94;
          padding-left: 10px;
        }
                
        .dropdown-item-custom:before {
          content: '▶';
          color: #33FF94;
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
          font-size: clamp(20px, 4vw, 24px);
          margin-right: clamp(15px, 3vw, 20px);
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .mobile-toggle:hover {
          color: #33FF94;
        }
                
        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #360065;
          padding: 20px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          z-index: 999;
        }

        .mobile-menu.show {
          display: block;
        }

        .mobile-nav-item {
          margin-bottom: 15px;
        }

        .mobile-nav-link {
          color: white;
          font-size: 16px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          display: block;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: color 0.3s ease;
        }

        .mobile-nav-link:hover {
          color: #33FF94;
        }

        .mobile-dropdown {
          margin-top: 10px;
          padding-left: 20px;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .mobile-dropdown.show {
          max-height: 800px;
        }

        .mobile-dropdown-category {
          margin-bottom: 15px;
        }

        .mobile-dropdown-title {
          color: #33FF94;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          cursor: pointer;
        }

        .mobile-dropdown-item {
          color: rgba(255, 255, 255, 0.8);
          font-size: 12px;
          display: block;
          padding: 5px 0;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .mobile-dropdown-item:hover {
          color: #33FF94;
        }

        /* Desktop Breakpoints */
        @media (min-width: 1200px) {
          .navbar-custom {
            height: 112px;
          }
          
          .navbar-nav {
            gap: 30px;
          }
        }

        /* Large Tablets and Small Laptops */
        @media (max-width: 1199px) and (min-width: 992px) {
          .dropdown-content {
            flex-wrap: wrap;
          }
          
          .dropdown-column {
            flex: 0 0 48%;
            margin-bottom: 20px;
          }
          
          .dropdown-menu-custom {
            min-width: 600px;
          }
        }

        /* Tablets */
        @media (max-width: 991px) {
          .mobile-toggle {
            display: block;
          }
                    
          .navbar-nav {
            display: none;
          }
          
          .navbar-custom {
            min-height: 80px;
            padding: 10px 0;
          }
          
          .green-bar {
            flex-direction: column;
            text-align: center;
            padding: 10px 15px;
          }
          
          .green-bar-text {
            margin-bottom: 10px;
          }
          
          .header-actions {
            margin-right: 15px;
          }
          
          .btn-contact {
            padding: 6px 15px;
            font-size: 14px;
          }
        }

        /* Mobile Phones */
        @media (max-width: 768px) {
          .navbar-custom {
            min-height: 70px;
            padding: 8px 0;
          }
          
          .logo-image {
            width: 120px;
            height: 75px;
          }
          
          .navbar-brand {
            margin-left: 15px;
          }
          
          .header-actions {
            margin-right: 10px;
          }
          
          .btn-contact {
            padding: 5px 12px;
            font-size: 12px;
            border-width: 2px;
          }
          
          .search-icon {
            width: 35px;
            height: 35px;
            font-size: 16px;
          }
          
          .green-bar {
            padding: 8px 10px;
          }
          
          .green-bar-text {
            font-size: 12px;
            line-height: 1.4;
          }
          
          .contact-now-btn {
            font-size: 11px;
            padding: 4px 12px;
          }
        }

        /* Small Mobile Phones */
        @media (max-width: 480px) {
          .navbar-custom {
            min-height: 65px;
          }
          
          .logo-image {
            width: 100px;
            height: 65px;
          }
          
          .navbar-brand {
            margin-left: 10px;
          }
          
          .header-actions {
            gap: 8px;
            margin-right: 8px;
          }
          
          .btn-contact {
            padding: 4px 10px;
            font-size: 11px;
          }
          
          .search-icon {
            width: 30px;
            height: 30px;
            font-size: 14px;
          }
          
          .green-bar-text {
            font-size: 11px;
            padding: 0 5px;
          }
          
          .mobile-toggle {
            font-size: 20px;
            margin-right: 8px;
          }
        }

        /* Extra Small Devices */
        @media (max-width: 320px) {
          .navbar-custom {
            min-height: 60px;
          }
          
          .logo-image {
            width: 90px;
            height: 55px;
          }
          
          .btn-contact {
            display: none;
          }
          
          .green-bar-text {
            font-size: 10px;
          }
          
          .contact-now-btn {
            font-size: 10px;
            padding: 3px 8px;
          }
        }
      `}</style>

      <div className="header-container">
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

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMobileMenuOpen ? 'show' : ''}`}>
            {/* About Us Mobile */}
            <div className="mobile-nav-item">
              <div 
                className="mobile-nav-link"
                onClick={() => toggleDropdown('aboutUs')}
              >
                About Us
                <i className={`fas fa-chevron-down float-end dropdown-arrow ${isDropdownOpen.aboutUs ? 'open' : ''}`}></i>
              </div>
              <div className={`mobile-dropdown ${isDropdownOpen.aboutUs ? 'show' : ''}`}>
                <div className="mobile-dropdown-item" onClick={() => {
                  setIsDropdownOpen({ aboutUs: false, services: false });
                  setIsMobileMenuOpen(false);
                  window.location.href = '/about';
                }}>About us</div>
                <div className="mobile-dropdown-item" onClick={() => {
                  setIsDropdownOpen({ aboutUs: false, services: false });
                  setIsMobileMenuOpen(false);
                  window.location.href = '/careers';
                }}>Careers</div>
                <div className="mobile-dropdown-item" onClick={() => {
                  setIsDropdownOpen({ aboutUs: false, services: false });
                  setIsMobileMenuOpen(false);
                  window.location.href = '/contact';
                }}>Contact us</div>
              </div>
            </div>

            {/* Services Mobile */}
            <div className="mobile-nav-item">
              <div 
                className="mobile-nav-link"
                onClick={() => toggleDropdown('services')}
              >
                Services
                <i className={`fas fa-chevron-down float-end dropdown-arrow ${isDropdownOpen.services ? 'open' : ''}`}></i>
              </div>
              <div className={`mobile-dropdown ${isDropdownOpen.services ? 'show' : ''}`}>
                <div className="mobile-dropdown-category">
                  <div className="mobile-dropdown-title" onClick={() => handleServiceNavigation('technology')}>Technology</div>
                  <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('technology', 'enterprise-networking')}>Enterprise Networking</div>
                  <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('technology', 'managed-wifi-solutions')}>Managed Wi-Fi Solutions</div>
                  <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('technology', 'ip-pbx-solutions')}>IP PBX Solutions</div>
                </div>
                
                <div className="mobile-dropdown-category">
                  <div className="mobile-dropdown-title" onClick={() => handleServiceNavigation('cloud')}>Cloud</div>
                  <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('cloud', 'itplus-cloud-vps')}>ITPlus Cloud - Cloud VPS</div>
                  <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('cloud', 'itplus-shield-cloud-protect')}>ITPlus Shield - Cloud Protect</div>
                  <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('cloud', 'itplus-backup-cloud-backup')}>ITPlus Backup - Cloud Backup</div>
                </div>
                
                <div className="mobile-dropdown-category">
                  <div className="mobile-dropdown-title" onClick={() => handleServiceNavigation('software')}>Software</div>
                  <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('software', 'custom-software-development')}>Custom Software Development</div>
                  <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('software', 'web-application-development')}>Web Application Development</div>
                  <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('software', 'mobile-app-development')}>Mobile App Development</div>
                </div>
                
                <div className="mobile-dropdown-category">
                  <div className="mobile-dropdown-title" onClick={() => handleServiceNavigation('it-support')}>IT Support</div>
                  <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('it-support', 'onsite-remote-support')}>Onsite & Remote Support</div>
                  <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('it-support', 'it-helpdesk')}>IT Helpdesk</div>
                  <div className="mobile-dropdown-item" onClick={() => handleServiceNavigation('it-support', 'annual-maintenance-service')}>Annual Maintenance Service</div>
                </div>
              </div>
            </div>

            {/* Other Mobile Navigation Items */}
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
        </nav>

        {/* Green Bar */}
        <div className="green-bar">
          <p className="green-bar-text">Join ITPlus at Connect Brasil and discover how you can transform your business</p>
        </div>
      </div>
    </>
  );
}