import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  formData: {
    investorType: '',
    minInvestment: 0,
    maxInvestment: 1000000,
    yearsOfExperience: 'N/A',
    socialAccounts: [''],
    country: '',
    city: '',
    industries: []
  },
  loading: false,
  error: null
};

const investorPreferencesSlice = createSlice({
  name: 'investorPreferences',
  initialState,
  reducers: {
    setStep(state, action) {
      state.currentStep = action.payload;
    },
    updateFormData(state, action) {
      state.formData = {
        ...state.formData,
        ...action.payload
      };
    },
    setSocialAccounts(state, action) {
      state.formData.socialAccounts = action.payload;
    },
    toggleIndustry(state, action) {
      const industry = action.payload;
      const currentIndustries = state.formData.industries;
      if (currentIndustries.includes(industry)) {
        state.formData.industries = currentIndustries.filter(item => item !== industry);
      } else {
        state.formData.industries = [...currentIndustries, industry];
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetForm(state) {
      state.currentStep = initialState.currentStep;
      state.formData = initialState.formData;
      state.loading = false;
      state.error = null;
    }
  }
});

export const {
  setStep,
  updateFormData,
  setSocialAccounts,
  toggleIndustry,
  setLoading,
  setError,
  resetForm
} = investorPreferencesSlice.actions;

export default investorPreferencesSlice.reducer;