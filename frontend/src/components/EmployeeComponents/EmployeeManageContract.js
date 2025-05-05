import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import pdf from '../../assets/TripTactix Executive Summary.pdf'; // Ensure this file exists in /public or build folder

function EmployeeManageContract() {
  const [investor, setInvestor] = useState('');
  const [entrepreneur, setEntrepreneur] = useState('');
  const [projectName, setProjectName] = useState('');
  const [search, setSearch] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);

  const contracts = [
    {
      id: '1#',
      projectName: 'IDEA-Venture',
      entrepreneur: 'BOB',
      investor: 'Taha',
      pdfFile: pdf, // If using /public, use '/1744149276046.pdf'
    },
  ];

  const filteredContracts = contracts.filter(
    (contract) =>
      contract.projectName.toLowerCase().includes(search.toLowerCase()) ||
      contract.entrepreneur.toLowerCase().includes(search.toLowerCase()) ||
      contract.investor.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (contract) => {
    setSelectedContract(contract);
  };

  const handleSave = () => {
    alert('Contract details saved!');
  };

  const handleEditDoc = () => {
    alert('Edit document functionality would open an editor here.');
  };

  return (
    <div className="container mx-auto px-4 py-6 overflow-hidden">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search contracts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PDF Preview Section */}
        <div className="bg-white shadow-md rounded-lg p-6 h-[80vh]">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Contract Details: {selectedContract ? selectedContract.projectName : 'Select a contract'}
          </h4>

          <div className="border border-gray-200 rounded-lg overflow-hidden h-[70vh] ">
            {selectedContract ? (
              <iframe
                src={selectedContract.pdfFile}
                title="Contract PDF"
                className="w-full h-[70vh]"
                frameBorder="0"
              ></iframe>
            ) : (
              <div className="text-gray-500 text-center py-8">
                Please select a contract to preview.
              </div>
            )}
          </div>
        </div>

        {/* Form and Table Section */}
        <div className="space-y-6">
          {/* Form Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="investor" className="block text-sm font-medium text-gray-700 mb-1">
                  Investor
                </label>
                <div className="flex items-center">
                  <input
                    id="investor"
                    type="text"
                    value={investor}
                    onChange={(e) => setInvestor(e.target.value)}
                    placeholder="Taha"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                  <button className="ml-2 p-2 text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="entrepreneur" className="block text-sm font-medium text-gray-700 mb-1">
                  Entrepreneur
                </label>
                <div className="flex items-center">
                  <input
                    id="entrepreneur"
                    type="text"
                    value={entrepreneur}
                    onChange={(e) => setEntrepreneur(e.target.value)}
                    placeholder="BOB"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                  <button className="ml-2 p-2 text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  id="projectName"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="IDEA-Venture"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="projectDoc" className="block text-sm font-medium text-gray-700 mb-1">
                  Contract Document
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {selectedContract ? '1744149276046.pdf (1.56Mb)' : 'No document selected'}
                  </span>
                  <button
                    onClick={handleEditDoc}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit Doc
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white shadow-md rounded-lg max-h-[300px] overflow-auto sm:overflow-x-hidden">
            <table className="min-w-[800px] w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrepreneur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContracts.map((contract) => (
                  <tr
                    key={contract.id}
                    onClick={() => handleRowClick(contract)}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedContract === contract ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contract.projectName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.entrepreneur}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.investor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1744149276046.pdf</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManageContract;
