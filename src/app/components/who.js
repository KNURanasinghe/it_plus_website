
const WhoSection = () => {
  return (
    <>
      {/* Who Section */}
      <section className="who-section">
        {/* SVG Background */}
        <div className="who-svg-background">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 1442 730" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <rect x="2" width="1440" height="730" fill="url(#paint0_linear_522_278)"/>
            <path d="M1303.5 561.034C1229.93 552.985 1187.82 555.805 1114 561.034C1045.39 565.895 939.5 584.994 939.5 584.994C939.5 584.994 997.09 577.463 1029.5 576.034C1074.81 574.037 1092.65 572.195 1138 572.034C1208.05 571.785 1248.65 574.659 1317.5 587.534C1366.91 596.773 1441.5 622.034 1441.5 622.034V587.534C1441.5 587.534 1358.05 567.003 1303.5 561.034Z" fill="#ef8f11"/>
            <path d="M0.5 628.534V572.534C0.5 572.534 63.1128 608.892 103.5 617.534C153.455 628.224 181.207 636.569 232 642.034C298.979 649.241 337.224 645.51 404.5 642.034C460.324 639.15 547 628.534 547 628.534C547 628.534 413.167 657.358 326 663.034L325.75 663.05C262.774 667.151 226.851 669.49 164 663.034C99.0849 656.366 0.5 628.534 0.5 628.534Z" fill="#ef8f11"/>
            <defs>
              <linearGradient id="paint0_linear_522_278" x1="722" y1="0" x2="722" y2="730" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7A4ADF"/>
                <stop offset="1" stopColor="#360065"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="container">
          <div className="who-content-centered">
            {/* Title with integrated logo */}
            <div className="who-title-container">
              <h2 className="who-main-title">
                Who <span style={{ color: '#ef8f11' }}>is</span> 
                <span className="logo-in-title">
                  <img src="/images/it_plus.png" alt="ItPlus" className="title-logo" />
                </span>
              </h2>
            </div>
            
            {/* Description */}
            <p className="who-description-centered">
              In today's fast-paced digital world, your business needs more than just technology—it needs a trusted partner. That's where ItPlus comes in. We deliver secure, scalable IT solutions including networking, Wi-Fi, VoIP, CCTV, and full IT support—tailored to your unique needs. With ItPlus, your business is ready to thrive, grow, and stay connected.
            </p>
            
            {/* Our Story Button */}
            <div className="who-button-container">
              <button className="btn-our-story-centered">Our Story</button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Who Section with SVG Background */
        .who-section {
          position: relative;
          width: 100vw;
          min-height: 600px;
          overflow: hidden;
          color: white;
          font-family: 'Outfit', sans-serif;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .who-svg-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .who-svg-background svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Content Container */
        .who-content-centered {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 50px;
          text-align: center;
        }

        /* Title Container */
        .who-title-container {
          margin-bottom: 40px;
        }

        .who-main-title {
          font-size: 64px;
          font-weight: 300;
          color: white;
          margin: 0;
          line-height: 1.2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem; 
          flex-wrap: nowrap;
        }

        /* Logo integrated in title */
        .logo-in-title {
        height: 1em;
          display: inline-flex;
          align-items: center;
        }

        .title-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          border-radius: 10px;
          padding: 8px;
          transition: transform 0.3s ease;
        }

        .title-logo:hover {
          transform: scale(1.05);
        }

        /* Description - Centered */
        .who-description-centered {
          font-size: 18px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 40px;
          font-weight: 300;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Button Container - Centered */
        .who-button-container {
          display: flex;
          justify-content: center;
        }

        /* Our Story Button */
        .btn-our-story-centered {
          background: linear-gradient(45deg, rgb(245, 149, 32) , rgb(245, 149, 32) );
          color: #2D1B69;
          border: none;
          padding: 16px 40px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(16, 249, 129, 0.3);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-our-story-centered:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgb(245, 149, 32) );
          background: linear-gradient(45deg, rgb(245, 149, 32) , rgb(245, 149, 32) );
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .who-content-centered {
            padding: 70px 30px;
          }
          
          .who-main-title {
            font-size: 56px;
          }
        }

        @media (max-width: 992px) {
          .who-section {
            min-height: 550px;
          }
          
          .who-content-centered {
            padding: 60px 25px;
          }
          
          .who-main-title {
            font-size: 48px;
            gap: 15px;
          }
          
          .title-logo {
            width: 70px;
            height: 70px;
          }
          
          .who-description-centered {
            font-size: 17px;
            max-width: 600px;
          }
        }

        @media (max-width: 768px) {
          .who-section {
            min-height: 500px;
          }
          
          .who-content-centered {
            padding: 50px 20px;
          }

          .who-main-title {
            font-size: 40px;
            flex-direction: column;
            gap: 15px;
          }

          .title-logo {
            width: 60px;
            height: 60px;
          }

          .who-description-centered {
            font-size: 16px;
            max-width: 500px;
            margin-bottom: 35px;
          }

          .btn-our-story-centered {
            padding: 14px 30px;
            font-size: 14px;
          }
        }

        @media (max-width: 576px) {
          .who-section {
            min-height: 450px;
          }
          
          .who-content-centered {
            padding: 40px 15px;
          }

          .who-main-title {
            font-size: 32px;
          }

          .title-logo {
            width: 50px;
            height: 50px;
          }

          .who-description-centered {
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 30px;
          }

          .btn-our-story-centered {
            padding: 12px 25px;
            font-size: 13px;
          }
        }

        @media (max-width: 400px) {
          .who-section {
            min-height: 400px;
          }
          
          .who-content-centered {
            padding: 35px 10px;
          }

          .who-main-title {
            font-size: 28px;
          }

          .title-logo {
            width: 45px;
            height: 45px;
          }

          .who-description-centered {
            font-size: 14px;
            margin-bottom: 25px;
          }

          .btn-our-story-centered {
            padding: 10px 20px;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default WhoSection;