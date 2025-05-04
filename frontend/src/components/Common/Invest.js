"use client";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Search,
} from "lucide-react";
import image1 from "../../assets/img-0.49.png";
import image2 from "../../assets/img-0.50.jpg";
import image3 from "../../assets/img-0.52.png";
import image4 from "../../assets/img-0.53.png";
import image5 from "../../assets/img-0.54.png";
import image6 from "../../assets/img-0.55.png";


const images = [
  image5,
  image6,
  image4,
];


function Invest() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };



  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We make it easy to start investing.
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Browse hundreds of investment opportunities, connect with entrepreneurs, and manage your investment contacts with the world’s Entrepreneur network.
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

        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mt-16 flex flex-col lg:flex-row items-center gap-12"
        >
          <div className="lg:w-1/2">
            <div className="relative bg-gray-800 rounded-2xl p-6 shadow-xl transform rotate-3">
              <div className="flex flex-col sm:flex-row gap-6 transform -rotate-3">
                {[
                  {
                    img: image2,
                    title: "Trip Tactix",
                    type: "Tourism Industry",
                    stage: "Seed stage",
                    min: "EGP 50,000",
                    bg: "bg-blue-900",
                    textColor: "text-white",
                  },
                  {
                    img: image1,
                    title: "OddCrop",
                    type: "Food & Beverage",
                    stage: "Start-Up stage",
                    min: "EGP 150,000",
                    bg: "bg-blue-100",
                    textColor: "text-gray-900",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    className={`flowbite-card ${item.bg} rounded-xl p-4 flex items-center gap-4 shadow-md min-w-[200px]`}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold ${item.textColor}`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm ${item.textColor}`}>
                        {item.type}
                      </p>
                      <div className="flex justify-between items-center mt-2 flex-col">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            item.textColor === "text-white"
                              ? "bg-gray-200 text-gray-900"
                              : "bg-gray-300 text-gray-900"
                          }`}
                        >
                          {item.stage}
                        </span>
                        <span className={`text-sm ${item.textColor}`}>
                          {item.min} Min
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/279shj4h_expires_30_days.png"
              alt="Investment Dashboard"
              className="w-full max-w-md mx-auto object-contain"
            />
          </div>
        </motion.div>
      </section>




        {/* Investment Deals Section */}
        <motion.div
          style={{ padding: "60px 0" }}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <Row style={{ alignItems: "center", flexWrap: "wrap", gap: "40px", width: "100%" }}>
            <Col md={6} style={{ flex: "1 1 500px" }}>
              <div style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}>
                <div
                  style={{
                    width: "100%",
                    height: "400px",
                    background: "#C5D7F5",
                    borderRadius: "30px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "20px",
                      background: "#E8E8E8",
                      padding: "20px",
                      borderRadius: "15px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <img
                      src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/s9hgmmxf_expires_30_days.png"
                      alt="Location Icon"
                      style={{ width: "30px", height: "30px" }}
                    />
                    <p style={{ color: "#000000", fontSize: "20px", margin: "0px 40px 0px 0px" }}>
                      Country<br />Project Industry
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "300px",
                    background: "#E7EEFA",
                    borderRadius: "20px",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/f4b0qvx1_expires_30_days.png"
                    alt="Venture"
                    style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }}
                  />
                  <h3 style={{ color: "#000000", fontSize: "24px", fontWeight: "bold", margin: "10px 0" }}>
                    IDEA-Venture
                  </h3>
                  <p style={{ color: "#000000", fontSize: "16px" }}>25,000 EGP Min per investor</p>
                </div>
              </div>
            </Col>
            <Col md={6} style={{ flex: "1 1 400px" }}>
              <h2 style={{ color: "#000000", fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
                Find the best investment deals
              </h2>
              <p style={{ color: "#000000", fontSize: "18px", lineHeight: "1.6", marginBottom: "30px" }}>
                Access the largest network of entrepreneurs. Filter opportunities by country, location, industry, stage, investment range, and language to find the deal for you.
              </p>
              <div style={{ background: "#EEEEEE", padding: "20px", borderRadius: "15px" }}>
                <p style={{ color: "#000000", fontSize: "16px", margin: "0 0 10px 0" }}>
                  How much are you looking to invest?
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Search size={20} />
                  <div style={{ flex: 1, background: "#F5F5F5", borderRadius: "4px", height: "6px" }}>
                    <div style={{ width: "60%", height: "6px", background: "#0029A4", borderRadius: "4px" }}></div>
                  </div>
                  <span style={{ color: "#353535", fontSize: "12px" }}>5M</span>
                </div>
                <p style={{ color: "#000000", fontSize: "14px", textAlign: "center", marginTop: "10px" }}>
                  25,000 EGP – 5,000,000 EGP
                </p>
              </div>
            </Col>
          </Row>
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
            Find Project locally, nationally.
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
              Create your Account and fill in your profile to get started
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex justify-center mb-4">
              <span className="flex items-center justify-center h-12 w-12 rounded-full bg-[#0029A4] text-white text-xl font-bold">
                2
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Search</h3>
            <p className="mt-2 text-gray-600">
              Find projects that match your investment criteria and interests
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
              Connect with Entrepreneur and message them to discuss deals
            </p>
          </div>
        </div>
      </div>
    </div>


        {/* Mobile App Section */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50px",
              height: "50px",
              background: "#2563EB",
              borderRadius: "50%",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            1
          </span>
          <p style={{ margin: "0", fontSize: "22px" }}>
          Search and manage deals through your private interface.          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50px",
              height: "50px",
              background: "#2563EB",
              borderRadius: "50%",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            2
          </span>
          <p style={{ margin: "0", fontSize: "22px" }}>
          Request a meeting  to discuss deals with projects          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50px",
              height: "50px",
              background: "#2563EB",
              borderRadius: "50%",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            3
          </span>
          <p style={{ margin: "0", fontSize: "22px" }}>
          Manage your investments and grow your portfolio.          </p>
        </div>
      </div>
              <div >
               
                <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                    <div class="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                    <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                    <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                    <div class="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                    <div class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
                        <img src={image3} class="dark:hidden w-[272px] h-[572px]" alt="" />
                        <img src={image3} class="hidden dark:block w-[272px] h-[572px]" alt="" />
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

export default Invest;