import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../utils/api"; // ✅ axios ki jagah API

import { setAllJobs } from "../../redux/jobSlice.js";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await API.get(`/job/get`, {
          params: { keyword: searchedQuery || "" },
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("❌ Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]); // ✅ dispatch bhi add kiya

};

export default useGetAllJobs;