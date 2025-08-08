import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import '../../styles/App.css';
import { Form, Link, Outlet } from 'react-router-dom';

export default function RegisterDoc() {
	return (
		<>
			<div className='flex-row w-full h-full flex'>
				<div className='bg-nutrisys-background-200 w-half h-full justify-center flex'>
					<div className='w-fit h-fit justify-between items-center gap-y-10 flex flex-col mt-48'>
						<div className='flex flex-col items-start justify-center'>
							<span className='w-full text-center font-kodchasan font-bold text-nutrisys-primary-500 text-4xl'>
								Únete como nutriólogo
							</span>
							<br />
							<span className='w-full text-center font-montserrat font-normal text-xl'>
								Comparte tu experiencia y ayuda a más personas a
								mejorar su salud
							</span>
						</div>
						<div className='rounded-full bg-white items-center justify-center w-fit h-fit'>
							<FontAwesomeIcon
								icon={faUserDoctor}
								className='w-40 h-40 m-10 text-nutrisys-primary-500'
							/>
						</div>
					</div>
				</div>
				<div className='w-half h-full overflow-y-auto justify-center flex'>
					<form className='w-3quarter mb-20 h-fit flex mt-10 flex-col gap-y-5'>
						<span className='font-Kodchasan font-bold text-4xl text-nutrisys-primary-500 text-center'>
							Registro para Nutriólogos
						</span>
						<span className='font-montserrat font-bold text-lg'>
							Completa tus datos
						</span>
						<div className='flex flex-row gap-x-2'>
							<div className='flex flex-col w-half'>
								<span className='font-montserrat font-bold text-lg'>
									Nombres *
								</span>
								<input
									type='text'
									name='nombres'
									id='nombres'
									placeholder='Ej.: María José'
									className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
								/>
							</div>
							<div className='flex flex-col w-half'>
								<span className='font-montserrat font-bold text-lg'>
									Apellidos *
								</span>
								<input
									type='text'
									name='apellidos'
									id='apellidos'
									placeholder='Ej.: García López'
									className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
								/>
							</div>
						</div>
						<span className='font-montserrat font-bold text-lg text-nutrisys-primary-500'>
							Educación
						</span>
						<span className='font-montserrat font-bold text-lg'>
							Universidad *
						</span>
						<input
							type='text'
							name='universidad'
							id='universidad'
							placeholder='Ej.: Universidad Nacional Autónoma de Honduras'
							className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
						/>
						<span className='font-montserrat font-bold text-lg'>
							Título obtenido *
						</span>
						<input
							type='text'
							name='titulo'
							id='titulo'
							placeholder='Ej.: Licenciatura en Nutrición'
							className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
						/>
						<span className='font-montserrat font-bold text-lg text-nutrisys-primary-500'>
							Información del consultorio
						</span>
						<span className='font-montserrat font-bold text-lg'>
							Dirección
						</span>
						<input
							type='text'
							name='direccion-consultorio'
							id='direccion-consultorio'
							placeholder='Ej.: Av. Principal 123, Bo. El Centro'
							className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
						/>
						<span className='font-montserrat font-bold text-lg'>
							Teléfono del consultorio
						</span>
						<input
							type='text'
							name='telefono-consultorio'
							id='telefono-consultorio'
							placeholder='Ej.: +504 9999-9999'
							className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
						/>
						<span className='font-montserrat font-bold text-lg text-nutrisys-primary-500'>
							Información de la cuenta
						</span>
						<span className='font-montserrat font-bold text-lg'>
							Correo electrónico *
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
						<span className='font-montserrat font-bold text-lg'>
							Repetir contraseña
						</span>
						<input
							type='password'
							name='pwd-repeat'
							id='pwd-repeat'
							className='font-montserrat font-normal text-lg rounded-xl border-nutrisys-secondary-500 border-2 p-2'
						/>
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
								to='/select-register-type'
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
