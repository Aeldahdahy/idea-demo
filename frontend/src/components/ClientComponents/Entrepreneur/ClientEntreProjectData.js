import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
import { initFlowbite } from "flowbite";
import "react-country-state-city/dist/react-country-state-city.css";
import { useFunctions } from '../../../useFunctions';
import ProjectGeneralInfo from "./project/ProjectGeneralInfo";
import ProjectDescription from "./project/ProjectDescription";
import ProjectsDocuments from "./project/ProjectsDocuments";
import ProjectTeam from "./project/ProjectTeam";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// --- Styled Components ---
const WizardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 98vw;
  background: #fff;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
`;

const LeftPanel = styled.div`
  flex: 0 0 420px;
  background: 
    linear-gradient(120deg, #3b5cb8cc 0%, #3b5cb8cc 100%),
    url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80') center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepperWrapper = styled.div`
  width: 100%;
  margin-left: 60px;
  margin-top: 0;
`;

const StepperList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StepperItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 48px;
  position: relative;
`;

const StepCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "#fff" : "#eaf0fb")};
  border: 3px solid ${({ active }) => (active ? "#2563eb" : "#eaf0fb")};
  color: ${({ active }) => (active ? "#2563eb" : "#b6c6e3")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.3rem;
  margin-right: 18px;
  z-index: 2;
  transition: border 0.2s, color 0.2s;
`;

const StepTitle = styled.span`
  color: ${({ active }) => (active ? "#fff" : "#eaf0fb")};
  font-size: 1.15rem;
  font-weight: ${({ active }) => (active ? 700 : 500)};
  letter-spacing: 0.01em;
`;

const StepLine = styled.div`
  position: absolute;
  left: 21px;
  top: 44px;
  width: 3px;
  height: 48px;
  background: #eaf0fb;
  z-index: 1;
`;

const RightPanel = styled.div`
  flex: 1 1 0;
  background: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  padding: 48px 0;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 900px;
  background: #fff;
  border-radius: 0;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 36px;
  color: #1a2233;
  letter-spacing: -1px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 1.08rem;
  font-weight: 600;
  margin-bottom: 7px;
  color: #1a2233;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  margin-top: 32px;
`;

const Button = styled.button`
  padding: 13px 38px;
  border: none;
  border-radius: 9px;
  font-size: 1.13rem;
  font-weight: 700;
  background: ${({ primary }) => (primary ? "#2563eb" : "#e0e0e0")};
  color: ${({ primary }) => (primary ? "#fff" : "#333")};
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: ${({ primary }) => (primary ? "0 2px 8px #2563eb22" : "none")};
  &:hover {
    background: ${({ primary }) => (primary ? "#1746a2" : "#bdbdbd")};
  }
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 110px;
  padding: 16px 18px;
  border: 1.5px solid #e3e8f0;
  border-radius: 9px;
  background: #fff;
  font-size: 1.08rem;
  margin-bottom: 32px;
  outline: none;
  color: #222;
  resize: vertical;
  &::placeholder {
    color: #b6c6e3;
    opacity: 1;
    font-weight: 400;
  }
`;

// --- Stepper Data ---
const steps = [
  "General Information",
  "Business Description",
  "Project Documents",
  "Team Description"
];

// --- Main Component ---
function ClientEntreProjectData() {
  const location = useLocation();
  const project = location.state?.project || null;
  const isEditMode = !!project;

  const { initProject, updateProjectSection, updateProject, API_BASE_URL } = useFunctions();
  const [projectId, setProjectId] = useState(project?._id || null); // ✅ safe now
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    projectName: "",
    website: "",
    minInvestment: "",
    maxInvestment: "",
    industry: "",
    project_location: "",
    city: "",
    state: "",
    zip: "",
    stage: "",
    dealType: [],
    networth: "",
    marketDescription: "",
    businessHighlights: "",
    financialStatus: "",
    businessObjectives: ""
  });

  const [files, setFiles] = useState({
    businessPlan: null,
    financialDocs: null,
    executiveSummary: null,
    additionalDocs: null,
    projectImages: [],
    projectLogo: null 
  });

  const [teamOverview, setTeamOverview] = useState("");
  const [teamMembers, setTeamMembers] = useState([
    {
      avatar: null,
      avatarPreview: null,
      name: "",
      linkedin: "",
      position: "",
      bio: ""
    }
  ]);

  // Initialize form with project data in edit mode
  useEffect(() => {
    if (isEditMode && project) {
      setForm({
        projectName: project.project_name || "",
        website: project.website_link || "",
        minInvestment: project.min_investment?.toString() || "",
        maxInvestment: project.max_investment?.toString() || "",
        industry: project.project_industry || "",
        project_location: project.project_location || "",
        city: project.city || "",
        state: project.state || "",
        zip: project.postal_code || "",
        stage: project.project_stage || "",
        dealType: project.deal_type || [],
        networth: project.networth?.toString() || "",
        marketDescription: project.market_description || "",
        businessHighlights: project.bussiness_highlights || "",
        financialStatus: project.financial_status || "",
        businessObjectives: project.business_objectives || ""
      });

      setTeamOverview(project.team_overview || "");

      const teamMembersData = project.team_members || [];
      const members = teamMembersData.map(member => ({
        avatar: null,
        avatarPreview: member.member_image || null,
        name: member.member_name || "",
        linkedin: member.linkedin_account || "",
        position: member.member_position || "",
        bio: member.member_bio || ""
      }));

      setTeamMembers(members.length > 0 ? members : [{
        avatar: null,
        avatarPreview: null,
        name: "",
        linkedin: "",
        position: "",
        bio: ""
      }]);

      setFiles({
        businessPlan: project.business_plan ? { file: null, preview: project.business_plan } : null,
        financialDocs: project.financial_statement ? { file: null, preview: project.financial_statement } : null,
        executiveSummary: project.exective_sunnary ? { file: null, preview: project.exective_sunnary } : null,
        additionalDocs: project.additional_document ? { file: null, preview: project.additional_document } : null,
        projectLogo: project.project_logo ? { file: null, preview: project.project_logo } : null,
        projectImages: project.project_images?.map(url => ({ file: null, preview: url })) || []
      });
    }
  }, [isEditMode, project]);

  // Initialize Flowbite on step change
  useEffect(() => {
    initFlowbite();
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['minInvestment', 'maxInvestment', 'networth'].includes(name)) {
      const cleanedValue = value.replace(/[^0-9.]/g, '');
      setForm({ ...form, [name]: cleanedValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type.startsWith("image/")) {
      setFiles({
        ...files,
        [key]: {
          file,
          preview: URL.createObjectURL(file)
        }
      });
    } else {
      setFiles({
        ...files,
        [key]: {
          file,
          preview: null
        }
      });
    }
  };

  const handleRemoveFile = (key) => {
    setFiles({ ...files, [key]: null });
  };

  const handleImagesChange = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => ({
      ...prev,
      projectImages: [...prev.projectImages, ...newFiles]
    }));
  };

  const handleRemoveImage = (idx) => {
    setFiles(prev => ({
      ...prev,
      projectImages: prev.projectImages.filter((_, i) => i !== idx)
    }));
  };

  const handleTeamMemberChange = (idx, field, value) => {
    setTeamMembers(members =>
      members.map((m, i) =>
        i === idx ? { ...m, [field]: value } : m
      )
    );
  };

  const handleAvatarChange = (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setTeamMembers(members =>
      members.map((m, i) =>
        i === idx ? { ...m, avatar: file, avatarPreview: preview } : m
      )
    );
  };

  const addTeamMember = () => {
    setTeamMembers(members => [
      ...members,
      { avatar: null, avatarPreview: null, name: "", linkedin: "", position: "", bio: "" }
    ]);
  };

  const removeTeamMember = (idx) => {
    setTeamMembers(members => members.filter((_, i) => i !== idx));
  };

  // const handleSubmitProject = async () => {
  //   try {
  //     const requiredFields = [
  //       {  
  //         key: 'projectName',
  //         label: 'Project Name',
  //         backendKey: 'project_name',
  //         validate: val => val.length >= 3,
  //         error: 'Project Name must be at least 3 characters' 
  //       },
  //       { 
  //         key: 'industry',
  //         label: 'Project Industry',
  //         backendKey: 'project_industry',
  //         validate: val => val.length >= 3,
  //         error: 'Industry must be at least 3 characters' 
  //       },
  //       { 
  //         key: 'minInvestment',
  //         label: 'Minimum per Investment', 
  //         backendKey: 'min_investment', 
  //         validate: val => !isNaN(parseFloat(val.replace(/[^0-9.]/g, ''))), 
  //         error: 'Minimum per Investment must be a number' 
  //       },
  //       { 
  //         key: 'maxInvestment', 
  //         label: 'Target Investment', 
  //         backendKey: 'max_investment', 
  //         validate: val => !isNaN(parseFloat(val.replace(/[^0-9.]/g, ''))), 
  //         error: 'Target Investment must be a number' 
  //       },
  //       { 
  //         key: 'zip', 
  //         label: 'Postal Code', 
  //         backendKey: 'postal_code', 
  //         validate: val => /^[0-9]{5}$/.test(val), 
  //         error: 'Postal Code must be a 5-digit number' 
  //       },
  //       { 
  //         key: 'marketDescription', 
  //         label: 'Market Description', 
  //         backendKey: 'market_description', 
  //         validate: val => val.length >= 50, 
  //         error: 'Market Description must be at least 50 characters' 
  //       },
  //       { 
  //         key: 'businessObjectives', 
  //         label: 'Business Objectives', 
  //         backendKey: 'business_objectives', 
  //         validate: val => val.length >= 50, 
  //         error: 'Business Objectives must be at least 50 characters' 
  //       },
  //       { 
  //         key: 'stage', 
  //         label: 'Project Stage', 
  //         backendKey: 'project_stage', 
  //         validate: val => ['Seed', 'Series A', 'Series B', 'Growth'].includes(val), 
  //         error: 'Project Stage must be a valid stage (e.g., Seed, Series A)' 
  //       },
  //       { 
  //         key: 'networth', 
  //         label: 'Net Worth', 
  //         backendKey: 'networth', 
  //         validate: val => !isNaN(parseFloat(val.replace(/[^0-9.]/g, ''))), 
  //         error: 'Net Worth must be a number' 
  //       },
  //       { 
  //         key: 'project_location', 
  //         label: 'Project Location', 
  //         backendKey: 'project_location', 
  //         validate: val => val.length > 0, 
  //         error: 'Project Location is required' 
  //       },
  //       { 
  //         key: 'industry', 
  //         label: 'Industry', 
  //         backendKey: 'industry', 
  //         validate: val => val.length > 0, 
  //         error: 'Project Industry is required' 
  //       },
  //     ];

  //     const errors = requiredFields
  //       .map(field => {
  //         const value = form[field.key];
  //         if (!value || value.trim() === '') return `${field.label} is required`;
  //         if (field.validate && !field.validate(value)) return field.error;
  //         return null;
  //       })
  //       .filter(error => error);

  //     if (form.website && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(form.website)) {
  //       errors.push('Website must be a valid URL (e.g., https://example.com)');
  //     }

  //     const minInv = parseFloat(form.minInvestment.replace(/[^0-9.]/g, ''));
  //     const maxInv = parseFloat(form.maxInvestment.replace(/[^0-9.]/g, ''));
  //     if (!isNaN(minInv) && !isNaN(maxInv) && maxInv <= minInv) {
  //       errors.push('Target Investment must be greater than Minimum per Investment');
  //     }

  //     if (teamMembers.length === 0) {
  //       errors.push('At least one team member is required');
  //     } else {
  //       teamMembers.forEach((member, idx) => {
  //         if (!member.name) errors.push(`Team Member ${idx + 1}: Name is required`);
  //         if (!member.position) errors.push(`Team Member ${idx + 1}: Position is required`);
  //         if (!member.bio) errors.push(`Team Member ${idx + 1}: Bio is required`);
  //         if (!member.linkedin || !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(member.linkedin)) {
  //           errors.push(`Team Member ${idx + 1}: Valid LinkedIn URL is required`);
  //         }
  //         if (!member.avatar && !member.avatarPreview) errors.push(`Team Member ${idx + 1}: Avatar is required`);
  //       });
  //     }

  //     if (errors.length > 0) {
  //       alert(`Please fix the following errors:\n${errors.join('\n')}`);
  //       return;
  //     }

  //     const formData = new FormData();

  //     requiredFields.forEach(field => {
  //       const value = form[field.key];
  //       if (field.key === 'project_location' || field.key === 'industry') {
  //         formData.append(field.backendKey, value || '');
  //       } else if (['minInvestment', 'maxInvestment', 'networth'].includes(field.key)) {
  //         formData.append(field.backendKey, value.replace(/[^0-9.]/g, ''));
  //       } else {
  //         formData.append(field.backendKey, value);
  //       }
  //     });

  //     formData.append('deal_type', JSON.stringify(form.dealType));

  //     if (form.website) formData.append('website_link', form.website);
  //     if (form.city) formData.append('city', form.city);
  //     if (form.state) formData.append('state', form.state);
  //     if (form.financialStatus) formData.append('financial_status', form.financialStatus);
  //     if (form.businessHighlights) formData.append('bussiness_highlights', form.businessHighlights);
  //     if (teamOverview) formData.append('team_overview', teamOverview);

  //     if (files.businessPlan?.file) formData.append('business_plan', files.businessPlan.file);
  //     if (files.financialDocs?.file) formData.append('financial_statement', files.financialDocs.file);
  //     if (files.executiveSummary?.file) formData.append('exective_sunnary', files.executiveSummary.file);
  //     if (files.additionalDocs?.file) formData.append('additional_document', files.additionalDocs.file);
  //     if (files.projectLogo?.file) formData.append('project_logo', files.projectLogo.file);
  //     files.projectImages.forEach((img, idx) => {
  //       if (img.file) formData.append('project_images', img.file);
  //     });

  //     teamMembers.forEach((member, idx) => {
  //       formData.append(`member_name[${idx}]`, member.name);
  //       formData.append(`linkedin_account[${idx}]`, member.linkedin);
  //       formData.append(`member_position[${idx}]`, member.position);
  //       formData.append(`member_bio[${idx}]`, member.bio);
  //       if (member.avatar) formData.append(`member_image`, member.avatar);
  //     });

  //     // Log FormData entries for debugging
  //     const formDataEntries = [...formData.entries()];
  //     console.log('FormData entries:');
  //     formDataEntries.forEach(([key, value]) => {
  //       console.log(`${key}: ${value instanceof File ? value.name : value}`);
  //     });

  //     if (formDataEntries.length === 0) {
  //       alert('Form data is empty. Please fill out the required fields.');
  //       return;
  //     }

  //     if (isEditMode) {
  //       await updateProject(project._id, formData);
  //     } else {
  //       await createProject(formData);
  //     }
  //     setStep(step + 1);

  //   } catch (error) {
  //     console.error('Error submitting project:', error);
  //     const errorMessage = error.response?.status === 403
  //       ? 'You do not have permission to create a project. Please check your authentication or contact support.'
  //       : error.response?.data?.error || 'Failed to submit project. Please check the form and try again.';
  //     alert(`Submission failed:\n${errorMessage}`);
  //   }
  // };

  // Stepper rendering
  
const handleSubmitStep0 = async () => {
  // Validate form data
  const errors = [];
  if (!form.projectName?.trim() || form.projectName.length < 3) {
    errors.push('Project name is required and must be at least 3 characters');
  }
  if (!form.industry?.trim()) {
    errors.push('Project industry is required');
  }
  if (!form.minInvestment || form.minInvestment <= 0) {
    errors.push('Minimum investment must be greater than 0');
  }
  if (!form.maxInvestment || form.maxInvestment <= form.minInvestment) {
    errors.push('Maximum investment must be greater than minimum investment');
  }
  if (!form.networth || form.networth <= 0) {
    errors.push('Net worth must be greater than 0');
  }
  if (!form.dealType?.length) {
    errors.push('At least one deal type is required');
  }
  if (!form.project_location?.trim()) {
    errors.push('Project location is required');
  }
  if (!form.zip?.trim()) {
    errors.push('Postal code is required');
  }
  if (!form.stage?.trim()) {
    errors.push('Project stage is required');
  }

  if (errors.length > 0) {
    // toast.error(`Please fix the following errors:\n${errors.join('\n')}`);
    return;
  }

  const data = {
    project_name: form.projectName.trim(),
    project_industry: form.industry.trim(),
    min_investment: Number(form.minInvestment),
    max_investment: Number(form.maxInvestment),
    networth: Number(form.networth),
    deal_type: form.dealType,
    project_location: form.project_location.trim(),
    city: form.city?.trim() || '',
    state: form.state?.trim() || '',
    postal_code: form.zip.trim(),
    website_link: form.website?.trim() || '',
    project_stage: form.stage,
  };

  // Add user_id and user_name only for initProject
  if (!isEditMode) {
    const userData = localStorage.getItem('clientData');
    if (!userData) {
      // toast.error('User data not found. Please log in again.');
      return;
    }

    let user;
    try {
      user = JSON.parse(userData);
    } catch (err) {
      console.error('Error parsing clientData:', err);
      // toast.error('Invalid user data. Please log in again.');
      return;
    }

    if (!user._id || !user.fullName) {
      // toast.error('User ID or full name missing. Please log in again.');
      return;
    }

    data.user_id = user._id;
    data.user_name = user.fullName;
  }

  // Log data for debugging
  console.log('Sending data (Step 0):', JSON.stringify(data, null, 2));

  try {
    if (isEditMode) {
      await updateProject(project._id, data);
      setProjectId(project._id);
    } else {
      const res = await initProject(data);
      setProjectId(res._id);
    }
    // toast.success('General information submitted successfully!');
    setStep(step + 1);
  } catch (err) {
    console.error('Step 0 error:', err);
    console.log('Full error response:', JSON.stringify(err.response?.data, null, 2));
    const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
    console.error(errorMessage);
    // toast.error(errorMessage);
  }
};

const handleSubmitStep1 = async () => {
  if (!projectId) {
    console.error('Project ID is missing in Step 1');
    // return toast.error('Project ID missing. Please restart the pitch process.');
  }

  // Validate form data
  const errors = [];
  if (form.marketDescription && form.marketDescription.trim().length < 50) {
    errors.push('Market description must be at least 50 characters if provided');
  }
  if (form.businessObjectives && form.businessObjectives.trim().length < 50) {
    errors.push('Business objectives must be at least 50 characters if provided');
  }

  if (errors.length > 0) {
    // toast.error(`Please fix the following errors:\n${errors.join('\n')}`);
    return;
  }

  const stepData = {
    market_description: form.marketDescription?.trim() || '',
    business_objectives: form.businessObjectives?.trim() || '',
    financial_status: form.financialStatus?.trim() || '',
    bussiness_highlights: form.businessHighlights?.trim() || '',
  };

  // Log data for debugging
  console.log('Sending data (Step 1):', JSON.stringify(stepData, null, 2));

  try {
    if (isEditMode) {
      // Include required Step 0 fields for updateProject (excluding user_id, user_name)
      const data = {
        project_name: form.projectName?.trim() || project.project_name,
        project_industry: form.industry?.trim() || project.project_industry,
        min_investment: Number(form.minInvestment) || project.min_investment,
        max_investment: Number(form.maxInvestment) || project.max_investment,
        networth: Number(form.networth) || project.networth,
        deal_type: form.dealType?.length ? form.dealType : project.deal_type,
        project_location: form.project_location?.trim() || project.project_location,
        postal_code: form.zip?.trim() || project.postal_code,
        project_stage: form.stage || project.project_stage,
        city: form.city?.trim() || project.city,
        state: form.state?.trim() || project.state,
        website_link: form.website?.trim() || project.website_link,
        ...stepData,
      };

      // Validate required fields
      const requiredErrors = [];
      if (!data.project_name) requiredErrors.push('Project name is required');
      if (!data.project_industry) requiredErrors.push('Project industry is required');
      if (data.min_investment <= 0) requiredErrors.push('Minimum investment must be greater than 0');
      if (data.max_investment <= data.min_investment) requiredErrors.push('Maximum investment must be greater than minimum investment');
      if (data.networth <= 0) requiredErrors.push('Net worth must be greater than 0');
      if (!data.deal_type?.length) requiredErrors.push('At least one deal type is required');
      if (!data.project_location) requiredErrors.push('Project location is required');
      if (!data.postal_code) requiredErrors.push('Postal code is required');
      if (!data.project_stage) requiredErrors.push('Project stage is required');

      if (requiredErrors.length) {
        // toast.error(`Please provide required fields:\n${requiredErrors.join('\n')}`);
        return;
      }

      console.log('Sending updateProject data (Step 1):', JSON.stringify(data, null, 2));
      await updateProject(projectId, data);
    } else {
      await updateProjectSection(projectId, stepData, 'description');
    }
    // toast.success('Project description submitted successfully!');
    setStep(step + 1);
  } catch (err) {
    console.error('Step 1 error:', err);
    console.log('Full error response:', JSON.stringify(err.response?.data, null, 2));
    const errorMessage = err.response?.data?.message || 'Failed to update project description.';
    console.error(errorMessage);
    // toast.error(errorMessage);
  }
};

const handleSubmitStep2 = async () => {
  if (!projectId) {
    console.error('Project ID is missing in Step 2');
    // return toast.error('Project ID missing. Please restart the pitch process.');
  }

  // Validate files
  const errors = [];
  const fileFields = [
    { name: 'businessPlan', key: 'business_plan' },
    { name: 'financialDocs', key: 'financial_statement' },
    { name: 'executiveSummary', key: 'exective_sunnary' },
    { name: 'additionalDocs', key: 'additional_document' },
    { name: 'projectLogo', key: 'project_logo' },
  ];

  fileFields.forEach(field => {
    if (files[field.name]?.file && !(files[field.name].file instanceof File)) {
      errors.push(`${field.name} must be a valid file`);
    }
  });

  files.projectImages.forEach((img, index) => {
    if (img.file && !(img.file instanceof File)) {
      errors.push(`Project Image ${index + 1} must be a valid file`);
    }
  });

  if (errors.length > 0) {
    // toast.error(`Please fix the following errors:\n${errors.join('\n')}`);
    return;
  }

  const formData = new FormData();

  if (files.businessPlan?.file) formData.append('business_plan', files.businessPlan.file);
  if (files.financialDocs?.file) formData.append('financial_statement', files.financialDocs.file);
  if (files.executiveSummary?.file) formData.append('exective_sunnary', files.executiveSummary.file);
  if (files.additionalDocs?.file) formData.append('additional_document', files.additionalDocs.file);
  if (files.projectLogo?.file) formData.append('project_logo', files.projectLogo.file);

  files.projectImages.forEach(img => {
    if (img.file) formData.append('project_images', img.file);
  });

  // Log FormData for debugging
  console.log('FormData entries (Step 2):');
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value instanceof File ? value.name : value}`);
  }

  try {
    if (isEditMode) {
      // Include required Step 0 fields for updateProject (excluding user_id, user_name)
      const data = new FormData();
      data.append('project_name', form.projectName?.trim() || project.project_name);
      data.append('project_industry', form.industry?.trim() || project.project_industry);
      data.append('min_investment', Number(form.minInvestment) || project.min_investment);
      data.append('max_investment', Number(form.maxInvestment) || project.max_investment);
      data.append('networth', Number(form.networth) || project.networth);
      data.append('deal_type', JSON.stringify(form.dealType?.length ? form.dealType : project.deal_type));
      data.append('project_location', form.project_location?.trim() || project.project_location);
      data.append('postal_code', form.zip?.trim() || project.postal_code);
      data.append('project_stage', form.stage || project.project_stage);
      data.append('city', form.city?.trim() || project.city);
      data.append('state', form.state?.trim() || project.state);
      data.append('website_link', form.website?.trim() || project.website_link);

      // Append file fields
      for (let [key, value] of formData.entries()) {
        data.append(key, value);
      }

      // Validate required fields
      const requiredErrors = [];
      if (!data.get('project_name')) requiredErrors.push('Project name is required');
      if (!data.get('project_industry')) requiredErrors.push('Project industry is required');
      if (Number(data.get('min_investment')) <= 0) requiredErrors.push('Minimum investment must be greater than 0');
      if (Number(data.get('max_investment')) <= Number(data.get('min_investment'))) requiredErrors.push('Maximum investment must be greater than minimum investment');
      if (Number(data.get('networth')) <= 0) requiredErrors.push('Net worth must be greater than 0');
      if (!JSON.parse(data.get('deal_type') || '[]').length) requiredErrors.push('At least one deal type is required');
      if (!data.get('project_location')) requiredErrors.push('Project location is required');
      if (!data.get('postal_code')) requiredErrors.push('Postal code is required');
      if (!data.get('project_stage')) requiredErrors.push('Project stage is required');

      if (requiredErrors.length) {
        // toast.error(`Please provide required fields:\n${requiredErrors.join('\n')}`);
        return;
      }

      console.log('Sending updateProject FormData (Step 2):');
      for (let [key, value] of data.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      }
      await updateProject(projectId, data);
    } else {
      await updateProjectSection(projectId, formData, 'documents', true);
    }
    // toast.success('Documents submitted successfully!');
    setStep(step + 1);
  } catch (err) {
    console.error('Step 2 error:', err);
    console.log('Full error response:', JSON.stringify(err.response?.data, null, 2));
    const errorMessage = err.response?.data?.message || 'Failed to upload documents.';
    console.log(errorMessage)
    // toast.error(errorMessage);
  }
};

const handleSubmitStep3 = async () => {
  if (!projectId) {
    console.error('Project ID is missing in Step 3');
    // return toast.error('Project ID missing. Please restart the pitch process.');
  }

  // Validate team members
  const errors = [];
  if (teamMembers.length === 0) {
    errors.push('At least one team member is required');
  }
  teamMembers.forEach((member, index) => {
    if (!member.name?.trim()) {
      errors.push(`Team Member ${index + 1}: Name is required`);
    }
    if (!member.position?.trim()) {
      errors.push(`Team Member ${index + 1}: Position is required`);
    }
    if (!member.bio?.trim()) {
      errors.push(`Team Member ${index + 1}: Bio is required`);
    }
    if (!member.linkedin?.trim()) {
      errors.push(`Team Member ${index + 1}: LinkedIn URL is required`);
    } else if (!/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(member.linkedin)) {
      errors.push(`Team Member ${index + 1}: Valid LinkedIn URL is required`);
    }
    if (!member.avatar && !member.avatarPreview && !isEditMode) {
      errors.push(`Team Member ${index + 1}: Avatar is required for new projects`);
    }
  });

  if (errors.length > 0) {
    // toast.error(`Please fix the following errors:\n${errors.join('\n')}`);
    return;
  }

  const formData = new FormData();
  formData.append('team_overview', teamOverview?.trim() || '');

  teamMembers.forEach((member, index) => {
    formData.append('member_name[]', member.name?.trim() || '');
    formData.append('linkedin_account[]', member.linkedin?.trim() || '');
    formData.append('member_position[]', member.position?.trim() || '');
    formData.append('member_bio[]', member.bio?.trim() || '');
    if (member.avatar) {
      formData.append('member_image[]', member.avatar);
    } else if (member.avatarPreview && isEditMode) {
      formData.append('member_image_url[]', member.avatarPreview);
    }
  });

  // Log FormData for debugging
  console.log('FormData entries (Step 3):');
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value instanceof File ? value.name : value}`);
  }

  try {
    if (isEditMode) {
      // Include required Step 0 fields and team members for updateProject
      const data = new FormData();
      data.append('project_name', form.projectName?.trim() || project.project_name);
      data.append('project_industry', form.industry?.trim() || project.project_industry);
      data.append('min_investment', Number(form.minInvestment) || project.min_investment);
      data.append('max_investment', Number(form.maxInvestment) || project.max_investment);
      data.append('networth', Number(form.networth) || project.networth);
      data.append('deal_type', JSON.stringify(form.dealType?.length ? form.dealType : project.deal_type));
      data.append('project_location', form.project_location?.trim() || project.project_location);
      data.append('postal_code', form.zip?.trim() || project.postal_code);
      data.append('project_stage', form.stage || project.project_stage);
      data.append('city', form.city?.trim() || project.city);
      data.append('state', form.state?.trim() || project.state);
      data.append('website_link', form.website?.trim() || project.website_link);
      data.append('team_overview', teamOverview?.trim() || '');

      // Append team members as JSON, preserving existing images
      data.append('team_members', JSON.stringify(teamMembers.map((member, index) => ({
        member_name: member.name?.trim() || '',
        linkedin_account: member.linkedin?.trim() || '',
        member_position: member.position?.trim() || '',
        member_bio: member.bio?.trim() || '',
        member_image: member.avatar ? undefined : (member.avatarPreview || project.team_members?.[index]?.member_image || null),
      }))));

      // Append file fields
      teamMembers.forEach((member, index) => {
        if (member.avatar) {
          data.append('member_image[]', member.avatar);
        }
      });

      // Validate required fields
      const requiredErrors = [];
      if (!data.get('project_name')) requiredErrors.push('Project name is required');
      if (!data.get('project_industry')) requiredErrors.push('Project industry is required');
      if (Number(data.get('min_investment')) <= 0) requiredErrors.push('Minimum investment must be greater than 0');
      if (Number(data.get('max_investment')) <= Number(data.get('min_investment'))) requiredErrors.push('Maximum investment must be greater than minimum investment');
      if (Number(data.get('networth')) <= 0) requiredErrors.push('Net worth must be greater than 0');
      if (!JSON.parse(data.get('deal_type') || '[]').length) requiredErrors.push('At least one deal type is required');
      if (!data.get('project_location')) requiredErrors.push('Project location is required');
      if (!data.get('postal_code')) requiredErrors.push('Postal code is required');
      if (!data.get('project_stage')) requiredErrors.push('Project stage is required');
      if (!JSON.parse(data.get('team_members') || '[]').length) requiredErrors.push('At least one team member is required');

      if (requiredErrors.length) {
        // toast.error(`Please provide required fields:\n${requiredErrors.join('\n')}`);
        return;
      }

      console.log('Sending updateProject FormData (Step 3):');
      for (let [key, value] of data.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      }
      await updateProject(projectId, data);
    } else {
      await updateProjectSection(projectId, formData, 'team', true);
    }
    // toast.success('Pitch submitted successfully!');
    navigate('/client-portal/entrepreneur/myProjects');
  } catch (err) {
    // console.error('Step 3 error:', err);
    // console.log('Full error response:', JSON.stringify(err.response?.data, null, 2));
    const errorMessage = err.response?.data?.message || 'Failed to submit team.';
    console.log(errorMessage)
    // toast.error(errorMessage);
  }
};





  
  const renderStepper = () => (
    <StepperWrapper>
      <StepperList>
        {steps.map((label, idx) => (
          <StepperItem key={idx}>
            <StepCircle active={step === idx}>{idx + 1}</StepCircle>
            <StepTitle active={step === idx}>{label}</StepTitle>
            {idx < steps.length - 1 && <StepLine />}
          </StepperItem>
        ))}
      </StepperList>
    </StepperWrapper>
  );

  // Step rendering
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <ProjectGeneralInfo
            form={form}
            setForm={setForm}
            isEditMode={isEditMode}
            Title={Title}
            handleChange={handleChange}
            Label={Label}
            ButtonRow={ButtonRow}
            Button={Button}
            setStep={setStep}
            step={step}
            handleNextStep={handleSubmitStep0} // ✅ New prop
          />

        );
      case 1:
        return (
          <ProjectDescription
            form={form}
            setForm={setForm}
            isEditMode={isEditMode}
            Title={Title}
            handleChange={handleChange}
            Label={Label}
            StyledTextarea={StyledTextarea}
            ButtonRow={ButtonRow}
            Button={Button}
            setStep={setStep}
            step={step}
            handleNextStep={handleSubmitStep1} // ✅ New prop
          />

        );
      case 2:
        return (
          <ProjectsDocuments
            files={files}
            setFiles={setFiles}
            isEditMode={isEditMode}
            Title={Title}
            API_BASE_URL={API_BASE_URL}
            handleFileChange={handleFileChange}
            handleRemoveFile={handleRemoveFile}
            handleImagesChange={handleImagesChange}
            handleRemoveImage={handleRemoveImage}
            ButtonRow={ButtonRow}
            Button={Button}
            setStep={setStep}
            step={step}
            handleNextStep={handleSubmitStep2} // ✅ New prop
          />

        );
      case 3:
        return (
          <ProjectTeam
            teamOverview={teamOverview}
            setTeamOverview={setTeamOverview}
            teamMembers={teamMembers}
            isEditMode={isEditMode}
            Title={Title}
            API_BASE_URL={API_BASE_URL}
            handleAvatarChange={handleAvatarChange}
            handleTeamMemberChange={handleTeamMemberChange}
            addTeamMember={addTeamMember}
            removeTeamMember={removeTeamMember}
            // handleSubmitProject={handleSubmitProject}
            handleSubmitProject={handleSubmitStep3} // ✅ Renamed for clarity
            ButtonRow={ButtonRow}
            Button={Button}
            setStep={setStep}
            step={step}
          />
        );
      default:
        return (
          <ProjectGeneralInfo
            form={form}
            setForm={setForm}
            isEditMode={isEditMode}
            Title={Title}
            handleChange={handleChange}
            Label={Label}
            ButtonRow={ButtonRow}
            Button={Button}
            setStep={setStep}
            step={step}
            handleNextStep={handleSubmitStep0} // ✅ New prop
          />
        );
    }
  };

  return (
    <WizardContainer>
      <LeftPanel>
        {renderStepper()}
      </LeftPanel>
      <RightPanel>
        <FormContainer>
          {renderStep()}
        </FormContainer>
      </RightPanel>
    </WizardContainer>
  );
}

export default ClientEntreProjectData;