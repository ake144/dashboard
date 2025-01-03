'use client';

import { FC, useEffect, useState } from 'react';

import { channels, programs, users } from '@/lib//count';
import CustomPieChart from './Barchart';
import ImprovedCustomLineChart from './LineChart';

const DashboardPage: FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [programCount, setProgramCount] = useState(0);
  const [channelCount, setChannelCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [userCount, movieCount, channelCount] = await Promise.all([
          users(),
          programs(),
          channels(),
        ]);
        setUserCount(userCount ?? 0);
        setProgramCount(movieCount ?? 0);
        setChannelCount(channelCount ?? 0);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-4">
      {/* Search and Actions */}
      <div className="flex justify-between items-center mb-4">
        <form>
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md px-3 py-1 text-sm text-gray-500 bg-gray-100 cursor-not-allowed"
          />
        </form>
        <div className="flex gap-2">
          <button
            className=" md:inline-flex items-center px-3 py-1 border rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            Export
          </button>

          <button
            className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50"
            
          >
            Add Filter
          </button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <div className="flex justify-between items-center mb-4">
            <h6 className="text-lg font-medium">System User</h6>
            <div className="h-8 w-8 bg-yellow-500 rounded-full opacity-50"></div>
          </div>
          <p className="text-2xl font-semibold">{userCount}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <div className="flex justify-between items-center mb-4">
            <h6 className="text-lg font-medium">Program</h6>
            <div className="h-8 w-8 bg-blue-500  rounded-full opacity-50"></div>
          </div>
          <p className="text-2xl font-semibold">{programCount}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <div className="flex justify-between items-center mb-4">
            <h6 className="text-lg font-medium">Channel</h6>
            <div className="h-8 w-8 bg-red-500  rounded-full opacity-50"></div>
          </div>
          <p className="text-2xl font-semibold">{channelCount}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col gap-4">
        <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-3/4">
          <CustomPieChart />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 w-full">
          <ImprovedCustomLineChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
