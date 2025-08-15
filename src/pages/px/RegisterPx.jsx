import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../../styles/App.css';
import { Form, Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function RegisterPx() {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		p_nombre: '',
		s_nombre: '',
		p_apellido: '',
		s_apellido: '',
		email: '',
		password: '',
		password_repeat: '',
		fecha_nacimiento: '',
		genero: '',
		estatura_cm: '',
		peso_kg: '',
		nivel_actividad: '',
	});
	function handleRegister(event) {
		event.preventDefault();

		try {
			const {
				p_nombre,
				s_nombre,
				p_apellido,
				s_apellido,
				email,
				password,
				password_repeat,
				fecha_nacimiento,
				genero,
				estatura_cm,
				peso_kg,
				nivel_actividad,
			} = userData;

			if (password !== password_repeat) {
				alert('Las contraseñas no coinciden.');
				return;
			}

			fetch('http://127.0.0.1:8000/api/usuarios/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password,
					rol: 'cliente',
				}),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error('Error al registrar el usuario');
					}
					return response.json();
				})
				.then((data) => {
					fetch('http://127.0.0.1:8000/api/clientes/', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							nombres: `${p_nombre} ${s_nombre}`,
							apellidos: `${p_apellido} ${s_apellido}`,
							fecha_nacimiento,
							genero,
							estatura_cm,
							peso_kg,
							nivel_actividad,
							usuario: data.id,
						}),
					}).then((response) => {
						if (!response.ok) {
							throw new Error('Error al registrar el cliente');
						}
						alert('Usuario registrado exitosamente.');
						navigate('/login');
					});
				});
		} catch (error) {
			alert('Error al registrar el usuario: ' + error.message);
			console.error('Error al registrar el usuario:', error);
			return;
		}
	}

	return (
		<>
			<div className='flex-row w-full h-full flex'>
				<div className='bg-nutrisys-background-200 w-half h-full justify-center flex'>
					<div className='w-fit h-fit justify-between items-center gap-y-10 flex flex-col mt-48'>
						<div className='flex flex-col items-start justify-center'>
							<span className='w-full text-center font-kodchasan font-bold text-nutrisys-primary-500 text-4xl'>
								Comienza tu viaje saludable
							</span>
							<br />
							<span className='w-full text-center font-montserrat font-normal text-xl'>
								Registrate para encontrar el nutriologo perfecto
								para ti
							</span>
						</div>
						<div className='rounded-full bg-white items-center justify-center w-fit h-fit'>
							<FontAwesomeIcon
								icon={faUser}
								className='w-40 h-40 m-10 text-nutrisys-primary-500'
							/>
						</div>
					</div>
				</div>
				<div className='w-half h-full overflow-y-auto justify-center flex'>
					<form
						className='w-3/4 mb-20 h-fit flex mt-10 flex-col gap-y-5'
						onSubmit={handleRegister}
					>
						<span className='font-Kodchasan font-bold text-4xl text-nutrisys-primary-500 text-center'>
							Registro de usuario
						</span>
						<span className='font-montserrat font-normal text-base text-center'>
							Es rapido y fácil
						</span>
						<div className='flex flex-row gap-x-2'>
							<div className='flex flex-col w-half'>
								<span className='font-montserrat font-bold text-lg'>
									Primer nombre *
								</span>
								<input
									type='text'
									name='p_nombre'
									required
									id='p_nombre'
									value={userData.p_nombre}
									onChange={(e) =>
										setUserData({
											...userData,
											p_nombre: e.target.value,
										})
									}
									placeholder='Ej.: María'
									className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
								/>
							</div>
							<div className='flex flex-col w-half'>
								<span className='font-montserrat font-bold text-lg'>
									Segundo nombre
								</span>
								<input
									type='text'
									name='s_nombre'
									id='s_nombre'
									value={userData.s_nombre}
									onChange={(e) =>
										setUserData({
											...userData,
											s_nombre: e.target.value,
										})
									}
									placeholder='Ej.: José'
									className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
								/>
							</div>
						</div>
						<div className='flex flex-row gap-x-2'>
							<div className='flex flex-col w-half'>
								<span className='font-montserrat font-bold text-lg'>
									Primer apellido *
								</span>
								<input
									type='text'
									name='p_apellido'
									id='p_apellido'
									required
									value={userData.p_apellido}
									onChange={(e) =>
										setUserData({
											...userData,
											p_apellido: e.target.value,
										})
									}
									placeholder='Ej.: García'
									className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
								/>
							</div>
							<div className='flex flex-col w-half'>
								<span className='font-montserrat font-bold text-lg'>
									Segundo apellido
								</span>
								<input
									type='text'
									name='s_apellido'
									id='s_apellido'
									value={userData.s_apellido}
									onChange={(e) =>
										setUserData({
											...userData,
											s_apellido: e.target.value,
										})
									}
									placeholder='Ej.: García'
									className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
								/>
							</div>
						</div>
						<span className='font-montserrat font-bold text-lg'>
							Correo electrónico *
						</span>
						<input
							type='email'
							name='email'
							id='email'
							required
							value={userData.email}
							onChange={(e) =>
								setUserData({
									...userData,
									email: e.target.value,
								})
							}
							placeholder='user@mail.com'
							className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
						/>
						<span className='font-montserrat font-bold text-lg'>
							Contraseña *
						</span>
						<input
							type='password'
							name='password'
							id='password'
							required
							value={userData.password}
							onChange={(e) =>
								setUserData({
									...userData,
									password: e.target.value,
								})
							}
							className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
						/>
						<span className='font-montserrat font-bold text-lg'>
							Repetir contraseña *
						</span>
						<input
							type='password'
							name='password_repeat'
							id='password_repeat'
							required
							value={userData.password_repeat}
							onChange={(e) =>
								setUserData({
									...userData,
									password_repeat: e.target.value,
								})
							}
							className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
						/>
						<div className='grid grid-cols-2 md:grid-cols-3 items-stretch font-montserrat gap-2'>
							<div className='flex flex-col'>
								<span className='font-bold'>
									Fecha de nacimiento *
								</span>
								<input
									type='date'
									name='fecha_nacimiento'
									id='fecha_nacimiento'
									required
									value={userData.fecha_nacimiento}
									onChange={(e) =>
										setUserData({
											...userData,
											fecha_nacimiento: e.target.value,
										})
									}
									className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
								/>
							</div>
							<div className='flex flex-col'>
								<span className='font-bold'>Genero *</span>
								<select
									name='genero'
									id='genero'
									value={userData.genero}
									required
									onChange={(e) =>
										setUserData({
											...userData,
											genero: e.target.value,
										})
									}
									className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
								>
									<option value='' disabled>
										Selecciona una opción
									</option>
									<option value='F'>Femenino</option>
									<option value='M'>Masculino</option>
									<option value='O'>Otro</option>
								</select>
							</div>
							<div className='flex flex-col'>
								<span className='font-bold'>
									Estatura (cm) *
								</span>
								<input
									type='number'
									name='estatura_cm'
									id='estatura_cm'
									required
									value={userData.estatura_cm}
									onChange={(e) =>
										setUserData({
											...userData,
											estatura_cm: e.target.value,
										})
									}
									placeholder='Ej.: 170'
									className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
								/>
							</div>
							<div className='flex flex-col'>
								<span className='font-bold'>Peso (kg) *</span>
								<input
									type='number'
									name='peso_kg'
									id='peso_kg'
									required
									value={userData.peso_kg}
									onChange={(e) =>
										setUserData({
											...userData,
											peso_kg: e.target.value,
										})
									}
									placeholder='Ej.: 70'
									className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
								/>
							</div>
							<div className='flex flex-col'>
								<span className='font-bold'>
									Nivel de actividad *
								</span>
								<select
									name='nivel_actividad'
									id='nivel_actividad'
									value={userData.nivel_actividad}
									required
									onChange={(e) =>
										setUserData({
											...userData,
											nivel_actividad: e.target.value,
										})
									}
									className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
								>
									<option value='' disabled>
										Selecciona una opción
									</option>
									<option value='Bajo'>Bajo</option>
									<option value='Moderado'>Moderado</option>
									<option value='Alto'>Alto</option>
								</select>
							</div>
						</div>
						<button
							type='submit'
							className='font-montserrat font-bold text-md bg-nutrisys-primary-500 text-white rounded-xl p-2'
						>
							Crear cuenta
						</button>
						<span className='font-montserrat font-normal text-sm text-center'>
							¿Ya tienes una cuenta?{' '}
							<Link
								className='font-montserrat font-bold text-sm text-nutrisys-primary-500'
								to='/login'
							>
								Inicia sesión
							</Link>
						</span>
					</form>
				</div>
			</div>
		</>
	);
}
