import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import '../../styles/App.css';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LandingPx() {
	const [searchParams] = useSearchParams();
	const { user } = useAuth();

	// Datos simulados para el dashboard
	const dashboardData = {
		proxima_cita: '15/10/2025',
	};

	useEffect(() => {
		const unauthorized = searchParams.get('unauthorized');
		if (unauthorized) {
			alert('No tienes permiso para acceder a esta página.');
		}
	}, [searchParams]);

	return (
		<>
			<div
				id='content'
				className='bg-nutrisys-background-200 rounded-2xl w-full h-full p-6 overflow-y-auto flex flex-row'
			>
				<div className='flex flex-col items-center justify-center h-full w-1/2'>
					<FontAwesomeIcon
						icon={faUser}
						className='text-nutrisys-secondary-500 text-9xl mb-4'
						style={{
							filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))',
						}}
					/>
					<h1 className='text-4xl font-bold font-kodchasan text-nutrisys-secondary-500 mb-2'>
						¡Hola, {user.name}!
					</h1>
					<p className='text-lg text-black font-montserrat text-center'>
						Mantente en el camino hacia tus objetivos de salud.
					</p>
				</div>
				<div className='w-1/2 flex flex-col gap-y-8'>
					<div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-8'>
						<div className='bg-white rounded-2xl p-6 shadow-sm border border-transparent'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-black text-md font-montserrat'>
										Próxima cita
									</p>
									<p className='text-xl font-bold text-nutrisys-primary-500 font-kodchasan mt-2'>
										{dashboardData.proxima_cita}
									</p>
								</div>
								<div className='bg-green-100 p-3 rounded-full'>
									<FontAwesomeIcon
										icon={faCalendarDays}
										className='text-nutrisys-secondary-500 text-4xl'
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-2 font-montserrat items-stretch'>
						<div className='flex bg-nutrisys-secondary-500 border-2 border-b border-nutrisys-primary-500 col-span-2 rounded-t-2xl p-2 items-center justify-center flex-col'>
							<span className='font-bold font-kodchasan text-white text-lg'>
								Plan alimenticio del día
							</span>
							<span className='text-white text-md font-kodchasan'>
								{new Date().toLocaleDateString('es-ES', {
									weekday: 'long',
									day: '2-digit',
									month: 'long',
									year: 'numeric',
								})}
							</span>
						</div>
						<div className='bg-white border-l-2 border-r border-t border-b border-nutrisys-primary-500 flex items-center justify-center p-2 '>
							<span className='w-full h-full text-center font-semibold'>
								Desayuno
							</span>
						</div>
						<div className='bg-white border-r-2 border-l border-t border-b border-nutrisys-primary-500 flex items-center justify-center p-2 '>
							<span className='w-full h-full text-center font-normal'>
								Huevos revueltos, Espinaca y Jugo de naranja
							</span>
						</div>
						<div className='bg-white border-l-2 border-r border-t border-b border-nutrisys-primary-500 flex items-center justify-center p-2 '>
							<span className='w-full h-full text-center font-semibold'>
								Almuerzo
							</span>
						</div>
						<div className='bg-white border-r-2 border-l border-t border-b border-nutrisys-primary-500 flex items-center justify-center p-2 '>
							<span className='w-full h-full text-center font-normal'>
								Huevos
							</span>
						</div>
						<div className='bg-white border-l-2 border-r border-t border-b border-nutrisys-primary-500 flex items-center justify-center p-2 '>
							<span className='w-full h-full text-center font-semibold'>
								Merienda
							</span>
						</div>
						<div className='bg-white border-r-2 border-l border-t border-b border-nutrisys-primary-500 flex items-center justify-center p-2 '>
							<span className='w-full h-full text-center font-normal'>
								Huevos
							</span>
						</div>
						<div className='bg-white border-l-2 border-r border-t border-b rounded-bl-2xl border-nutrisys-primary-500 flex items-center justify-center p-2 '>
							<span className='w-full h-full text-center font-semibold'>
								Cena
							</span>
						</div>
						<div className='bg-white border-r-2 border-l border-t border-b-2 rounded-br-2xl border-nutrisys-primary-500 flex items-center justify-center p-2 '>
							<span className='w-full h-full text-center font-normal'>
								Huevos
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
