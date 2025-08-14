import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCalendarCheck,
	faClock,
	faUsers,
	faCalendarDay,
	faUser,
	faPhone,
	faEnvelope,
	faMapMarkerAlt,
	faBirthdayCake,
	faTimes,
	faCalendarAlt,
	faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function NutritionistDashboard() {
	// Datos de ejemplo
	const [dashboardData] = useState({
		weeklyConfirmedAppointments: 24,
		pendingConfirmation: 8,
		activePatients: 156,
		todayRemaining: 5,
		todayAppointments: [
			{
				id: 1,
				time: '09:00 AM',
				patient: {
					name: 'María González',
					age: 28,
					phone: '9875-6543',
					email: 'maria.gonzalez@email.com',
					address: 'Col. Palmira, Tegucigalpa',
					birthDate: '15/03/1995',
				},
				type: 'Consulta de seguimiento',
				status: 'confirmed',
			},
			{
				id: 2,
				time: '10:30 AM',
				patient: {
					name: 'Carlos Mendoza',
					age: 45,
					phone: '9654-3210',
					email: 'carlos.mendoza@email.com',
					address: 'Res. Las Colinas, Tegucigalpa',
					birthDate: '22/07/1978',
				},
				type: 'Primera consulta',
				status: 'confirmed',
			},
			{
				id: 3,
				time: '02:00 PM',
				patient: {
					name: 'Ana Rodríguez',
					age: 32,
					phone: '9123-4567',
					email: 'ana.rodriguez@email.com',
					address: 'Col. Kennedy, Tegucigalpa',
					birthDate: '08/11/1991',
				},
				type: 'Control nutricional',
				status: 'pending',
			},
			{
				id: 4,
				time: '03:30 PM',
				patient: {
					name: 'Roberto Flores',
					age: 38,
					phone: '9876-5432',
					email: 'roberto.flores@email.com',
					address: 'Col. Lomas del Mayab, Tegucigalpa',
					birthDate: '14/05/1985',
				},
				type: 'Revisión de plan alimentario',
				status: 'confirmed',
			},
			{
				id: 5,
				time: '05:00 PM',
				patient: {
					name: 'Sofía Martínez',
					age: 25,
					phone: '9321-6547',
					email: 'sofia.martinez@email.com',
					address: 'Col. Miraflores, Tegucigalpa',
					birthDate: '30/09/1998',
				},
				type: 'Consulta de seguimiento',
				status: 'confirmed',
			},
		],
	});

	const { user } = useAuth();
	const navigate = useNavigate();

	// Estados para modales
	const [selectedAppointment, setSelectedAppointment] = useState(null);
	const [showPatientModal, setShowPatientModal] = useState(false);

	const navigateToAgenda = () => {
		navigate('/doc/agenda');
	};

	const navigateToPatients = () => {
		navigate('/doc/pacientes');
	};

	const handleAppointmentClick = (appointment) => {
		setSelectedAppointment(appointment);
		setShowPatientModal(true);
	};

	const getStatusColor = (status) => {
		return status === 'confirmed'
			? 'bg-green-100 text-green-800'
			: 'bg-yellow-100 text-yellow-800';
	};

	const getStatusText = (status) => {
		return status === 'confirmed' ? 'Confirmada' : 'Pendiente';
	};

	return (
		<>
			<div
				id='content'
				className='bg-nutrisys-background-200 rounded-2xl w-full h-fit p-6'
			>
				<div className='mb-6'>
					<h1 className='text-2xl font-bold text-nutrisys-primary-500 mb-2 font-kodchasan'>
						¡Hola, {user.name}!
					</h1>
					<p className='text-black font-montserrat'>
						Aquí tienes un resumen de tu agenda de la semana
					</p>
				</div>

				{/* Tarjetas de Estadísticas */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
					{/* Citas Confirmadas de la Semana */}
					<div
						onClick={navigateToAgenda}
						className='bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-nutrisys-primary'
					>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-black text-md font-montserrat'>
									Citas confirmadas esta semana
								</p>
								<p className='text-4xl font-bold text-nutrisys-primary-500 font-kodchasan mt-2'>
									{dashboardData.weeklyConfirmedAppointments}
								</p>
							</div>
							<div className='bg-green-100 p-3 rounded-full'>
								<FontAwesomeIcon
									icon={faCalendarCheck}
									className='text-nutrisys-secondary-500 text-4xl'
								/>
							</div>
						</div>
					</div>

					{/* Citas Pendientes de Confirmar */}
					<div
						onClick={navigateToAgenda}
						className='bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-nutrisys-primary'
					>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-black text-md font-montserrat'>
									Citas pendientes por confirmar
								</p>
								<p className='text-4xl font-bold text-nutrisys-primary-500 font-kodchasan mt-2'>
									{dashboardData.pendingConfirmation}
								</p>
							</div>
							<div className='bg-green-100 p-3 rounded-full'>
								<FontAwesomeIcon
									icon={faClock}
									className='text-nutrisys-secondary-500 text-4xl'
								/>
							</div>
						</div>
					</div>

					{/* Pacientes Activos */}
					<div
						onClick={navigateToPatients}
						className='bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-nutrisys-primary'
					>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-black text-md font-montserrat'>
									Pacientes Activos
								</p>
								<p className='text-4xl font-bold text-nutrisys-primary-500 font-kodchasan mt-2'>
									{dashboardData.activePatients}
								</p>
							</div>
							<div className='bg-green-100 p-3 rounded-full'>
								<FontAwesomeIcon
									icon={faUsers}
									className='text-nutrisys-secondary-500 text-4xl'
								/>
							</div>
						</div>
					</div>

					{/* Citas Restantes Hoy */}
					<div
						onClick={navigateToAgenda}
						className='bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-nutrisys-primary'
					>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-black text-md font-montserrat'>
									Citas restantes hoy
								</p>
								<p className='text-4xl font-bold text-nutrisys-primary-500 font-kodchasan mt-2'>
									{dashboardData.todayRemaining}
								</p>
							</div>
							<div className='bg-green-100 p-3 rounded-full'>
								<FontAwesomeIcon
									icon={faClock}
									className='text-nutrisys-secondary-500 text-4xl'
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Lista de Citas del Día */}
				<div className='bg-white rounded-xl p-6 shadow-sm mb-10 max-h-[600px] overflow-y-auto'>
					<div className='flex items-center justify-between mb-6'>
						<div className='flex items-center gap-3'>
							<div className='bg-nutrisys-primary/10 p-2 rounded-lg'>
								<FontAwesomeIcon
									icon={faCalendarDay}
									className='text-nutrisys-secondary-500 text-4xl'
								/>
							</div>
							<div>
								<h2 className='text-xl font-bold font-kodchasan text-nutrisys-secondary-500'>
									Citas de Hoy
								</h2>
								<p className='text-black text-sm font-montserrat font-normal'>
									{new Date().toLocaleDateString('es-HN', {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>
							</div>
						</div>
					</div>

					{dashboardData.todayAppointments.length > 0 ? (
						<div className='space-y-3 mb-10 overflow-y-auto max-h-[400px] font-montserrat'>
							{dashboardData.todayAppointments.map(
								(appointment) => (
									<div
										key={appointment.id}
										onClick={() =>
											handleAppointmentClick(appointment)
										}
										className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-nutrisys-primary hover:bg-nutrisys-primary/5 transition-colors cursor-pointer'
									>
										<div className='flex items-center gap-4'>
											<div className='bg-nutrisys-primary/10 p-2 rounded-lg'>
												<FontAwesomeIcon
													icon={faUser}
													className='text-nutrisys-primary'
												/>
											</div>
											<div>
												<h3 className='font-medium text-black'>
													{appointment.patient.name}
												</h3>
												<p className='text-sm text-black'>
													{appointment.type}
												</p>
											</div>
										</div>

										<div className='flex items-center gap-4'>
											<span
												className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
													appointment.status
												)}`}
											>
												{getStatusText(
													appointment.status
												)}
											</span>
											<div className='text-right'>
												<p className='font-bold text-nutrisys-primary'>
													{appointment.time}
												</p>
											</div>
										</div>
									</div>
								)
							)}
						</div>
					) : (
						<div className='text-center py-12 text-gray-500'>
							<FontAwesomeIcon
								icon={faCalendarDay}
								className='text-4xl mb-4'
							/>
							<p>No tienes citas programadas para hoy</p>
						</div>
					)}
				</div>
			</div>

			{/* Modal de Detalles del Paciente */}
			{showPatientModal && selectedAppointment && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
					<div className='bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
						{/* Header del Modal */}
						<div className='flex items-center justify-between p-6 border-b border-gray-200'>
							<div className='flex items-center gap-3'>
								<div className='bg-nutrisys-primary/10 p-2 rounded-lg'>
									<FontAwesomeIcon
										icon={faUser}
										className='text-nutrisys-primary text-lg'
									/>
								</div>
								<div>
									<h3 className='text-xl font-bold text-black'>
										Detalles de la Cita
									</h3>
									<p className='text-sm text-black'>
										{selectedAppointment.time} -{' '}
										{selectedAppointment.type}
									</p>
								</div>
							</div>
							<button
								onClick={() => setShowPatientModal(false)}
								className='button bg-gray-500 text-white p-2 hover:bg-gray-600 rounded-lg'
							>
								<FontAwesomeIcon icon={faTimes} />
							</button>
						</div>

						{/* Información del Paciente */}
						<div className='p-6 space-y-6'>
							<div className='bg-nutrisys-primary/5 p-4 rounded-lg'>
								<h4 className='font-semibold text-nutrisys-primary mb-3'>
									Información del Paciente
								</h4>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='flex items-center gap-3'>
										<FontAwesomeIcon
											icon={faUser}
											className='text-gray-500'
										/>
										<div>
											<p className='text-sm text-black'>
												Nombre completo
											</p>
											<p className='font-medium'>
												{
													selectedAppointment.patient
														.name
												}
											</p>
										</div>
									</div>

									<div className='flex items-center gap-3'>
										<FontAwesomeIcon
											icon={faBirthdayCake}
											className='text-gray-500'
										/>
										<div>
											<p className='text-sm text-black'>
												Edad
											</p>
											<p className='font-medium'>
												{
													selectedAppointment.patient
														.age
												}{' '}
												años
											</p>
										</div>
									</div>

									<div className='flex items-center gap-3'>
										<FontAwesomeIcon
											icon={faPhone}
											className='text-gray-500'
										/>
										<div>
											<p className='text-sm text-black'>
												Teléfono
											</p>
											<p className='font-medium'>
												{
													selectedAppointment.patient
														.phone
												}
											</p>
										</div>
									</div>

									<div className='flex items-center gap-3'>
										<FontAwesomeIcon
											icon={faEnvelope}
											className='text-gray-500'
										/>
										<div>
											<p className='text-sm text-black'>
												Email
											</p>
											<p className='font-medium text-sm'>
												{
													selectedAppointment.patient
														.email
												}
											</p>
										</div>
									</div>

									<div className='flex items-start gap-3 md:col-span-2'>
										<FontAwesomeIcon
											icon={faMapMarkerAlt}
											className='text-gray-500 mt-1'
										/>
										<div>
											<p className='text-sm text-black'>
												Dirección
											</p>
											<p className='font-medium'>
												{
													selectedAppointment.patient
														.address
												}
											</p>
										</div>
									</div>

									<div className='flex items-center gap-3'>
										<FontAwesomeIcon
											icon={faBirthdayCake}
											className='text-gray-500'
										/>
										<div>
											<p className='text-sm text-black'>
												Fecha de nacimiento
											</p>
											<p className='font-medium'>
												{
													selectedAppointment.patient
														.birthDate
												}
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Detalles de la Cita */}
							<div className='bg-gray-50 p-4 rounded-lg'>
								<h4 className='font-semibold text-black mb-3'>
									Detalles de la Cita
								</h4>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div>
										<p className='text-sm text-black'>
											Hora
										</p>
										<p className='font-medium text-nutrisys-primary'>
											{selectedAppointment.time}
										</p>
									</div>
									<div>
										<p className='text-sm text-black'>
											Tipo de consulta
										</p>
										<p className='font-medium'>
											{selectedAppointment.type}
										</p>
									</div>
									<div>
										<p className='text-sm text-black'>
											Estado
										</p>
										<span
											className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
												selectedAppointment.status
											)}`}
										>
											{getStatusText(
												selectedAppointment.status
											)}
										</span>
									</div>
								</div>
							</div>

							{/* Botones de Acción */}
							<div className='flex justify-end space-x-4 pt-4 border-t border-gray-200'>
								<button
									onClick={() => {
										setShowPatientModal(false);
										navigateToAgenda();
									}}
									className='button bg-nutrisys-primary-500 text-white px-6 py-2 hover:bg-nutrisys-primary/90 flex items-center gap-2'
								>
									<FontAwesomeIcon icon={faCalendarAlt} />
									Ir a Agenda
									<FontAwesomeIcon
										icon={faArrowRight}
										className='text-sm'
									/>
								</button>
								<button
									onClick={() => setShowPatientModal(false)}
									className='button bg-gray-500 text-white px-6 py-2 hover:bg-gray-600'
								>
									Cerrar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
