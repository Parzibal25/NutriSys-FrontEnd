import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({ allowedRoles, children }) {
	const { user } = useAuth();

	if (!user || !user.isAuthenticated) {
		return <Navigate to='/login/' />;
	}

	if (allowedRoles && !allowedRoles.includes(user.role)) {
		if (user.role === 'paciente') {
			return <Navigate to='/px/landing?unauthorized=true' />;
		} else if (user.role === 'doctor') {
			return <Navigate to='/doc/landing?unauthorized=true' />;
		} else if (user.role === 'admin') {
			return <Navigate to='/admin/landing?unauthorized=true' />;
		}
	}

	return children;
}
