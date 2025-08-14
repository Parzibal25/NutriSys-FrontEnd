import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		const storedUser = sessionStorage.getItem('user');
		return storedUser ? JSON.parse(storedUser) : null;
	});

	useEffect(() => {
		if (user) {
			sessionStorage.setItem('user', JSON.stringify(user));
		} else {
			sessionStorage.removeItem('user');
		}
	}, [user]);

	const login = (userData) => {
		setUser(userData); // userData: { role, isAuthenticated, name }
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
