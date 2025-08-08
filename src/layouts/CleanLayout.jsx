import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import nutrisysLogoNoText from '/logo/logo-no-text.svg';

export default function CleanLayout() {
	const { user } = useAuth();

	return (
		<>
			<nav className='bg-transparent p-4 flex justify-between items-center ml-4 mr-4'>
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

				<div className='flex gap-4'></div>
			</nav>
			<main className='w-full h-full'>
				<Outlet />
			</main>
		</>
	);
}
