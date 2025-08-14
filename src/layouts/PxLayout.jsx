import { Link, Outlet, useLocation } from 'react-router-dom';
import nutrisysLogoNoText from '/logo/logo-no-text.svg';

export default function PxLayout() {
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
						to='/px/landing'
						className={`${
							location.pathname === '/px/landing'
								? 'bg-nutrisys-primary-500 text-white'
								: 'bg-white text-nutrisys-primary-500'
						} border-nutrisys-primary-500 border-2 pt-1 pb-1 pl-2 pr-2 rounded-2xl button`}
					>
						Inicio
					</Link>
					<Link
						to='/px/marketplace'
						className={`${
							location.pathname === '/px/marketplace'
								? 'bg-nutrisys-primary-500 text-white'
								: 'bg-white text-nutrisys-primary-500'
						} border-nutrisys-primary-500 border-2 pt-1 pb-1 pl-2 pr-2 rounded-2xl button`}
					>
						Marketplace
					</Link>
					<Link
						to='/px/plan'
						className={`${
							location.pathname === '/px/plan'
								? 'bg-nutrisys-primary-500 text-white'
								: 'bg-white text-nutrisys-primary-500'
						} border-nutrisys-primary-500 border-2 pt-1 pb-1 pl-2 pr-2 rounded-2xl button`}
					>
						Plan alimenticio
					</Link>
					<Link
						to='/px/nutricionista'
						className={`${
							location.pathname === '/px/nutricionista'
								? 'bg-nutrisys-primary-500 text-white'
								: 'bg-white text-nutrisys-primary-500'
						} border-nutrisys-primary-500 border-2 pt-1 pb-1 pl-2 pr-2 rounded-2xl button`}
					>
						Mi nutricionista
					</Link>
					<Link
						to='/px/perfil'
						className={`${
							location.pathname === '/px/perfil'
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
