import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import AdminJobsTable from './AdminJobsTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../../../redux/jobSlice.js';

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]); // ✅ dispatch add kiya (best practice)

  return (
    <div>
      <Navbar />

      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
          
          <Input
            className="w-fit"
            placeholder="Filter by name"
            value={input} // ✅ controlled input
            onChange={(e) => setInput(e.target.value)}
          />

          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>

        </div>

        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs;