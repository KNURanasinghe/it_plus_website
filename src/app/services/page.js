'use client';

import { useEffect, useState } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

export default function ServicesPage() {
  const [activeSection, setActiveSection] = useState('technology');

  // Enhanced scroll function with better positioning
  const scrollToSection = (sectionId) => {
    console.log('Attempting to scroll to:', sectionId);

    // Wait for DOM to be ready
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      console.log('Found element:', element);

      if (element) {
        const headerHeight = 148; // Header + green bar height
        const extraPadding = 20;

        // Get element position
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        const finalPosition = Math.max(0, elementTop - headerHeight - extraPadding);

        console.log('Scrolling to position:', finalPosition);

        // Scroll to the calculated position
        window.scrollTo({
          top: finalPosition,
          behavior: 'smooth'
        });

        // Update active section
        setActiveSection(sectionId);

        // Ensure hash is updated
        if (window.location.hash !== `#${sectionId}`) {
          window.history.replaceState(null, null, `#${sectionId}`);
        }
      } else {
        console.log('Element not found:', sectionId);
      }
    }, 200);
  };

  // Handle URL hash navigation with better timing
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.substring(1);
      console.log('Hash change detected:', hash);

      if (hash) {
        // Wait for component to be fully rendered
        setTimeout(() => {
          scrollToSection(hash);
        }, 300);
      }
    };

    // Handle initial load
    if (window.location.hash) {
      handleHashNavigation();
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'technology', 'enterprise-networking', 'managed-wifi-solutions', 'ip-pbx-solutions',
        'firewall-solutions', 'information-security', 'servers-virtualization', 'storage-solutions',
        'vpn-brand-connectivity', 'video-conferencing', 'cctv-solutions',
        'cloud', 'itplus-cloud-vps', 'itplus-shield-cloud-protect', 'itplus-backup-cloud-backup', 'itplus-virtual-cloud-virtual',
        'software', 'custom-software-development', 'web-application-development', 'mobile-app-development',
        'erp-systems', 'payroll-hr-systems', 'pos-solutions', 'api-integration-services', 'software-maintenance-support',
        'it-support', 'onsite-remote-support', 'it-helpdesk', 'annual-maintenance-service',
        'it-consultant-project-management', 'it-staff-outsourcing'
      ];

      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const technologyServices = [
    {
      id: 'enterprise-networking',
      title: 'Enterprise Networking',
      description: 'Comprehensive network infrastructure solutions designed to support your business growth with scalable, secure, and high-performance networking systems.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1440&h=400&fit=crop', // Wider image for banner
    },
    {
      id: 'managed-wifi-solutions',
      title: 'Wi-Fi Solutions', // Changed to match image
      description: 'Professional wireless network management ensuring seamless connectivity, optimal performance, and enterprise-grade security for your organization.',
      image: 'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=1440&h=400&fit=crop',
    },
    {
      id: 'ip-pbx-solutions',
      title: 'IP PBX Solutions',
      description: 'Modern telecommunication systems that integrate voice, video, and data communications to streamline your business communications.',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1440&h=400&fit=crop',
    },
    {
      id: 'firewall-solutions',
      title: 'Firewall Solutions',
      description: 'Advanced network security solutions protecting your digital assets from cyber threats with next-generation firewall technology.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1440&h=400&fit=crop',
    },
    {
      id: 'information-security',
      title: 'Information Security',
      description: 'Comprehensive cybersecurity services safeguarding your sensitive data and ensuring compliance with industry security standards.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1440&h=400&fit=crop',
    },
    {
      id: 'servers-virtualization',
      title: 'Servers & Virtualization',
      description: 'Optimize your IT infrastructure with server virtualization solutions that reduce costs and improve resource utilization.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1440&h=400&fit=crop',
    },
    {
      id: 'storage-solutions',
      title: 'Storage Solutions',
      description: 'Scalable data storage systems ensuring your business data is secure, accessible, and efficiently managed across all platforms.',
      image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=1440&h=400&fit=crop',
    },
    {
      id: 'vpn-brand-connectivity',
      title: 'VPN and Branch Connectivity',
      description: 'Secure remote access solutions connecting your distributed workforce and branch offices with enterprise-grade VPN technology.',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1440&h=400&fit=crop',
    },
    {
      id: 'video-conferencing',
      title: 'Video Conferencing',
      description: 'Professional video communication solutions enabling seamless collaboration and meetings across global teams and clients.',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1440&h=400&fit=crop',
    },
    {
      id: 'cctv-solutions',
      title: 'CCTV Solutions',
      description: 'Advanced surveillance systems providing comprehensive security monitoring and protection for your business premises.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1440&h=400&fit=crop',
    }
  ];

  const cloudServices = [
    {
      id: 'itplus-cloud-vps',
      title: 'ITPlus Cloud - Cloud VPS',
      description: 'Powerful virtual private servers with guaranteed resources, high availability, and scalable infrastructure for your applications.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=400&fit=crop',
    },
    {
      id: 'itplus-shield-cloud-protect',
      title: 'ITPlus Shield - Cloud Protect',
      description: 'Comprehensive cloud security services protecting your data and applications with advanced threat detection and prevention.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1440&h=400&fit=crop',
    },
    {
      id: 'itplus-backup-cloud-backup',
      title: 'ITPlus Backup - Cloud Backup',
      description: 'Reliable automated backup solutions ensuring your critical business data is safely stored and easily recoverable.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1440&h=400&fit=crop',
    },
    {
      id: 'itplus-virtual-cloud-virtual',
      title: 'ITPlus Virtual - Cloud Virtual',
      description: 'Flexible cloud virtualization services enabling rapid deployment and scaling of your IT infrastructure.',
      image: 'images/services/cloudvirtual.jpg', // Keep local image if preferred for this one
    }
  ];

  const softwareServices = [
    {
      id: 'custom-software-development',
      title: 'Custom Software Development',
      description: 'Tailored software solutions designed specifically for your business needs, built with modern technologies and best practices.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1440&h=400&fit=crop',
    },
    {
      id: 'web-application-development',
      title: 'Web Application Development',
      description: 'Responsive, scalable web applications that deliver exceptional user experiences across all devices and platforms.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1440&h=400&fit=crop',
    },
    {
      id: 'mobile-app-development',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that engage users and drive business growth on iOS and Android.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1440&h=400&fit=crop',
    },
    {
      id: 'erp-systems',
      title: 'ERP Systems',
      description: 'Enterprise resource planning solutions that integrate and streamline your business processes for improved efficiency.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1440&h=400&fit=crop',
    },
    {
      id: 'payroll-hr-systems',
      title: 'Payroll & HR Systems',
      description: 'Comprehensive human resource management systems automating payroll, attendance, and employee management processes.',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1440&h=400&fit=crop',
    },
    {
      id: 'pos-solutions',
      title: 'POS Solutions',
      description: 'Point-of-sale systems that streamline transactions, inventory management, and customer relationship management.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1440&h=400&fit=crop',
    },
    {
      id: 'api-integration-services',
      title: 'API Integration Services',
      description: 'Seamless integration solutions connecting your existing systems with third-party applications and services.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1440&h=400&fit=crop',
    },
    {
      id: 'software-maintenance-support',
      title: 'Software Maintenance & Support',
      description: 'Ongoing technical support and maintenance services ensuring your software systems remain secure and up-to-date.',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1440&h=400&fit=crop',
    }
  ];

  const itSupportServices = [
    {
      id: 'onsite-remote-support',
      title: 'Onsite & Remote Support',
      description: 'Professional technical support services available both on-site and remotely to resolve IT issues quickly and efficiently.',
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1440&h=400&fit=crop',
    },
    {
      id: 'it-helpdesk',
      title: 'IT Helpdesk',
      description: '24/7 helpdesk services providing immediate technical assistance and problem resolution for your IT infrastructure.',
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1440&h=400&fit=crop',
    },
    {
      id: 'annual-maintenance-service',
      title: 'Annual Maintenance Service',
      description: 'Comprehensive maintenance contracts ensuring your IT systems operate optimally with preventive care and regular updates.',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1440&h=400&fit=crop',
    },
    {
      id: 'it-consultant-project-management',
      title: 'IT Consultant & Project Management',
      description: 'Expert consulting and project management services guiding your technology initiatives from conception to completion.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1440&h=400&fit=crop',
    },
    {
      id: 'it-staff-outsourcing',
      title: 'IT Staff Outsourcing',
      description: 'Professional IT staff augmentation services providing skilled resources to meet your technology and project requirements.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1440&h=400&fit=crop',
    }
  ];

  const ServiceCard = ({ service }) => {
    return (
      <div className="service-item" id={service.id}>
        <div
          className="service-card-hero-header"
          style={{ backgroundImage: `url(${service.image})` }}
        >
          {/* Overlay for the background image within the header */}
          <div className="service-card-hero-overlay"></div>
          <div className="service-card-hero-content">
            <h3 className="service-card-title">{service.title}</h3>
            <p className="service-card-description">{service.description}</p>
          </div>
          <span className="service-card-arrow">&#8594;</span>
        </div>
      </div>
    );
  };

  const SectionHeader = ({ id, title, description, icon }) => (
    <div className="section-header" id={id}>
      <div className="section-header-content">
        <div className="section-icon">
          <i className={icon}></i>
        </div>
        <div className="section-text">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="section-divider">
        <div className="divider-line"></div>
        <div className="divider-dot"></div>
        <div className="divider-line"></div>
      </div>
    </div>
  );

  // Inject CSS using useEffect
  useEffect(() => {
    // Load Font Awesome if not already loaded
    const fontAwesomeLink = document.querySelector('link[href*="font-awesome"]');
    if (!fontAwesomeLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      document.head.appendChild(link);
    }

    const style = document.createElement('style');
    style.textContent = `
      .services-page {
        font-family: 'Outfit', sans-serif;
        background: white;
        overflow: hidden;
      }

      .services-container {
        max-width: 1440px; /* Constrain max width for content inside */
        margin: 10px auto;
        padding: 0; /* Remove horizontal padding here */
        position: relative;
        display: block; /* Change to block to stack items */
        /* grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); Removed grid */
        gap: 0; /* Remove gap for full-width banners */
          gap: 0px; /* Add this line to re-introduce a gap between items */

  
      }

      /* Add this new rule to create space *between* the banners */
.service-item + .service-item {
    margin-top: 40px; /* This creates a 40px gap between consecutive service items */
}

      /* Hero Section */
      .hero-section {
        width: 100%;
        height: 801px;
        position: relative;
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                    url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=801&fit=crop');
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(122, 74, 223, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hero-content {
        text-align: center;
        color: white;
        z-index: 2;
      }

      .hero-content h1 {
        font-size: 48px;
        font-weight: 500;
        margin-bottom: 20px;
        line-height: 1.1;
        max-width: 871px;
      }

      .hero-content p {
        font-size: 24px;
        font-weight: 600;
        max-width: 755px;
        margin: 0 auto;
      }

      /* Section Headers */
      .section-header {
        padding: 80px 120px 60px;
        scroll-margin-top: 160px;
      }

      .section-header-content {
        display: flex;
        align-items: center;
        gap: 30px;
        margin-bottom: 40px;
      }

      .section-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #7A4ADF, #5E36B8);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 30px rgba(122, 74, 223, 0.3);
      }

      .section-icon i {
        font-size: 36px;
        color: white;
      }

      .section-text h2 {
        font-size: 42px;
        font-weight: 600;
        color: #7A4ADF;
        margin: 0 0 10px 0;
        line-height: 1.2;
      }

      .section-text p {
        font-size: 18px;
        color: #666;
        margin: 0;
        line-height: 1.5;
      }

      .section-divider {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .divider-line {
        flex: 1;
        height: 2px;
        background: linear-gradient(90deg, #7A4ADF, rgb(245, 149, 32));
      }

      .divider-dot {
        width: 12px;
        height: 12px;
        background: #7A4ADF;
        border-radius: 50%;
        position: relative;
      }

      .divider-dot::after {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        width: 20px;
        height: 20px;
        border: 2px solid rgb(245, 149, 32);
        border-radius: 50%;
      }

      /* Services Section - Full Width Banner Design */
      .services-section {
        padding: 0; /* Remove vertical padding here */
        background: white;
        position: relative;
        
      }

      .service-item {
        scroll-margin-top: 160px;
          background: white;
         border-radius: 20px; 
        overflow: hidden;
         box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08); Removed shadow for full banner */
        transition: none; /* No hover effects if it's a full banner */
        display: block; /* Ensure it takes full width */
        width: 100%; /* Ensure it takes full width */
        margin-bottom: 0; /* No margin between banners */
      }

      .service-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

      .service-card-hero-header {
        position: relative;
        width: 100%;
        height: 400px; /* Increased height for full banner */
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: center; /* Center content vertically */
        align-items: flex-start; /* Align content to the left */
        padding: 0 120px; /* Add horizontal padding for content */
        box-sizing: border-box;
        color: white;
      }

      .service-card-hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(122, 74, 223, 0.7); /* Purple overlay */
        z-index: 1;
      }

      .service-card-hero-content {
        position: relative;
        z-index: 2;
        text-align: left; /* Align text to the left */
        flex-grow: 0; /* Don't grow, content is fixed width */
        display: block; /* Allow content to flow naturally */
        width: 100%; /* Occupy available width within padding */
        max-width: 800px; /* Max width for text as in the image */
        margin-bottom: 20px; /* Space before arrow */
      }

      .service-card-title {
        font-size: 38px; /* Larger title for banner */
        font-weight: 500;
        color: #FFB800; /* Golden/orange color from the image */
        margin-bottom: 15px;
        line-height: 1.2;
      }

      .service-card-description {
        font-size: 18px; /* Larger description for banner */
        line-height: 1.6;
        color: white;
        max-width: 700px; /* Constrain width for readability */
        margin: 0; /* Remove auto margin */
      }

      .service-card-arrow {
        position: relative;
        z-index: 2;
        font-size: 30px;
        color: #FFB800;
        align-self: flex-start; /* Align arrow to the left, below text */
        margin-top: 10px; /* Space between description and arrow */
      }

      /* Responsive Design */
      @media (max-width: 1200px) {
        .services-container {
          /* No changes to display: block */
        }

        .section-header {
          padding: 60px 60px 40px;
        }

        .service-card-hero-header {
          height: 350px; /* Slightly smaller height */
          padding: 0 60px;
        }

        .service-card-title {
          font-size: 32px;
        }

        .service-card-description {
          font-size: 16px;
        }

        .section-text h2 {
          font-size: 36px;
        }
      }

      @media (max-width: 992px) {
        .services-container {
          /* No changes to display: block */
        }

        .section-header {
          padding: 40px 40px 30px;
        }

        .section-header-content {
          flex-direction: column;
          text-align: center;
          gap: 20px;
        }

        .hero-content h1 {
          font-size: 36px;
        }

        .hero-content p {
          font-size: 20px;
        }

        .hero-section {
          height: 600px;
        }

        .section-text h2 {
          font-size: 32px;
        }

        .service-card-hero-header {
          height: 300px; /* Adjust height for smaller screens */
          padding: 0 40px;
        }

        .service-card-title {
          font-size: 28px;
        }

        .service-card-description {
          font-size: 15px;
          max-width: 90%; /* Allow more width for description */
        }

        .service-card-arrow {
            align-self: flex-start; /* Keep arrow left aligned */
        }
      }

      @media (max-width: 768px) {
        .services-container {
          /* No changes to display: block */
        }

        .section-header {
          padding: 30px 20px 20px;
        }

        .service-card-hero-header {
          height: 250px;
          padding: 0 20px;
          justify-content: center; /* Vertically center content */
        }

        .service-card-title {
          font-size: 24px;
          line-height: 1.3;
        }

        .service-card-description {
          font-size: 13px;
          line-height: 1.4;
          max-width: 100%;
        }

        .services-section {
          /* No vertical padding changes */
        }

        .hero-content h1 {
          font-size: 28px;
        }

        .hero-content p {
          font-size: 16px;
        }

        .hero-section {
          height: 400px;
        }

        .section-text h2 {
          font-size: 28px;
        }

        .section-icon {
          width: 60px;
          height: 60px;
        }

        .section-icon i {
          font-size: 24px;
        }

        .service-card-hero-content {
            text-align: center; /* Center content for smaller screens */
            align-items: center; /* Horizontally center content for smaller screens */
            padding-bottom: 0; /* Remove extra padding */
        }
        .service-card-arrow {
            align-self: center; /* Center arrow for smaller screens */
        }
      }

      @media (max-width: 480px) {
        .services-container {
          /* No changes to display: block */
        }

        .section-header {
          padding: 20px 15px 15px;
        }

        .service-card-hero-header {
          height: 200px;
          padding: 0 15px;
        }

        .service-card-title {
          font-size: 20px;
        }

        .service-card-description {
          font-size: 12px;
        }

        .hero-content h1 {
          font-size: 24px;
        }

        .hero-content p {
          font-size: 14px;
        }

        .section-text h2 {
          font-size: 24px;
        }

        .section-text p {
          font-size: 16px;
        }
        
        .footer-brand {
          font-size: 26px;
          font-weight: 400;
          margin-bottom: 20px;
          padding-top:80px
        }
      }
    `;

    document.head.appendChild(style);

    // Cleanup function to remove the style when component unmounts
    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="services-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Empowering Your Business With Technology</h1>
            <p>Where Technology, Innovation, and Training Meet</p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <SectionHeader
        id="technology"
        title="Technology Solutions"
        description="Comprehensive IT infrastructure and networking solutions designed to drive your business forward with cutting-edge technology."
        icon="fas fa-microchip"
      />
      <section className="services-section">
        <div className="services-container">
          {technologyServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </section>

      {/* Cloud Section */}
      <SectionHeader
        id="cloud"
        title="Cloud Services"
        description="Scalable cloud solutions that provide flexibility, security, and reliability for your business operations in the digital age."
        icon="fas fa-cloud"
      />
      <section className="services-section">
        <div className="services-container">
          {cloudServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </section>

      {/* Software Section */}
      <SectionHeader
        id="software"
        title="Software Development"
        description="Custom software solutions built with modern technologies to address your unique business challenges and opportunities."
        icon="fas fa-code"
      />
      <section className="services-section">
        <div className="services-container">
          {softwareServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </section>

      {/* IT Support Section */}
      <SectionHeader
        id="it-support"
        title="IT Support & Consulting"
        description="Professional IT support and consulting services ensuring your technology infrastructure operates at peak performance."
        icon="fas fa-headset"
      />
      <section className="services-section">
        <div className="services-container">
          {itSupportServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}