import React, { useState, useRef, useEffect } from 'react';
// Make sure to include Bootstrap CSS in your project for layout and base styles
// import 'bootstrap/dist/css/bootstrap.min.css';

// Import Lucide Icons
import { Info, PlusCircle, X, CheckCircle2, Circle } from 'lucide-react';

// Approximate colors based on images (refined primary blue from Step 1 image)
const primaryBlue = '#0056b3'; // Slightly darker blue based on the image
const mutedGray = '#6c757d';
const lightGray = '#e9ecef';
const white = '#ffffff';
const darkText = '#212529'; // Standard Bootstrap dark text color

// Main Form Wizard Component
function ClientInvestorPreferences() {
  // State to keep track of the current step
  const [currentStep, setCurrentStep] = useState(1);
  // State to store form data
  const [formData, setFormData] = useState({
    investorType: '',
    minInvestment: 0,
    maxInvestment: 1000000,
    yearsOfExperience: '',
    socialAccounts: [''],
    country: '',
    city: '',
    industries: [],
  });

  // State to control the visibility of descriptions
  const [descriptions, setDescriptions] = useState({
    individual: false,
    company: false
  });

  const toggleDescription = (type, e) => {
    e.stopPropagation();
    setDescriptions(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Refs for the slider elements
  const sliderTrackRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);

  // State to track which thumb is being dragged
  const [draggingThumb, setDraggingThumb] = useState(null);

  // Slider configuration
  const sliderMin = 0;
  const sliderMax = 1000000;
  const sliderStep = 1000;

  // List of industries for Step 4
  const industryOptions = [
    'Agriculture', 'Entertainment & Leisure', 'Food & Beverage', 'Media',
    'Products & Inventions', 'Sales & Marketing', 'Transportation', 'Software',
    'Education & Training', 'Fashion & Beauty', 'Hospitality, Restaurants & Bars', 'Energy & Natural Resources',
    'Medical & Sciences', 'Finance', 'Manufacturing & Engineering', 'Personal Services',
    'Property', 'Retail', 'Technology', 'Business Services'
  ];

  // Navigation handlers
  const handleNextStep = () => {
    // Add validation before proceeding to the next step
    if (currentStep === 1) {
      if (!formData.investorType) {
        alert("Please select an investor type.");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.yearsOfExperience) {
        alert("Please select your years of experience.");
        return;
      }
    } else if (currentStep === 3) {
        // Check if at least one social account is filled
        const socialAccountsFilled = formData.socialAccounts.some(account => account.trim() !== '');
        if (!socialAccountsFilled) {
             alert("Please add at least one social networking account.");
             return;
        }
         // Check if country and city are filled
         if (!formData.country || !formData.city) {
            alert("Please select your country and enter your city/town.");
            return;
         }
    } else if (currentStep === 4) {
         // Validation for Step 4: Ensure 3 industries are selected
         if (formData.industries.length !== 3) {
            alert("Please select exactly 3 industries.");
            return;
         }
    }


    if (currentStep === 4) {
      alert("Profile completed Successfully");
      console.log("Form Data Submitted:", formData);
      // Here you would typically submit the formData to your backend
    } else {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  // Form input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialAccountChange = (index, value) => {
    const newSocialAccounts = [...formData.socialAccounts];
    newSocialAccounts[index] = value;
    setFormData(prevData => ({
      ...prevData,
      socialAccounts: newSocialAccounts,
    }));
  };

  const handleAddSocialAccount = () => {
      // Add a new empty social account input
    setFormData(prevData => ({
      ...prevData,
      socialAccounts: [...prevData.socialAccounts, ''],
    }));
  };

   const handleRemoveSocialAccount = (index) => {
        const newSocialAccounts = formData.socialAccounts.filter((_, i) => i !== index);
        setFormData(prevData => ({ ...prevData, socialAccounts: newSocialAccounts }));
   };


  const handleIndustrySelect = (industry) => {
    setFormData(prevData => {
      const currentIndustries = prevData.industries;
      if (currentIndustries.includes(industry)) {
        // Deselect industry
        return {
          ...prevData,
          industries: currentIndustries.filter(item => item !== industry)
        };
      } else {
        // Select industry if less than 3 are selected
        if (currentIndustries.length < 3) {
          return {
            ...prevData,
            industries: [...currentIndustries, industry]
          };
        } else {
          console.log("You can only select up to 3 industries.");
          alert("You can only select up to 3 industries."); // User feedback
          return prevData; // Do not update state if already 3 selected
        }
      }
    });
  };

  // Slider functions
  const getValueFromPosition = (position) => {
    if (!sliderTrackRef.current) return 0;
    const trackWidth = sliderTrackRef.current.offsetWidth;
    const percentage = position / trackWidth;
    const value = sliderMin + percentage * (sliderMax - sliderMin);
    const steppedValue = Math.round(value / sliderStep) * sliderStep;
    return Math.max(sliderMin, Math.min(sliderMax, steppedValue));
  };

  const getPositionFromValue = (value) => {
    if (!sliderTrackRef.current) return 0;
    const trackWidth = sliderTrackRef.current.offsetWidth;
    const percentage = (value - sliderMin) / (sliderMax - sliderMin);
    return percentage * trackWidth;
  };

  const handleMouseDown = (thumbType) => (e) => {
    setDraggingThumb(thumbType);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    if (!draggingThumb || !sliderTrackRef.current) return;

    const trackRect = sliderTrackRef.current.getBoundingClientRect();
    let clientX = e.clientX;

    // Handle touch events
    if (e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX;
    }

    let newPosition = clientX - trackRect.left;
    newPosition = Math.max(0, Math.min(newPosition, trackRect.width));

    const newValue = getValueFromPosition(newPosition);

    setFormData(prevData => {
      let updatedData = { ...prevData };
      if (draggingThumb === 'min') {
        updatedData.minInvestment = Math.min(newValue, updatedData.maxInvestment);
        updatedData.minInvestment = Math.max(updatedData.minInvestment, sliderMin);
      } else if (draggingThumb === 'max') {
        updatedData.maxInvestment = Math.max(newValue, updatedData.minInvestment);
        updatedData.maxInvestment = Math.min(updatedData.maxInvestment, sliderMax);
      }
      return updatedData;
    });
  };

  const handleMouseUp = () => {
    setDraggingThumb(null);
  };

  const handleTouchStart = (thumbType) => (e) => {
    setDraggingThumb(thumbType);
    e.preventDefault();
    e.stopPropagation();
  };

   const handleTouchMove = (e) => {
    if (!draggingThumb || !sliderTrackRef.current || !e.touches || !e.touches[0]) return;

    const trackRect = sliderTrackRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX;
    let newPosition = touchX - trackRect.left;
    newPosition = Math.max(0, Math.min(newPosition, trackRect.width));

    const newValue = getValueFromPosition(newPosition);

    setFormData(prevData => {
      let updatedData = { ...prevData };
      if (draggingThumb === 'min') {
        updatedData.minInvestment = Math.min(newValue, updatedData.maxInvestment);
        updatedData.minInvestment = Math.max(updatedData.minInvestment, sliderMin);
      } else if (draggingThumb === 'max') {
        updatedData.maxInvestment = Math.max(newValue, updatedData.minInvestment);
        updatedData.maxInvestment = Math.min(updatedData.maxInvestment, sliderMax);
      }
      return updatedData;
    });
    e.preventDefault(); // Prevent default touch behavior like scrolling
   };

   const handleTouchEnd = () => {
       setDraggingThumb(null);
   };

    // Added handleMouseMove and handleTouchMove to dependency array to resolve eslint warnings
  useEffect(() => {
    if (draggingThumb) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [draggingThumb, formData, handleMouseMove, handleTouchMove]);

  const renderStepContent = () => {
    const minThumbPosition = getPositionFromValue(formData.minInvestment);
    const maxThumbPosition = getPositionFromValue(formData.maxInvestment);

    return (
      <div className="p-4">
        {/* Main Title - Adjusted margin-bottom for better spacing and increased font size */}
        <h2 className="text-center mb-5 fs-4">Account created, now let's complete your profile!</h2>

        {/* Progress Bar */}
        <div className="progress mb-4" style={{ height: '8px' }}>
          <div
            className="progress-bar"
            role="progressbar"
             // Use primaryBlue for the progress bar color
            style={{ width: `${(currentStep / 4) * 100}%`, backgroundColor: primaryBlue }}
            aria-valuenow={(currentStep / 4) * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

{currentStep === 1 && (
  <>
    <h3 className="text-center mb-4 mt-4 fs-5">What type of investor are you?</h3>

    <div className="row justify-content-center">

    {/* Individual Option */}
    <div className="col-md-5 mb-3">
            <div
              className={`card h-100 ${formData.investorType === 'individual' ? 'border-primary border-2' : 'border'}`}
              style={{ 
                borderColor: formData.investorType === 'individual' ? primaryBlue : undefined, 
                cursor: 'pointer', 
                transition: 'all 0.2s ease-in-out'
              }}
              onClick={() => setFormData({...formData, investorType: 'individual'})}
            >
              <div className="card-body" style={{ transition: 'all 0.2s ease-in-out' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-6">Individual Net worth</h5>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={(e) => toggleDescription('individual', e)}
                    style={{ background: 'none', border: 'none', padding: 0 }}
                  >
                    <Info size={18} color={mutedGray} />
                  </button>
                </div>
                {descriptions.individual && (
                  <p className="card-text mt-2" style={{ fontSize: '0.9em', color: mutedGray }}>
                    This option is for individuals who are investing based on their personal net worth.
                  </p>
                )}
                <input
                  type="radio"
                  name="investorType"
                  value="individual"
                  checked={formData.investorType === 'individual'}
                  onChange={handleInputChange}
                  className="d-none"
                />
              </div>
            </div>
          </div>
    </div>

    <div className="row justify-content-center">
      {/* Company Option */}
      <div className="col-md-5 mb-3">
        <div
          className={`card h-100 ${formData.investorType === 'company' ? 'border-primary border-2' : 'border'}`}
          style={{ 
            borderColor: formData.investorType === 'company' ? primaryBlue : undefined, 
            cursor: 'pointer', 
            transition: 'all 0.2s ease-in-out'
          }}
          onClick={() => setFormData({...formData, investorType: 'company'})}
        >
          <div className="card-body" style={{ transition: 'all 0.2s ease-in-out' }}>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 fs-6">Company</h5>
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none"
                onClick={(e) => toggleDescription('company', e)}
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <Info size={18} color={mutedGray} />
              </button>
            </div>
            {descriptions.company && (
              <p className="card-text mt-2" style={{ fontSize: '0.9em', color: mutedGray }}>
                • Categories of companies or entities that invest in various opportunities
                <br/>• Operate through a structured team or board
                <br/>• Invest significant capital in large-scale projects
              </p>
            )}
            <input
              type="radio"
              name="investorType"
              value="company"
              checked={formData.investorType === 'company'}
              onChange={handleInputChange}
              className="d-none"
            />
          </div>
        </div>
      </div>
    </div>
  </>
)}

        {currentStep === 2 && (
          <>
            {/* Step Title - Adjusted margin-bottom for better spacing and increased font size */}
            <h3 className="text-center mb-4 mt-4 fs-5">Select your investment range</h3>

            <div className="px-3 mb-5">
              <div className="d-flex justify-content-between mb-2">
                {/* Use mutedGray color and slight font size increase */}
                <small style={{ color: mutedGray, fontSize: '1em' }}>${sliderMin.toLocaleString()}</small>
                <small style={{ color: mutedGray, fontSize: '1em' }}>${sliderMax.toLocaleString()}+</small>
              </div>

              <div className="position-relative" style={{ height: '40px' }}>
                {/* Slider Track - Use lightGray color */}
                <div
                  ref={sliderTrackRef}
                  className="rounded position-absolute top-50 start-0 end-0"
                  style={{ height: '6px', transform: 'translateY(-50%)', backgroundColor: lightGray }}
                >
                  {/* Filled Track - Use primaryBlue color */}
                  <div
                    className="rounded position-absolute top-0 bottom-0"
                    style={{
                      left: `${minThumbPosition}px`,
                      width: `${maxThumbPosition - minThumbPosition}px`,
                      backgroundColor: primaryBlue,
                    }}
                  ></div>
                </div>

                {/* Min Thumb - Use primaryBlue background and white border */}
                <div
                  ref={minThumbRef}
                  className="rounded-circle position-absolute top-50 translate-middle-y border border-2"
                  style={{
                    left: `${minThumbPosition}px`,
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    backgroundColor: primaryBlue,
                    borderColor: white,
                  }}
                  onMouseDown={handleMouseDown('min')}
                  onTouchStart={handleTouchStart('min')}
                ></div>

                {/* Max Thumb - Use primaryBlue background and white border */}
                <div
                  ref={maxThumbRef}
                  className="rounded-circle position-absolute top-50 translate-middle-y border border-2"
                  style={{
                    left: `${maxThumbPosition}px`,
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    backgroundColor: primaryBlue,
                    borderColor: white,
                  }}
                  onMouseDown={handleMouseDown('max')}
                  onTouchStart={handleTouchStart('max')}
                ></div>
              </div>

              {/* Selected Range Display - Use mutedGray color and slight font size increase */}
              <div className="text-center mt-3" style={{ color: mutedGray, fontSize: '1em' }}>
                <small>
                  Selected Range: ${formData.minInvestment.toLocaleString()} to ${formData.maxInvestment.toLocaleString()}
                </small>
              </div>
            </div>

            {/* Step Title - Adjusted margin-bottom for better spacing and increased font size */}
            <h3 className="text-center mb-4 mt-4 fs-5">How many years of experience do you have as an investor?</h3>

            <div className="mb-3">
              {/* Select input - Base font size is increased by form-select */}
              <select
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select years</option>
                <option value="0-1">0-1 Years</option>
                <option value="1-3">1-3 Years</option>
                <option value="3-5">3-5 Years</option>
                <option value="5+">5+ Years</option>
              </select>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            {/* Step Title - Adjusted margin-bottom for better spacing and increased font size */}
            <h3 className="text-center mb-4 mt-4 fs-5">Add your social networking accounts</h3>

            {/* Social Accounts Input Fields */}
            {/* Modified structure to ensure input takes full width within its container */}
            {formData.socialAccounts.map((account, index) => (
              // Added w-100 to the wrapper div to make it take full width
              <div key={index} className="mb-3 position-relative w-100">
                 {/* Input field with right padding */}
                <input
                  type="text"
                  value={account}
                  onChange={(e) => handleSocialAccountChange(index, e.target.value)}
                  // Added w-100 to input explicitly to ensure it takes full width of its parent
                  className="form-control form-control-lg w-100"
                  placeholder="Social media link or username"
                   style={{ paddingRight: '30px' }} // Add padding on the right for the icon
                />
                   {/* Remove button/icon positioned absolutely */}
                   {/* Only show remove button if there's more than one account */}
                   {formData.socialAccounts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSocialAccount(index)}
                        title="Remove account"
                         // Positioned absolutely inside the relative wrapper
                        className="position-absolute top-50 end-0 translate-middle-y close-btn"
                         // Style to look like part of the input background, and muted icon
                        style={{
                           border: "none",
                           background: "none",
                           marginRight: 10 
                          }}
                      >
                         {/* Lucide X Icon - Size can be adjusted */}
                        <X size={18} />
                      </button>
                   )}
              </div>
            ))}

            {/* Add Account Button - Styled with primaryBlue background, Increased font size, Adjusted margin-bottom */}
            <button
              onClick={handleAddSocialAccount}
              className="btn btn-lg w-50 mb-5 d-block mx-auto prefrencesAddAccount"
              style={{ backgroundColor: primaryBlue, borderColor: primaryBlue, color: white, fontSize: '1.1em' }}
            >
              <PlusCircle size={20} className="me-2" />
              Add Account
            </button>

            {/* Location Fields */}
            {/* Adjusted margin-top for better spacing */}
            <div className="row mt-5">
              <div className="col-md-6 mb-3">
                {/* Label - Increased font size slightly */}
                <label htmlFor="country" className="form-label" style={{ fontSize: '1.05em' }}>Country</label>
                {/* Select input - Base font size is increased by form-select */}
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select Country</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Libya">Libya</option>
                  <option value="UAE">UAE</option>
                   {/* Add more countries as needed */}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                 {/* Label - Increased font size slightly */}
                <label htmlFor="city" className="form-label" style={{ fontSize: '1.05em' }}>City / Town</label>
                 {/* City / Town Input - Increased font size slightly */}
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter city or town"
                   style={{ fontSize: '1.1em' }} // Increased font size for City/Town input
                />
              </div>
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
             {/* Step Title - Adjusted margin-bottom for better spacing and increased font size */}
            <h3 className="text-center mb-4 mt-4 fs-5">Click on the 3 industries you're most interested in.</h3>

            {/* Industry Buttons Grid */}
            <div className="row row-cols-2 row-cols-md-4 g-3 mb-4">
              {industryOptions.map(industry => {
                const isSelected = formData.industries.includes(industry);
                return (
                  <div key={industry} className="col">
                    <button
                      onClick={() => handleIndustrySelect(industry)}
                      // Removed btn-primary/btn-outline-secondary to control all styles inline for precision
                      className={`btn w-100 text-start position-relative py-2`} // Keep base btn class and layout/spacing
                       // Explicitly set background, border color, border thickness, and text color based on selection
                      style={{
                          height: '100%', 
                          backgroundColor: white, 
                          borderColor: isSelected ? primaryBlue : mutedGray, 
                          borderWidth: isSelected ? '2px' : '1px', 
                          borderStyle: 'solid', 
                          borderRadius: 0,
                          color: darkText, 
                      }}
                    >
                      <span className="d-inline-block text-truncate" style={{ maxWidth: '85%'  }}>
                        {industry}
                      </span>
                       {/* Lucide Icon positioning and color */}
                      <div className="position-absolute end-0 top-50 translate-middle-y me-2">
                        {isSelected ? (
                           <CheckCircle2 size={30} style={{
                              color: white, 
                              backgroundColor: primaryBlue,
                              borderRadius:"20px",
                            }} />
                        ) : (
                           <Circle size={30} color={mutedGray} />
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Selection Count Message - Use mutedGray color and slightly increased font size */}
            <div className="text-center mt-3" style={{ color: mutedGray, fontSize: '1em' }}>
              {formData.industries.length} of 3 industries selected.
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    // Outer container with centering and min-vh-100 for full height background
    // Added horizontal padding for responsiveness
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-3 px-sm-4 px-md-5">
      {/* Card with fixed maxWidth for a contained form */}
      <div className="card shadow-sm w-100" style={{ maxWidth: '80%' }}> {/* Keeping max width at 700px */}
        <div className="card-body p-4">
          {renderStepContent()}

          <div className="d-flex justify-content-between mt-4">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className={`btn ${currentStep === 1 ? 'btn-outline-secondary disabled' : 'btn-outline-primary'}`}
               // Style for Back button
              style={{
                  borderColor: currentStep === 1 ? undefined : primaryBlue, // Primary border when enabled
                  color: currentStep === 1 ? undefined : primaryBlue, // Primary text when enabled
                  backgroundColor: currentStep === 1 ? undefined : white // White background when enabled
              }}
            >
              Back
            </button>

            <button
              onClick={handleNextStep}
              className="btn btn-primary"
              // Style for Next/Save button (primary blue background)
              style={{ backgroundColor: primaryBlue, borderColor: primaryBlue, color: white }}
            >
              {currentStep === 4 ? 'Save' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientInvestorPreferences;