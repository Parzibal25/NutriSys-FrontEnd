import nutrisysLogo from '/logo/logo.svg';
import '../styles/App.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
	const { user } = useAuth();
	const navigate = useNavigate();
	function redirect() {
		if (user.isAuthenticated) {
			if (user.role === 'patient') {
				navigate('/px/landing');
			} else if (user.role === 'doctor') {
				navigate('/doc/landing');
			} else if (user.role === 'admin') {
				navigate('/admin/landing');
			}
		} else {
			navigate('/');
		}
	}
	return (
		<div className='flex flex-col items-center justify-center h-screen text-center bg-nutrisys-background-200'>
			<div className='flex flex-row items-center justify-center mb-8'>
				<img
					src={nutrisysLogo}
					alt='NutriSys Logo'
					className='w-80 h-80'
				/>
				<div className='flex flex-col items-center justify-center ml-8'>
					<h1 className='text-8xl font-bold font-kodchasan text-error'>
						ERROR 404
					</h1>
					<p className='text-4xl mt-4 font-kodchasan text-nutrisys-primary-500'>
						ESTA PÁGINA NO EXISTE
					</p>
					<button
						onClick={redirect}
						className='button font-kodchasan font-bold text-xl w-fit mt-5 text-nutrisys-primary-500 border-nutrisys-primary-500 border-2 pt-2 pb-2 pl-4 pr-4 rounded-2xl hover:bg-nutrisys-primary-500 hover:text-white transition-colors'
					>
						Ir a inicio
					</button>
				</div>
			</div>
		</div>
	);
}
