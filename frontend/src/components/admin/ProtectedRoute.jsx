import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  // ❌ agar user nahi hai → login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ agar recruiter nahi hai → home page
  if (user.role !== "recruiter") {
    return <Navigate to="/" replace />;
  }

  // ✅ sab sahi hai → page dikhao
  return children;
};

export default ProtectedRoute;