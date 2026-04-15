import React from 'react';
import Navbar from '../shared/Navbar';
import { useSelector } from 'react-redux';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { Briefcase, Building2, TrendingUp } from 'lucide-react';
import AdminJobsTable from './AdminJobsTable';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  useGetAllAdminJobs();
  useGetAllCompanies();
  const navigate = useNavigate();

  const { allAdminJobs } = useSelector((store) => store.job);
  const { companies } = useSelector((store) => store.company);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600 flex items-center justify-between transition-transform hover:scale-105">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase">Total Jobs</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">{allAdminJobs?.length || 0}</h2>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Briefcase className="text-purple-600 w-8 h-8" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600 flex items-center justify-between transition-transform hover:scale-105">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase">Companies</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">{companies?.length || 0}</h2>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Building2 className="text-blue-600 w-8 h-8" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600 flex items-center justify-between transition-transform hover:scale-105">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase">Active Status</p>
              <h2 className="text-xl font-bold text-gray-800 mt-1 text-green-600">Online</h2>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="text-green-600 w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-gray-800">Recent Jobs</h2>
             <Button onClick={() => navigate("/admin/jobs/create")} className="bg-purple-600 hover:bg-purple-700 text-white">Post New Job</Button>
           </div>
           <AdminJobsTable />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
