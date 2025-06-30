'use client';

import { useEffect, useState } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

export default function CareersPage() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    resume: null
  });

  // Job listings data
  const jobListings = [
    {
      id: 1,
      title: "Intern/Trainee - ELV Technician",
      location: "Battaramulla - Sri Jayawardenepura",
      type: "On-site",
      schedule: "Trainee",
      experience: null,
      vacancies: null
    },
    {
      id: 2,
      title: "ELV Technician",
      location: "Battaramulla - Sri Jayawardenepura",
      type: "On-site",
      schedule: "Full Time",
      experience: "Minimum 1+ year/s of experience",
      vacancies: null
    },
    {
      id: 3,
      title: "Associate Engineer - Network And Enterprise ICT - ELV",
      location: "Battaramulla - Sri Jayawardenepura",
      type: "On-site",
      schedule: "Full Time",
      experience: "Minimum 1 year/s of experience",
      vacancies: "04"
    },
    {
      id: 4,
      title: "Senior - ELV Technician",
      location: "Battaramulla - Sri Jayawardenepura",
      type: "On-site",
      schedule: "Full Time",
      experience: "Minimum 5+ year/s of experience",
      vacancies: null
    },
    {
      id: 5,
      title: "Account Assistant - Intern / Trainee",
      location: "Battaramulla - Sri Jayawardenepura",
      type: "On-site",
      schedule: "Full Time",
      experience: null,
      vacancies: "02"
    },
    {
      id: 6,
      title: "Associate Engineer - IT And System Support",
      location: "Battaramulla - Sri Jayawardenepura",
      type: "On-site",
      schedule: "Full Time",
      experience: "Minimum 1 year/s of experience",
      vacancies: "02"
    }
  ];

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeApplicationForm = () => {
    setShowApplicationForm(false);
    setSelectedJob(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      experience: '',
      coverLetter: '',
      resume: null
    });
    document.body.style.overflow = 'unset';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Application submitted:', formData);
    alert('Your application has been submitted successfully!');
    closeApplicationForm();
  };

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
      .careers-page {
        font-family: 'Outfit', sans-serif;
        background: linear-gradient(135deg, #7A4ADF 0%, #5E36B8 25%, #533a7b 50%, #360065 75%, #2d1b4e 100%);
        min-height: 100vh;
        position: relative;
        display: flex;
        flex-direction: column;
      }

      /* Hero Section */
      .hero-section {
        padding: clamp(60px, 10vw, 80px) 0 clamp(40px, 8vw, 60px);
        text-align: center;
        position: relative;
        overflow: hidden;
        width: 100%;
      }

      .hero-section::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(122, 74, 223, 0.1) 0%, transparent 50%);
        animation: rotate 20s linear infinite;
      }

      @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .hero-content {
        position: relative;
        z-index: 2;
        max-width: clamp(600px, 80vw, 800px);
        margin: 0 auto;
        padding: 0 clamp(15px, 3vw, 20px);
      }

      .hero-content h1 {
        font-size: clamp(32px, 6vw, 48px);
        font-weight: 700;
        color: white;
        margin-bottom: clamp(15px, 3vw, 20px);
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      .hero-content .highlight {
        background: linear-gradient(135deg, rgb(233, 176, 105) 0%, rgb(245, 149, 32) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .hero-content p {
        font-size: clamp(16px, 3vw, 20px);
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: clamp(20px, 5vw, 40px);
        line-height: 1.6;
      }

      /* Jobs Section */
      .jobs-section {
        padding: clamp(20px, 5vw, 40px) 0 clamp(40px, 8vw, 80px);
        position: relative;
        z-index: 2;
        flex-grow: 1;
      }

      .jobs-container {
        max-width: clamp(1000px, 95vw, 1400px);
        margin: 0 auto;
        padding: 0 clamp(20px, 4vw, 40px);
      }

      .jobs-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(clamp(300px, 45vw, 400px), 1fr));
        gap: clamp(20px, 3vw, 30px);
      }

      .job-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: clamp(15px, 2vw, 20px);
        padding: clamp(20px, 4vw, 30px);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
        overflow: hidden;
      }

      .job-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #7A4ADF 0%, rgb(245, 149, 32) 50%, #7A4ADF 100%);
        border-radius: clamp(15px, 2vw, 20px) clamp(15px, 2vw, 20px) 0 0;
      }

      .job-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);
      }

      .job-title {
        font-size: clamp(18px, 3vw, 22px);
        font-weight: 700;
        color: #2d3748;
        margin-bottom: clamp(15px, 2vw, 20px);
        line-height: 1.3;
      }

      .job-details {
        margin-bottom: clamp(15px, 3vw, 25px);
      }

      .job-detail {
        display: flex;
        align-items: center;
        margin-bottom: clamp(6px, 1vw, 8px);
        font-size: clamp(12px, 2vw, 14px);
        color: #4a5568;
      }

      .job-detail i {
        width: clamp(15px, 2vw, 20px);
        color: #7A4ADF;
        margin-right: clamp(8px, 1vw, 10px);
        font-size: clamp(14px, 2vw, 16px);
      }

      .apply-btn {
        width: 100%;
        background: linear-gradient(135deg, #7A4ADF 0%, #533a7b 100%);
        color: white;
        border: none;
        border-radius: 50px;
        padding: clamp(10px, 2vw, 15px) clamp(20px, 3vw, 30px);
        font-size: clamp(14px, 2.5vw, 16px);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 8px 25px rgba(122, 74, 223, 0.3);
      }

      .apply-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px rgba(122, 74, 223, 0.4);
        background: linear-gradient(135deg, #533a7b 0%, #7A4ADF 100%);
      }

      /* Application Form Modal */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: clamp(10px, 2vw, 20px);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .modal-overlay.show {
        opacity: 1;
        visibility: visible;
      }

      .application-form {
        background: white;
        border-radius: clamp(15px, 2vw, 25px);
        padding: clamp(25px, 5vw, 40px);
        max-width: clamp(500px, 90vw, 600px);
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s ease;
      }

      .modal-overlay.show .application-form {
        transform: scale(1);
      }

      .form-header {
        text-align: center;
        margin-bottom: clamp(20px, 4vw, 30px);
        position: relative;
        padding-bottom: clamp(15px, 2vw, 20px);
      }

      .form-header::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: clamp(60px, 10vw, 80px);
        height: 3px;
        background: linear-gradient(90deg, #7A4ADF, rgb(245, 149, 32));
        border-radius: 2px;
      }

      .form-header h2 {
        font-size: clamp(22px, 4vw, 28px);
        font-weight: 700;
        color: #2d3748;
        margin-bottom: clamp(8px, 1vw, 10px);
      }

      .form-header p {
        font-size: clamp(14px, 2.5vw, 16px);
        color: #4a5568;
        margin: 0;
      }

      .close-btn {
        position: absolute;
        top: clamp(10px, 2vw, 20px);
        right: clamp(10px, 2vw, 20px);
        background: none;
        border: none;
        font-size: clamp(20px, 3vw, 24px);
        color: #4a5568;
        cursor: pointer;
        padding: clamp(8px, 1vw, 10px);
        border-radius: 50%;
        transition: all 0.3s ease;
      }

      .close-btn:hover {
        background: #f7fafc;
        color: #2d3748;
        transform: rotate(90deg);
      }

      .form-group {
        margin-bottom: clamp(15px, 3vw, 25px);
      }

      .form-group label {
        display: block;
        font-size: clamp(12px, 2vw, 14px);
        font-weight: 600;
        color: #2d3748;
        margin-bottom: clamp(6px, 1vw, 8px);
      }

      .required {
        color: #e53e3e;
      }

      .form-group input,
      .form-group select,
      .form-group textarea {
        width: 100%;
        padding: clamp(10px, 2vw, 12px) clamp(12px, 2vw, 16px);
        border: 2px solid #e2e8f0;
        border-radius: clamp(8px, 1vw, 12px);
        font-size: clamp(12px, 2vw, 14px);
        transition: all 0.3s ease;
        font-family: 'Outfit', sans-serif;
      }

      .form-group input:focus,
      .form-group select:focus,
      .form-group textarea:focus {
        outline: none;
        border-color: #7A4ADF;
        box-shadow: 0 0 0 3px rgba(122, 74, 223, 0.1);
      }

      .form-group textarea {
        resize: vertical;
        min-height: clamp(80px, 15vw, 100px);
      }

      .file-input {
        position: relative;
        overflow: hidden;
        display: inline-block;
        width: 100%;
      }

      .file-input input[type=file] {
        position: absolute;
        left: -9999px;
      }

      .file-input-label {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: clamp(10px, 2vw, 12px) clamp(12px, 2vw, 16px);
        border: 2px dashed #cbd5e0;
        border-radius: clamp(8px, 1vw, 12px);
        cursor: pointer;
        transition: all 0.3s ease;
        color: #4a5568;
        text-align: center;
        font-size: clamp(12px, 2vw, 14px);
      }

      .file-input-label:hover {
        border-color: #7A4ADF;
        background: rgba(122, 74, 223, 0.05);
      }

      .file-input-label i {
        margin-right: clamp(6px, 1vw, 8px);
        color: #7A4ADF;
        font-size: clamp(14px, 2vw, 16px);
      }

      .submit-btn {
        width: 100%;
        background: linear-gradient(135deg, #7A4ADF 0%, #533a7b 100%);
        color: white;
        border: none;
        border-radius: 50px;
        padding: clamp(10px, 2vw, 15px) clamp(20px, 3vw, 30px);
        font-size: clamp(14px, 2.5vw, 16px);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: clamp(8px, 1vw, 10px);
      }

      .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(122, 74, 223, 0.3);
      }

      /* Responsive Design */
      @media (max-width: 1280px) {
        .jobs-grid {
          grid-template-columns: repeat(auto-fit, minmax(clamp(280px, 40vw, 350px), 1fr));
        }
      }

      @media (max-width: 1024px) {
        .hero-section {
          padding: clamp(50px, 8vw, 70px) 0 clamp(30px, 6vw, 50px);
        }

        .hero-content h1 {
          font-size: clamp(28px, 5vw, 40px);
        }

        .hero-content p {
          font-size: clamp(14px, 2.5vw, 18px);
        }

        .jobs-container {
          padding: 0 clamp(15px, 3vw, 30px);
        }

        .jobs-grid {
          grid-template-columns: repeat(auto-fit, minmax(clamp(260px, 35vw, 320px), 1fr));
          gap: clamp(15px, 2.5vw, 25px);
        }

        .job-card {
          padding: clamp(15px, 3vw, 25px);
        }
      }

      @media (max-width: 768px) {
        .hero-section {
          padding: clamp(40px, 7vw, 60px) 0 clamp(25px, 5vw, 40px);
        }

        .hero-content h1 {
          font-size: clamp(24px, 4.5vw, 36px);
        }

        .hero-content p {
          font-size: clamp(13px, 2.2vw, 16px);
        }

        .jobs-grid {
          grid-template-columns: 1fr;
          gap: clamp(12px, 2vw, 20px);
        }

        .job-card {
          padding: clamp(15px, 3vw, 20px);
        }

        .job-title {
          font-size: clamp(16px, 2.5vw, 20px);
        }

        .job-detail {
          font-size: clamp(11px, 1.8vw, 13px);
        }

        .job-detail i {
          font-size: clamp(12px, 1.8vw, 14px);
        }

        .apply-btn {
          font-size: clamp(13px, 2.2vw, 15px);
          padding: clamp(8px, 1.5vw, 12px) clamp(15px, 2.5vw, 25px);
        }

        .application-form {
          padding: clamp(20px, 4vw, 30px) clamp(15px, 3vw, 25px);
          max-width: clamp(400px, 95vw, 550px);
        }

        .form-header h2 {
          font-size: clamp(20px, 3.5vw, 24px);
        }

        .form-header p {
          font-size: clamp(13px, 2.2vw, 15px);
        }
      }

      @media (max-width: 640px) {
        .hero-section {
          padding: clamp(30px, 6vw, 50px) 0 clamp(20px, 4vw, 35px);
        }

        .hero-content {
          padding: 0 clamp(10px, 2vw, 15px);
        }

        .jobs-container {
          padding: 0 clamp(10px, 2vw, 20px);
        }

        .jobs-grid {
          gap: clamp(10px, 1.5vw, 15px);
        }

        .job-card {
          padding: clamp(12px, 2.5vw, 18px);
        }

        .application-form {
          padding: clamp(15px, 3vw, 25px) clamp(10px, 2vw, 20px);
          max-width: 98vw;
          max-height: 95vh;
          border-radius: clamp(10px, 1.5vw, 15px);
        }

        .form-header {
          margin-bottom: clamp(15px, 3vw, 25px);
        }

        .form-header::after {
          width: clamp(50px, 8vw, 70px);
        }

        .close-btn {
          font-size: clamp(18px, 2.5vw, 22px);
          padding: clamp(6px, 1vw, 8px);
        }

        .form-group {
          margin-bottom: clamp(12px, 2.5vw, 20px);
        }

        .form-group label {
          font-size: clamp(11px, 1.8vw, 13px);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: clamp(8px, 1.5vw, 10px) clamp(10px, 1.5vw, 12px);
          font-size: clamp(11px, 1.8vw, 13px);
          border-radius: clamp(6px, 1vw, 10px);
        }

        .file-input-label {
          padding: clamp(8px, 1.5vw, 10px) clamp(10px, 1.5vw, 12px);
          font-size: clamp(11px, 1.8vw, 13px);
        }

        .file-input-label i {
          font-size: clamp(12px, 1.8vw, 14px);
        }

        .submit-btn {
          font-size: clamp(13px, 2.2vw, 15px);
          padding: clamp(8px, 1.5vw, 12px) clamp(15px, 2.5vw, 25px);
        }
      }

      @media (max-width: 480px) {
        .hero-section {
          padding: clamp(25px, 5vw, 40px) 0 clamp(15px, 3vw, 30px);
        }

        .hero-content h1 {
          font-size: clamp(22px, 4vw, 28px);
        }

        .hero-content p {
          font-size: clamp(12px, 2vw, 14px);
          margin-bottom: clamp(15px, 3vw, 30px);
        }

        .jobs-grid {
          grid-template-columns: 1fr;
          gap: clamp(8px, 1.5vw, 12px);
        }

        .job-card {
          padding: clamp(10px, 2vw, 15px);
        }

        .job-title {
          font-size: clamp(15px, 2.2vw, 18px);
        }

        .job-detail {
          font-size: clamp(10px, 1.5vw, 12px);
          margin-bottom: clamp(5px, 1vw, 7px);
        }

        .job-detail i {
          width: clamp(12px, 1.5vw, 15px);
          font-size: clamp(11px, 1.5vw, 13px);
          margin-right: clamp(6px, 1vw, 8px);
        }

        .apply-btn {
          font-size: clamp(12px, 2vw, 14px);
          padding: clamp(7px, 1.2vw, 10px) clamp(12px, 2vw, 20px);
        }

        .application-form {
          padding: clamp(12px, 2.5vw, 20px) clamp(8px, 1.5vw, 15px);
          max-width: 100vw;
          border-radius: clamp(8px, 1vw, 12px);
        }

        .form-header h2 {
          font-size: clamp(18px, 3vw, 22px);
        }

        .form-header p {
          font-size: clamp(12px, 2vw, 14px);
        }

        .form-group {
          margin-bottom: clamp(10px, 2vw, 15px);
        }

        .form-group label {
          font-size: clamp(10px, 1.5vw, 12px);
          margin-bottom: clamp(5px, 1vw, 7px);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: clamp(7px, 1.2vw, 9px) clamp(8px, 1.2vw, 10px);
          font-size: clamp(10px, 1.5vw, 12px);
          border-radius: clamp(5px, 0.8vw, 8px);
        }

        .form-group textarea {
          min-height: clamp(60px, 12vw, 80px);
        }

        .file-input-label {
          padding: clamp(7px, 1.2vw, 9px) clamp(8px, 1.2vw, 10px);
          font-size: clamp(10px, 1.5vw, 12px);
        }

        .file-input-label i {
          font-size: clamp(11px, 1.5vw, 13px);
          margin-right: clamp(5px, 0.8vw, 7px);
        }

        .submit-btn {
          font-size: clamp(12px, 2vw, 14px);
          padding: clamp(7px, 1.2vw, 10px) clamp(12px, 2vw, 20px);
          margin-top: clamp(6px, 1vw, 8px);
        }

        .close-btn {
          top: clamp(8px, 1.5vw, 15px);
          right: clamp(8px, 1.5vw, 15px);
          font-size: clamp(16px, 2.2vw, 20px);
          padding: clamp(5px, 0.8vw, 7px);
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

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        closeApplicationForm();
      }
    };

    if (showApplicationForm) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showApplicationForm]);

  return (
    <div className="careers-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Job <span className="highlight">Vacancies</span></h1>
          <p>
            Join our innovative team and be part of Sri Lanka's leading technology solutions provider. 
            We offer exciting career opportunities in a dynamic, growth-oriented environment.
          </p>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="jobs-section">
        <div className="jobs-container">
          <div className="jobs-grid">
            {jobListings.map((job) => (
              <div key={job.id} className="job-card">
                <h3 className="job-title">{job.title}</h3>
                <div className="job-details">
                  <div className="job-detail">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{job.location}</span>
                  </div>
                  <div className="job-detail">
                    <i className="fas fa-building"></i>
                    <span>{job.type}</span>
                  </div>
                  <div className="job-detail">
                    <i className="fas fa-clock"></i>
                    <span>{job.schedule}</span>
                  </div>
                  {job.experience && (
                    <div className="job-detail">
                      <i className="fas fa-star"></i>
                      <span>{job.experience}</span>
                    </div>
                  )}
                  {job.vacancies && (
                    <div className="job-detail">
                      <i className="fas fa-users"></i>
                      <span>No of vacancies: {job.vacancies}</span>
                    </div>
                  )}
                </div>
                <button 
                  className="apply-btn"
                  onClick={() => handleApplyClick(job)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      <div className={`modal-overlay ${showApplicationForm ? 'show' : ''}`}>
        <div className="application-form">
          <button className="close-btn" onClick={closeApplicationForm}>
            <i className="fas fa-times"></i>
          </button>
          
          <div className="form-header">
            <h2>Apply for Position</h2>
            <p>{selectedJob?.title}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">
                Years of Experience
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              >
                <option value="">Select experience level</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="resume">
                Resume/CV <span className="required">*</span>
              </label>
              <div className="file-input">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                />
                <label htmlFor="resume" className="file-input-label">
                  <i className="fas fa-upload"></i>
                  {formData.resume ? formData.resume.name : 'Choose file (PDF, DOC, DOCX)'}
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="coverLetter">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="Tell us why you're the perfect fit for this role..."
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}