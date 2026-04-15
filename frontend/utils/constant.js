const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api/v1";

export const USER_API_END_POINT=`${API_BASE_URL}/user`;
export const JOB_API_END_POINT=`${API_BASE_URL}/job`;
export const Application_API_END_POINT=`${API_BASE_URL}/application`;
export const Company_API_END_POINT=`${API_BASE_URL}/company`;
