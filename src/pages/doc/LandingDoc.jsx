import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import '../../styles/App.css';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LandingDoc() {
	const [searchParams] = useSearchParams();
	const { user } = useAuth();
	useEffect(() => {
		const unauthorized = searchParams.get('unauthorized');
		if (unauthorized) {
			alert('No tienes permiso para acceder a esta página.');
		}
	}, [searchParams]);

	return (
		<>
			<div className='bg-nutrisys-background-200 rounded-2xl w-full h-full'>
				<span>Bienvenido {`${user.name}`}</span>
				<span>tipo usuario: {`${user.role}`}</span>
				<span>autenticado: {`${user.isAuthenticated}`}</span>
			</div>
		</>
	);
}
