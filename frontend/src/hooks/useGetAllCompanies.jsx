import { useEffect } from "react";
import { useDispatch } from "react-redux";
import API from "../../utils/api"; // ✅ axios ki jagah API use karenge

import { Company_API_END_POINT } from "../../utils/constant.js";
import { setCompanies } from "../../redux/companySlice.js";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await API.get(`/company/get`); // ✅ fixed

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log("❌ Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;