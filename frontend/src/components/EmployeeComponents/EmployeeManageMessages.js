import React, { useState } from 'react';
import eyeIcon from '../../assets/eye.png';

const initialData = [
    { id: '1#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },
    { id: '2#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Replied' },
    { id: '3#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },
    { id: '4#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },
    { id: '5#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },
    { id: '6#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },
    { id: '7#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },
    { id: '8#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },
    { id: '9#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },
    { id: '10#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },
    { id: '11#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },
    { id: '12#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },
    { id: '13#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },
    { id: '14#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },
    { id: '15#', name: 'Taha Elrajel', email: 'Tahaelrajel8@gmail.com', phone: '+218911234556', message: 'A design is a plan or specification for the construction of an object...', status: 'Pending' },


];

const EmployeeManageMessages = () => {
    const [data, setData] = useState(initialData);

    // Function to toggle status between "Pending" and "Replied"
    const handleToggle = (id) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, status: item.status === 'Pending' ? 'Replied' : 'Pending' } : item
            )
        );
    };

    return (
        <div className="container">
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <input type="checkbox" className="mr-2" />
                                    {item.id}
                                </td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.message}</td>
                                <td>
                                    <div className="status-container">
                                        <button 
                                            className={`status-button ${item.status === 'Pending' ? 'pending' : 'replied'}`} 
                                            onClick={() => handleToggle(item.id)}
                                        >
                                            {item.status}
                                        </button>
                                        <button className="view-button">
                                            <img src={eyeIcon} alt="View" className="eye-icon" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeManageMessages;
