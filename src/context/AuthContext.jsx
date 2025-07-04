import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	// Simulamos un usuario autenticado con un rol
	const [user, setUser] = useState({ isAuthenticated: true, role: 'doctor' }); // Cambia el rol a 'admin' o 'patient'

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
