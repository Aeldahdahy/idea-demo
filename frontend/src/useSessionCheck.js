import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const useSessionCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated: authIsAuthenticated, token } = useSelector((state) => state.auth);
  const { isAuthenticated: clientAuthIsAuthenticated } = useSelector((state) => state.clientAuth);

  const checkSession = useCallback(() => {
    // Skip checks for public routes
    const publicRoutes = [
      '/',
      '/invest',
      '/fundraising',
      '/stories',
      '/about',
      '/contact',
      '/client-portal/clientSignForm',
      '/employee-portal/employeeSignForm',
    ];
    if (publicRoutes.includes(location.pathname)) {
      return true;
    }

    // Check localStorage and Redux for token
    const authToken = localStorage.getItem('authToken');
    const hasValidToken = authToken || token;
    const isUserAuthenticated = authIsAuthenticated || clientAuthIsAuthenticated;

    // Validate JWT expiration if token exists
    let isTokenExpired = false;
    if (hasValidToken) {
      try {
        const decoded = JSON.parse(atob(hasValidToken.split('.')[1]));
        const expiry = decoded.exp * 1000;
        isTokenExpired = Date.now() > expiry;
      } catch (error) {
        console.error('Error decoding token:', error);
        isTokenExpired = true;
      }
    }

    // Log session status
    // console.log('Session Check:', {
    //   hasValidToken,
    //   isTokenExpired,
    //   isUserAuthenticated,
    //   pathname: location.pathname,
    // });

    // Redirect to appropriate sign-in page if no valid token
    if ((!hasValidToken || isTokenExpired) && !isUserAuthenticated) {
      console.warn('No valid session found. Redirecting to sign-in.');
      const targetPath = location.pathname.startsWith('/employee-portal')
        ? '/employee-portal/employeeSignForm'
        : '/client-portal/clientSignForm';
      navigate(targetPath, { replace: true });
      return false;
    }

    return true;
  }, [location.pathname, token, authIsAuthenticated, clientAuthIsAuthenticated, navigate]);

  useEffect(() => {
    checkSession();
    const intervalId = setInterval(checkSession, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [navigate, authIsAuthenticated, clientAuthIsAuthenticated, token, location.pathname, checkSession]);

  return checkSession;
};

export default useSessionCheck;