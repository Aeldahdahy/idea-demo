import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Info, PlusCircle, X, CheckCircle2, Circle } from 'lucide-react';
import { updateClientData } from '../../../redux/clientAuthSlice';
import { useFunctions } from '../../../useFunctions';
import {
  setStep,
  updateFormData,
  setSocialAccounts,
  toggleIndustry,
  setLoading,
  setError,
  resetForm
} from '../../../redux/clientInvestorPreferencesSlice';

function ClientInvestorPreferences() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateUsers } = useFunctions();
  const userId = useSelector((state) => state.clientAuth.clientData?._id);
  const clientData = useSelector((state) => state.clientAuth.clientData);
  const { currentStep, formData, loading, error } = useSelector((state) => state.clientInvestorPreferences);

  // Pre-populate formData
  useEffect(() => {
    if (clientData) {
      dispatch(updateFormData({
        investorType: clientData.investorPreference?.investorType || '',
        minInvestment: clientData.investorPreference?.minInvestment || 0,
        maxInvestment: clientData.investorPreference?.maxInvestment || 1000000,
        yearsOfExperience: clientData.yearsOfExperience || 'N/A',
        socialAccounts: clientData.socialAccounts?.length ? clientData.socialAccounts : [''],
        country: clientData.country || '',
        city: clientData.city || '',
        industries: clientData.investorPreference?.industries?.length ? clientData.investorPreference.industries : []
      }));
    }
  }, [dispatch, clientData]);

  // State for modals
  const [modalOpen, setModalOpen] = useState({ individual: false, company: false });

  // Slider refs and config
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

  // Auth check
  useEffect(() => {
    if (!userId) {
      toast.error("Please log in to continue.", { position: 'top-right', autoClose: 5000 });
      navigate('/login', { replace: true });
    }
  }, [userId, navigate]);

  const handleNextStep = async () => {
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      toast.error("User ID is missing or invalid. Please log in again.", { position: 'top-right', autoClose: 5000 });
      navigate('/login', { replace: true });
      return;
    }

    console.log('Next Step - Current Step:', currentStep, 'formData:', formData);

    if (currentStep === 1) {
      if (!['individual', 'company'].includes(formData.investorType)) {
        toast.error("Please select a valid investor type.");
        return;
      }
    } else if (currentStep === 2) {
      if (!['0-1', '1-3', '3-5', '5+', 'N/A'].includes(formData.yearsOfExperience)) {
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
        toast.error("Invalid investor type.");
        return;
      }
      if (formData.industries.length < 3) {
        toast.error("Please select at least 3 industries.");
        return;
      }
    }

    if (currentStep === 4) {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const updatedData = {
          role: 'investor',
          country: formData.country,
          city: formData.city,
          socialAccounts: formData.socialAccounts.filter(acc => acc.trim() !== ''),
          yearsOfExperience: formData.yearsOfExperience,
          investorPreference: {
            investorType: formData.investorType,
            minInvestment: formData.minInvestment,
            maxInvestment: formData.maxInvestment,
            industries: formData.industries
          }
        };
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:7030';
        const response = await updateUsers(userId, updatedData, null, {
          dispatch,
          setLoading: (value) => dispatch(setLoading(value)),
          setError: (value) => dispatch(setError(value)),
          users: [],
          setUsers: () => {},
          API_BASE_URL: apiBaseUrl
        });
        dispatch(updateClientData(response.data.data));
        dispatch(resetForm());
        toast.success("Profile completed successfully!", { position: 'top-right', autoClose: 3000 });
        navigate('/client-portal/investor', { replace: true });
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to save preferences.';
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
    console.log('Previous Step - Current Step:', currentStep);
    dispatch(setStep(currentStep - 1));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSocialAccountChange = (index, value) => {
    const newSocialAccounts = [...formData.socialAccounts];
    newSocialAccounts[index] = value.trim();
    dispatch(setSocialAccounts(newSocialAccounts.filter(acc => acc !== '')));
  };

  const handleAddSocialAccount = () => {
    dispatch(setSocialAccounts([...formData.socialAccounts, '']));
  };

  const handleRemoveSocialAccount = (index) => {
    const newSocialAccounts = formData.socialAccounts.filter((_, i) => i !== index);
    dispatch(setSocialAccounts(newSocialAccounts));
  };

  const handleIndustrySelect = (industry) => {
    console.log('Selecting industry:', industry, 'Current industries:', formData.industries);
    dispatch(toggleIndustry(industry));
  };

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
  }, [draggingThumb, getValueFromPosition, dispatch, formData]);

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
  }, [draggingThumb, getValueFromPosition, dispatch, formData]);

  const handleTouchEnd = () => {
    setDraggingThumb(null);
  };

  useEffect(() => {
    if (draggingThumb) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
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

    console.log('Rendering Step:', currentStep, 'Industries:', formData.industries, 'Industry Options:', industryOptions);

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Complete Your Investor Profile</h2>
        <div className="mb-6">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${(currentStep / 4) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-300"
              ></div>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-center mb-6 text-gray-700">Investor Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['individual', 'company'].map(type => (
                <div key={type} className="relative">
                  <div
                    className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-lg ${
                      formData.investorType === type ? 'border-blue-500 shadow-lg bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => dispatch(updateFormData({ investorType: type }))}
                  >
                    <div className="flex justify-between items-center">
                      <h5 className="text-lg font-medium capitalize">{type}</h5>
                      <button
                        type="button"
                        onClick={() => setModalOpen({ ...modalOpen, [type]: true })}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Info size={20} />
                      </button>
                    </div>
                    <input
                      type="radio"
                      name="investorType"
                      value={type}
                      checked={formData.investorType === type}
                      onChange={() => dispatch(updateFormData({ investorType: type }))}
                      className="hidden"
                    />
                  </div>
                  {modalOpen[type] && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold mb-4 capitalize">{type} Investor</h3>
                        <p className="text-gray-600 mb-6">
                          {type === 'individual'
                            ? 'For individuals investing based on personal net worth.'
                            : 'For companies or entities investing significant capital through structured teams.'}
                        </p>
                        <button
                          onClick={() => setModalOpen({ ...modalOpen, [type]: false })}
                          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-semibold text-center mb-6 text-gray-700">Investment Range</h3>
            <div className="px-4 mb-8">
              <div className="flex justify-between mb-3 text-sm text-gray-600">
                <span>{sliderMin.toLocaleString()} EGP</span>
                <span>{sliderMax.toLocaleString()} EGP +</span>
              </div>
              <div className="relative h-8">
                <div
                  ref={sliderTrackRef}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-gray-200 rounded-full"
                >
                  <div
                    className="absolute top-0 bottom-0 bg-blue-600 rounded-full"
                    style={{
                      left: `${minThumbPosition}px`,
                      width: `${maxThumbPosition - minThumbPosition}px`,
                    }}
                  ></div>
                </div>
                <div
                  ref={minThumbRef}
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow cursor-pointer hover:scale-110 transition-transform"
                  style={{ left: `${minThumbPosition}px` }}
                  onMouseDown={handleMouseDown('min')}
                  onTouchStart={handleTouchStart('min')}
                ></div>
                <div
                  ref={maxThumbRef}
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow cursor-pointer hover:scale-110 transition-transform"
                  style={{ left: `${maxThumbPosition}px` }}
                  onMouseDown={handleMouseDown('max')}
                  onTouchStart={handleTouchStart('max')}
                ></div>
              </div>
              <div className="text-center mt-4 text-gray-600">
                Range: {formData.minInvestment.toLocaleString()} EGP - {formData.maxInvestment.toLocaleString()} EGP
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-6 text-gray-700">Years of Experience</h3>
            <select
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="N/A">N/A</option>
              <option value="0-1">0-1 Years</option>
              <option value="1-3">1-3 Years</option>
              <option value="3-5">3-5 Years</option>
              <option value="5+">5+ Years</option>
            </select>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-semibold text-center mb-6 text-gray-700">Social Accounts</h3>
            {formData.socialAccounts.map((account, index) => (
              <div key={index} className="relative mb-4">
                <input
                  type="text"
                  value={account}
                  onChange={(e) => handleSocialAccountChange(index, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Social media link or username"
                />
                {formData.socialAccounts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSocialAccount(index)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={handleAddSocialAccount}
              className="flex items-center justify-center w-full md:w-1/2 mx-auto bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mb-8"
            >
              <PlusCircle size={20} className="mr-2" />
              Add Account
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Country</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Libya">Libya</option>
                  <option value="UAE">UAE</option>
                </select>
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City / Town</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter city or town"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3 className="text-xl font-semibold text-center mb-6 text-gray-700">Select Your Preferred Industries (Minimum 3)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {industryOptions.map(industry => {
                const isSelected = formData.industries.includes(industry);
                return (
                  <button
                    key={industry}
                    onClick={() => handleIndustrySelect(industry)}
                    className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-300 ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm truncate">{industry}</span>
                    {isSelected ? (
                      <CheckCircle2 size={24} className="text-blue-500" />
                    ) : (
                      <Circle size={24} className="text-gray-400" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="text-center text-gray-600 mt-4">
              {formData.industries.length} industries selected (minimum 3)
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center mb-4">
            <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4a8 8 0 00-8 8z"></path>
            </svg>
            <span className="text-gray-600">Saving preferences...</span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
            {error}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-4xl">
        {renderStepContent()}
        <div className="flex justify-between p-6">
          <button
            onClick={handlePreviousStep}
            disabled={currentStep === 1 || loading}
            className={`px-6 py-3 rounded-lg transition-colors ${
              currentStep === 1 || loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'
            }`}
          >
            Back
          </button>
          <button
            onClick={handleNextStep}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentStep === 4 ? 'Save' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientInvestorPreferences;