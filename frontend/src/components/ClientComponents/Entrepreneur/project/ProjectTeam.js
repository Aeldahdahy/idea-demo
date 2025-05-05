import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const CreateBtn = styled.button`
  padding: 13px 38px;
  border: none;
  border-radius: 9px;
  font-size: 1.13rem;
  font-weight: 700;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px #2563eb22;
  &:hover {
    background: #1746a2;
  }
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

function ProjectTeam({
  teamOverview,
  setTeamOverview,
  teamMembers,
  isEditMode,
  Title,
  API_BASE_URL,
  handleAvatarChange,
  handleTeamMemberChange,
  addTeamMember,
  removeTeamMember,
  handleSubmitProject,
  ButtonRow,
  Button,
  setStep,
  step
}) {
  return (
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
                    isEditMode && !member.avatar ? (
                      <AvatarImg src={`${API_BASE_URL}/${member.avatarPreview}`} alt="avatar" />
                    ) : (
                      <AvatarImg src={member.avatarPreview} alt="avatar" />
                    )
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
          <CreateBtn onClick={handleSubmitProject}>
            {isEditMode ? "Update Pitch" : "Create Pitch"}
          </CreateBtn>
        </TeamActions>
      </ButtonRow>
    </>
  );
}

ProjectTeam.propTypes = {
  teamOverview: PropTypes.string.isRequired,
  setTeamOverview: PropTypes.func.isRequired,
  teamMembers: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.any,
    avatarPreview: PropTypes.string,
    name: PropTypes.string,
    linkedin: PropTypes.string,
    position: PropTypes.string,
    bio: PropTypes.string
  })).isRequired,
  isEditMode: PropTypes.bool.isRequired,
  Title: PropTypes.elementType.isRequired,
  API_BASE_URL: PropTypes.string.isRequired,
  handleAvatarChange: PropTypes.func.isRequired,
  handleTeamMemberChange: PropTypes.func.isRequired,
  addTeamMember: PropTypes.func.isRequired,
  removeTeamMember: PropTypes.func.isRequired,
  handleSubmitProject: PropTypes.func.isRequired,
  ButtonRow: PropTypes.elementType.isRequired,
  Button: PropTypes.elementType.isRequired,
  setStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired
};

export default ProjectTeam;