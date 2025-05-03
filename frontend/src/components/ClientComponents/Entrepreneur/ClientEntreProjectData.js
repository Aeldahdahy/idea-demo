import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
import { initFlowbite } from "flowbite";
import "react-country-state-city/dist/react-country-state-city.css";
import { useFunctions } from '../../../useFunctions';

// --- Styled Components ---
const TeamSection = styled.div`
  margin-bottom: 32px;
`;

const TeamCard = styled.div`
  background: #f1f6fe;
  border-radius: 14px;
  padding: 32px 32px 24px 32px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: relative;
`;

const TeamRow = styled.div`
  display: flex;
  gap: 18px;
  margin-bottom: 0;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 32px;
`;

const Avatar = styled.label`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #c7e0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.6rem;
  color: #2563eb;
  cursor: pointer;
  overflow: hidden;
  border: 2px solid #e3e8f0;
  margin-bottom: 8px;
  position: relative;
  transition: border 0.2s;
  &:hover {
    border: 2px solid #2563eb;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const TeamLabel = styled.label`
  font-size: 1.08rem;
  font-weight: 600;
  color: #1a2233;
  margin-bottom: 6px;
  display: block;
`;

const TeamInput = styled.input`
  width: 100%;
  padding: 13px 16px;
  border: 1.5px solid #e3e8f0;
  border-radius: 8px;
  background: #fff;
  font-size: 1.05rem;
  margin-bottom: 12px;
  outline: none;
  color: #222;
  &::placeholder {
    color: #b6c6e3;
    opacity: 1;
    font-weight: 400;
  }
`;

const TeamTextarea = styled.textarea`
  width: 100%;
  min-height: 70px;
  padding: 13px 16px;
  border: 1.5px solid #e3e8f0;
  border-radius: 8px;
  background: #fff;
  font-size: 1.05rem;
  margin-bottom: 12px;
  outline: none;
  color: #222;
  resize: vertical;
  &::placeholder {
    color: #b6c6e3;
    opacity: 1;
    font-weight: 400;
  }
`;

const TeamActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  gap: 18px;
`;

const PreviewBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const FileIcon = styled.span`
  font-size: 1.5rem;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 8px;
`;

const ImageThumb = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e3e8f0;
  margin-right: 8px;
`;

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

const Input = styled.input`
  width: 100%;
  padding: 15px 18px;
  border: 1.5px solid #e3e8f0;
  border-radius: 9px;
  background: #fff;
  font-size: 1.08rem;
  margin-bottom: 24px;
  outline: none;
  color: #222;
  &::placeholder {
    color: #b6c6e3;
    opacity: 1;
    font-weight: 400;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 18px;
  margin-bottom: 0;
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

const DocSection = styled.div`
  margin-bottom: 32px;
`;

const DocLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.13rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 8px;
  gap: 7px;
`;

const DocIcon = styled.span`
  font-size: 1.3rem;
  display: flex;
  align-items: center;
`;

const DocBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f8ff;
  border: 1.5px dashed #e3e8f0;
  border-radius: 12px;
  padding: 18px 24px;
  margin-bottom: 0;
`;

const DocInfo = styled.span`
  color: #8ca2c0;
  font-size: 1.01rem;
`;

const UploadBtn = styled.label`
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  font-size: 1.05rem;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #1746a2;
  }
`;

const AddMemberBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: #2563eb;
  border: 2px solid #2563eb;
  border-radius: 8px;
  padding: 10px 22px;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 18px;
  margin-top: 8px;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #2563eb;
    color: #fff;
  }
`;

const CreateBtn = styled(Button)`
  background: #2563eb;
  color: #fff;
  border: none;
  &:hover {
    background: #1746a2;
  }
  margin-left: auto;
`;

const RemoveMemberBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  color: #e53e3e;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;
  &:hover {
    color: #b91c1c;
  }
`;

// --- Stepper Data ---
const steps = [
  "General Information",
  "Business Description",
  "Project Documents",
  "Team Description"
];

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Egypt",
  "India",
  "Australia",
  "Brazil",
  "China",
  "Japan"
];

const industryOptions = [
  'Agriculture', 'Entertainment & Leisure', 'Food & Beverage', 'Media',
  'Products & Inventions', 'Sales & Marketing', 'Transportation', 'Software',
  'Education & Training', 'Fashion & Beauty', 'Hospitality, Restaurants & Bars', 'Energy & Natural Resources',
  'Medical & Sciences', 'Finance', 'Manufacturing & Engineering', 'Personal Services',
  'Property', 'Retail', 'Technology', 'Business Services'
];

// --- Main Component ---
function ClientEntreProjectData() {
  const { createProject, updateProject, API_BASE_URL } = useFunctions();
  const location = useLocation();
  const project = location.state?.project || null;
  const isEditMode = !!project;

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

      // Initialize team members from team_members array
      const teamMembersData = project.team_members || [];
      const members = teamMembersData.map(member => ({
        avatar: null, // File object not available, only URL
        avatarPreview: member.member_image || null, // URL for preview
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

      // Initialize files with URLs for previews
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

 
  useEffect(() => {
    initFlowbite();
  }, []);

  const dealTypeOptions = [
    { id: "deal-type-equity", value: "equity", label: "Equity" },
    { id: "deal-type-debt", value: "debt", label: "Debt" },
    { id: "deal-type-grant", value: "grant", label: "Grant" }
  ];

  const handleCheckboxChange = (value) => {
    setForm((prevForm) => {
      const currentDealTypes = prevForm.dealType;
      const updatedDealTypes = currentDealTypes.includes(value)
        ? currentDealTypes.filter((type) => type !== value)
        : [...currentDealTypes, value];
      return { ...prevForm, dealType: updatedDealTypes };
    });
  };

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

  const handleSubmitProject = async () => {
    try {
      const requiredFields = [
        {  
          key: 'projectName',
          label: 'Project Name',
          backendKey: 'project_name',
          validate: val => val.length >= 3,
          error: 'Project Name must be at least 3 characters' 
        },
        { 
          key: 'industry',
          label: 'Project Industry',
          backendKey: 'project_industry',
          validate: val => val.length >= 3,
          error: 'Industry must be at least 3 characters' 
        },
        { 
          key: 'minInvestment',
          label: 'Minimum per Investment', 
          backendKey: 'min_investment', 
          validate: val => !isNaN(parseFloat(val.replace(/[^0-9.]/g, ''))), 
          error: 'Minimum per Investment must be a number' 
        },
        { 
          key: 'maxInvestment', 
          label: 'Target Investment', 
          backendKey: 'max_investment', 
          validate: val => !isNaN(parseFloat(val.replace(/[^0-9.]/g, ''))), 
          error: 'Target Investment must be a number' 
        },
        { 
          key: 'zip', 
          label: 'Postal Code', 
          backendKey: 'postal_code', 
          validate: val => /^[0-9]{5}$/.test(val), 
          error: 'Postal Code must be a 5-digit number' 
        },
        { 
          key: 'marketDescription', 
          label: 'Market Description', 
          backendKey: 'market_description', 
          validate: val => val.length >= 50, 
          error: 'Market Description must be at least 50 characters' 
        },
        { 
          key: 'businessObjectives', 
          label: 'Business Objectives', 
          backendKey: 'business_objectives', 
          validate: val => val.length >= 50, 
          error: 'Business Objectives must be at least 50 characters' 
        },
        { 
          key: 'stage', 
          label: 'Project Stage', 
          backendKey: 'project_stage', 
          validate: val => ['Seed', 'Series A', 'Series B', 'Growth'].includes(val), 
          error: 'Project Stage must be a valid stage (e.g., Seed, Series A)' 
        },
        { 
          key: 'networth', 
          label: 'Net Worth', 
          backendKey: 'networth', 
          validate: val => !isNaN(parseFloat(val.replace(/[^0-9.]/g, ''))), 
          error: 'Net Worth must be a number' 
        },
        { 
          key: 'project_location', 
          label: 'Project Location', 
          backendKey: 'project_location', 
          validate: val => val.length > 0, 
          error: 'Project Location is required' 
        },
        { 
          key: 'industry', 
          label: 'Industry', 
          backendKey: 'industry', 
          validate: val => val.length > 0, 
          error: 'Project Industry is required' 
        },
      ];

      const errors = requiredFields
        .map(field => {
          const value = form[field.key];
          if (!value || value.trim() === '') return `${field.label} is required`;
          if (field.validate && !field.validate(value)) return field.error;
          return null;
        })
        .filter(error => error);

      if (form.website && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(form.website)) {
        errors.push('Website must be a valid URL (e.g., https://example.com)');
      }

      const minInv = parseFloat(form.minInvestment.replace(/[^0-9.]/g, ''));
      const maxInv = parseFloat(form.maxInvestment.replace(/[^0-9.]/g, ''));
      if (!isNaN(minInv) && !isNaN(maxInv) && maxInv <= minInv) {
        errors.push('Target Investment must be greater than Minimum per Investment');
      }

      if (teamMembers.length === 0) {
        errors.push('At least one team member is required');
      } else {
        teamMembers.forEach((member, idx) => {
          if (!member.name) errors.push(`Team Member ${idx + 1}: Name is required`);
          if (!member.position) errors.push(`Team Member ${idx + 1}: Position is required`);
          if (!member.bio) errors.push(`Team Member ${idx + 1}: Bio is required`);
          if (!member.linkedin || !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(member.linkedin)) {
            errors.push(`Team Member ${idx + 1}: Valid LinkedIn URL is required`);
          }
          if (!member.avatar && !member.avatarPreview) errors.push(`Team Member ${idx + 1}: Avatar is required`);
        });
      }

      if (errors.length > 0) {
        alert(`Please fix the following errors:\n${errors.join('\n')}`);
        return;
      }

      const formData = new FormData();

      requiredFields.forEach(field => {
        const value = form[field.key];
        if (field.key === 'project_location' || field.key === 'industry') {
          formData.append(field.backendKey, value || '');
        } else if (['minInvestment', 'maxInvestment', 'networth'].includes(field.key)) {
          formData.append(field.backendKey, value.replace(/[^0-9.]/g, ''));
        } else {
          formData.append(field.backendKey, value);
        }
      });

      formData.append('deal_type', JSON.stringify(form.dealType));

      if (form.website) formData.append('website_link', form.website);
      if (form.city) formData.append('city', form.city);
      if (form.state) formData.append('state', form.state);
      if (form.financialStatus) formData.append('financial_status', form.financialStatus);
      if (form.businessHighlights) formData.append('bussiness_highlights', form.businessHighlights);
      if (teamOverview) formData.append('team_overview', teamOverview);

      if (files.businessPlan?.file) formData.append('business_plan', files.businessPlan.file);
      if (files.financialDocs?.file) formData.append('financial_statement', files.financialDocs.file);
      if (files.executiveSummary?.file) formData.append('exective_sunnary', files.executiveSummary.file);
      if (files.additionalDocs?.file) formData.append('additional_document', files.additionalDocs.file);
      if (files.projectLogo?.file) formData.append('project_logo', files.projectLogo.file);
      files.projectImages.forEach((img, idx) => {
        if (img.file) formData.append('project_images', img.file);
      });

      teamMembers.forEach((member, idx) => {
        formData.append(`member_name[${idx}]`, member.name);
        formData.append(`linkedin_account[${idx}]`, member.linkedin);
        formData.append(`member_position[${idx}]`, member.position);
        formData.append(`member_bio[${idx}]`, member.bio);
        if (member.avatar) formData.append(`member_image`, member.avatar);
      });

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      if (isEditMode) {
        await updateProject(project._id, formData);
      } else {
        await createProject(formData);
      }
      setStep(step + 1);

    } catch (error) {
      console.error('Error submitting project:', error);
      const errorMessage = error.response?.data?.error || 'Failed to submit project. Please check the form and try again.';
      alert(`Submission failed:\n${errorMessage}`);
    }
  };

  // Step 1: General Information
  const Step1 = (
    <>
      <Title>{isEditMode ? "Edit General Information" : "General Information"}</Title>
      {form.projectName && form.projectName.length < 3 && (
        <span style={{ color: '#e53e3e', fontSize: '0.9rem' }}>
          Project Name must be at least 3 characters
        </span>
      )}
      <Label>Project Name <span style={{ color: 'red' }}>*</span></Label>
      <Input
        name="projectName"
        value={form.projectName}
        onChange={handleChange}
        placeholder="Enter your project name"
        required
      />
      {form.website && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(form.website) && (
        <span style={{ color: '#e53e3e', fontSize: '0.9rem' }}>
          Website must be a valid URL (e.g., https://example.com)
        </span>
      )}
      <Label>Website Link</Label>
      <Input
        name="website"
        value={form.website}
        onChange={handleChange}
        placeholder="https://example.com"
      />
      <Row>
        <div style={{ flex: 1 }}>
          {form.minInvestment && (isNaN(parseFloat(form.minInvestment.replace(/[^0-9.]/g, ''))) || form.minInvestment.replace(/[^0-9.]/g, '').match(/\./g)?.length > 1) && (
            <span style={{ color: '#e53e3e', fontSize: '0.9rem' }}>
              Minimum per Investment must be a valid number (e.g., 1000 or 1000.50)
            </span>
          )}
          <Label>Minimum per Investment in EGP <span style={{ color: 'red' }}>*</span></Label>
          <Input
            name="minInvestment"
            type="text"
            value={form.minInvestment}
            onChange={handleChange}
            placeholder="100000"
            required
          />
        </div>
        <div style={{ flex: 1 }}>
          {form.maxInvestment && (isNaN(parseFloat(form.maxInvestment.replace(/[^0-9.]/g, ''))) || form.maxInvestment.replace(/[^0-9.]/g, '').match(/\./g)?.length > 1) && (
            <span style={{ color: '#e53e3e', fontSize: '0.9rem' }}>
              Target Investment must be a valid number (e.g., 1000 or 1000.50)
            </span>
          )}
          <Label>Target Investment in EGP <span style={{ color: 'red' }}>*</span></Label>
          <Input
            name="maxInvestment"
            type="text"
            value={form.maxInvestment}
            onChange={handleChange}
            placeholder="1000000"
            required
          />
        </div>
      </Row>
      {form.networth && (isNaN(parseFloat(form.networth.replace(/[^0-9.]/g, ''))) || form.networth.replace(/[^0-9.]/g, '').match(/\./g)?.length > 1) && (
        <span style={{ color: '#e53e3e', fontSize: '0.9rem' }}>
          Net Worth must be a valid number (e.g., 500000 or 500000.50)
        </span>
      )}
      <Label>Net Worth <span style={{ color: 'red' }}>*</span></Label>
      <Input
        name="networth"
        type="text"
        value={form.networth}
        onChange={handleChange}
        placeholder="500000"
        required
      />
      {form.industry && !industryOptions.includes(form.industry) && (
        <span style={{ color: '#e53e3e', fontSize: '0.9rem' }}>
          Please select a valid industry
        </span>
      )}
      <Label>Project Industry</Label>
      <select
        name="industry"
        value={form.industry}
        onChange={handleChange}
        required
        style={{
          width: '100%',
          padding: '15px 18px',
          border: '1.5px solid #e3e8f0',
          borderRadius: '9px',
          fontSize: '1.08rem',
          marginBottom: '24px',
          outline: 'none',
          color: '#222',
        }}
      >
        <option value="">Select an industry</option>
        {industryOptions.map((industry) => (
          <option key={industry} value={industry}>
            {industry}
          </option>
        ))}
      </select>     
      {form.project_location && !countries.includes(form.project_location) && (
        <span style={{ color: '#e53e3e', fontSize: '0.9rem' }}>
          Please select a valid country
        </span>
      )}
      <Label>Project Location</Label>
      <select
        name="project_location"
        value={form.project_location}
        onChange={handleChange}
        required
        style={{
          width: '100%',
          padding: '15px 18px',
          border: '1.5px solid #e3e8f0',
          borderRadius: '9px',
          fontSize: '1.08rem',
          marginBottom: '24px',
          outline: 'none',
          color: '#222',
        }}
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <Row>
        <div style={{ flex: 1 }}>
          <Label>City</Label>
          <Input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
          />
        </div>
        <div style={{ flex: 1 }}>
          <Label>District</Label>
          <Input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State/Province"
          />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Zip / Postal Code</Label>
          <Input
            name="zip"
            value={form.zip}
            onChange={handleChange}
            placeholder="Zip/Postal Code"
          />
        </div>
      </Row>
      <Row>
        <div style={{ flex: 1 }}>
          <Label>Deal Type <span style={{ color: 'red' }}>*</span></Label>
          <button
            id="dropdownHelperButton"
            data-dropdown-toggle="dropdownHelper"
            className="
              text-black
              bg-white-700 
              hover:bg-white-800 
              focus:ring-4 
              focus:outline-none 
              focus:ring-blue-300 
              font-medium 
              rounded-lg 
              text-sm px-2 
              py-3 text-left 
              inline-flex 
              items-center 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-gray-300 w-100 justify-between"
            type="button"
          >
            Select Deal Type
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdownHelper"
            className="absolute z-10 hidden bg-blue-800 divide-y divide-blue-700 rounded-lg shadow-sm w-60 dark:bg-blue-700 dark:divide-blue-600 top-full mt-1 left-0 max-h-64 overflow-y-auto"
          >
            <ul
              className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownHelperButton"
            >
              {dealTypeOptions.map((option) => (
                <li key={option.id}>
                  <div className="flex p-2 rounded-sm hover:bg-blue-500">
                    <div className="flex items-center h-5">
                      <input
                        id={option.id}
                        type="checkbox"
                        value={option.value}
                        checked={form.dealType.includes(option.value)}
                        onChange={() => handleCheckboxChange(option.value)}
                        className="w-4 h-4 text-blue-300 bg-blue-700 border-blue-300 rounded-sm focus:ring-blue-400 dark:focus:ring-blue-500 dark:ring-offset-blue-700 dark:focus:ring-offset-blue-700 focus:ring-2 dark:bg-blue-600 dark:border-blue-500"
                      />
                    </div>
                    <div className="ms-2 text-sm">
                      <label
                        htmlFor={option.id}
                        className="font-medium text-white"
                      >
                        <div>{option.label}</div>
                        <p
                          id={`${option.id}-text`}
                          className="text-xs font-normal text-white"
                        >
                          Select {option.label} deal type
                        </p>
                      </label>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          {form.stage && !['Seed', 'Series A', 'Series B', 'Growth'].includes(form.stage) && (
            <span style={{ color: '#e53e3e', fontSize: '0.9rem' }}>
              Please select a valid stage
            </span>
          )}
          <Label>Project Stage <span style={{ color: 'red' }}>*</span></Label>
          <select
            name="stage"
            value={form.stage}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '15px 18px',
              border: '1.5px solid #e3e8f0',
              borderRadius: '9px',
              fontSize: '1.08rem',
              marginBottom: '24px',
              outline: 'none',
              color: '#222',
            }}
            required
          >
            <option value="" disabled>Select a stage</option>
            <option value="Seed">Seed</option>
            <option value="Series A">Series A</option>
            <option value="Series B">Series B</option>
            <option value="Growth">Growth</option>
          </select>
        </div>
      </Row>
      <ButtonRow>
        <Button onClick={() => setStep(step - 1)} disabled={step === 0}>Back</Button>
        <Button primary onClick={() => setStep(step + 1)}>Next</Button>
      </ButtonRow>
    </>
  );

  // Step 2: Business Description
  const Step2 = (
    <>
      <Title>{isEditMode ? "Edit Business Description" : "Business Description"}</Title>
      <Label>Market Description <span style={{ color: 'red' }}>*</span></Label>
      <StyledTextarea
        name="marketDescription"
        value={form.marketDescription}
        onChange={handleChange}
        placeholder="Describe your target market, industry trends, and competitive landscape..."
      />
      {form.marketDescription.length > 0 && form.marketDescription.length < 50 && (
        <span style={{ color: '#e53e3e', fontSize: '0.9rem' }}>
          Market Description must be at least 50 characters
        </span>
      )}
      <Label>Business Highlights</Label>
      <StyledTextarea
        name="businessHighlights"
        value={form.businessHighlights}
        onChange={handleChange}
        placeholder="Highlight key achievements, unique value propositions, and competitive advantages..."
      />
      <Label>Financial Status</Label>
      <StyledTextarea
        name="financialStatus"
        value={form.financialStatus}
        onChange={handleChange}
        placeholder="Provide an overview of your current financial status, revenue model, and projections..."
      />
      <Label>Business Objectives</Label>
      <StyledTextarea
        name="businessObjectives"
        value={form.businessObjectives}
        onChange={handleChange}
        placeholder="Outline your short-term and long-term business objectives, growth strategies, and key milestones..."
      />
      <ButtonRow>
        <Button onClick={() => setStep(step - 1)}>Back</Button>
        <Button primary onClick={() => setStep(step + 1)}>Next</Button>
      </ButtonRow>
    </>
  );

  // Step 3: Project Documents & Images
  const Step3 = (
    <>
      <Title>{isEditMode ? "Edit Project Documents & Images" : "Project Documents & Images"}</Title>
      <DocSection>
        <DocLabel>
          <DocIcon>➕</DocIcon> Business plan
        </DocLabel>
        <DocBox>
          {files.businessPlan && files.businessPlan.preview ? (
            <PreviewBox>
              <FileIcon>📄</FileIcon>
              <a
                href={`http://127.0.0.1:7030/${files.businessPlan.preview.replace(/\\/g, '/')}`}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <span>{files.businessPlan.preview ? files.businessPlan.preview.replace(/\\/g, '/').split('/').pop() : 'Business Plan'}</span>
              </a>
              <RemoveBtn onClick={() => handleRemoveFile("businessPlan")}>✖</RemoveBtn>
            </PreviewBox>
          ) : (
            <>
              <DocInfo>( File accepted: .pdf,.doc,.docx - Max file size: 10MB for demo limit )</DocInfo>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                id="businessPlan"
                onChange={e => handleFileChange(e, "businessPlan")}
              />
              <UploadBtn htmlFor="businessPlan">
                Upload The Documents
              </UploadBtn>
            </>
          )}
        </DocBox>
      </DocSection>
      <DocSection>
        <DocLabel>
          <DocIcon>➕</DocIcon> Financial documents
        </DocLabel>
        <DocBox>
          {files.financialDocs && files.financialDocs.preview ? (
            <PreviewBox>
              <FileIcon>📄</FileIcon>
              <a
                href={`http://127.0.0.1:7030/${files.financialDocs.preview.replace(/\\/g, '/')}`}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <span>{files.financialDocs.preview ? files.financialDocs.preview.replace(/\\/g, '/').split('/').pop() : 'Financial Documents'}</span>
              </a>
              <RemoveBtn onClick={() => handleRemoveFile("financialDocs")}>✖</RemoveBtn>
            </PreviewBox>
          ) : (
            <>
              <DocInfo>( File accepted: .pdf,.doc,.docx,.xls,.xlsx - Max file size: 10MB for demo limit )</DocInfo>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                style={{ display: "none" }}
                id="financialDocs"
                onChange={e => handleFileChange(e, "financialDocs")}
              />
              <UploadBtn htmlFor="financialDocs">
                Upload The Documents
              </UploadBtn>
            </>
          )}
        </DocBox>
      </DocSection>
      <DocSection>
        <DocLabel>
          <DocIcon>➕</DocIcon> Executive summary
        </DocLabel>
        <DocBox>
          {files.executiveSummary && files.executiveSummary.preview ? (
            <PreviewBox>
              <FileIcon>📄</FileIcon>
              <a
                href={`http://127.0.0.1:7030/${files.executiveSummary.preview.replace(/\\/g, '/')}`}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <span>{files.executiveSummary.preview ? files.executiveSummary.preview.replace(/\\/g, '/').split('/').pop() : 'Executive Summary'}</span>
              </a>
              <RemoveBtn onClick={() => handleRemoveFile("executiveSummary")}>✖</RemoveBtn>
            </PreviewBox>
          ) : (
            <>
              <DocInfo>( File accepted: .pdf,.doc,.docx - Max file size: 10MB for demo limit )</DocInfo>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                id="executiveSummary"
                onChange={e => handleFileChange(e, "executiveSummary")}
              />
              <UploadBtn htmlFor="executiveSummary">
                Upload The Documents
              </UploadBtn>
            </>
          )}
        </DocBox>
      </DocSection>
      <DocSection>
        <DocLabel>
          <DocIcon>➕</DocIcon> Additional documents
        </DocLabel>
        <DocBox>
          {files.additionalDocs && files.additionalDocs.preview ? (
            <PreviewBox>
              <FileIcon>📄</FileIcon>
              <a
                href={`http://127.0.0.1:7030/${files.additionalDocs.preview.replace(/\\/g, '/')}`}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <span>{files.additionalDocs.preview ? files.additionalDocs.preview.replace(/\\/g, '/').split('/').pop() : 'Additional Documents'}</span>
              </a>
              <RemoveBtn onClick={() => handleRemoveFile("additionalDocs")}>✖</RemoveBtn>
            </PreviewBox>
          ) : (
            <>
              <DocInfo>( File accepted: .pdf,.doc,.docx - Max file size: 10MB for demo limit )</DocInfo>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                id="additionalDocs"
                onChange={e => handleFileChange(e, "additionalDocs")}
              />
              <UploadBtn htmlFor="additionalDocs">
                Upload The Documents
              </UploadBtn>
            </>
          )}
        </DocBox>
      </DocSection>
      <DocSection>
        <DocLabel>
          <DocIcon>🖼️</DocIcon> Project Logo
        </DocLabel>
        <DocBox>
          {files.projectLogo && files.projectLogo.preview ? (
            <PreviewBox>
              <ImageThumb src={`${API_BASE_URL}/${files.projectLogo.preview}`} alt="logo preview" />
              <span>{files.projectLogo.file?.name || 'Project Logo'}</span>
              <RemoveBtn onClick={() => handleRemoveFile("projectLogo")}>✖</RemoveBtn>
            </PreviewBox>
          ) : (
            <>
              <DocInfo>( File accepted: .jpg,.jpeg,.png,.gif - Max file size: 5MB for demo limit )</DocInfo>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                style={{ display: "none" }}
                id="projectLogo"
                onChange={e => handleFileChange(e, "projectLogo")}
              />
              <UploadBtn htmlFor="projectLogo">
                Upload The Logo
              </UploadBtn>
            </>
          )}
        </DocBox>
      </DocSection>
      <DocSection>
        <DocLabel>
          <DocIcon>🖼️</DocIcon> Project Images
        </DocLabel>
        <DocBox>
          {Array.isArray(files.projectImages) && files.projectImages.length > 0 ? (
            <PreviewBox>
              {files.projectImages.map((img, idx) => (
                <span key={idx} style={{ display: "flex", alignItems: "center" }}>
                  <ImageThumb src={`${API_BASE_URL}/${img.preview}`} alt="preview" />
                  <span>{img.file?.name || 'Image'}</span>
                  <RemoveBtn onClick={() => handleRemoveImage(idx)}>✖</RemoveBtn>
                </span>
              ))}
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                style={{ display: "none" }}
                id="projectImages"
                multiple
                onChange={handleImagesChange}
              />
              <UploadBtn htmlFor="projectImages">
                Upload More Images
              </UploadBtn>
            </PreviewBox>
          ) : (
            <>
              <DocInfo>( File accepted: .jpg,.jpeg,.png,.gif - Max file size: 5MB for demo limit )</DocInfo>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                style={{ display: "none" }}
                id="projectImages"
                multiple
                onChange={handleImagesChange}
              />
              <UploadBtn htmlFor="projectImages">
                Upload The Images
              </UploadBtn>
            </>
          )}
        </DocBox>
      </DocSection>
      <ButtonRow>
        <Button onClick={() => setStep(step - 1)}>Back</Button>
        <Button primary onClick={() => setStep(step + 1)}>Next</Button>
      </ButtonRow>
    </>
  );

  // Step 4: Team Description
  const Step4 = (
    <>
      <Title>{isEditMode ? "Edit Team Description" : "Team Description"}</Title>
      <TeamSection>
        <TeamLabel>Team Overview</TeamLabel>
        <TeamTextarea
          value={teamOverview}
          onChange={e => setTeamOverview(e.target.value)}
          placeholder="Provide an overview of your team, highlighting collective experience, expertise, and why this team is uniquely positioned to execute on this venture..."
        />
      </TeamSection>
      <TeamSection>
        <h3 style={{ fontWeight: 700, fontSize: "1.3rem", margin: "18px 0 18px 0" }}>Team Members</h3>
        {teamMembers.map((member, idx) => (
          <TeamCard key={idx}>
            {teamMembers.length > 1 && (
              <RemoveMemberBtn
                type="button"
                title="Remove team member"
                onClick={() => removeTeamMember(idx)}
              >
                ×
              </RemoveMemberBtn>
            )}
            <TeamRow>
              <AvatarWrapper>
                <Avatar htmlFor={`avatar-upload-${idx}`}>
                  {member.avatarPreview ? (
                    <AvatarImg src={`${API_BASE_URL}/${member.avatarPreview}`} alt="avatar" />
                  ) : (
                    <span style={{ fontSize: "2.5rem" }}>👤</span>
                  )}
                  <input
                    id={`avatar-upload-${idx}`}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={e => handleAvatarChange(idx, e)}
                  />
                </Avatar>
              </AvatarWrapper>
              <div style={{ flex: 1 }}>
                <TeamRow>
                  <div style={{ flex: 1 }}>
                    <TeamLabel>Name</TeamLabel>
                    <TeamInput
                      value={member.name}
                      onChange={e => handleTeamMemberChange(idx, "name", e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <TeamLabel>LinkedIn</TeamLabel>
                    <TeamInput
                      value={member.linkedin}
                      onChange={e => handleTeamMemberChange(idx, "linkedin", e.target.value)}
                      placeholder="LinkedIn profile URL"
                    />
                  </div>
                </TeamRow>
                <TeamLabel>Position</TeamLabel>
                <TeamInput
                  value={member.position}
                  onChange={e => handleTeamMemberChange(idx, "position", e.target.value)}
                  placeholder="Job title"
                />
                <TeamLabel>BIO</TeamLabel>
                <TeamTextarea
                  value={member.bio}
                  onChange={e => handleTeamMemberChange(idx, "bio", e.target.value)}
                  placeholder="Brief biography highlighting relevant experience..."
                />
              </div>
            </TeamRow>
          </TeamCard>
        ))}
        <AddMemberBtn type="button" onClick={addTeamMember}>
          <span style={{ fontSize: "1.2em" }}>👥</span> Add Team Member
        </AddMemberBtn>
      </TeamSection>
      <ButtonRow>
        <TeamActions>
          <Button onClick={() => setStep(step - 1)}>Back</Button>
          <CreateBtn primary onClick={handleSubmitProject}>
            {isEditMode ? "Update Pitch" : "Create Pitch"}
          </CreateBtn>
        </TeamActions>
      </ButtonRow>
    </>
  );

  // Stepper rendering
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
      case 0: return Step1;
      case 1: return Step2;
      case 2: return Step3;
      case 3: return Step4;
      default: return Step1;
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