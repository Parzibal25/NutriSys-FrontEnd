import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({ children, allowedRoles }) {
	const { user } = useAuth();

	if (!user.isAuthenticated) {
		return <Navigate to='/' />;
	}

	if (!allowedRoles.includes(user.role)) {
		return <Navigate to='/unauthorized' />;
	}

	return children;
}
