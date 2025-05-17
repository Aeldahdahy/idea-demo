import React from 'react';
import styled from "styled-components";

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

function ProjectsDocuments({
  files,
  setFiles,
  isEditMode,
  Title,
  API_BASE_URL,
  handleFileChange,
  handleRemoveFile,
  handleImagesChange,
  handleRemoveImage,
  ButtonRow,
  Button,
  setStep,
  step,
  handleNextStep,
}) {
  return (
    <>
      <Title>{isEditMode ? "Edit Project Documents & Images" : "Project Documents & Images"}</Title>
      <DocSection>
        <DocLabel>
          <DocIcon>➕</DocIcon> Business plan
        </DocLabel>
        <DocBox>
          {files.businessPlan ? (
            <PreviewBox>
              <FileIcon>📄</FileIcon>
              {isEditMode && files.businessPlan.preview && !files.businessPlan.file ? (
                <a
                  href={`${API_BASE_URL}/${files.businessPlan.preview.replace(/\\/g, '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <span>{files.businessPlan.preview.split('/').pop()}</span>
                </a>
              ) : files.businessPlan.file ? (
                <>
                  <span>{files.businessPlan.file.name}</span>
                  {files.businessPlan.preview && (
                    <a
                      href={files.businessPlan.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginLeft: '8px' }}
                    >
                      (Preview)
                    </a>
                  )}
                </>
              ) : null}
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
          {files.financialDocs ? (
            <PreviewBox>
              <FileIcon>📄</FileIcon>
              {isEditMode && files.financialDocs.preview && !files.financialDocs.file ? (
                <a
                  href={`${API_BASE_URL}/${files.financialDocs.preview.replace(/\\/g, '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <span>{files.financialDocs.preview.split('/').pop()}</span>
                </a>
              ) : files.financialDocs.file ? (
                <>
                  <span>{files.financialDocs.file.name}</span>
                  {files.financialDocs.preview && (
                    <a
                      href={files.financialDocs.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginLeft: '8px' }}
                    >
                      (Preview)
                    </a>
                  )}
                </>
              ) : null}
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
          {files.executiveSummary ? (
            <PreviewBox>
              <FileIcon>📄</FileIcon>
              {isEditMode && files.executiveSummary.preview && !files.executiveSummary.file ? (
                <a
                  href={`${API_BASE_URL}/${files.executiveSummary.preview.replace(/\\/g, '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <span>{files.executiveSummary.preview.split('/').pop()}</span>
                </a>
              ) : files.executiveSummary.file ? (
                <>
                  <span>{files.executiveSummary.file.name}</span>
                  {files.executiveSummary.preview && (
                    <a
                      href={files.executiveSummary.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginLeft: '8px' }}
                    >
                      (Preview)
                    </a>
                  )}
                </>
              ) : null}
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
          {files.additionalDocs ? (
            <PreviewBox>
              <FileIcon>📄</FileIcon>
              {isEditMode && files.additionalDocs.preview && !files.additionalDocs.file ? (
                <a
                  href={`${API_BASE_URL}/${files.additionalDocs.preview.replace(/\\/g, '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <span>{files.additionalDocs.preview.split('/').pop()}</span>
                </a>
              ) : files.additionalDocs.file ? (
                <>
                  <span>{files.additionalDocs.file.name}</span>
                  {files.additionalDocs.preview && (
                    <a
                      href={files.additionalDocs.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginLeft: '8px' }}
                    >
                      (Preview)
                    </a>
                  )}
                </>
              ) : null}
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
          {files.projectLogo ? (
            <PreviewBox>
              {isEditMode && files.projectLogo.preview && !files.projectLogo.file ? (
                <>
                  <ImageThumb src={`${API_BASE_URL}/${files.projectLogo.preview}`} alt="logo preview" />
                  <span>{files.projectLogo.preview.split('/').pop()}</span>
                </>
              ) : files.projectLogo.file ? (
                <>
                  <ImageThumb src={files.projectLogo.preview} alt="logo preview" />
                  <span>{files.projectLogo.file.name}</span>
                </>
              ) : null}
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
          {files.projectImages.length > 0 ? (
            <PreviewBox>
              {files.projectImages.map((img, idx) => (
                <span key={idx} style={{ display: "flex", alignItems: "center" }}>
                  {isEditMode && img.preview && !img.file ? (
                    <>
                      <ImageThumb src={`${API_BASE_URL}/${img.preview}`} alt="preview" />
                      <span>{img.preview.split('/').pop()}</span>
                    </>
                  ) : img.file ? (
                    <>
                      <ImageThumb src={img.preview} alt="preview" />
                      <span>{img.file.name}</span>
                    </>
                  ) : null}
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
        <Button primary onClick={handleNextStep}>Next</Button>
      </ButtonRow>
    </>
  );
}

export default ProjectsDocuments;