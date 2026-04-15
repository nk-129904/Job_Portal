import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import API from '../../../utils/api' // ✅ axios replace
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../../../redux/applicationSlice.js'

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await API.get(`/application/${params.id}/applicants`); // ✅ FIXED

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log("❌ Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [params.id, dispatch]); // ✅ dependency fix

  return (
    <div>
      <Navbar />

      <div className='max-w-6xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>
          Applicants {applicants?.applications?.length || 0}
        </h1>

        <ApplicantsTable />
      </div>
    </div>
  )
}

export default Applicants;