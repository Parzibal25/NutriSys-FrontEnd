import { Link, Outlet } from 'react-router-dom';
import nutrisysLogoNoText from '/logo/logo-no-text.svg';
import '../styles/App.css';

export default function CleanLayout2() {
	return (
		<>
			<nav className='bg-transparent flex justify-between items-center h-20'>
				<div className='w-half bg-nutrisys-background-200 h-full p-4'>
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
				</div>

				<div className='w-half'></div>
			</nav>
			<main className='w-full flex-1 overflow-hidden'>
				<Outlet />
			</main>
		</>
	);
}
