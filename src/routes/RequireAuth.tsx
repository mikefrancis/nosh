import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface RequireAuthProps {
  children?: ReactNode;
}

/**
 * RequireAuth component - Route guard for protected routes
 * 
 * This is a placeholder implementation. In a real application, you would:
 * 1. Check authentication state from your auth context/store
 * 2. Redirect to /login if not authenticated
 * 3. Show loading state while checking auth
 * 
 * Example usage in routes:
 * <Route element={<RequireAuth />}>
 *   <Route path="/protected" element={<ProtectedPage />} />
 * </Route>
 */
const RequireAuth = ({ children }: RequireAuthProps) => {
  // Placeholder: Replace with actual auth check
  // const { isAuthenticated, isLoading } = useAuth();
  
  const isAuthenticated = true; // Placeholder - always allow for now
  
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  // If children are provided, render them, otherwise render Outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
};

export default RequireAuth;
