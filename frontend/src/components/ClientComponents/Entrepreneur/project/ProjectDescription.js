import React from 'react';
import PropTypes from 'prop-types';

function ProjectDescription({
  form,
  setForm,
  isEditMode,
  Title,
  Label,
  StyledTextarea,
  ButtonRow,
  Button,
  setStep,
  step
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  return (
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
}

ProjectDescription.propTypes = {
  form: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  Title: PropTypes.elementType.isRequired,
  Label: PropTypes.elementType.isRequired,
  StyledTextarea: PropTypes.elementType.isRequired,
  ButtonRow: PropTypes.elementType.isRequired,
  Button: PropTypes.elementType.isRequired,
  setStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired
};

export default ProjectDescription;