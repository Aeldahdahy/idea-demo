"use client";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, 
  // Button
 } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  // Search,
  // CalendarCheck,
  // TrendingUp,
  // Apple,
  // Play,
  Globe,
} from "lucide-react";
import image1 from "../../assets/img-0.57.png";
import image2 from "../../assets/img-0.52.png";
import image3 from "../../assets/img-0.53.png";
import image4 from "../../assets/img-0.54.png";
import image5 from "../../assets/img-0.55.png";
import image6 from "../../assets/img-0.56.png";

const images = [
  image3,
  image4,
  image5,
];


function Fundraise() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const [investmentValue, setInvestmentValue] = useState(25000);

  const formatNumber = (num) => {
    return `${num.toLocaleString()} EGP`;
  };

   useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
  
      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, []);


  return (
    <Container fluid style={{ backgroundColor: "#FFFFFF", padding: "0" }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We make it easy to start your project.
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Browse hundreds of investment opportunities, connect with investors, and manage your investment contacts with the world's investors network.
          </p>
          <div className="flex justify-center gap-4">
            {[
              { Icon: Facebook, url: "https://www.facebook.com/share/1JUWs1jYhQ/" },
              { Icon: Twitter, url: "https://twitter.com" },
              { Icon: Instagram, url: "https://www.instagram.com/idea.x.venture?utm_source=qr&igsh=MW01cG1hYmF4MGliZg==" },
              { Icon: Linkedin, url: "https://www.linkedin.com/in/idea-venture-658978362?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
              { Icon: Youtube, url: "https://www.youtube.com" },
            ].map(({ Icon, url }, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-transform transform hover:scale-110"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </motion.div>
      </section>

        {/* Main Content Section */}
        <motion.div
          style={{ padding: "0 15px" }}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <Row style={{ marginBottom: "220px", alignItems: "center" }}>
            <Col xs={12} md={6} style={{ marginBottom: "30px" }}>
            <img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/279shj4h_expires_30_days.png"
              alt="Investment Dashboard"
              className="w-full max-w-md mx-auto object-contain"
            />
            </Col>
            <Col xs={12} md={6} style={{ marginBottom: "30px" }}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                style={{
                  height:" 460px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly"
                }}
              >
                <div
                  style={{
                    background: "#163696",
                    color: "#FFFFFF",
                    borderRadius: "20px",
                    padding: "20px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    alignItems: "center",
                   
                  }}
                >
                  <div style={{ flex: "1 1 200px"}}>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <img
                        src={image6}
                        alt="Investor profile"
                        style={{ width: "60px", height: "60px", borderRadius: "10px" }}
                      />
                      <div>
                        <h4 style={{ color: "#FFFFFF", fontSize: "20px", margin: "0 0 5px 0" }}>BOB</h4>
                        <p style={{ color: "#FFFFFF", fontSize: "16px", margin: "0 0 10px 0" }}>
                          Individual Investor
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#FFFFFF33",
                            borderRadius: "10px",
                            padding: "5px 10px",
                          }}
                        >
                          <span style={{ color: "#FFFFFF", fontSize: "16px", marginRight: "10px" }}>
                            Egypt
                          </span>
                          <Globe size={20} />
                        </div>
                      </div>
                  <div style={{ flex: "1 1 150px", textAlign: "right" }}>
                    <p style={{ color: "#FFFFFF", fontSize: "18px", margin: "0 0 5px 0" }}>
                      EGP 50,000,000
                    </p>
                    <small style={{ color: "#FFFFFF", fontSize: "14px" }}>Net Worth</small>
                  </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    background: "#D9EFFF",
                    color: "#000",
                    borderRadius: "20px",
                    padding: "20px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: "1 1 200px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <img
                        src={image1}
                        alt="Investor profile"
                        style={{ width: "60px", height: "60px", borderRadius: "10px" }}
                      />
                      <div>
                        <h4 style={{ color: "#000", fontSize: "20px", margin: "0 0 5px 0" }}>Ahmed</h4>
                        <p style={{ color: "#000", fontSize: "16px", margin: "0 0 10px 0" }}>
                          Angel Investor
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            background: "rgba(197, 197, 197, 0.91) ",
                            borderRadius: "10px",
                            padding: "5px 10px",
                          }}
                        >
                          <span style={{ color: "#000", fontSize: "16px", marginRight: "10px"}}>
                            Egypt
                          </span>
                          <Globe size={20} />
                        </div>
                      </div>
                  <div style={{ flex: "1 1 150px", textAlign: "right" }}>
                    <p style={{ color: "#000", fontSize: "18px", margin: "0 0 5px 0" }}>
                      EGP 15,000,000
                    </p>
                    <small style={{ color: "#000", fontSize: "14px" }}>Net Worth</small>
                  </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>

          <div className="flex flex-col md:flex-row items-center w-full py-16 px-4">
      {/* Left Column */}
      <div className="w-full md:w-7/12 mb-8 md:mb-0 flex justify-center">
        <div className="relative max-w-[400px] w-full flex justify-center">
          <div className="w-[90%] h-[270px] border-2 border-dashed border-blue-600 rounded-[20px] bg-gray-50 relative">
            {/* Left Card (Checkboxes) */}
            <div className="absolute top-0.5 -left-16 bg-white border border-gray-200 rounded-[15px] p-4 shadow-md scale-90">
              <div className="flex flex-col gap-2.5">
                {[
                  { id: "location", label: "Country" },
                  { id: "industry", label: "Project Industry" },
                  { id: "stage", label: "Project Stage" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center gap-2.5">
                    <input
                      id={item.id}
                      type="checkbox"
                      checked
                      disabled
                      className="w-5 h-5 rounded border-gray-300 bg-blue-600 appearance-none relative"
                    />
                    <label htmlFor={item.id} className="text-gray-800 text-base">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Top Card (Placeholder Content) */}
            <div className="absolute -top-[80px] -right-[60px] bg-white border border-gray-200 rounded-[10px] p-2 shadow-md scale-75 sm:scale-80">
              <div className="flex flex-col justify-center items-center p-3 bg-gray-50 rounded-[8px] border border-gray-200 gap-1.5">
                <div className="w-8 h-8 bg-blue-900 rounded-md"></div>
                <div className="w-[60%] h-1.5 bg-gray-200 rounded-[3px]"></div>
                <div className="w-[80%] h-1 bg-gray-200 rounded-[3px]"></div>
                <div className="w-[70%] h-1 bg-gray-200 rounded-[3px]"></div>
                <div className="w-[90%] h-1 bg-gray-200 rounded-[3px]"></div>
                <div className="flex justify-between w-full mt-3">
                  <div className="text-center">
                    <div className="font-bold text-sm text-gray-900">25,000 EGP</div>
                    <div className="text-[10px] text-gray-500">Total Required</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm text-gray-900">{formatNumber(investmentValue)}</div>
                    <div className="text-[10px] text-gray-500">Min per Investor</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Right Card (Investment Range Slider) */}
            <div className="absolute -bottom-[75px] right-[50px] bg-white border border-gray-200 rounded-[15px] p-4 shadow-md scale-90">
              <div className="flex flex-col gap-2.5">
                <div>
                  <h2 className="text-gray-800 text-lg font-semibold">Investment Range</h2>
                  <p className="text-gray-500 text-sm mt-1">How much are you looking to invest?</p>
                </div>
                <div>
                  <input
                    type="range"
                    min="25000"
                    max="5000000"
                    value={investmentValue}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setInvestmentValue(value);
                      e.target.style.background = `linear-gradient(to right, #2563EB 0%, #2563EB ${
                        ((value - 25000) / (5000000 - 25000)) * 100
                      }%, #E5E7EB ${((value - 25000) / (5000000 - 25000)) * 100}%, #E5E7EB 100%)`;
                    }}
                    className="w-full h-2 bg-gray-200 rounded-[5px] outline-none appearance-none cursor-pointer"
                  />
                  <style>
                    {`
                      input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 20px;
                        height: 20px;
                        background: #2563EB;
                        border-radius: 50%;
                        cursor: pointer;
                      }
                      input[type="range"]::-moz-range-thumb {
                        width: 20px;
                        height: 20px;
                        background: #2563EB;
                        border-radius: 50%;
                        cursor: pointer;
                        border: none;
                      }
                    `}
                  </style>
                  <p className="text-gray-800 text-sm mt-2.5 text-center">
                    {formatNumber(investmentValue)} - 5,000,000 EGP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-5/12 mb-8 text-center">
        <h3 className="text-black text-2xl font-bold mb-5">Find investors for your project</h3>
        <p className="text-black text-lg leading-relaxed">
          Access the largest opportunities to reach investors in your field. Filter opportunities by country, location, industry, stage, investment range, and language to find the deal for you.
        </p>
      </div>
    </div>
        </motion.div>
        <div className="spacemax" />
                <div className="bg-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading and Subheading */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    3 easy steps from sign up to making connections
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    Find investors locally, nationally, and internationally.
                  </p>
                </div>
        
                {/* Mockup */}
                <div className="relative flex justify-center mb-16 flex-col items-center">
                  {/* Laptop Mockup */}
        
                  <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
                  <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
                    <img
                      src={images[currentImageIndex]}
                      className="h-[156px] md:h-[278px] w-full rounded-lg object-cover"
                      alt={`Slide ${currentImageIndex + 1}`}
                    />
                  </div>
                  </div>
                      <div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
                          <div class="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[550px] md:h-[8px] bg-gray-800"></div>
                      </div>
        
                </div>
        
                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {/* Step 1 */}
                  <div>
                    <div className="flex justify-center mb-4">
                      <span className="flex items-center justify-center h-12 w-12 rounded-full bg-[#0029A4] text-white text-xl font-bold">
                        1
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Create</h3>
                    <p className="mt-2 text-gray-600">
                      Create your pitch using our tried and tested template
                    </p>
                  </div>
        
                  {/* Step 2 */}
                  <div>
                    <div className="flex justify-center mb-4">
                      <span className="flex items-center justify-center h-12 w-12 rounded-full bg-[#0029A4] text-white text-xl font-bold">
                        2
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Publish</h3>
                    <p className="mt-2 text-gray-600">
                      Publish your pitch to our network of angel investors and funds
                    </p>
                  </div>
        
                  {/* Step 3 */}
                  <div>
                    <div className="flex justify-center mb-4">
                      <span className="flex items-center justify-center h-12 w-12 rounded-full bg-[#0029A4] text-white text-xl font-bold">
                        3
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Connect</h3>
                    <p className="mt-2 text-gray-600">
                      Connect with investors and message them to raise funds and expand your network
                    </p>
                  </div>
                </div>
              </div>
            </div>
        <motion.section
          style={{ background: "#0C1736", padding: "60px 0", position: "relative", overflow: "hidden" }}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div
            style={{
              backgroundImage: "url(https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/q0q7c7nt_expires_30_days.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "40px 0",
            }}
          >
            <h2
              style={{
                color: "#FFFFFF",
                fontSize : "36px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "40px",
                maxWidth: "800px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Our Platform Now Also Accessible via Mobile App
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center", maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ flex: "1 1 300px", color: "#FFFFFF", fontSize: "18px", lineHeight: "2.5", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="flex flex-col gap-5">
      {/* Step 1 */}
      <div className="flex items-center gap-4 mb-5">
        <span className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-600 text-white text-base sm:text-lg font-bold aspect-square">
          1
        </span>
        <p className="m-0 text-lg sm:text-[22px] md:text-2xl">
          Search for opportunists through your private interface.
        </p>
      </div>

      {/* Step 2 */}
      <div className="flex items-center gap-4 mb-5">
        <span className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-600 text-white text-base sm:text-lg font-bold aspect-square">
          2
        </span>
        <p className="m-0 text-lg sm:text-[22px] md:text-2xl">
          Request a meeting to discuss deals with investors.
        </p>
      </div>

      {/* Step 3 */}
      <div className="flex items-center gap-4 mb-5">
        <span className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-600 text-white text-base sm:text-lg font-bold aspect-square">
          3
        </span>
        <p className="m-0 text-lg sm:text-[22px] md:text-2xl">
          Manage your project growth and your portfolio.
        </p>
      </div>
    </div>
      </div>
              <div >
                <div >
                               
                                <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                                    <div class="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                                    <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                                    <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                                    <div class="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                                    <div class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
                                        <img src={image2} class="dark:hidden w-[272px] h-[572px]" alt="" />
                                        <img src={image2} class="hidden dark:block w-[272px] h-[572px]" alt="" />
                                    </div>
                                </div>
                
                              </div>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <h3 style={{ color: "#FFFFFF", fontSize: "24px", marginBottom: "20px" }}>Download the app</h3>
              <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
  <a
    href="https://www.apple.com/app-store/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/sn1aod97_expires_30_days.png"
      alt="Download on the App Store"
      style={{ width: "120px", height: "auto" }}
    />
  </a>
  <a
    href="https://play.google.com/store"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/shb2q66n_expires_30_days.png"
      alt="Get it on Google Play"
      style={{ width: "120px", height: "auto" }}
    />
  </a>
</div>
              <p style={{ color: "#FFFFFF", fontSize: "16px" }}>Available on Android and iOS.</p>
            </div>
          </div>
        </motion.section>
      </div>
    </Container>
  );
}

export default Fundraise;