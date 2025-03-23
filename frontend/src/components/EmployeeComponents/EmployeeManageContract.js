import React, { useState } from 'react';
import {
  Gauge,
  Users,
  Diagram,
  Calendar,
  FileText,
  Mail,
  User,
  LogOut,
  Smartphone,
  Ad,
  Bell,
  Download,
  Edit,
} from 'lucide-react'; // Import Lucid Icons
import { jsPDF } from 'jspdf';

function EmployeeManageContract() {
  const [investor, setInvestor] = useState('Taha');
  const [entrepreneur, setEntrepreneur] = useState('BOB');
  const [projectName, setProjectName] = useState('IDEA-Venture');

  const contracts = [
    { id: '1#', projectName: 'IDEA-Venture', entrepreneur: 'BOB', investor: 'Taha', details: 'IDEA-Venture.docx' },
    { id: '1#', projectName: 'IDEA-Venture', entrepreneur: 'BOB', investor: 'Taha', details: 'IDEA-Venture.docx' },
    { id: '1#', projectName: 'IDEA-Venture', entrepreneur: 'BOB', investor: 'Taha', details: 'IDEA-Venture.docx' },
  ];

  const handleSave = () => {
    alert('Contract details saved!');
    // Add backend save logic here
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(`Contract Details\n\nInvestor: ${investor}\nEntrepreneur: ${entrepreneur}\nProject Name: ${projectName}`, 10, 10);
    doc.save('IDEA-Venture.pdf');
  };

  const handleEditDoc = () => {
    alert('Edit document functionality would open an editor here.');
    // Add document editor logic here
  };

  return (
    <div className="employee-manage-contract">

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <h3 className="contract-header">Contract</h3>
            <input type="text" placeholder="Search" className="search-bar" />
          </div>
          <div className="header-right">
            <Bell className="notification-icon" />
            <span className="user-name">Nada Zafer</span>
            <span className="user-role">Admin</span>
            <div className="user-avatar"></div>
          </div>
        </header>

        {/* Content */}
        <div className="content">
          <div className="contract-section">
            {/* Contract Preview */}
            <div className="contract-preview">
              <h4 className="contract-details-header">Contract details: IDEA-Venture.docx</h4>
              <div className="preview-content">
                <h5>Service Agreement</h5>
                <p>
                  This contract for services is made effective as of [Date] by and between [Investor Name] (the "Investor") and [Entrepreneur Name] (the "Entrepreneur").
                </p>
                <ol>
                  <li>Payment: Payment shall be made to Entrepreneur in regular payments of [Amount] every [Frequency].</li>
                  <li>Term: This Contract will terminate automatically upon completion by Entrepreneur of the Services required.</li>
                  <li>Work Product Ownership: Any copyrightable works, ideas, discoveries, inventions, patents...</li>
                  <li>Default: The occurrence of any of the following shall constitute a material default...</li>
                </ol>
              </div>
            </div>

            {/* Contract Details */}
            <div className="contract-details">
              <div className="details-row">
                <div className="details-item">
                  <label>Investor</label>
                  <input
                    type="text"
                    value={investor}
                    onChange={(e) => setInvestor(e.target.value)}
                  />
                </div>
                <div className="details-item">
                  <label>Entrepreneur</label>
                  <input
                    type="text"
                    value={entrepreneur}
                    onChange={(e) => setEntrepreneur(e.target.value)}
                  />
                </div>
              </div>
              <div className="details-row">
                <div className="details-item">
                  <label>Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="details-item">
                  <label>Project Name</label>
                  <div className="doc-info">
                    <span>IDEA-Venture.docx (1.56Mb)</span>
                    <button className="download-btn" onClick={handleDownload}>
                      <Download /> Download
                    </button>
                    <button className="edit-btn" onClick={handleEditDoc}>
                      <Edit /> Edit doc
                    </button>
                  </div>
                </div>
              </div>
              <button className="save-btn" onClick={handleSave}>Save</button>
            </div>
          </div>

          {/* Contract Table */}
          <div className="contract-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Project Name</th>
                  <th>Entrepreneur</th>
                  <th>Investor</th>
                  <th>Contract details</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract, index) => (
                  <tr key={index}>
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

      {/* CSS */}
      <style jsx>{`
        .employee-manage-contract {
          display: flex;
        }

        .sidebar {
          width: 200px;
          background-color: #f8f9fa;
          padding: 20px;
          height: 100vh;
        }

        .logo {
          margin-bottom: 30px;
        }

        .logo h2 {
          margin: 0;
          color: #007bff;
        }

        nav ul {
          list-style: none;
          padding: 0;
        }

        nav ul li {
          padding: 10px 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        nav ul li.active {
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          padding: 10px;
        }

        .sidebar-footer {
          position: absolute;
          bottom: 20px;
        }

        .sidebar-footer p {
          margin: 5px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .main-content {
          flex: 1;
          padding: 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .contract-header {
          background-color: #ffc107;
          padding: 5px 10px;
          border-radius: 5px;
        }

        .search-bar {
          padding: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .notification-icon {
          font-size: 1.2rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background-color: #ccc;
          border-radius: 50%;
        }

        .content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contract-section {
          display: flex;
          gap: 20px;
        }

        .contract-preview {
          flex: 2;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .contract-details-header {
          background-color: #ffc107;
          padding: 5px 10px;
          border-radius: 5px;
        }

        .preview-content {
          margin-top: 20px;
        }

        .preview-content h5 {
          margin-bottom: 10px;
        }

        .preview-content p {
          margin: 10px 0;
        }

        .preview-content ol {
          padding-left: 20px;
        }

        .contract-details {
          flex: 1;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .details-row {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .details-item {
          flex: 1;
        }

        .details-item label {
          display: block;
          margin-bottom: 5px;
        }

        .details-item input {
          width: 100%;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .doc-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .download-btn, .edit-btn, .save-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .download-btn {
          background-color: #28a745;
          color: white;
        }

        .edit-btn {
          background-color: #007bff;
          color: white;
        }

        .save-btn {
          background-color: #007bff;
          color: white;
          width: 100%;
        }

        .contract-table {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
}

export default EmployeeManageContract;