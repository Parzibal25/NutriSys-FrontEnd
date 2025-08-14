import { Link, Outlet } from 'react-router-dom';
import nutrisysLogoNoText from '/logo/logo-no-text.svg';
import '../styles/App.css';

export default function MainLayout() {
	return (
		<>
			<nav className='bg-white flex justify-between items-center pl-4 pr-4 h-24 w-full'>
				<Link to='/' className='flex items-center horizontal-logo'>
					<img
						src={nutrisysLogoNoText}
						className='logo'
						alt='nutrisys logo'
					/>
					<span className='ml-2 text-2xl font-kodchasan font-bold text-nutrisys-primary-500'>
						NUTRISYS
					</span>
				</Link>

				<div className='flex gap-4 justify-end max-w-half'>
					<Link
						to='/login'
						className='flex bg-white border-nutrisys-primary-500 border-2 pt-1 pb-1 pl-2 pr-2 text-nutrisys-primary-500 rounded-2xl font-kodchasan font-bold text-center'
					>
						Inicia Sesión
					</Link>
					<Link
						to='/register/select-type'
						className='flex bg-nutrisys-primary-500 border-nutrisys-primary-500 text-white border-2 pt-1 pb-1 pl-2 pr-2 rounded-2xl font-kodchasan font-bold text-center items-center'
					>
						Regístrate
					</Link>
				</div>
			</nav>
			<main className='w-full min-h-fit overflow-x-hidden overflow-y-auto'>
				<Outlet />
			</main>
		</>
	);
}
