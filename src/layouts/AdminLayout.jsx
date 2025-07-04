import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import nutrisysLogoNoText from '/logo/logo-no-text.svg';

export default function AdminLayout() {
	const { user } = useAuth();

	return (
		<div>
			<nav className='bg-white p-4 flex justify-between items-center ml-4 mr-4'>
				<Link to='/' className='flex items-center'>
					<img
						src={nutrisysLogoNoText}
						className='logo'
						alt='nutrisys logo'
					/>
					<span className='ml-2 text-2xl font-kodchasan font-bold text-nutrisys-primary-500'>
						NUTRISYS
					</span>
				</Link>

				<div className='flex gap-4'>
					<Link
						to='/'
						className='bg-white border-nutrisys-primary-500 border-2 pt-1 pb-1 pl-2 pr-2 text-nutrisys-primary-500 rounded-2xl'
					>
						Inicia Sesión
					</Link>
					<Link
						to='/login'
						className='bg-nutrisys-primary-500 border-nutrisys-primary-500 text-white border-2 pt-1 pb-1 pl-2 pr-2 rounded-2xl'
					>
						Regístrate
					</Link>
				</div>
			</nav>
			<main className='pl-3 pr-3'>
				<Outlet />
			</main>
		</div>
	);
}
