import { useEffect } from "react";
import { useDispatch } from "react-redux";
import API from "../../utils/api"; // ✅ axios replace

import { setAllAdminJobs } from "../../redux/jobSlice.js";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await API.get(`/job/admin`); // ✅ FIXED Path

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("❌ Error fetching admin jobs:", error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]); // ✅ dependency add kiya
};

export default useGetAllAdminJobs;