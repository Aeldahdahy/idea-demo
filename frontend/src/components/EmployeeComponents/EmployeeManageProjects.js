import React, { useState } from 'react';
import eyeIcon from '../../assets/eye.png';
import '../../App.css'; 

const initialData = [
    { id: '1#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '2#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '3#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '4#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '5#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '6#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '7#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '8#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '9#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '10#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '11#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '12#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '13#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '14#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
    { id: '15#', project_name: 'IDEA-Venture', industry: 'Investment', stage: 'Seed Stage', deal_type: 'Partnership', owner:'tahaelrajel@gmail.com', status: 'Pending'},
];

const EmployeeManageProjects = () => {
    const [data, setData] = useState(initialData);

    const handleApprove = (id) => {
        setData(prevData => prevData.map(item => item.id === id ? { ...item, status: 'Approved' } : item));
    };

    const handleReject = (id) => {
        setData(prevData => prevData.map(item => item.id === id ? { ...item, status: 'Rejected' } : item));
    };

    return (
        <div className="projects-container">
            <h2>Projects</h2>
            <input type="text" placeholder="Search" className="search-bar" />
            <div className="table-container">
                <table className="projects-table">
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> Project Name </th>
                            <th> Industry Type </th>
                            <th> Project Stage </th>
                            <th> Deal Type </th>
                            <th> Project Owner </th>
                            <th> Status </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td><input type="checkbox" /> {item.id}</td>
                                <td>{item.project_name}</td>
                                <td>{item.industry}</td>
                                <td>{item.stage}</td>
                                <td>{item.deal_type}</td>
                                <td>{item.owner}</td>
                                <td className="status-cell">
                                    <button 
                                        className={`status-btn ${item.status === 'Rejected' ? 'rejected' : 'pending'}`}
                                        onClick={() => handleReject(item.id)}
                                    >
                                        {item.status === 'Rejected' ? 'Rejected' : 'Reject'}
                                    </button>
                                    <button 
                                        className="approve-btn" 
                                        onClick={() => handleApprove(item.id)}
                                    >
                                        Approve
                                    </button>
                                    <button className="view-btn">
                                        <img src={eyeIcon} alt="View" className="eye-icon" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeManageProjects;