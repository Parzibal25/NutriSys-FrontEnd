import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/App.css';
import { Form, Link, Outlet } from 'react-router-dom';

export default function Login() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className='flex-row w-full h-full flex'>
				<div className='bg-nutrisys-background-200 w-half h-full justify-center flex'>
					<div className='w-fit h-fit justify-between gap-10 flex mt-48'>
						<div className='flex flex-col items-start justify-center'>
							<span className='font-kodchasan font-bold text-nutrisys-primary-500 text-4xl'>
								Bienvenido de vuelta
							</span>
							<br />
							<span className='font-montserrat font-normal text-xl'>
								Inicia sesión para continuar conectando con tu
								salud
							</span>
						</div>
						<div className='rounded-full bg-white items-center'>
							<FontAwesomeIcon
								icon={faUser}
								className='w-40 h-40 m-10 text-nutrisys-primary-500'
							/>
						</div>
					</div>
				</div>
				<div className='w-half h-full justify-center flex'>
					<form className='w-third h-fit flex mt-36 flex-col gap-y-5'>
						<span className='font-Kodchasan font-bold text-4xl text-nutrisys-primary-500 text-center'>
							Iniciar Sesión
						</span>
						<span className='font-montserrat font-bold text-lg'>
							Correo electrónico
						</span>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='user@mail.com'
							className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
						/>
						<span className='font-montserrat font-bold text-lg'>
							Contraseña
						</span>
						<input
							type='password'
							name='pwd'
							id='pwd'
							className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
						/>
						<Link className='font-montserrat font-normal text-sm text-right'>
							¿Olvidaste tu contraseña?
						</Link>
						<button
							type='submit'
							className='font-montserrat font-bold text-md bg-nutrisys-primary-500 text-white rounded-xl p-2'
						>
							Iniciar sesión
						</button>
						<span className='font-montserrat font-normal text-sm text-center'>
							¿No tienes una cuenta?{' '}
							<Link
								className='font-montserrat font-bold text-sm text-nutrisys-primary-500'
								to='/select-register-type'
							>
								Regístrate
							</Link>
						</span>
					</form>
				</div>
			</div>
		</>
	);
}
