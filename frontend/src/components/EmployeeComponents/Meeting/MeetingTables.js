import React from 'react';
// import { Eye } from 'lucide-react';

const MeetingTable = ({
  title,
  data,
  columns,
  selectedItems,
  handleCheckbox,
  handleSelectAll,
  hasSelectAll = false,
  actionButton = null,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-900">{title}</h5>
        {actionButton}
      </div>
      <div className="bg-white shadow-md rounded-lg max-h-[300px] overflow-auto sm:overflow-x-hidden">
        <table className="min-w-[800px] w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {hasSelectAll ? (
                  <input
                    type="checkbox"
                    checked={selectedItems.length === data.length && data.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                ) : (
                  'Select'
                )}
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckbox(item.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      column.key === 'projectName' ? 'font-medium text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingTable;