import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Info, PlusCircle, X, CheckCircle2, Circle } from 'lucide-react';
import { updateClientData } from '../../../redux/clientAuthSlice'; // Adjust path
import { useFunctions } from '../../../useFunctions'; // Adjust path
import {
  setStep,
  updateFormData,
  setSocialAccounts,
  toggleIndustry,
  setLoading,
  setError,
  resetForm
} from '../../../redux/clientInvestorPreferencesSlice';

// Approximate colors
const primaryBlue = '#0056b3';
const mutedGray = '#6c757d';
const lightGray = '#e9ecef';
const white = '#ffffff';
const darkText = '#212529';

function ClientInvestorPreferences() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateUsers } = useFunctions();
  const userId = useSelector((state) => state.clientAuth.clientData?._id);
  const existingPreferences = useSelector((state) => state.clientAuth.clientData?.investorPreference);
  const { currentStep, formData, loading, error } = useSelector((state) => state.clientInvestorPreferences);

  // Pre-populate formData with existing preferences on mount
  useEffect(() => {
    if (existingPreferences) {
      dispatch(updateFormData({
        investorType: existingPreferences.investorType || '',
        minInvestment: existingPreferences.minInvestment || 0,
        maxInvestment: existingPreferences.maxInvestment || 1000000,
        yearsOfExperience: existingPreferences.yearsOfExperience || '',
        socialAccounts: existingPreferences.socialAccounts?.length ? existingPreferences.socialAccounts : [''],
        country: existingPreferences.country || '',
        city: existingPreferences.city || '',
        industries: existingPreferences.industries?.length ? existingPreferences.industries : []
      }));
    }
  }, [dispatch, existingPreferences]);

  // State for descriptions and slider
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

  // Slider refs and configuration
  const sliderTrackRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);
  const [draggingThumb, setDraggingThumb] = useState(null);
  const sliderMin = 0;
  const sliderMax = 1000000;
  const sliderStep = 1000;

  // Industry options
  const industryOptions = [
    'Agriculture', 'Entertainment & Leisure', 'Food & Beverage', 'Media',
    'Products & Inventions', 'Sales & Marketing', 'Transportation', 'Software',
    'Education & Training', 'Fashion & Beauty', 'Hospitality, Restaurants & Bars', 'Energy & Natural Resources',
    'Medical & Sciences', 'Finance', 'Manufacturing & Engineering', 'Personal Services',
    'Property', 'Retail', 'Technology', 'Business Services'
  ];

  useEffect(() => {
    if (!userId) {
      toast.error("Please log in to continue.", { position: 'top-right', autoClose: 5000 });
      navigate('/login', { replace: true });
    }
  }, [userId, navigate]);

  const handleNextStep = async () => {
    // Validate userId
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      toast.error("User ID is missing or invalid. Please log in again.", { position: 'top-right', autoClose: 5000 });
      navigate('/login', { replace: true });
      return;
    }
  
    // Validation
    if (currentStep === 1) {
      if (!['individual', 'company'].includes(formData.investorType)) {
        toast.error("Please select a valid investor type (Individual or Company).");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.yearsOfExperience) {
        toast.error("Please select your years of experience.");
        return;
      }
    } else if (currentStep === 3) {
      const socialAccountsFilled = formData.socialAccounts.some(account => account.trim() !== '');
      if (!socialAccountsFilled) {
        toast.error("Please add at least one social networking account.");
        return;
      }
      if (!formData.country || !formData.city) {
        toast.error("Please select your country and enter your city/town.");
        return;
      }
    } else if (currentStep === 4) {
      if (!['individual', 'company'].includes(formData.investorType)) {
        toast.error("Invalid investor type. Please select Individual or Company in Step 1.");
        return;
      }
      if (formData.industries.length !== 3) {
        toast.error("Please select exactly 3 industries.");
        return;
      }
    }
  
    if (currentStep === 4) {
      // Submit form data to backend
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const updatedData = {
          role: 'investor',
          investorPreference: formData
        };
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:7030';
        const response = await updateUsers(userId, updatedData, null, {
          dispatch,
          setLoading: (value) => dispatch(setLoading(value)),
          setError: (value) => dispatch(setError(value)),
          users: [], // Stubbed
          setUsers: () => {}, // Stubbed
          API_BASE_URL: apiBaseUrl
        });
        console.log('updateUsers response:', response.data);
        dispatch(updateClientData(response.data.data));
        dispatch(resetForm());
        toast.success("Profile completed successfully!", { position: 'top-right', autoClose: 3000 });
        navigate('/client-portal/investor', { replace: true });
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to save preferences.';
        console.error('Form submission error:', errorMessage);
        dispatch(setError(errorMessage));
        toast.error(errorMessage, { position: 'top-right', autoClose: 5000 });
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      dispatch(setStep(currentStep + 1));
    }
  };

  const handlePreviousStep = () => {
    dispatch(setStep(currentStep - 1));
  };

  // Form input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSocialAccountChange = (index, value) => {
    const newSocialAccounts = [...formData.socialAccounts];
    newSocialAccounts[index] = value.trim(); // Add trim() here
    dispatch(setSocialAccounts(newSocialAccounts.filter(acc => acc !== ''))); // Filter empty strings
  };

  const handleAddSocialAccount = () => {
    dispatch(setSocialAccounts([...formData.socialAccounts, '']));
  };

  const handleRemoveSocialAccount = (index) => {
    const newSocialAccounts = formData.socialAccounts.filter((_, i) => i !== index);
    dispatch(setSocialAccounts(newSocialAccounts));
  };

  const handleIndustrySelect = (industry) => {
    dispatch(toggleIndustry(industry));
  };

  // Slider functions
  const getValueFromPosition = useCallback((position) => {
    if (!sliderTrackRef.current) return 0;
    const trackWidth = sliderTrackRef.current.offsetWidth;
    const percentage = position / trackWidth;
    const value = sliderMin + percentage * (sliderMax - sliderMin);
    const steppedValue = Math.round(value / sliderStep) * sliderStep;
    return Math.max(sliderMin, Math.min(sliderMax, steppedValue));
  }, [sliderMin, sliderMax, sliderStep]);

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

  const handleMouseMove = useCallback((e) => {
    if (!draggingThumb || !sliderTrackRef.current) return;
    const trackRect = sliderTrackRef.current.getBoundingClientRect();
    let clientX = e.clientX;
    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
    }
    let newPosition = clientX - trackRect.left;
    newPosition = Math.max(0, Math.min(newPosition, trackRect.width));
    const newValue = getValueFromPosition(newPosition);
    dispatch(updateFormData(
      draggingThumb === 'min'
        ? {
            minInvestment: Math.min(newValue, formData.maxInvestment),
            maxInvestment: formData.maxInvestment
          }
        : {
            minInvestment: formData.minInvestment,
            maxInvestment: Math.max(newValue, formData.minInvestment)
          }
    ));
  }, [draggingThumb, sliderTrackRef, getValueFromPosition, dispatch, formData]);

  const handleMouseUp = () => {
    setDraggingThumb(null);
  };

  const handleTouchStart = (thumbType) => (e) => {
    setDraggingThumb(thumbType);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTouchMove = useCallback((e) => {
      if (!draggingThumb || !sliderTrackRef.current || !e.touches || !e.touches[0]) return;
      const trackRect = sliderTrackRef.current.getBoundingClientRect();
      const touchX = e.touches[0].clientX;
      let newPosition = touchX - trackRect.left;
      newPosition = Math.max(0, Math.min(newPosition, trackRect.width));
      const newValue = getValueFromPosition(newPosition);
      dispatch(updateFormData(
        draggingThumb === 'min'
          ? {
              minInvestment: Math.min(newValue, formData.maxInvestment),
              maxInvestment: formData.maxInvestment
            }
          : {
              minInvestment: formData.minInvestment,
              maxInvestment: Math.max(newValue, formData.minInvestment)
            }
      ));
      e.preventDefault();
    }, [draggingThumb, sliderTrackRef, getValueFromPosition, dispatch, formData]);

  const handleTouchEnd = () => {
    setDraggingThumb(null);
  };

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
  }, [draggingThumb, handleMouseMove, handleTouchMove]);

  const renderStepContent = () => {
    const minThumbPosition = getPositionFromValue(formData.minInvestment);
    const maxThumbPosition = getPositionFromValue(formData.maxInvestment);

    return (
      <div className="p-4">
        <h2 className="text-center mb-5 fs-4">Account created, now let's complete your profile!</h2>
        <div className="progress mb-4" style={{ height: '8px' }}>
          <div
            className="progress-bar"
            role="progressbar"
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
              <div className="col-md-5 mb-3">
                <div
                  className={`card h-100 ${formData.investorType === 'individual' ? 'border-primary border-2' : 'border'}`}
                  style={{
                    borderColor: formData.investorType === 'individual' ? primaryBlue : undefined,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onClick={() => dispatch(updateFormData({ investorType: 'individual' }))}
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
                      onChange={() => dispatch(updateFormData({ investorType: 'individual' }))}
                      className="d-none"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-5 mb-3">
                <div
                  className={`card h-100 ${formData.investorType === 'company' ? 'border-primary border-2' : 'border'}`}
                  style={{
                    borderColor: formData.investorType === 'company' ? primaryBlue : undefined,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onClick={() => dispatch(updateFormData({ investorType: 'company' }))}
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
                        <br />• Operate through a structured team or board
                        <br />• Invest significant capital in large-scale projects
                      </p>
                    )}
                    <input
                      type="radio"
                      name="investorType"
                      value="company"
                      checked={formData.investorType === 'company'}
                      onChange={() => dispatch(updateFormData({ investorType: 'company' }))}
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
            <h3 className="text-center mb-4 mt-4 fs-5">Select your investment range</h3>
            <div className="px-3 mb-5">
              <div className="d-flex justify-content-between mb-2">
                <small style={{ color: mutedGray, fontSize: '1em' }}>${sliderMin.toLocaleString()}</small>
                <small style={{ color: mutedGray, fontSize: '1em' }}>${sliderMax.toLocaleString()}+</small>
              </div>
              <div className="position-relative" style={{ height: '40px' }}>
                <div
                  ref={sliderTrackRef}
                  className="rounded position-absolute top-50 start-0 end-0"
                  style={{ height: '6px', transform: 'translateY(-50%)', backgroundColor: lightGray }}
                >
                  <div
                    className="rounded position-absolute top-0 bottom-0"
                    style={{
                      left: `${minThumbPosition}px`,
                      width: `${maxThumbPosition - minThumbPosition}px`,
                      backgroundColor: primaryBlue,
                    }}
                  ></div>
                </div>
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
              <div className="text-center mt-3" style={{ color: mutedGray, fontSize: '1em' }}>
                <small>
                  Selected Range: ${formData.minInvestment.toLocaleString()} to ${formData.maxInvestment.toLocaleString()}
                </small>
              </div>
            </div>
            <h3 className="text-center mb-4 mt-4 fs-5">How many years of experience do you have as an investor?</h3>
            <div className="mb-3">
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
            <h3 className="text-center mb-4 mt-4 fs-5">Add your social networking accounts</h3>
            {formData.socialAccounts.map((account, index) => (
              <div key={index} className="mb-3 position-relative w-100">
                <input
                  type="text"
                  value={account}
                  onChange={(e) => handleSocialAccountChange(index, e.target.value)}
                  className="form-control form-control-lg w-100"
                  placeholder="Social media link or username"
                  style={{ paddingRight: '30px' }}
                />
                {formData.socialAccounts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSocialAccount(index)}
                    title="Remove account"
                    className="position-absolute top-50 end-0 translate-middle-y close-btn"
                    style={{ border: 'none', background: 'none', marginRight: 10 }}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={handleAddSocialAccount}
              className="btn btn-lg w-50 mb-5 d-block mx-auto prefrencesAddAccount"
              style={{ backgroundColor: primaryBlue, borderColor: primaryBlue, color: white, fontSize: '1.1em' }}
            >
              <PlusCircle size={20} className="me-2" />
              Add Account
            </button>
            <div className="row mt-5">
              <div className="col-md-6 mb-3">
                <label htmlFor="country" className="form-label" style={{ fontSize: '1.05em' }}>Country</label>
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
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label" style={{ fontSize: '1.05em' }}>City / Town</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter city or town"
                  style={{ fontSize: '1.1em' }}
                />
              </div>
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
            <h3 className="text-center mb-4 mt-4 fs-5">Click on the 3 industries you're most interested in.</h3>
            <div className="row row-cols-2 row-cols-md-4 g-3 mb-4">
              {industryOptions.map(industry => {
                const isSelected = formData.industries.includes(industry);
                return (
                  <div key={industry} className="col">
                    <button
                      onClick={() => handleIndustrySelect(industry)}
                      className={`btn w-100 text-start position-relative py-2`}
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
                      <span className="d-inline-block text-truncate" style={{ maxWidth: '85%' }}>
                        {industry}
                      </span>
                      <div className="position-absolute end-0 top-50 translate-middle-y me-2">
                        {isSelected ? (
                          <CheckCircle2 size={30} style={{ color: white, backgroundColor: primaryBlue, borderRadius: '20px' }} />
                        ) : (
                          <Circle size={30} color={mutedGray} />
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-3" style={{ color: mutedGray, fontSize: '1em' }}>
              {formData.industries.length} of 3 industries selected.
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light px-3 px-sm-4 px-md-5" style={{ height: '96vh' }}>
      <div className="card shadow-sm w-100" style={{ maxWidth: '80%' }}>
        <div className="card-body p-4">
          {loading && <div className="text-center mb-3">Saving preferences...</div>}
          {error && <div className="text-center text-danger mb-3">{error}</div>}
          {renderStepContent()}
          <div className="d-flex justify-content-between mt-4">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 1 || loading}
              className={`btn ${currentStep === 1 || loading ? 'btn-outline-secondary disabled' : 'btn-outline-primary'}`}
              style={{
                borderColor: currentStep === 1 || loading ? undefined : primaryBlue,
                color: currentStep === 1 || loading ? undefined : primaryBlue,
                backgroundColor: currentStep === 1 || loading ? undefined : white
              }}
            >
              Back
            </button>
            <button
              onClick={handleNextStep}
              disabled={loading}
              className="btn btn-primary"
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