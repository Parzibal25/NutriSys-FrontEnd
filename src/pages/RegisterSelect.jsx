import '../styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';

export default function RegisterSelect() {
	return (
		<>
			<div className='flex flex-col h-full'>
				<span className='font-kodchasan font-bold text-5xl w-full text-center mb-20 mt-8 bg-gradient-to-b from-nutrisys-primary-500 to-nutrisys-secondary-500 bg-clip-text text-transparent'>
					REGÍSTRATE
				</span>
				<div className='gap-20 h-full justify-center w-full flex'>
					<Link
						to='/register-as-doctor'
						className='bg-nutrisys-background-200 rounded-3xl flex items-center flex-col w-80 h-min p-8'
					>
						<FontAwesomeIcon
							icon={faUserDoctor}
							className='w-52 h-52 mb-8 text-nutrisys-secondary-500'
						/>
						<span className='font-kodchasan font-bold text-4xl text-nutrisys-secondary-500 text-center mb-8'>
							NUTRIÓLOGO
						</span>
						<span className='font-montserrat font-normal text-2xl text-nutrisys-secondary-500 text-center'>
							Brinda tus servicios
						</span>
					</Link>
					<Link
						to='/register-as-patient'
						className='bg-nutrisys-background-200 rounded-3xl flex items-center flex-col w-80 h-min p-8'
					>
						<FontAwesomeIcon
							icon={faUser}
							className='w-52 h-52 mb-8 text-nutrisys-primary-500'
						/>
						<span className='font-kodchasan font-bold text-4xl text-nutrisys-primary-500 text-center mb-8'>
							PACIENTE
						</span>
						<span className='font-montserrat font-normal text-2xl text-nutrisys-primary-500 text-center'>
							Mejora tu salud
						</span>
					</Link>
				</div>
			</div>
		</>
	);
}
