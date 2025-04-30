"use client";
import React, {useState} from "react";
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
import image1 from "../../assets/img-0.51.jpg";

function Fundraise() {
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
    return `$${num.toLocaleString()}`;
  };


  return (
    <Container fluid style={{ backgroundColor: "#FFFFFF", padding: "0" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 15px" }}>
        {/* Header Section */}
        <motion.div
          style={{ padding: "60px 0" }}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <Row>
            <Col xs={12} style={{ textAlign: "left" }}>
              <h1
                style={{
                  color: "#000000",
                  fontSize: "clamp(36px, 5vw, 48px)",
                  fontWeight: "bold",
                  margin: "0 0 0 0",
                }}
              >
                We make it easy to start your project.
              </h1>
            </Col>
          </Row>
        </motion.div>

        {/* Main Content Section */}
        <motion.div
          style={{ padding: "0 15px" }}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <Row style={{ marginBottom: "220px", alignItems: "center" }}>
            <Col xs={12} md={6} style={{ marginBottom: "30px" }}>
              <h3
                style={{
                  color: "#000000",
                  fontSize: "24px",
                  fontWeight: "bold",
                  lineHeight: "1.5",
                  marginBottom: "45px",
                }}
              >
                Browse hundreds of investment opportunities, connect with investors, and manage your investment contacts with the world's investors network.
              </h3>
              <h5 style={{ color: "#000000", fontSize: "20px", fontWeight: "bold", margin: "20px 0 15px 0" }}>
                Follow Us
              </h5>
              <div style={{ display: "flex", gap: "15px" }}>
  {[
    { Icon: Facebook, url: "https://www.facebook.com/share/1JUWs1jYhQ/" },
    { Icon: Twitter, url: "https://twitter.com" }, // Replace with actual Twitter URL if available
    { Icon: Instagram, url: "https://www.instagram.com/idea.x.venture?utm_source=qr&igsh=MW01cG1hYmF4MGliZg==" },
    { Icon: Linkedin, url: "https://www.linkedin.com/in/idea-venture-658978362?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
    { Icon: Youtube, url: "https://www.youtube.com" }, // Replace with actual YouTube URL if available
  ].map(({ Icon, url }, index) => (
    <button
      key={index}
      style={{
        color: "#000000",
        background: "none",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onClick={() => window.open(url, "_blank")} // Opens the URL in a new tab
    >
      <Icon size={30} />
    </button>
  ))}
</div>
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
                        src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/9681df83f94dc594a2e0a40495d9952f8487f01e?placeholderIfAbsent=true"
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
          <Row style={{ padding: "60px 0", alignItems: "center" }}>
            <Col xs={12} md={7} style={{ marginBottom: "30px" }}>
              <div style={{ position: "relative", maxWidth: "400px", margin: "0 auto", display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: "90%",
                    height: "270px",
                    border: "2px dashed #2563EB",
                    borderRadius: "20px",
                    position: "relative",
                    background: "#F9FAFB",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "2px",
                      left: "-60px",
                      background: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "15px",
                      padding: "15px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      transform: "scale(0.9)",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[
                        { id: "location", label: "Country" },
                        { id: "industry", label: "Project Industry" },
                        { id: "stage", label: "Project Stage" },
                      ].map((item) => (
                        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <input
                            id={item.id}
                            type="checkbox"
                            checked
                            disabled
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "4px",
                              border: "1px solid #D1D5DB",
                              background: "#2563EB",
                              appearance: "none",
                              position: "relative",
                            }}
                          />
                          <label
                            htmlFor={item.id}
                            style={{ color: "#1F2937", fontSize: "16px" }}
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                  style={{
                    position: "absolute",
                    top: "-120px",
                    right: "-100px",
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "15px",
                    padding: "15px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transform: "scale(0.9)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20px",
                      backgroundColor: "#F9FAFB",
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "#1E3A8A",
                        borderRadius: "8px",
                      }}
                    ></div>

                    <div
                      style={{
                        width: "60%",
                        height: "10px",
                        backgroundColor: "#E5E7EB",
                        borderRadius: "5px",
                      }}
                    ></div>

                    <div
                      style={{
                        width: "80%",
                        height: "8px",
                        backgroundColor: "#E5E7EB",
                        borderRadius: "5px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "70%",
                        height: "8px",
                        backgroundColor: "#E5E7EB",
                        borderRadius: "5px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "90%",
                        height: "8px",
                        backgroundColor: "#E5E7EB",
                        borderRadius: "5px",
                      }}
                    ></div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{ fontWeight: "bold", fontSize: "18px", color: "#111827" }}
              >
                25,000 EGP
              </div>
              <div style={{ fontSize: "14px", color: "#6B7280" }}>
                Total Required
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{ fontWeight: "bold", fontSize: "18px", color: "#111827" }}
              >
                {formatNumber(investmentValue)}
              </div>
              <div style={{ fontSize: "14px", color: "#6B7280" }}>
                Min per Investor
              </div>
            </div>
          </div>
        </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-75px",
                      right: "50px",
                      background: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "15px",
                      padding: "15px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      transform: "scale(0.9)",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div>
                        <h2
                          style={{ color: "#1F2937", fontSize: "18px", fontWeight: "600" }}
                        >
                          Investment Range
                        </h2>
                        <p
                          style={{ color: "#6B7280", fontSize: "14px", marginTop: "5px" }}
                        >
                          How much are you looking to invest?
                        </p>
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
                            }%, #E5E7EB ${
                              ((value - 25000) / (5000000 - 25000)) * 100
                            }%, #E5E7EB 100%)`;
                          }}
                          style={{
                            width: "100%",
                            height: "8px",
                            background: "#E5E7EB",
                            borderRadius: "5px",
                            outline: "none",
                            appearance: "none",
                            cursor: "pointer",
                          }}
                        />
                        <style>
                          {`
                            input[type="range"]::-webkit-slider-thumb {
                              -webkit-appearance: none;
                              appearance: none;
                              width: 20px;
                              height: 20px;
                              background: #2563EB;
                              borderRadius: 50%;
                              cursor: pointer;
                            }
                            input[type="range"]::-moz-range-thumb {
                              width: 20px;
                              height: "20px",
                              background: #2563EB;
                              borderRadius: "50%",
                              cursor: "pointer",
                              border: "none",
                            }
                          `}
                        </style>
                        <p
                          style={{
                            color: "#1F2937",
                            fontSize: "14px",
                            marginTop: "10px",
                            textAlign: "center",
                          }}
                        >
                          {formatNumber(investmentValue)} - 5,000,000 EGP
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={5} style={{ marginBottom: "30px" }}>
              <div style={{ textAlign: "center" }}>
                <h3
                  style={{
                    color: "#000000",
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  Find investors for your project
                </h3>
                <p style={{ color: "#000000", fontSize: "18px", lineHeight: "1.6" }}>
                  Access the largest opportunities to reach investors in your field. Filter opportunities by country, location, industry, stage, investment range, and language to find the deal for you.
                </p>
              </div>
            </Col>
          </Row>
        </motion.div>
<div className="spacemax" />
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
            Search for opportunists through your private interface.          
          </p>
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
            Request a meeting  to discuss deals with investors.
          </p>
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
            Manage your  project grow  and your portfolio.
          </p>
        </div>
      </div>
              <div >
                <img
                  src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/3s01328w_expires_30_days.png"
                  alt="Mobile App"
                  style={{ width: "100%", maxWidth: "300px", height: "auto", objectFit: "contain" }}
                />
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