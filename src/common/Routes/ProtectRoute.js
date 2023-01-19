import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";
function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector(selectUser);
    return !isAuthenticated ? children : <Navigate to="/" />;
  }
  
  export default ProtectedRoute;