"use client";
import React from "react";
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
// import styles from "../../assets/styles.module.css";

function Invest() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px" }}>
              <div style={{ flex: "1 1 600px", maxWidth: "700px" }}>
                <h1
                  style={{
                    color: "#000000",
                    fontSize: "clamp(36px, 5vw, 48px)",
                    fontWeight: "bold",
                    margin: "0 0 20px 0",
                  }}
                >
                  We make it easy to start investing.
                </h1>
                <p
                  style={{
                    color: "#000000",
                    fontSize: "20px",
                    lineHeight: "1.6",
                    maxWidth: "600px",
                  }}
                >
                  Browse hundreds of investment opportunities, connect with entrepreneurs, and manage your investment contacts with the world’s Entrepreneur network.
                </p>
              </div>
              <div style={{ flex: "1 1 400px", position: "relative", display: "flex", justifyContent: "center", alignItems: "center"}}>
  <img
    src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/279shj4h_expires_30_days.png"
    alt="Investment Dashboard"
    style={{
      width: "100%",
      maxWidth: "600px",
      height: "auto",
      objectFit: "contain",
      zIndex: 100,
      position: "absolute ",
      top: "215px",
    }}
  />
  <div
    style={{
      position: "relative",
      width: "600px",
      height: "700px",
      background: "#262A35",
      borderRadius: "20px",
      padding: "20px",
      color: "#FFFFFF",
      fontSize: "16px",
      textAlign: "center",
      zIndex: 50, 
      transform: "rotate(5deg)", // Added 70-degree rotation
    }}
  >
            <div style={{ display: "flex", gap: "40px", marginTop: "40px", flexWrap: "wrap", 
                  transform: "rotate(-5deg)", // Added -70-degree rotation

             }}>
              {[
                {
                  img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/kjtbudh9_expires_30_days.png",
                  title: "IDEA-Venture",
                  type: "Investment Start-up",
                  stage: "Seed stage",
                  min: "EGP 15,000",
                  bg: "#163696",
                  textColor: "#FFFFFF",
                },
                {
                  img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/s1avosq2_expires_30_days.png",
                  title: "IDEA-Venture",
                  type: "Investment Start-up",
                  stage: "Seed stage",
                  min: "EGP 15,000",
                  bg: "#D9EFFF",
                  textColor: "#2F2828",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  style={{
                    flex: "1 1 400px",
                    background: item.bg,
                    borderRadius: "20px",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "40px",
                    height: "150px",
                  }}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: "80px", height: "80px", objectFit: "contain" }}
                  />
                  <div style={{ display: "flex", justifyContent:"space-between", flex: 1 }}>
                    <div>

                    <h3 style={{ color: item.textColor, fontSize: "24px", fontWeight: "bold", margin: "0 0 10px 0" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: item.textColor, fontSize: "16px", margin: "0 0 10px 0" }}>{item.type}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>

                    <div
                      style={{
                        background: item.textColor === "#FFFFFF" ? "#F4F4F4E8" : "#C5C5C5E8",
                        borderRadius: "15px",
                        padding: "5px 15px",
                        display: "inline-block",
                        fontSize: "14px",
                        color: "#000000",
                      }}
                      >
                      {item.stage}
                    </div>
                    <span style={{ color: item.textColor, fontSize: "16px", margin: "10px 0 0 0" }}>
                      {item.min} Min per Investor
                    </span>
                      </div>
                  </div>
                </motion.div>
              ))}
            </div>
  </div>
</div>
            </div>
            <div style={{ marginTop: "40px", textAlign: "left" }}>
              <h4 style={{ color: "#000000", fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
                Follow Us
              </h4>
              <div style={{ display: "flex", gap: "15px" }}>
                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
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
                    onClick={() => alert("Replace this with your desired action or navigation logic.")}
                  >
                    <Icon size={30} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Investment Deals Section */}
        <motion.div
          style={{ padding: "60px 0" }}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <Row style={{ alignItems: "center", flexWrap: "wrap", gap: "40px" }}>
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
                    <p style={{ color: "#000000", fontSize: "20px", margin: "0" }}>
                      Egypt<br />Software & Technology
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
                  <span style={{ color: "#353535", fontSize: "12px" }}>10M</span>
                </div>
                <p style={{ color: "#000000", fontSize: "14px", textAlign: "center", marginTop: "10px" }}>
                  $25,000 – $5,000,000
                </p>
              </div>
            </Col>
          </Row>
        </motion.div>

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
                fontSize: "clamp(24px, 4\n\n\n\n4vw, 36px)",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "40px",
                maxWidth: "800px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Seamless Experience: Our Platform Now Also Accessible via Mobile App
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center", maxWidth: "1000px", margin: "0 auto" }}>
              <div style={{ flex: "1 1 300px", color: "#FFFFFF", fontSize: "18px", lineHeight: "1.6" }}>
                <img
                  src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/v5iyzune_expires_30_days.png"
                  alt="Feature Icon"
                  style={{ width: "40px", height: "40px", marginBottom: "20px" }}
                />
                <p>
                  Search and manage deals through your private interface. Request a meeting to discuss deals with projects. Manage your investments and grow your portfolio.
                </p>
              </div>
              <div style={{ flex: "1 1 300px" }}>
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
                <img
                  src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/sn1aod97_expires_30_days.png"
                  alt="App Store"
                  style={{ width: "120px", height: "auto" }}
                />
                <img
                  src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/axHDWvM9tw/shb2q66n_expires_30_days.png"
                  alt="Google Play"
                  style={{ width: "120px", height: "auto" }}
                />
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