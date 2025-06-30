import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      {/* Wave SVG Background */}
      <div className="footer-svg">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1441 612" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M1441 45.6056V104.32L1300.03 72.0271L1180.56 45.6056L1025.59 28.4805H891.62L798.14 37.2877L738.653 45.6056C738.653 45.6056 641.514 59.795 705.5 45.6056C769.486 31.4162 881.206 7.82941 944.5 3.03781C1003.09 -1.39742 1032.3 0.350856 1091 3.03765C1142.29 5.38532 1174.93 5.84826 1225.55 14.2911C1264.9 20.855 1289.79 21.3083 1329 28.4805C1374.47 36.7984 1441 45.6056 1441 45.6056Z" fill="#33FF94"/>
          <path d="M0 29V83C0 83 73.776 84.0927 121.5 90.5C164.288 96.2446 188.367 99.662 231.5 101.5C263.689 102.872 282.235 106.888 314 101.5C330.716 98.6645 412.5 83 412.5 83C412.5 83 330.374 91.4589 314 90.5C285.767 88.8466 250.82 88.0899 223 83C186.873 76.3902 157.454 68.4935 121.5 61C62.7929 48.7642 0 29 0 29Z" fill="#33FF94"/>
          <path d="M1441 612H0V74.9049C168.5 89.3064 123.806 89.3063 271 89.3064C418.194 89.3064 752.817 24.8466 979.96 28.1206C1164.35 30.7784 1441 74.9049 1441 74.9049V612Z" fill="url(#paint0_linear_520_269)"/>
          <defs>
            <linearGradient id="paint0_linear_520_269" x1="720.5" y1="12.6746" x2="720.5" y2="612" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7A4ADF"/>
              <stop offset="1" stopColor="#15145F"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <h2 className="brand-logo">IT PLUS</h2>
              <p className="brand-description">
                Global destination for specialized IT solutions, ideal for startups and businesses seeking to enhance their digital presence.
              </p>
              <div className="social-icons">
                <div className="social-icon facebook">
                  <i className="fab fa-facebook-f"></i>
                </div>
                <div className="social-icon twitter">
                  <i className="fab fa-twitter"></i>
                </div>
                <div className="social-icon instagram">
                  <i className="fab fa-instagram"></i>
                </div>
                <div className="social-icon linkedin">
                  <i className="fab fa-linkedin-in"></i>
                </div>
              </div>
            </div>

            {/* Company */}
            <div className="footer-section">
              <h3 className="footer-heading">COMPANY</h3>
              <ul className="footer-links">
                <li><a href="/about">About us</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h3 className="footer-heading">SERVICES</h3>
              <ul className="footer-links">
                <li><a href="/technology">Technology</a></li>
                <li><a href="/cloud">Cloud Solutions</a></li>
                <li><a href="/software">Software</a></li>
                <li><a href="/support">IT Support</a></li>
                <li><a href="/products">IT Products</a></li>
                <li><a href="/academic">Academic</a></li>
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div className="footer-section footer-contact">
              <h3 className="footer-heading">CONTACT US</h3>
              <div className="contact-info">
                <p className="contact-item">
                  <i className="fas fa-envelope"></i>
                  info@itplus.lk
                </p>
                <p className="contact-item">
                  <i className="fas fa-phone"></i>
                  +94 11 234 5678
                </p>
                <p className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  Colombo, Sri Lanka
                </p>
              </div>

              <div className="newsletter">
                <h4 className="newsletter-title">Stay Updated</h4>
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="email-input"
                  />
                  <button className="subscribe-btn">Subscribe</button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="copyright">© 2025 IT Plus. All rights reserved.</p>
              <div className="footer-bottom-links">
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/cookies">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-wrapper {
          position: relative;
          width: 100vw;
          min-height: 500px;
          overflow: hidden;
          color: white;
          font-family: 'Outfit', 'Segoe UI', sans-serif;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
        }

        .footer-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .footer-svg svg {
          width: 100%;
          height: 100%;
          display: block;
          min-height: 100%;
        }

        .footer-content {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 80px;
          padding-bottom: 40px;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
          width: 100%;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        /* Brand Section */
        .footer-brand {
          padding-right: 20px;
        }

        .brand-logo {
          font-size: 36px;
          font-weight: 700;
          color: white;
          margin: 0 0 25px 0;
          letter-spacing: 1px;
        }

        .brand-description {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 35px;
          max-width: 300px;
        }

        .social-icons {
          display: flex;
          gap: 18px;
        }

        .social-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 20px;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .social-icon:hover {
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .facebook:hover { background: #1877F2; border-color: #1877F2; }
        .twitter:hover { background: #1DA1F2; border-color: #1DA1F2; }
        .instagram:hover { 
          background: linear-gradient(45deg, #F58529, #DD2A7B, #8134AF); 
          border-color: #DD2A7B; 
        }
        .linkedin:hover { background: #0A66C2; border-color: #0A66C2; }

        /* Footer Sections */
        .footer-section {
          padding-top: 10px;
        }

        .footer-heading {
          font-size: 15px;
          font-weight: 700;
          color: white;
          margin: 0 0 30px 0;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 14px;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 15px;
          font-weight: 400;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .footer-links a:hover {
          color: rgb(245, 149, 32);
          transform: translateX(8px);
        }

        /* Contact Section */
        .footer-contact {
          max-width: 280px;
        }

        .contact-info {
          margin-bottom: 35px;
        }

        .contact-item {
          color: rgba(255, 255, 255, 0.85);
          font-size: 15px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .contact-item i {
          font-size: 14px;
          width: 16px;
          color: rgb(245, 149, 32);
        }

        .newsletter-title {
          font-size: 18px;
          font-weight: 600;
          color: white;
          margin: 0 0 20px 0;
        }

        .newsletter-form {
          position: relative;
          width: 280px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .newsletter-form:hover {
          border-color: rgba(51, 255, 148, 0.4);
          box-shadow: 0 4px 12px rgba(51, 255, 148, 0.15);
        }

        .newsletter-form:focus-within {
          border-color: rgb(245, 149, 32);
          box-shadow: 0 0 0 2px rgba(51, 255, 148, 0.2);
        }

        .email-input {
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 13px;
          padding: 0 90px 0 16px;
          border-radius: 20px;
          font-weight: 400;
        }

        .email-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .subscribe-btn {
          position: absolute;
          right: 2px;
          top: 2px;
          height: 36px;
          padding: 0 18px;
          background: linear-gradient(135deg, rgb(245, 149, 32), rgb(245, 149, 32));
          color: #1a1a2e;
          border: none;
          border-radius: 18px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .subscribe-btn:hover {
          background: linear-gradient(135deg, rgb(245, 149, 32), rgb(245, 149, 32));
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(51, 255, 148, 0.3);
        }

        .subscribe-btn:active {
          transform: translateY(0);
        }

        /* Footer Bottom */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          padding-top: 30px;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .copyright {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          margin: 0;
          font-weight: 400;
        }

        .footer-bottom-links {
          display: flex;
          gap: 35px;
        }

        .footer-bottom-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          transition: all 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: rgb(245, 149, 32);
        }

        /* Responsive Design */
        @media (max-width: 1280px) {
          .container {
            max-width: 1080px;
            padding: 0 32px;
          }

          .footer-grid {
            gap: 48px;
          }

          .footer-wrapper {
            min-height: 480px;
          }
        }

        @media (max-width: 1024px) {
          .container {
            max-width: 896px;
            padding: 0 28px;
          }

          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
            gap: 40px;
          }

          .footer-wrapper {
            min-height: 460px;
          }

          .brand-logo {
            font-size: 32px;
          }

          .brand-description {
            font-size: 14px;
            max-width: 260px;
          }

          .social-icon {
            width: 46px;
            height: 46px;
            font-size: 18px;
          }
        }

        @media (max-width: 768px) {
          .footer-wrapper {
            min-height: 600px;
          }

          .footer-content {
            padding-top: 64px;
            padding-bottom: 32px;
          }

          .container {
            max-width: 640px;
            padding: 0 24px;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
            text-align: left;
          }

          .footer-brand {
            grid-column: 1 / -1;
            text-align: center;
            padding-right: 0;
          }

          .brand-description {
            max-width: 400px;
            margin: 0 auto 28px;
          }

          .social-icons {
            justify-content: center;
            gap: 16px;
          }

          .footer-contact {
            max-width: none;
          }

          .newsletter-form {
            width: 100%;
            max-width: 300px;
            height: 38px;
            margin: 0 auto;
          }

          .email-input {
            padding: 0 80px 0 12px;
            font-size: 12px;
          }

          .subscribe-btn {
            height: 34px;
            padding: 0 16px;
            font-size: 10px;
            border-radius: 17px;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .footer-bottom-links {
            gap: 24px;
          }
        }

        @media (max-width: 640px) {
          .footer-wrapper {
            min-height: 700px;
          }

          .container {
            max-width: 100%;
            padding: 0 20px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
            text-align: center;
          }

          .footer-section {
            padding-top: 0;
          }

          .footer-heading {
            font-size: 14px;
            margin-bottom: 24px;
          }

          .footer-links a {
            font-size: 14px;
          }

          .contact-item {
            justify-content: center;
            font-size: 14px;
          }

          .newsletter-form {
            max-width: 280px;
          }

          .brand-logo {
            font-size: 30px;
          }

          .social-icon {
            width: 44px;
            height: 44px;
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .footer-wrapper {
            min-height: 800px;
          }

          .footer-content {
            padding-top: 48px;
            padding-bottom: 24px;
          }

          .container {
            padding: 0 16px;
          }

          .brand-logo {
            font-size: 28px;
          }

          .brand-description {
            font-size: 13px;
            max-width: 300px;
          }

          .social-icon {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }

          .social-icons {
            gap: 12px;
          }

          .footer-grid {
            gap: 24px;
          }

          .footer-heading {
            font-size: 13px;
          }

          .footer-links a {
            font-size: 13px;
          }

          .contact-item {
            font-size: 13px;
            gap: 10px;
          }

          .newsletter-title {
            font-size: 16px;
          }

          .newsletter-form {
            max-width: 260px;
            height: 36px;
          }

          .email-input {
            font-size: 11px;
            padding: 0 70px 0 10px;
          }

          .subscribe-btn {
            height: 32px;
            padding: 0 12px;
            font-size: 9px;
          }

          .copyright {
            font-size: 13px;
          }

          .footer-bottom-links a {
            font-size: 13px;
          }
        }

        @media (max-width: 360px) {
          .footer-wrapper {
            min-height: 850px;
          }

          .footer-content {
            padding-top: 40px;
            padding-bottom: 20px;
          }

          .container {
            padding: 0 12px;
          }

          .brand-logo {
            font-size: 26px;
          }

          .brand-description {
            font-size: 12px;
            max-width: 260px;
          }

          .social-icon {
            width: 36px;
            height: 36px;
            font-size: 14px;
          }

          .social-icons {
            gap: 10px;
          }

          .footer-heading {
            font-size: 12px;
            margin-bottom: 20px;
          }

          .footer-links a {
            font-size: 12px;
          }

          .contact-item {
            font-size: 12px;
            gap: 8px;
          }

          .newsletter-title {
            font-size: 15px;
          }

          .newsletter-form {
            max-width: 240px;
            height: 34px;
          }

          .email-input {
            font-size: 10px;
            padding: 0 60px 0 8px;
          }

          .subscribe-btn {
            height: 30px;
            padding: 0 10px;
            font-size: 8px;
            border-radius: 15px;
          }

          .copyright {
            font-size: 12px;
          }

          .footer-bottom-links {
            gap: 20px;
          }

          .footer-bottom-links a {
            font-size: 12px;
          }
        }

        @media (max-width: 320px) {
          .footer-wrapper {
            min-height: 900px;
          }

          .container {
            padding: 0 10px;
          }

          .brand-logo {
            font-size: 24px;
          }

          .brand-description {
            font-size: 11px;
            max-width: 240px;
          }

          .social-icon {
            width: 34px;
            height: 34px;
            font-size: 13px;
          }

          .footer-grid {
            gap: 20px;
          }

          .newsletter-form {
            max-width: 220px;
            height: 32px;
          }

          .email-input {
            font-size: 9px;
            padding: 0 50px 0 8px;
          }

          .subscribe-btn {
            height: 28px;
            padding: 0 8px;
            font-size: 7px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;