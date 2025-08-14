import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import '../../styles/App.css';
import { useSearchParams } from 'react-router-dom';

export default function LandingPx() {
	const [searchParams] = useSearchParams();
	useEffect(() => {
		const unauthorized = searchParams.get('unauthorized');
		if (unauthorized) {
			alert('No tienes permiso para acceder a esta página.');
		}
	}, [searchParams]);
	return <h1>Bienvenido, Paciente</h1>;
}
