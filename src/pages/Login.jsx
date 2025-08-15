import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/App.css';
import { Form, Link, Outlet } from 'react-router-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	useEffect(() => {
		const unauthorized = searchParams.get('unauthorized');
		const unauthenticaded = searchParams.get('unauthenticaded');
		if (unauthorized) {
			alert('No tienes permiso para acceder a esta página.');
		}
		if (unauthenticaded) {
			alert('Inicia sesion para acceder a esa pagina.');
		}
	}, [searchParams]);

	function handleLogin(event) {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.pwd.value;

		fetch('http://127.0.0.1:8000/api/api/token/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: email, password: password }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Credenciales incorrectas');
				}
				return response.json();
				console.log(response);
			})
			.then((data) => {
				sessionStorage.setItem('accessToken', data.access);
				sessionStorage.setItem('refreshToken', data.refresh);
				sessionStorage.setItem('rol', data.rol);

				if (data.rol === 'cliente') {
					login({
						role: 'paciente',
						isAuthenticated: true,
						name: 'user.name',
					});
					navigate('/px/landing');
				} else if (data.rol === 'nutricionista') {
					login({
						role: 'doctor',
						isAuthenticated: true,
						name: 'user.name',
					});
					navigate('/doc/landing');
				} else if (data.rol === 'admin') {
					login({
						role: 'admin',
						isAuthenticated: true,
						name: 'user.name',
					});
					navigate('/admin/landing');
				} else {
					alert('El rol del usuario no es válido.');
				}
			})
			.catch((error) => {
				console.error('Error al iniciar sesión:', error);
				alert(
					'Error al iniciar sesión. Por favor, inténtalo de nuevo.'
				);
			});
	}

	return (
		<>
			<div className='flex-row w-full h-full flex'>
				<div className='bg-nutrisys-background-200 w-half h-full justify-center flex'>
					<div className='w-fit h-fit justify-between items-center gap-y-10 flex flex-col mt-48'>
						<span className='font-kodchasan font-bold text-nutrisys-primary-500 text-4xl'>
							Bienvenido de vuelta
						</span>
						<span className='font-montserrat font-normal text-xl'>
							Inicia sesión para continuar conectando con tu salud
						</span>
						<div className='rounded-full bg-white items-center'>
							<FontAwesomeIcon
								icon={faUser}
								className='w-40 h-40 m-10 text-nutrisys-primary-500'
							/>
						</div>
					</div>
				</div>
				<div className='w-half h-full overflow-y-auto justify-center flex'>
					<form
						className='w-half h-fit flex mt-36 flex-col gap-y-5'
						onSubmit={handleLogin}
					>
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
								to='/register/select-type'
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
