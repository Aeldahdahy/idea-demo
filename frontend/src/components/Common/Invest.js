"use client";
import React, { useState, useEffect } from 'react';
import { Container,
  //  Row, Col
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
    <div className="flex flex-wrap items-center gap-10 w-full px-4">
      {/* Left Column */}
      <div className="flex-1 min-w-[300px] md:min-w-[500px] md:w-1/2">
        <div className="relative max-w-[500px] mx-auto">
          <div className="w-full h-[400px] bg-[#C5D7F5] rounded-[30px] relative overflow-hidden">
            <div className="absolute bottom-5 left-5 bg-[#E8E8E8] p-5 rounded-[15px] flex flex-col gap-2.5">
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/s9hgmmxf_expires_30_days.png"
                alt="Location Icon"
                className="w-[30px] h-[30px]"
              />
              <p className="text-black text-lg sm:text-xl m-0">
                Country<br />Project Industry
              </p>
            </div>
          </div>
          <div className="absolute -top-[70px] -right-[23px] max-[550px]:-right-[25px] max-[550px]:-top-[50px] w-[250px] max-[550px]:w-[200px] bg-[#E7EEFA] rounded-[20px] p-3 text-center">
            <img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/f4b0qvx1_expires_30_days.png"
              alt="Venture"
              className="w-full h-[120px] max-[550px]:h-[100px] object-cover rounded-[10px]"
            />
            <h3 className="text-black text-lg sm:text-xl font-bold my-2">IDEA-Venture</h3>
            <p className="text-black text-sm sm:text-base">25,000 EGP Min per investor</p>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 min-w-[300px] md:min-w-[400px] md:w-1/2">
        <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold mb-5">
          Find the best investment deals
        </h2>
        <p className="text-black text-base sm:text-lg leading-relaxed mb-8">
          Access the largest network of entrepreneurs. Filter opportunities by country, location, industry, stage, investment range, and language to find the deal for you.
        </p>
        <div className="bg-[#EEEEEE] p-5 rounded-[15px]">
          <p className="text-black text-base mb-2.5">How much are you looking to invest?</p>
          <div className="flex items-center gap-2.5">
            {/* Placeholder for Search icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <div className="flex-1 bg-[#F5F5F5] rounded-[4px] h-[6px]">
              <div className="w-[60%] h-[6px] bg-[#0029A4] rounded-[4px]"></div>
            </div>
            <span className="text-[#353535] text-xs">5M</span>
          </div>
          <p className="text-black text-sm text-center mt-2.5">25,000 EGP – 5,000,000 EGP</p>
        </div>
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
          {/* Step 1 */}
          <div className="flex items-center gap-4 mb-5">
                  <span className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-600 text-white text-base sm:text-lg font-bold aspect-square">
                    1
                  </span>
                  <p className="m-0 text-lg sm:text-[22px] md:text-2xl">
                    Search and manage deals through your private interface.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-600 text-white text-base sm:text-lg font-bold aspect-square">
                    2
                  </span>
                  <p className="m-0 text-lg sm:text-[22px] md:text-2xl">
                    Request a meeting to discuss deals with projects.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-600 text-white text-base sm:text-lg font-bold aspect-square">
                    3
                  </span>
                  <p className="m-0 text-lg sm:text-[22px] md:text-2xl">
                    Manage your investments and grow your portfolio.
                  </p>
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