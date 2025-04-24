import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function EmployeeManageContract() {
  const [investor, setInvestor] = useState('');
  const [entrepreneur, setEntrepreneur] = useState('');
  const [projectName, setProjectName] = useState('');
  const [search, setSearch] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const contracts = [
    {
      id: '1#',
      projectName: 'IDEA-Venture',
      entrepreneur: 'BOB',
      investor: 'Taha',
      details: 'IDEA-Venture.pdf',
      // pdfFile: pdf1,
    },
    // {
    //   id: '2#',
    //   projectName: 'NextGen Project',
    //   entrepreneur: 'Alice',
    //   investor: 'John',
    //   details: 'NextGen-Contract.pdf',
    //   pdfFile: pdf2,
    // },
    // {
    //   id: '3#',
    //   projectName: 'Alpha Fund',
    //   entrepreneur: 'Zack',
    //   investor: 'Emma',
    //   details: 'Alpha-Fund-Contract.pdf',
    //   pdfFile: pdf3,
    // },
  ];

  const handleRowClick = (contract) => {
    setSelectedContract(contract);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleSave = () => {
    alert('Contract details saved!');
  };

  const handleEditDoc = () => {
    alert('Edit document functionality would open an editor here.');
  };

  return (
    <div className="employeeContractContainer">
      <div className="employeeContractMainContent">
        <div className="dashboard-container-header">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="employeeContractContentContainer">
          <div className="employeeContractContent">
            <div className="employeeContractPreview">
              <h4 className="employeeContractDetailsHeader">
                Contract details: {selectedContract ? selectedContract.details : 'IDEA-Venture.pdf'}
              </h4>
              <div className="employeeContractPreviewContent">
                {selectedContract?.pdfFile ? (
                  <Document
                    file={selectedContract.pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="pdf-document"
                  >
                    {Array.from(new Array(numPages), (_, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        width={600}
                      />
                    ))}
                  </Document>
                ) : (
                  <>
                   <p style={{ textAlign:'center' }}>No PDF provided.</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="employeeContractTableContainer">
            <div className="employeeContractDetails">
              <div className="employeeContractDetailsRow">
                <div className="employeeContractDetailsItem">
                  <label htmlFor="investor">Investor</label>
                  <input
                    id="investor"
                    type="text"
                    value={investor}
                    onChange={(e) => setInvestor(e.target.value)}
                    placeholder="Taha"
                  />
                  <button className="employeeContractEditIcon">
                    <Edit />
                  </button>
                </div>
                <div className="employeeContractDetailsItem">
                  <label htmlFor="entrepreneur">Entrepreneur</label>
                  <input
                    id="entrepreneur"
                    type="text"
                    value={entrepreneur}
                    onChange={(e) => setEntrepreneur(e.target.value)}
                    placeholder="BOB"
                  />
                  <button className="employeeContractEditIcon">
                    <Edit />
                  </button>
                </div>
              </div>
              <div className="employeeContractDetailsRow">
                <div className="employeeContractDetailsItem">
                  <label htmlFor="projectName">Project Name</label>
                  <input
                    id="projectName"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="IDEA-Venture"
                  />
                </div>
                <div className="employeeContractDetailsItem">
                  <label htmlFor="projectDoc">Project Name</label>
                  <div className="employeeContractDocInfo">
                    <span>{selectedContract ? selectedContract.details : 'IDEA-Venture.pdf'} 1.56Mb</span>
                    <button className="employeeContractEditBtn" onClick={handleEditDoc}>
                      <Edit /> Edit doc
                    </button>
                    <button className="employeeContractSaveBtn" onClick={handleSave}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="employeeContractActions">
              <table className="employeeContractTable">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Project Name</th>
                    <th>Entrepreneur</th>
                    <th>Investor</th>
                    <th>Contract details</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((contract, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(contract)}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: selectedContract === contract ? '#f0f0f0' : 'transparent',
                      }}
                    >
                      <td>{contract.id}</td>
                      <td>{contract.projectName}</td>
                      <td>{contract.entrepreneur}</td>
                      <td>{contract.investor}</td>
                      <td>{contract.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManageContract;
