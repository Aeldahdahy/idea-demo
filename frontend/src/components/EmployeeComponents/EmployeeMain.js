import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { initFlowbite } from 'flowbite';
import {Link} from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

function EmployeeMain() {
  const [filter, setFilter] = useState('Last 7 days');
  const [devices, setDevices] = useState({
    desktop: true,
    tablet: true,
    mobile: true,
  });

  useEffect(() => {
    initFlowbite();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    // TODO: Fetch new data based on filter (e.g., API call)
  };

  const handleDeviceChange = (e) => {
    const { id, checked } = e.target;
    setDevices((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  // Simulated data
  const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const usersData = [28000, 29000, 30000, 31000, 31500, 32000, 32400];
  const clicksData = [40000, 41000, 42000, 42300, 42200, 42100, 42300];
  const cpcData = [5.2, 5.3, 5.35, 5.4, 5.38, 5.39, 5.4];
  const leadsData = [3000, 3100, 3200, 3300, 3400, 3450, 3400];
  const trafficData = [50, 30, 20];
  const salesData = [10000, 10500, 11000, 11500, 12000, 12200, 12423]; // New sales data

  const areaChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Users',
        data: usersData,
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      },
    ],
  };

  const lineChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Clicks',
        data: clicksData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgb(59, 130, 246)',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'CPC ($)',
        data: cpcData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgb(34, 197, 94)',
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  const columnChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Leads',
        data: leadsData,
        backgroundColor: 'rgb(59, 130, 246)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Direct', 'Organic', 'Referral'],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ['rgb(59, 130, 246)', 'rgb(34, 197, 94)', 'rgb(239, 68, 68)'],
        borderColor: ['rgb(255, 255, 255)'],
        borderWidth: 2,
      },
    ],
  };

  const donutChartData = {
    labels: ['Desktop', 'Tablet', 'Mobile'].filter((_, i) => devices[['desktop', 'tablet', 'mobile'][i]]),
    datasets: [
      {
        data: trafficData.filter((_, i) => devices[['desktop', 'tablet', 'mobile'][i]]),
        backgroundColor: ['rgb(59, 130, 246)', 'rgb(34, 197, 94)', 'rgb(239, 68, 68)'],
        borderColor: ['rgb(255, 255, 255)'],
        borderWidth: 2,
      },
    ],
  };

  const salesChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Sales ($)',
        data: salesData,
        fill: true,
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 12 },
          color: '#374151',
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#374151' },
      },
      y: {
        grid: { color: '#e5e7eb' },
        ticks: { color: '#374151' },
      },
    },
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      x: chartOptions.scales.x,
      y: { ...chartOptions.scales.y, position: 'left' },
      y1: {
        ...chartOptions.scales.y,
        position: 'right',
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Users Card */}
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md dark:bg-gray-800 p-6 transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h5 className="text-3xl font-bold text-gray-900 dark:text-white">32.4k</h5>
            <p className="text-base text-gray-500 dark:text-gray-400">Users this week</p>
          </div>
          <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500">
            12%
            <svg className="w-3 h-3 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
            </svg>
          </div>
        </div>
        <div className="h-40">
          <Line data={areaChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } } }} />
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-5 flex justify-between items-center">
          <div className="relative">
            <button
              id="usersDropdownButton"
              data-dropdown-toggle="usersDropdown"
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white inline-flex items-center"
              type="button"
              aria-label="Select time range"
            >
              {filter}
              <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div id="usersDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {['Yesterday', 'Today', 'Last 7 days', 'Last 30 days', 'Last 90 days'].map((option) => (
                  <li key={option}>
                    <button
                      onClick={() => handleFilterChange(option)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 px-3 py-2"
          >
            Users Report
            <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Clicks & CPC Card */}
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md dark:bg-gray-800 p-6 transition-shadow">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
              Clicks
              <svg
                data-popover-target="clicks-info"
                className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ml-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div
                data-popover
                id="clicks-info"
                className="absolute z-10 hidden text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
              >
                <div className="p-3 space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Clicks growth</h3>
                  <p>Tracks cumulative growth of community activities.</p>
                  <Link href="#" className="flex items-center text-blue-600 dark:text-blue-500 hover:underline">
                    Read more
                    <svg className="w-2 h-2 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                  </Link>
                </div>
              </div>
            </h5>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">42.3k</p>
          </div>
          <div>
            <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
              CPC
              <svg
                data-popover-target="cpc-info"
                className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ml-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div
                data-popover
                id="cpc-info"
                className="absolute z-10 hidden text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
              >
                <div className="p-3 space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">CPC growth</h3>
                  <p>Tracks cumulative growth of community activities.</p>
                  <Link href="#" className="flex items-center text-blue-600 dark:text-blue-500 hover:underline">
                    Read more
                    <svg className="w-2 h-2 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                  </Link>
                </div>
              </div>
            </h5>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">$5.40</p>
          </div>
        </div>
        <div className="h-40">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-5 flex justify-between items-center">
          <div className="relative">
            <button
              id="clicksDropdownButton"
              data-dropdown-toggle="clicksDropdown"
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white inline-flex items-center"
              type="button"
              aria-label="Select time range"
            >
              {filter}
              <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div id="clicksDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {['Yesterday', 'Today', 'Last 7 days', 'Last 30 days', 'Last 90 days'].map((option) => (
                  <li key={option}>
                    <button
                      onClick={() => handleFilterChange(option)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 px-3 py-2"
          >
            View Full Report
            <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Leads Card */}
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md dark:bg-gray-800 p-6 transition-shadow">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
              </svg>
            </div>
            <div>
              <h5 className="text-2xl font-bold text-gray-900 dark:text-white">3.4k</h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">Leads generated per week</p>
            </div>
          </div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            <svg className="w-2.5 h-2.5 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
            </svg>
            42.5%
          </span>
        </div>
        <div className="grid grid-cols-2 mb-4">
          <dl className="flex items-center">
            <dt className="text-gray-500 dark:text-gray-400 text-sm mr-1">Money spent:</dt>
            <dd className="text-gray-900 text-sm dark:text-white font-semibold">$3,232</dd>
          </dl>
          <dl className="flex items-center justify-end">
            <dt className="text-gray-500 dark:text-gray-400 text-sm mr-1">Conversion rate:</dt>
            <dd className="text-gray-900 text-sm dark:text-white font-semibold">1.2%</dd>
          </dl>
        </div>
        <div className="h-40">
          <Bar data={columnChartData} options={chartOptions} />
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-5 flex justify-between items-center">
          <div className="relative">
            <button
              id="leadsDropdownButton"
              data-dropdown-toggle="leadsDropdown"
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white inline-flex items-center"
              type="button"
              aria-label="Select time range"
            >
              {filter}
              <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div id="leadsDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {['Yesterday', 'Today', 'Last 7 days', 'Last 30 days', 'Last 90 days'].map((option) => (
                  <li key={option}>
                    <button
                      onClick={() => handleFilterChange(option)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 px-3 py-2"
          >
            Leads Report
            <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Traffic Pie Card */}
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md dark:bg-gray-800 p-6 transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h5 className="text-xl font-bold text-gray-900 dark:text-white mr-1">Website Traffic</h5>
            <svg
              data-popover-target="traffic-pie-info"
              className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
            </svg>
            <div
              data-popover
              id="traffic-pie-info"
              className="absolute z-10 hidden text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
            >
              <div className="p-3 space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">Traffic growth</h3>
                <p>Tracks cumulative growth of website traffic.</p>
                <Link href="#" className="flex items-center text-blue-600 dark:text-blue-500 hover:underline">
                  Read more
                  <svg className="w-2 h-2 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <button
            id="trafficPieDropdownButton"
            data-dropdown-toggle="trafficPieDropdown"
            className="text-sm font-medium text-blue-700 dark:text-blue-600 hover:underline inline-flex items-center"
            type="button"
            aria-label="Select date range"
          >
            31 Nov - 31 Dec
            <svg className="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <div id="trafficPieDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-80 dark:bg-gray-700">
            <div className="p-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                  placeholder="Start date"
                />
                <span className="text-gray-500 dark:text-gray-400">to</span>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                  placeholder="End date"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-40">
          <Pie data={pieChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-5 flex justify-between items-center">
          <div className="relative">
            <button
              id="trafficPieFilterButton"
              data-dropdown-toggle="trafficPieFilter"
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white inline-flex items-center"
              type="button"
              aria-label="Select time range"
            >
              {filter}
              <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div id="trafficPieFilter" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {['Yesterday', 'Today', 'Last 7 days', 'Last 30 days', 'Last 90 days'].map((option) => (
                  <li key={option}>
                    <button
                      onClick={() => handleFilterChange(option)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 px-3 py-2"
          >
            Traffic Analysis
            <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Traffic Donut Card */}
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md dark:bg-gray-800 p-6 transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h5 className="text-xl font-bold text-gray-900 dark:text-white mr-1">Website Traffic</h5>
            <svg
              data-popover-target="traffic-donut-info"
              className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
            </svg>
            <div
              data-popover
              id="traffic-donut-info"
              className="absolute z-10 hidden text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
            >
              <div className="p-3 space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">Traffic by device</h3>
                <p>Tracks traffic distribution across devices.</p>
                <Link href="#" className="flex items-center text-blue-600 dark:text-blue-500 hover:underline">
                  Read more
                  <svg className="w-2 h-2 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <button
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2"
            aria-label="Download data"
          >
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
            </svg>
          </button>
        </div>
        <div className="flex space-x-4 mb-4">
          {['desktop', 'tablet', 'mobile'].map((device) => (
            <div key={device} className="flex items-center">
              <input
                id={device}
                type="checkbox"
                checked={devices[device]}
                onChange={handleDeviceChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500"
              />
              <label htmlFor={device} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize">
                {device}
              </label>
            </div>
          ))}
        </div>
        <div className="h-40">
          <Doughnut data={donutChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'bottom' } } }} />
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-5 flex justify-between items-center">
          <div className="relative">
            <button
              id="trafficDonutFilterButton"
              data-dropdown-toggle="trafficDonutFilter"
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white inline-flex items-center"
              type="button"
              aria-label="Select time range"
            >
              {filter}
              <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div id="trafficDonutFilter" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {['Yesterday', 'Today', 'Last 7 days', 'Last 30 days', 'Last 90 days'].map((option) => (
                  <li key={option}>
                    <button
                      onClick={() => handleFilterChange(option)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 px-3 py-2"
          >
            Traffic Analysis
            <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Sales Card */}
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md dark:bg-gray-800 p-6 transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h5 className="text-3xl font-bold text-gray-900 dark:text-white">$12,423</h5>
            <p className="text-base text-gray-500 dark:text-gray-400">Sales this week</p>
          </div>
          <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500">
            23%
            <svg className="w-3 h-3 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
            </svg>
          </div>
        </div>
        <div className="h-40">
          <Line data={salesChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } } }} />
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-5 flex justify-between items-center">
          <div className="relative">
            <button
              id="salesDropdownButton"
              data-dropdown-toggle="salesDropdown"
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white inline-flex items-center"
              type="button"
              aria-label="Select time range"
            >
              {filter}
              <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div id="salesDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {['Yesterday', 'Today', 'Last 7 days', 'Last 30 days', 'Last 90 days'].map((option) => (
                  <li key={option}>
                    <button
                      onClick={() => handleFilterChange(option)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 px-3 py-2"
          >
            Sales Report
            <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmployeeMain;