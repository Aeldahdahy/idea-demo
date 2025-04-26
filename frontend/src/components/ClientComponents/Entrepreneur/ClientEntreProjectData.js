import React, { useState } from "react";
import styled, { css } from "styled-components";

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
  position: relative; // <-- add this
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


// const DocBoxRow = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;
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
  width: 100vw;
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

const InfoIcon = styled.span`
  background: #2563eb;
  color: #fff;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  margin-left: 7px;
  margin-right: 2px;
`;

const InfoText = styled.span`
  font-size: 0.98rem;
  color: #2563eb;
  margin-left: 8px;
  font-weight: 500;
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

const Select = styled.select`
  width: 100%;
  padding: 15px 18px;
  border: 1.5px solid #e3e8f0;
  border-radius: 9px;
  background: #fff;
  font-size: 1.08rem;
  margin-bottom: 24px;
  outline: none;
  color: #222;
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

// --- Main Component ---
function ClientEntreProjectData() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    projectName: "",
    website: "",
    minInvestment: "",
    maxInvestment: "",
    industry: "",
    location: "",
    city: "",
    state: "",
    zip: "",
    stage: "",
    dealType: "",
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
    projectImages: []
  });

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  // For multiple images
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

  // Step 1: General Information
  const Step1 = (
    <>
      <Title>General Information</Title>
      <Label>Project Name</Label>
      <Input
        name="projectName"
        value={form.projectName}
        onChange={handleChange}
        placeholder="Enter your project name"
      />
      <Label>Website Link</Label>
      <Input
        name="website"
        value={form.website}
        onChange={handleChange}
        placeholder="https://example.com"
      />
      <Row>
        <div style={{ flex: 1 }}>
          <Label>Minimum Investment</Label>
          <Input
            name="minInvestment"
            value={form.minInvestment}
            onChange={handleChange}
            placeholder="$"
          />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Maximum Investment</Label>
          <Input
            name="maxInvestment"
            value={form.maxInvestment}
            onChange={handleChange}
            placeholder="$"
          />
        </div>
      </Row>
      <Label>
        <StepCircle active style={{ width: 28, height: 28, fontSize: "1rem", marginRight: 7, marginBottom: 0 }}>1</StepCircle>
        Project Industry
        <InfoIcon>i</InfoIcon>
        <InfoText>e.g. Technology, Healthcare, Real Estate</InfoText>
      </Label>
      <Input
        name="industry"
        value={form.industry}
        onChange={handleChange}
        placeholder="e.g. Technology, Healthcare, Real Estate"
      />
      <Label>Project Location</Label>
      <Input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Country"
      />
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
          <Label>State / Province / Region</Label>
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
          <Label>Project Stage</Label>
          <Input
            name="stage"
            value={form.stage}
            onChange={handleChange}
            placeholder="e.g. Seed, Series A, Growth"
          />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Deal Type</Label>
          <Select
            name="dealType"
            value={form.dealType}
            onChange={handleChange}
          >
            <option value="">Select deal type</option>
            <option value="equity">Equity</option>
            <option value="debt">Debt</option>
            <option value="grant">Grant</option>
          </Select>
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
      <Title>Business Description</Title>
      <Label>Market Description</Label>
      <StyledTextarea
        name="marketDescription"
        value={form.marketDescription}
        onChange={handleChange}
        placeholder="Describe your target market, industry trends, and competitive landscape..."
      />
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
      <Title>Project Documents & Images</Title>
      <DocSection>
        <DocLabel>
          <DocIcon>➕</DocIcon> Business plan
        </DocLabel>
        <DocBox>
          {files.businessPlan && files.businessPlan.file ? (
            <PreviewBox>
              <FileIcon>📄</FileIcon>
              <span>{files.businessPlan.file.name}</span>
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
          {files.financialDocs && files.financialDocs.file ? (
            <PreviewBox>
              <FileIcon>📄</FileIcon>
              <span>{files.financialDocs.file.name}</span>
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
          {files.executiveSummary && files.executiveSummary.file ? (
            <PreviewBox>
              <FileIcon>📄</FileIcon>
              <span>{files.executiveSummary.file.name}</span>
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
          {files.additionalDocs && files.additionalDocs.file ? (
            <PreviewBox>
              <FileIcon>📄</FileIcon>
              <span>{files.additionalDocs.file.name}</span>
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
          <DocIcon>🖼️</DocIcon> Project Images
        </DocLabel>
        <DocBox>
          {Array.isArray(files.projectImages) && files.projectImages.length > 0 ? (
            <PreviewBox>
              {files.projectImages.map((img, idx) => (
                <span key={idx} style={{ display: "flex", alignItems: "center" }}>
                  <ImageThumb src={img.preview} alt="preview" />
                  <span>{img.file.name}</span>
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
                Upload The Documents
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
                Upload The Documents
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

  const Step4 = (
    <>
      <Title>Team Description</Title>
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
                    <AvatarImg src={member.avatarPreview} alt="avatar" />
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
        <CreateBtn primary>Create Pitch</CreateBtn>
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