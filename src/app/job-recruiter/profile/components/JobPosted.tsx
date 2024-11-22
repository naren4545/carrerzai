// pages/profile.js
import React from 'react';

export default function Profile() {
  const jobs = [
    {
      title: 'IT Associate Director',
      applicants: 10,
      deadline: '30 - 11 - 2024',
      status: 'Active',
    },
    {
      title: 'Graphic Designer & Video Editor',
      applicants: 5,
      deadline: '20 - 10 - 2024',
      status: 'Closed',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-center text-2xl font-semibold mb-4">Profile</h1>

      <div className="flex justify-center space-x-8 mb-4">
        <span className="text-gray-500">Edit Profile</span>
        <span className="text-orange-600 font-semibold border-b-2 border-orange-600 pb-1">
          Job Posted
        </span>
        <span className="text-gray-500">Draft Jobs</span>
      </div>

      <div className="border border-orange-400 rounded-md overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-orange-100">
              <th className="px-4 py-2 font-semibold">Job Title</th>
              <th className="px-4 py-2 font-semibold">No. of Applicants</th>
              <th className="px-4 py-2 font-semibold">Deadline</th>
              <th className="px-4 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-orange-50'}`}
              >
                <td className="px-4 py-2">{job.title}</td>
                <td className="px-4 py-2 text-center text-orange-600">
                  {job.applicants}
                </td>
                <td className="px-4 py-2 text-center">{job.deadline}</td>
                <td
                  className={`px-4 py-2 text-center ${
                    job.status === 'Active'
                      ? 'text-green-500'
                      : 'text-gray-400'
                  }`}
                >
                  {job.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
