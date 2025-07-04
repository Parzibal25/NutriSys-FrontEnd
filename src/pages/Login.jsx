import { useState } from 'react';
import nutrisysLogoNoText from '/logo/logo-no-text.svg';
import nutrisysLogoNoTextNegative from '/logo/logo-no-text-negative.svg';
import '../styles/App.css';

export default function Login() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className='bg-nutrisys-background-200 dark:bg-nutrisys-primary-500'>
				<a target='_blank'>
					<img
						src={nutrisysLogoNoText}
						className='logo'
						alt='nutrisys logo'
					/>
				</a>
			</div>
			<h1 className='font-kodchasan text-5xl dark:bg-black text-white'>
				NUTRISYS LOGIN
			</h1>
			<div className='card'>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}
