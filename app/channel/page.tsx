'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TablePagination from '@/components/pagination';
import { staticChannels } from '@/lib/data';
import { Channel } from '@/lib/types';

const ChannelList: React.FC = () => {
  const totalChannels = staticChannels.length;
  const rowsPerPage = 10;
  const currentPage = 1;
  const [channels, setChannels] = useState<Channel[]>(staticChannels);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChannels = staticChannels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (channel: Channel) => {
    setSelectedChannel(channel);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = (channel: Channel) => {
    setSelectedChannel(channel);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = (id: number) => {
    setChannels(channels.filter((channel) => channel.id !== id));
    setIsDeleteConfirmOpen(false);
  };

  const handleUpdate = (data: Channel) => {
    setChannels(
      channels.map((channel) =>
        channel.id === data.id ? { ...channel, ...data } : channel
      )
    );
    setIsEditModalOpen(false);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => {
    console.log(`Page changed to ${newPage + 1}`);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(`Rows per page changed to ${event.target.value}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full md:w-auto"
        />
        <div className="flex flex-col  md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md w-full md:w-auto">
            Export
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md w-full md:w-auto">
            Add Filter
          </button>
          <Link href="/channel">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md w-full md:w-auto">
              Add Channel
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredChannels.map((channel) => (
              <tr key={channel.id} className="border-b">
                <td className="px-4 py-2">{channel.name}</td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={channel.isActive}
                    onChange={() => {}}
                    className="w-5 h-5"
                  />
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded-md"
                    onClick={() => handleEdit(channel)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded-md"
                    onClick={() => handleDeleteConfirm(channel)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        totalItems={totalChannels}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {isEditModalOpen && selectedChannel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Channel</h2>
            <input
              type="text"
              value={selectedChannel?.name || ''}
              onChange={(e) =>
                setSelectedChannel({
                  ...selectedChannel!,
                  name: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => {
                  selectedChannel && handleUpdate(selectedChannel);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Delete Channel</h2>
            <p>Are you sure you want to delete this channel?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => {
                  if (selectedChannel) {
                    handleDelete(selectedChannel.id);
                    setIsDeleteConfirmOpen(false);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelList;
