import { Link, Outlet, useLocation } from 'react-router-dom';
import nutrisysLogoNoText from '/logo/logo-no-text.svg';

export default function DocLayout() {
	const location = useLocation();

	return (
		<>
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
						to='/doc/landing'
						className={`${
							location.pathname === '/doc/landing'
								? 'bg-nutrisys-primary-500 text-white'
								: 'bg-white text-nutrisys-primary-500'
						} border-nutrisys-primary-500 border-2 pt-1 pb-1 pl-2 pr-2 rounded-2xl button`}
					>
						Inicio
					</Link>
					<Link
						to='/doc/marketplace'
						className={`${
							location.pathname === '/doc/marketplace'
								? 'bg-nutrisys-primary-500 text-white'
								: 'bg-white text-nutrisys-primary-500'
						} border-nutrisys-primary-500 border-2 pt-1 pb-1 pl-2 pr-2 rounded-2xl button`}
					>
						Marketplace
					</Link>
					<Link
						to='/doc/agenda'
						className={`${
							location.pathname === '/doc/agenda'
								? 'bg-nutrisys-primary-500 text-white'
								: 'bg-white text-nutrisys-primary-500'
						} border-nutrisys-primary-500 border-2 pt-1 pb-1 pl-2 pr-2 rounded-2xl button`}
					>
						Agenda
					</Link>
					<Link
						to='/doc/pacientes'
						className={`${
							location.pathname === '/doc/pacientes'
								? 'bg-nutrisys-primary-500 text-white'
								: 'bg-white text-nutrisys-primary-500'
						} border-nutrisys-primary-500 border-2 pt-1 pb-1 pl-2 pr-2 rounded-2xl button`}
					>
						Pacientes
					</Link>
					<Link
						to='/doc/perfil'
						className={`${
							location.pathname === '/doc/perfil'
								? 'bg-nutrisys-primary-500 text-white'
								: 'bg-white text-nutrisys-primary-500'
						} border-nutrisys-primary-500 border-2 pt-1 pb-1 pl-2 pr-2 rounded-2xl button`}
					>
						Perfil
					</Link>
				</div>
			</nav>
			<main className='w-full h-full p-5'>
				<Outlet />
			</main>
		</>
	);
}
