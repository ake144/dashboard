"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProgramSchema } from "@/lib/types";
import { placeholderPrograms } from "@/lib/data";

const Program = () => {
  const [programs, setPrograms] = useState<ProgramSchema[]>(placeholderPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<ProgramSchema | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const filteredPrograms = programs.filter((program) =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (program: ProgramSchema) => {
    setSelectedProgram(program);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = (program: ProgramSchema) => {
    setSelectedProgram(program);
    setIsDeleteConfirmOpen(true);
  };

  const handleUpdate = (data: ProgramSchema) => {
    setPrograms(
      programs.map((program) =>
        program.id === data.id ? { ...program, ...data } : program
      )
    );
    setIsEditModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setPrograms(programs.filter((program) => program.id !== id));
    setIsDeleteConfirmOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 mb-4 md:mb-0"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-3">
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100">
            Export
          </button>
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100">
            Add Filter
          </button>
          <Link href="/program">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Add Program
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              {["ID", "Title", "Duration", "Description"].map((field) => (
                <th key={field} className="px-4 py-2 text-left">
                  {field}
                </th>
              ))}
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrograms.map((program) => (
              <tr key={program.id} className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2">{program.id}</td>
                <td className="px-4 py-2">{program.title}</td>
                <td className="px-4 py-2">{program.duration}</td>
                <td className="px-4 py-2">{program.description}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <Link href={program.videoUrl}>
                    <button className="text-blue-500">View</button>
                  </Link>
                  <button
                    className="text-yellow-500"
                    onClick={() => handleEdit(program)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteConfirm(program)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedProgram && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">Edit Program</h2>
            {["title", "duration", "description"].map((field) => (
              <input
                key={field}
                type="text"
                className="block w-full border border-gray-300 rounded-lg px-4 py-2 mb-2"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={
                  selectedProgram[field as keyof ProgramSchema]?.toString() || ""
                }
                onChange={(e) =>
                  setSelectedProgram((prev) =>
                    prev ? { ...prev, [field]: e.target.value } : null
                  )
                }
              />
            ))}
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-200 px-4 py-2 rounded-lg"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() =>
                  selectedProgram && handleUpdate(selectedProgram)
                }
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && selectedProgram && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">Delete Program</h2>
            <p>Are you sure you want to delete this program?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded-lg"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleDelete(selectedProgram.id)}
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

export default Program;
