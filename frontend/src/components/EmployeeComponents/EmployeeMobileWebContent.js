import React, { useState } from 'react';
import UploadIcon from "../../assets/img-0.37.png";

const EmployeeMobileWebContent = () => {
  const [whoAreWe, setWhoAreWe] = useState('');
  const [investor, setInvestor] = useState('');
  const [entrepreneur, setEntrepreneur] = useState('');
  const [investorSlide, setInvestorSlide] = useState('');
  const [entrepreneurSlide, setEntrepreneurSlide] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      whoAreWe,
      investor,
      entrepreneur,
      investorSlide,
      entrepreneurSlide,
    });
  };

  return (
    <div className="emwc-dashboard-container">
      {/* Main Content */}
      <form onSubmit={handleSubmit}>
        {/* Who Are We Section */}
        <section className="emwc-section">
          <h2>WHO ARE WE</h2>
          <div className="emwc-section-content">
            <div className="emwc-description">
              <label>Description</label>
              <textarea
                value={whoAreWe}
                onChange={(e) => setWhoAreWe(e.target.value)}
                placeholder="INVESTMENT"
              />
            </div>
            <div className="emwc-upload">
              <label>Image/Video</label>
              <div className="emwc-upload-box">
              <label className="emwc-upload-icon-label">
                  <img src={UploadIcon} alt="Upload Icon" className="emwc-upload-icon" />
                  <input type="file" accept="image/*" className="emwc-upload-input" />
                </label>
                <p>Drag & Drop or choose image to upload</p>
                <p>Select jpg, jpeg, png or gif</p>
                
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="emwc-section">
          <h2>HOW IT WORKS</h2>

          {/* Investor Subsection */}
          <div className="emwc-subsection">
            <h3>INVESTOR</h3>
            <div className="emwc-section-content">
              <div className="emwc-description">
                <label>Description</label>
                <textarea
                  value={investor}
                  onChange={(e) => setInvestor(e.target.value)}
                  placeholder="CREATE YOUR ACCOUNT"
                />
              </div>
              <div className="emwc-upload">
                <label>Image/Video</label>
                <div className="emwc-upload-box">
                <label className="emwc-upload-icon-label">
                    <img src={UploadIcon} alt="Upload Icon" className="emwc-upload-icon" />
                    <input type="file" accept="image/*" className="emwc-upload-input" />
                  </label>
                  <p>Drag & Drop or choose image to upload</p>
                  <p>Select jpg, jpeg, png or gif</p>
                  
                </div>
              </div>
            </div>
            <div className="emwc-slide-select">
              <select
                value={investorSlide}
                onChange={(e) => setInvestorSlide(e.target.value)}
              >
                <option value="">Select Slide</option>
                <option value="slide1">Slide 1</option>
                <option value="slide2">Slide 2</option>
                <option value="slide3">Slide 3</option>
              </select>
            </div>
          </div>

          {/* Entrepreneur Subsection */}
          <div className="emwc-subsection">
            <h3>ENTREPRENEUR</h3>
            <div className="emwc-section-content">
              <div className="emwc-description">
                <label>Description</label>
                <textarea
                  value={entrepreneur}
                  onChange={(e) => setEntrepreneur(e.target.value)}
                  placeholder="REDBULL"
                />
              </div>
              <div className="emwc-upload">
                <label>Image/Video</label>
                <div className="emwc-upload-box">
                <label className="emwc-upload-icon-label">
                    <img src={UploadIcon} alt="Upload Icon" className="emwc-upload-icon" />
                    <input type="file" accept="image/*" className="emwc-upload-input" />
                  </label>
                  <p>Drag & Drop or choose image to upload</p>
                  <p>Select jpg, jpeg, png or gif</p>
              
                </div>
              </div>
            </div>
            <div className="emwc-slide-select">
              <select
                value={entrepreneurSlide}
                onChange={(e) => setEntrepreneurSlide(e.target.value)}
              >
                <option value="">Select Slide</option>
                <option value="slide1">Slide 1</option>
                <option value="slide2">Slide 2</option>
                <option value="slide3">Slide 3</option>
              </select>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <button type="submit" className="emwc-save-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default EmployeeMobileWebContent;