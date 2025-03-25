import React, { useState } from "react";
import { Eye } from "lucide-react";

function EmployeeManageAd() {
    const initialData = [
        { id: '1#', title: 'Taha Elrajel', subtitle: 'Redbull', image: 'Redbull.jpg', website: 'https://www.Redbull.com', status: 'remove' },
        { id: '2#', title: 'Taha Elrajel', subtitle: 'Redbull', image: 'Redbull.jpg', website: 'https://www.Redbull.com', status: 'Display' },
        { id: '3#', title: 'Taha Elrajel', subtitle: 'Redbull', image: 'Redbull.jpg', website: 'https://www.Redbull.com', status: 'Remove' },
    ];

    const [data, setData] = useState(initialData);

    const handleToggle = (id) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, status: item.status === 'remove' ? 'Display' : 'remove' } : item
            )
        );
    };

    return (
        <div className="employee-manage-container">
            <div className="dashboard-container-header">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                />
            </div>
            <div className="employee-form-container">
                <div className="employee-form-grid">
                    <div>
                        <label htmlFor="event-title">Event Title</label>
                        <input type="text" id="event-title" defaultValue="Redbull" />
                    </div>
                    <div>
                        <label htmlFor="event-subtitle">Event Subtitle</label>
                        <input type="text" id="event-subtitle" defaultValue="Redbull" />
                    </div>
                    <div>
                        <label htmlFor="event-logo">Event Logo</label>
                        <div className="employee-upload-area">
                            <i className="fas fa-upload"></i>
                            <p>Drag & Drop or choose image to upload</p>
                            <p className="small">Select jpg, jpeg, png or gif</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="event-image">Event Image/Video</label>
                        <div className="employee-upload-area">
                            <i className="fas fa-upload"></i>
                            <p>Drag & Drop or choose image to upload</p>
                            <p className="small">Select jpg, jpeg, png or gif</p>
                        </div>
                    </div>
                    <div className="employee-full-width">
                        <label htmlFor="website-link">Website Link</label>
                        <input type="text" id="website-link" defaultValue="https://www.Redbull.com" />
                    </div>
                    <div className="employee-full-width flex justify-center">
                        <button type="button">Add Event</button>
                    </div>
                </div>
            </div>

            <div className="employee-table-container">
                <table className="dashboard-table">
                    <thead className="dashboard-table-head">
                        <tr>
                            <th>Id</th>
                            <th>Event Title</th>
                            <th>Event Subtitle</th>
                            <th>Event Image/Video</th>
                            <th>Website Link</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <input type="checkbox" className="mr-2" />
                                    {item.id}
                                </td>
                                <td>{item.title}</td>
                                <td>{item.subtitle}</td>
                                <td>{item.image}</td>
                                <td>{item.website}</td>
                                <td>
                                    <div className="toggleStatusContainer" onClick={() => handleToggle(item.id)}>
                                        <div className={`toggleStatus ${item.status === "remove" ? "active" : ""}`}>
                                            <span className="toggleCircle"></span>
                                            <span className="toggleText">{item.status === "remove" ? "Remove" : "Display"}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <button className="edit-btn">
                                        <Eye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeeManageAd;