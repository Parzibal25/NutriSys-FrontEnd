import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserDoctor,
	faEdit,
	faPlus,
	faTrash,
	faEye,
	faEyeSlash,
	faCheck,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/App.css';
import { Form, Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePx() {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [isEditing, setIsEditing] = useState(false);
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// Estados para los datos del perfil
	const [profileData, setProfileData] = useState({
		firstName: 'María',
		secondName: 'Elena',
		firstLastName: 'González',
		secondLastName: 'Rodríguez',
		email: 'maria.gonzalez@email.com',
		phone: '+504 9876-5432',
		dni: '0801-1990-12345',
		consultoryAddress: 'Colonia Palmira, Bloque M, Casa 15',
		consultoryPhone: '+504 2234-5678',
		degrees: [
			{
				university: 'Universidad Nacional Autónoma de Honduras',
				degree: 'Licenciatura en Nutrición',
			},
			{
				university: 'Universidad Católica de Honduras',
				degree: 'Maestría en Nutrición Clínica',
			},
		],
	});

	// Estados para el modal de contraseña
	const [passwordData, setPasswordData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});

	function handleLogout() {
		logout();
		navigate('/login');
	}

	function handleInputChange(field, value) {
		setProfileData((prev) => ({
			...prev,
			[field]: value,
		}));
	}

	function handleDegreeChange(index, field, value) {
		setProfileData((prev) => ({
			...prev,
			degrees: prev.degrees.map((degree, i) =>
				i === index ? { ...degree, [field]: value } : degree
			),
		}));
	}

	function addDegree() {
		setProfileData((prev) => ({
			...prev,
			degrees: [...prev.degrees, { university: '', degree: '' }],
		}));
	}

	function removeDegree(index) {
		setProfileData((prev) => ({
			...prev,
			degrees: prev.degrees.filter((_, i) => i !== index),
		}));
	}

	function handleSave() {
		// Aquí iría la lógica para guardar los datos
		console.log('Guardando datos:', profileData);
		setIsEditing(false);
	}

	function handlePasswordChange() {
		if (passwordData.newPassword !== passwordData.confirmPassword) {
			alert('Las contraseñas nuevas no coinciden');
			return;
		}
		// Aquí iría la lógica para cambiar la contraseña
		console.log('Cambiando contraseña');
		setPasswordData({
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		});
		setShowPasswordModal(false);
	}

	return (
		<>
			<div
				id='content'
				className='bg-nutrisys-background-200 rounded-2xl w-full h-full p-6 relative overflow-y-auto'
			>
				{/* Header */}
				<div className='flex justify-between items-center mb-6'>
					<div className='flex items-center gap-3'>
						<FontAwesomeIcon
							icon={faUserDoctor}
							className='text-nutrisys-primary-500 text-2xl'
						/>
						<h1 className='text-2xl font-bold text-nutrisys-primary-700'>
							Mi Perfil
						</h1>
					</div>
					<div className='flex gap-3'>
						{!isEditing ? (
							<button
								type='button'
								className='button bg-nutrisys-primary-500 text-white flex items-center gap-2'
								onClick={() => setIsEditing(true)}
							>
								<FontAwesomeIcon icon={faEdit} />
								Editar Perfil
							</button>
						) : (
							<>
								<button
									type='button'
									className='button bg-green-500 text-white flex items-center gap-2'
									onClick={handleSave}
								>
									<FontAwesomeIcon icon={faCheck} />
									Guardar
								</button>
								<button
									type='button'
									className='button bg-gray-500 text-white flex items-center gap-2'
									onClick={() => setIsEditing(false)}
								>
									<FontAwesomeIcon icon={faTimes} />
									Cancelar
								</button>
							</>
						)}
						<button
							type='button'
							className='button bg-nutrisys-secondary-500 text-white'
							onClick={handleLogout}
						>
							Cerrar Sesión
						</button>
					</div>
				</div>

				{/* Formulario */}
				<div className='bg-transparent border-0 rounded-xl p-6 space-y-6 mb-10'>
					{/* Datos Personales */}
					<div>
						<h2 className='text-xl font-semibold text-nutrisys-primary-700 mb-4 border-b border-gray-200 pb-2'>
							Datos Personales
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Primer Nombre
								</label>
								<input
									type='text'
									value={profileData.firstName}
									onChange={(e) =>
										handleInputChange(
											'firstName',
											e.target.value
										)
									}
									disabled={!isEditing}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500 disabled:bg-gray-50'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Segundo Nombre
								</label>
								<input
									type='text'
									value={profileData.secondName}
									onChange={(e) =>
										handleInputChange(
											'secondName',
											e.target.value
										)
									}
									disabled={!isEditing}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500 disabled:bg-gray-50'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Primer Apellido
								</label>
								<input
									type='text'
									value={profileData.firstLastName}
									onChange={(e) =>
										handleInputChange(
											'firstLastName',
											e.target.value
										)
									}
									disabled={!isEditing}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500 disabled:bg-gray-50'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Segundo Apellido
								</label>
								<input
									type='text'
									value={profileData.secondLastName}
									onChange={(e) =>
										handleInputChange(
											'secondLastName',
											e.target.value
										)
									}
									disabled={!isEditing}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500 disabled:bg-gray-50'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									DNI
								</label>
								<input
									type='text'
									value={profileData.dni}
									onChange={(e) =>
										handleInputChange('dni', e.target.value)
									}
									disabled={!isEditing}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500 disabled:bg-gray-50'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Teléfono Personal
								</label>
								<input
									type='text'
									value={profileData.phone}
									onChange={(e) =>
										handleInputChange(
											'phone',
											e.target.value
										)
									}
									disabled={!isEditing}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500 disabled:bg-gray-50'
								/>
							</div>
						</div>
					</div>

					{/* Datos de Contacto */}
					<div>
						<h2 className='text-xl font-semibold text-nutrisys-primary-700 mb-4 border-b border-gray-200 pb-2'>
							Datos de Contacto
						</h2>
						<div className='grid grid-cols-1 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Email
								</label>
								<input
									type='email'
									value={profileData.email}
									onChange={(e) =>
										handleInputChange(
											'email',
											e.target.value
										)
									}
									disabled={!isEditing}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500 disabled:bg-gray-50'
								/>
							</div>
							<div className='flex items-end gap-2'>
								<div className='flex-1'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Contraseña
									</label>
									<input
										type='password'
										value='••••••••'
										disabled
										className='w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50'
									/>
								</div>
								<button
									type='button'
									className='button bg-nutrisys-primary-500 text-white px-4 py-2'
									onClick={() => setShowPasswordModal(true)}
								>
									Cambiar Contraseña
								</button>
							</div>
						</div>
					</div>

					{/* Datos del Consultorio */}
					<div>
						<h2 className='text-xl font-semibold text-nutrisys-primary-700 mb-4 border-b border-gray-200 pb-2'>
							Datos del Consultorio
						</h2>
						<div className='grid grid-cols-1 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Dirección del Consultorio
								</label>
								<textarea
									value={profileData.consultoryAddress}
									onChange={(e) =>
										handleInputChange(
											'consultoryAddress',
											e.target.value
										)
									}
									disabled={!isEditing}
									rows={3}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500 disabled:bg-gray-50 resize-none'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Teléfono del Consultorio
								</label>
								<input
									type='text'
									value={profileData.consultoryPhone}
									onChange={(e) =>
										handleInputChange(
											'consultoryPhone',
											e.target.value
										)
									}
									disabled={!isEditing}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500 disabled:bg-gray-50'
								/>
							</div>
						</div>
					</div>

					{/* Formación Académica */}
					<div>
						<div className='flex justify-between items-center mb-4'>
							<h2 className='text-xl font-semibold text-nutrisys-primary-700 border-b border-gray-200 pb-2'>
								Formación Académica
							</h2>
							{isEditing && (
								<button
									type='button'
									className='button bg-green-500 text-white flex items-center gap-2 px-3 py-2 text-sm'
									onClick={addDegree}
								>
									<FontAwesomeIcon icon={faPlus} />
									Agregar Título
								</button>
							)}
						</div>
						<div className='space-y-4'>
							{profileData.degrees.map((degree, index) => (
								<div
									key={index}
									className='p-4 border border-gray-200 rounded-lg'
								>
									<div className='flex justify-between items-start mb-3'>
										<h3 className='font-medium text-gray-800'>
											Título {index + 1}
										</h3>
										{isEditing &&
											profileData.degrees.length > 1 && (
												<button
													type='button'
													className='text-red-500 hover:text-red-700 p-1'
													onClick={() =>
														removeDegree(index)
													}
												>
													<FontAwesomeIcon
														icon={faTrash}
													/>
												</button>
											)}
									</div>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Universidad
											</label>
											<input
												type='text'
												value={degree.university}
												onChange={(e) =>
													handleDegreeChange(
														index,
														'university',
														e.target.value
													)
												}
												disabled={!isEditing}
												className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500 disabled:bg-gray-50'
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Título Obtenido
											</label>
											<input
												type='text'
												value={degree.degree}
												onChange={(e) =>
													handleDegreeChange(
														index,
														'degree',
														e.target.value
													)
												}
												disabled={!isEditing}
												className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500 disabled:bg-gray-50'
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Modal para cambiar contraseña */}
				{showPasswordModal && (
					<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
						<div className='bg-white rounded-xl p-6 w-full max-w-md mx-4'>
							<h3 className='text-xl font-semibold text-nutrisys-primary-700 mb-4'>
								Cambiar Contraseña
							</h3>
							<div className='space-y-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Contraseña Actual
									</label>
									<div className='relative'>
										<input
											type={
												showCurrentPassword
													? 'text'
													: 'password'
											}
											value={passwordData.currentPassword}
											onChange={(e) =>
												setPasswordData((prev) => ({
													...prev,
													currentPassword:
														e.target.value,
												}))
											}
											className='w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500'
										/>
										<button
											type='button'
											className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
											onClick={() =>
												setShowCurrentPassword(
													!showCurrentPassword
												)
											}
										>
											<FontAwesomeIcon
												icon={
													showCurrentPassword
														? faEyeSlash
														: faEye
												}
											/>
										</button>
									</div>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Nueva Contraseña
									</label>
									<div className='relative'>
										<input
											type={
												showNewPassword
													? 'text'
													: 'password'
											}
											value={passwordData.newPassword}
											onChange={(e) =>
												setPasswordData((prev) => ({
													...prev,
													newPassword: e.target.value,
												}))
											}
											className='w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500'
										/>
										<button
											type='button'
											className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
											onClick={() =>
												setShowNewPassword(
													!showNewPassword
												)
											}
										>
											<FontAwesomeIcon
												icon={
													showNewPassword
														? faEyeSlash
														: faEye
												}
											/>
										</button>
									</div>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Confirmar Nueva Contraseña
									</label>
									<div className='relative'>
										<input
											type={
												showConfirmPassword
													? 'text'
													: 'password'
											}
											value={passwordData.confirmPassword}
											onChange={(e) =>
												setPasswordData((prev) => ({
													...prev,
													confirmPassword:
														e.target.value,
												}))
											}
											className='w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-nutrisys-primary-500 focus:border-nutrisys-primary-500'
										/>
										<button
											type='button'
											className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
											onClick={() =>
												setShowConfirmPassword(
													!showConfirmPassword
												)
											}
										>
											<FontAwesomeIcon
												icon={
													showConfirmPassword
														? faEyeSlash
														: faEye
												}
											/>
										</button>
									</div>
								</div>
							</div>
							<div className='flex gap-3 mt-6'>
								<button
									type='button'
									className='button bg-nutrisys-primary-500 text-white flex-1'
									onClick={handlePasswordChange}
								>
									Cambiar Contraseña
								</button>
								<button
									type='button'
									className='button bg-gray-500 text-white flex-1'
									onClick={() => setShowPasswordModal(false)}
								>
									Cancelar
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
