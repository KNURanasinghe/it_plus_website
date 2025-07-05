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

    // Handle scroll to hash on page load/refresh
    const handleHashScroll = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const headerElement = document.querySelector('.header-container');
            const headerHeight = headerElement ? headerElement.offsetHeight : 148;
            const elementRect = element.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.pageYOffset;
            const finalPosition = Math.max(0, absoluteElementTop - headerHeight - 20);
            
            window.scrollTo({
              top: finalPosition,
              behavior: 'smooth'
            });
          }
        }, 500); // Wait for content to load
      }
    };

    // Handle initial hash scroll and hash changes
    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen(prev => {
      const newState = {
        ...prev,
        [dropdown]: !prev[dropdown]
      };
      
      // For mobile services dropdown, ensure proper height calculation
      if (dropdown === 'services' && window.innerWidth <= 991) {
        setTimeout(() => {
          const servicesDropdown = document.querySelector('.mobile-services-dropdown');
          if (servicesDropdown && newState.services) {
            // Force recalculation of height
            servicesDropdown.style.maxHeight = 'none';
            servicesDropdown.style.height = 'auto';
            console.log('Services dropdown opened - height reset');
          }
        }, 50);
      }
      
      return newState;
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close any open dropdowns when toggling mobile menu
    setIsDropdownOpen({ aboutUs: false, services: false });
  };

  // Enhanced navigation handler with improved scrolling
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
      
      // Scroll to element with better error handling
      const scrollToElement = () => {
        const element = document.getElementById(targetId);
        if (element) {
          // Calculate header height dynamically
          const headerElement = document.querySelector('.header-container');
          const headerHeight = headerElement ? headerElement.offsetHeight : 148;
          
          // Get element position
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          const finalPosition = Math.max(0, absoluteElementTop - headerHeight - 20);
          
          // Smooth scroll to position
          window.scrollTo({
            top: finalPosition,
            behavior: 'smooth'
          });
          
          // Update URL hash after successful scroll
          setTimeout(() => {
            window.history.replaceState(null, null, `#${targetId}`);
          }, 500);
        } else {
          console.warn(`Element with ID "${targetId}" not found`);
          // Try again after a short delay in case content is still loading
          setTimeout(scrollToElement, 200);
        }
      };
      
      // Execute scroll after a small delay to ensure menu is closed
      setTimeout(scrollToElement, 100);
      
    } else {
      // Navigate to services page with hash - use router for better handling
      console.log('Header: Navigating to services with hash:', targetId);
      
      // Use Next.js router if available, otherwise fallback to window.location
      if (router && router.push) {
        router.push(`/services#${targetId}`, undefined, { 
          scroll: false // Disable automatic scroll, we'll handle it manually
        }).then(() => {
          // After navigation, scroll to the element
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              const headerElement = document.querySelector('.header-container');
              const headerHeight = headerElement ? headerElement.offsetHeight : 148;
              const elementRect = element.getBoundingClientRect();
              const absoluteElementTop = elementRect.top + window.pageYOffset;
              const finalPosition = Math.max(0, absoluteElementTop - headerHeight - 20);
              
              window.scrollTo({
                top: finalPosition,
                behavior: 'smooth'
              });
            }
          }, 300); // Longer delay for page navigation
        });
      } else {
        // Fallback to window.location
        window.location.href = `/services#${targetId}`;
      }
    }
    
    // Reset navigation flag
    setTimeout(() => setIsNavigating(false), 1500);
  };

  return (
    <>
      <style jsx>{`
        /* Global scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Ensure sections have proper scroll margin for fixed header */
        section[id], div[id] {
          scroll-margin-top: 160px;
        }
        
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
          position: absolute;
          left: 52px;
        }
        
        .green-bar-text.right {
          position: absolute;
          right: 49px;
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
          min-width: 1200px;
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
          padding: 10px;
          z-index: 1001;
          position: relative;
          transition: color 0.3s ease;
        }

        .mobile-toggle:hover {
          color: rgb(245, 149, 32);
        }

        /* Mobile Menu Overlay */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
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
          top: 0;
          left: 0;
          right: 0;
          background: #360065;
          max-height: 100vh;
          height: 100vh; /* Full height */
          overflow-y: auto;
          transform: translateY(-100%);
          transition: transform 0.3s ease;
          z-index: 1000;
          padding-top: 60px; /* Space for mobile header */
          padding-bottom: 20px; /* Extra bottom padding */
        }

        .mobile-menu.show {
          transform: translateY(0);
        }

        /* Mobile Menu Header */
        .mobile-menu-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: #360065;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          border-bottom: 1px solid rgba(245, 149, 32, 0.3);
          z-index: 1001;
        }

        .mobile-menu-logo {
          height: 40px;
          width: auto;
        }

        .mobile-close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 8px;
          transition: color 0.3s ease;
          border-radius: 4px;
        }

        .mobile-close-btn:hover {
          color: rgb(245, 149, 32);
          background: rgba(245, 149, 32, 0.1);
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
          transition: max-height 0.4s ease-in-out;
        }

        .mobile-dropdown.show {
          max-height: none; /* Remove height restriction */
          max-height: 2000px; /* Large fallback for older browsers */
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
          border-left: 3px solid transparent;
        }

        .mobile-dropdown-item:hover {
          background: rgba(245, 149, 32, 0.1);
          color: rgb(245, 149, 32);
          border-left-color: rgb(245, 149, 32);
          padding-left: 45px;
        }

        /* Services Mobile Dropdown - Special Layout */
        .mobile-services-dropdown {
          padding: 0;
          max-height: none !important; /* Override any max-height restrictions */
        }

        .mobile-services-dropdown.show {
          max-height: none !important;
          height: auto;
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
          border-left: 4px solid rgb(245, 149, 32);
        }

        .mobile-category-title:hover {
          background: rgba(245, 149, 32, 0.2);
          color: white;
        }

        /* Ensure all service items are visible */
        .mobile-service-category .mobile-dropdown-item {
          white-space: normal;
          word-wrap: break-word;
          line-height: 1.4;
        }

        /* Add visual separator between categories */
        .mobile-service-category:not(:last-child) {
          margin-bottom: 8px;
        }

        /* Improve touch targets for mobile */
        .mobile-dropdown-item {
          min-height: 44px;
          display: flex;
          align-items: center;
        }

        /* Debug: Add temporary border to see dropdown bounds */
        .mobile-services-dropdown.show {
          border: 2px solid rgba(245, 149, 32, 0.3) !important;
        }

        /* Responsive Breakpoints */
        
        /* 1200px and below */
        @media (max-width: 1200px) {
          .navbar-nav {
            gap: 20px;
          }
          
          .nav-link {
            font-size: 14px;
          }
          
          .dropdown-menu-custom {
            min-width: 1100px;
          }
          
          .dropdown-content {
            padding: 0 20px;
          }
          
          .dropdown-column {
            margin: 0 10px;
          }
          
          .green-bar-text.left {
            left: 30px;
            font-size: 14px;
          }
          
          .green-bar-text.right {
            right: 30px;
            font-size: 14px;
          }
          
          .navbar-brand {
            margin-left: 20px;
          }
          
          .header-actions {
            margin-right: 20px;
          }
          
          .logo-image {
            width: 160px;
            height: 100px;
          }
        }

        /* 991px and below */
        @media (max-width: 991px) {
          .navbar-custom {
            height: 80px;
          }
          
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
            gap: 10px;
          }

          .mobile-toggle {
            display: block;
          }
          
          .navbar-nav {
            display: none;
          }
          
          .btn-contact {
            padding: 6px 15px;
            font-size: 14px;
            border-width: 2px;
          }
          
          .logo-image {
            width: 140px;
            height: 85px;
          }
          
          .green-bar {
            height: auto;
            padding: 8px 20px;
          }
          
          .green-bar-text {
            font-size: 12px;
            position: static;
            text-align: center;
          }
        }

        /* 768px and below */
        @media (max-width: 768px) {
          .navbar-custom {
            height: 70px;
          }
          
          .green-bar {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 10px 15px;
            gap: 5px;
          }

          .green-bar-text.left,
          .green-bar-text.right {
            position: static;
            text-align: center;
            width: 100%;
          }

          .green-bar-text {
            font-size: 11px;
            line-height: 1.3;
          }
          
          .logo-image {
            width: 120px;
            height: 75px;
          }
          
          .btn-contact {
            padding: 5px 12px;
            font-size: 12px;
          }
          
          .mobile-menu-header {
            height: 70px;
            padding: 0 15px;
          }
          
          .mobile-menu {
            padding-top: 70px;
          }
          
          .mobile-menu-logo {
            height: 35px;
          }
          
          .mobile-nav-link {
            font-size: 15px;
            padding: 12px 15px;
          }
          
          .mobile-dropdown-item {
            font-size: 13px;
            padding: 10px 30px;
          }
          
          .mobile-category-title {
            font-size: 15px;
            padding: 12px 15px;
          }
        }

        /* 480px and below */
        @media (max-width: 480px) {
          .navbar-custom {
            height: 60px;
          }
          
          .green-bar {
            padding: 8px 10px;
          }

          .green-bar-text {
            font-size: 10px;
          }

          .logo-image {
            width: 100px;
            height: 60px;
          }

          .btn-contact {
            padding: 4px 10px;
            font-size: 11px;
            border-width: 2px;
          }
          
          .header-actions {
            gap: 8px;
          }
          
          .mobile-toggle {
            font-size: 20px;
            margin-right: 10px;
            padding: 8px;
          }
          
          .mobile-menu-header {
            height: 60px;
            padding: 0 10px;
          }
          
          .mobile-menu {
            padding-top: 60px;
          }
          
          .mobile-menu-logo {
            height: 30px;
          }
          
          .mobile-close-btn {
            font-size: 20px;
            padding: 6px;
          }
          
          .mobile-nav-link {
            font-size: 14px;
            padding: 12px 15px;
          }
          
          .mobile-dropdown-item {
            font-size: 12px;
            padding: 8px 25px;
          }
          
          .mobile-dropdown-item:hover {
            padding-left: 30px;
          }
          
          .mobile-category-title {
            font-size: 14px;
            padding: 10px 15px;
          }
        }

        /* 396px and below */
        @media (max-width: 396px) {
          .navbar-custom {
            height: 55px;
          }
          
          .green-bar {
            padding: 6px 8px;
          }

          .green-bar-text {
            font-size: 9px;
            line-height: 1.2;
          }

          .logo-image {
            width: 90px;
            height: 55px;
          }

          .btn-contact {
            padding: 3px 8px;
            font-size: 10px;
            border-width: 1px;
          }
          
          .header-actions {
            gap: 5px;
          }
          
          .mobile-toggle {
            font-size: 18px;
            margin-right: 8px;
            padding: 6px;
          }
          
          .mobile-menu-header {
            height: 55px;
            padding: 0 8px;
          }
          
          .mobile-menu {
            padding-top: 55px;
          }
          
          .mobile-menu-logo {
            height: 25px;
          }
          
          .mobile-close-btn {
            font-size: 18px;
            padding: 5px;
          }
          
          .mobile-nav-link {
            font-size: 13px;
            padding: 10px 12px;
          }
          
          .mobile-dropdown-item {
            font-size: 11px;
            padding: 7px 20px;
          }
          
          .mobile-dropdown-item:hover {
            padding-left: 25px;
          }
          
          .mobile-category-title {
            font-size: 13px;
            padding: 8px 12px;
          }
          
          .dropdown-arrow {
            font-size: 10px;
          }
        }

        /* Additional improvements for touch devices */
        @media (max-width: 991px) {
          .mobile-nav-item,
          .mobile-dropdown-item,
          .mobile-category-title,
          .mobile-close-btn {
            min-height: 44px;
            display: flex;
            align-items: center;
          }
          
          .mobile-dropdown-item {
            min-height: 40px;
          }

          /* Ensure mobile services dropdown shows all content */
          .mobile-services-dropdown {
            max-height: none !important;
            height: auto !important;
          }

          .mobile-services-dropdown.show {
            max-height: none !important;
            height: auto !important;
            overflow: visible !important;
          }

          /* Make sure all service categories are visible */
          .mobile-service-category {
            display: block !important;
            visibility: visible !important;
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
            <button 
              className="mobile-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
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