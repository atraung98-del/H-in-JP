import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({ profileType }) {
  const { initializing, isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <p role="status">Restoring your session…</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (profileType && user.profile_type !== profileType) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
