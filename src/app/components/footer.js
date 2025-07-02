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
          <path
            d="M1441 45.6056V104.32L1300.03 72.0271L1180.56 45.6056L1025.59 28.4805H891.62L798.14 37.2877L738.653 45.6056C738.653 45.6056 641.514 59.795 705.5 45.6056C769.486 31.4162 881.206 7.82941 944.5 3.03781C1003.09 -1.39742 1032.3 0.350856 1091 3.03765C1142.29 5.38532 1174.93 5.84826 1225.55 14.2911C1264.9 20.855 1289.79 21.3083 1329 28.4805C1374.47 36.7984 1441 45.6056 1441 45.6056Z"
            fill="rgb(245, 149, 32)"
          />
          <path
            d="M0 29V83C0 83 73.776 84.0927 121.5 90.5C164.288 96.2446 188.367 99.662 231.5 101.5C263.689 102.872 282.235 106.888 314 101.5C330.716 98.6645 412.5 83 412.5 83C412.5 83 330.374 91.4589 314 90.5C285.767 88.8466 250.82 88.0899 223 83C186.873 76.3902 157.454 68.4935 121.5 61C62.7929 48.7642 0 29 0 29Z"
            fill="rgb(245, 149, 32)"
          />
          <path
            d="M1441 612H0V74.9049C168.5 89.3064 123.806 89.3063 271 89.3064C418.194 89.3064 752.817 24.8466 979.96 28.1206C1164.35 30.7784 1441 74.9049 1441 74.9049V612Z"
            fill="url(#paint0_linear_520_269)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_520_269"
              x1="720.5"
              y1="12.6746"
              x2="720.5"
              y2="612"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7A4ADF" />
              <stop offset="1" stopColor="#15145F" />
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
              <img 
               src="/images/it_plus_logo.png" 
               alt="IT Plus Logo" 
               className="logo-image"
               />
              <p className="brand-description">
                Global destination for specialized IT solutions, ideal for
                startups and businesses seeking to enhance their digital
                presence.
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
                <li>
                  <a href="/about">About us</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="/careers">Careers</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h3 className="footer-heading">SERVICES</h3>
              <ul className="footer-links">
                <li>
                  <a href="/technology">Technology</a>
                </li>
                <li>
                  <a href="/cloud">Cloud Solutions</a>
                </li>
                <li>
                  <a href="/software">Software</a>
                </li>
                <li>
                  <a href="/support">IT Support</a>
                </li>
                <li>
                  <a href="/products">IT Products</a>
                </li>
                <li>
                  <a href="/academic">Academic</a>
                </li>
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
          min-height: auto;
          overflow: hidden;
          color: white;
          font-family: "Outfit", "Segoe UI", sans-serif;
          box-sizing: border-box;
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
          display: block;
          flex-direction: column;
          justify-content: center;
          padding-top: 80px;
          padding-bottom: 40px;
          box-sizing: border-box;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          width: 100%;
          box-sizing: border-box;
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

        .facebook:hover {
          background: #1877f2;
          border-color: #1877f2;
        }
        .twitter:hover {
          background: #1da1f2;
          border-color: #1da1f2;
        }
        .instagram:hover {
          background: linear-gradient(45deg, #f58529, #dd2a7b, #8134af);
          border-color: #dd2a7b;
        }
        .linkedin:hover {
          background: #0a66c2;
          border-color: #0a66c2;
        }

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
          background: linear-gradient(
            135deg,
            rgb(245, 149, 32),
            rgb(245, 149, 32)
          );
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
          background: linear-gradient(
            135deg,
            rgb(245, 149, 32),
            rgb(245, 149, 32)
          );
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

        /* Mobile Responsive Design (up to 768px) */
        @media (max-width: 768px) {
          .footer-wrapper {
            min-height: clamp(400px, 100vw, 600px);
          }

          .footer-svg svg {
            min-height: clamp(400px, 100vw, 600px);
          }

          .footer-content {
            padding-top: clamp(40px, 10vw, 60px);
            padding-bottom: clamp(20px, 5vw, 30px);
          }

          .container {
            padding: 0 clamp(12px, 3vw, 20px);
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: clamp(20px, 5vw, 35px);
            text-align: center;
            margin-bottom: clamp(20px, 5vw, 40px);
          }

          .footer-brand {
            padding-right: 0;
            max-width: none;
          }

          .brand-logo {
            font-size: clamp(24px, 6vw, 32px);
          }

          .brand-description {
            font-size: clamp(13px, 3.5vw, 15px);
            max-width: clamp(250px, 80vw, 400px);
            margin: 0 auto clamp(15px, 4vw, 25px);
          }

          .social-icons {
            justify-content: center;
            gap: clamp(10px, 2.5vw, 15px);
          }

          .social-icon {
            width: clamp(40px, 10vw, 45px);
            height: clamp(40px, 10vw, 45px);
            font-size: clamp(16px, 4vw, 18px);
          }

          .footer-section {
            padding-top: clamp(5px, 1vw, 10px);
          }

          .footer-heading {
            font-size: clamp(13px, 3.5vw, 15px);
            margin-bottom: clamp(15px, 4vw, 25px);
          }

          .footer-links li {
            margin-bottom: clamp(8px, 2vw, 12px);
          }

          .footer-links a {
            font-size: clamp(13px, 3.5vw, 15px);
          }

          .footer-contact {
            max-width: none;
          }

          .contact-info {
            margin-bottom: clamp(15px, 4vw, 25px);
          }

          .contact-item {
            font-size: clamp(13px, 3.5vw, 15px);
            gap: clamp(8px, 2vw, 12px);
            justify-content: center;
          }

          .contact-item i {
            font-size: clamp(12px, 3vw, 14px);
            width: clamp(12px, 3vw, 16px);
          }

          .newsletter-title {
            font-size: clamp(15px, 4vw, 18px);
            margin-bottom: clamp(10px, 2.5vw, 15px);
          }

          .newsletter-form {
            width: clamp(220px, 80vw, 300px);
            height: clamp(36px, 9vw, 44px);
            margin: 0 auto;
            border-radius: clamp(16px, 4vw, 20px);
          }

          .email-input {
            font-size: clamp(12px, 3vw, 14px);
            padding: 0 clamp(70px, 20vw, 90px) 0 clamp(10px, 2.5vw, 14px);
            border-radius: clamp(16px, 4vw, 20px);
          }

          .subscribe-btn {
            height: clamp(32px, 8vw, 40px);
            padding: 0 clamp(12px, 3vw, 16px);
            font-size: clamp(10px, 2.5vw, 12px);
            border-radius: clamp(14px, 3.5vw, 18px);
            right: 2px;
            top: 2px;
          }

          .footer-bottom {
            padding-top: clamp(15px, 4vw, 25px);
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
            gap: clamp(10px, 2.5vw, 15px);
          }

          .copyright {
            font-size: clamp(12px, 3vw, 14px);
          }

          .footer-bottom-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: clamp(15px, 4vw, 25px);
          }

          .footer-bottom-links a {
            font-size: clamp(12px, 3vw, 14px);
          }
        }

        /* Preserve Original Styles for Larger Screens */
        @media (min-width: 769px) {
          .footer-wrapper {
            min-height: 500px;
          }

         

          .footer-svg svg {
            min-height: 100%;
          }

          .footer-content {
            padding-top: 80px;
            padding-bottom: 40px;
          }

          .container {
            padding: 10px 10px;
          }

          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr 1.5fr;
            gap: 60px;
            margin-bottom: 60px;
          }

          .footer-brand {
            padding-right: 20px;
          }

          .brand-logo {
            font-size: 36px;
          }

          .brand-description {
            font-size: 15px;
            max-width: 300px;
            margin-bottom: 35px;
          }

          .social-icons {
            gap: 18px;
          }

          .social-icon {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .footer-heading {
            font-size: 15px;
            margin-bottom: 30px;
          }

          .footer-links li {
            margin-bottom: 14px;
          }

          .footer-links a {
            font-size: 15px;
          }

          .footer-contact {
            max-width: 280px;
          }

          .contact-info {
            margin-bottom: 35px;
          }

          .contact-item {
            font-size: 15px;
            gap: 12px;
          }

          .contact-item i {
            font-size: 14px;
            width: 16px;
          }

          .newsletter-title {
            font-size: 18px;
            margin-bottom: 20px;
          }

          .newsletter-form {
            width: 280px;
            height: 40px;
            border-radius: 20px;
          }

          .email-input {
            font-size: 13px;
            padding: 0 90px 0 16px;
            border-radius: 20px;
          }

          .subscribe-btn {
            height: 36px;
            padding: 0 18px;
            font-size: 11px;
            border-radius: 18px;
          }

          .footer-bottom {
            padding-top: 30px;
          }

          .footer-bottom-content {
            flex-direction: row;
            gap: 20px;
          }

          .footer-bottom-links {
            gap: 35px;
          }

          .footer-bottom-links a {
            font-size: 14px;
          }

          .copyright {
            font-size: 14px;
          }
        }
           @media (max-width: 769px) {
  
  
  .footer-brand {
          font-size: 26px;
          font-weight: 400;
          margin-bottom: 20px;
          padding-top:100px
        }
}

        @media (max-width: 480px) {
  
  
  .footer-brand {
          font-size: 26px;
          font-weight: 400;
          margin-bottom: 20px;
          padding-top:80px
        }
}
             @media (max-width: 380px) {
  
  
  .footer-brand {
          font-size: 26px;
          font-weight: 400;
          margin-bottom: 20px;
          padding-top:130px
        }
}
      `}</style>
    </footer>
  );
};

export default Footer;