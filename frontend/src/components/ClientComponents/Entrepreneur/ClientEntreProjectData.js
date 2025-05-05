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

      // Log FormData entries for debugging
      const formDataEntries = [...formData.entries()];
      console.log('FormData entries:');
      formDataEntries.forEach(([key, value]) => {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      });

      if (formDataEntries.length === 0) {
        alert('Form data is empty. Please fill out the required fields.');
        return;
      }

      if (isEditMode) {
        await updateProject(project._id, formData);
      } else {
        await createProject(formData);
      }
      setStep(step + 1);

    } catch (error) {
      console.error('Error submitting project:', error);
      const errorMessage = error.response?.status === 403
        ? 'You do not have permission to create a project. Please check your authentication or contact support.'
        : error.response?.data?.error || 'Failed to submit project. Please check the form and try again.';
      alert(`Submission failed:\n${errorMessage}`);
    }
  };

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
            handleSubmitProject={handleSubmitProject}
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