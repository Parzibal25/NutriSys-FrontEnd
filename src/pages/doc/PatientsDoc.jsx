import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserDoctor,
	faEye,
	faTimes,
	faCalendarPlus,
	faCalendarTimes,
	faUtensils,
	faComments,
	faPhone,
	faEnvelope,
	faBirthdayCake,
	faWeight,
	faRulerVertical,
	faAllergies,
	faNotesMedical,
	faPaperPlane,
	faDownload,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/App.css';
import { Form, Link, Outlet } from 'react-router-dom';

export default function PatientsDoc() {
	const [selectedPatient, setSelectedPatient] = useState(null);
	const [activeTab, setActiveTab] = useState('info');
	const [chatMessages, setChatMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [appointmentForm, setAppointmentForm] = useState({
		date: '',
		time: '',
		type: 'consulta',
	});
	const [mealPlan, setMealPlan] = useState('');

	// Datos de ejemplo de pacientes activos
	const activePatients = [
		{
			id: 1,
			nombre: 'María González',
			edad: 32,
			telefono: '+504 9876-5432',
			email: 'maria.gonzalez@email.com',
			proximaCita: '2025-08-15 10:00',
			peso: '68 kg',
			altura: '165 cm',
			alergias: 'Lactosa, Nueces',
			objetivo: 'Pérdida de peso',
			notas: 'Paciente muy comprometida con el tratamiento. Ha mostrado excelente progreso.',
			historialMedico: 'Diabetes tipo 2 controlada',
			avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
		},
		{
			id: 2,
			nombre: 'Carlos Rodríguez',
			edad: 45,
			telefono: '+504 8765-4321',
			email: 'carlos.rodriguez@email.com',
			proximaCita: '2025-08-16 14:30',
			peso: '85 kg',
			altura: '178 cm',
			alergias: 'Ninguna conocida',
			objetivo: 'Ganancia de masa muscular',
			notas: 'Deportista amateur. Busca optimizar su rendimiento.',
			historialMedico: 'Sin antecedentes relevantes',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
		},
		{
			id: 3,
			nombre: 'Ana Martínez',
			edad: 28,
			telefono: '+504 7654-3210',
			email: 'ana.martinez@email.com',
			proximaCita: '2025-08-18 09:00',
			peso: '55 kg',
			altura: '160 cm',
			alergias: 'Gluten',
			objetivo: 'Mantenimiento saludable',
			notas: 'Paciente con celiaquía. Requiere dieta estricta sin gluten.',
			historialMedico: 'Enfermedad celíaca diagnosticada',
			avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
		},
		{
			id: 4,
			nombre: 'Roberto Silva',
			edad: 38,
			telefono: '+504 6543-2109',
			email: 'roberto.silva@email.com',
			proximaCita: '2025-08-20 16:00',
			peso: '92 kg',
			altura: '182 cm',
			alergias: 'Mariscos',
			objetivo: 'Control de colesterol',
			notas: 'Paciente con niveles altos de colesterol. Muy motivado.',
			historialMedico: 'Hipercolesterolemia',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
		},
	];

	const selectPatient = (patient) => {
		setSelectedPatient(patient);
		setActiveTab('info');
		// Simular mensajes de chat existentes
		setChatMessages([
			{
				id: 1,
				sender: 'patient',
				message: 'Hola doctor, ¿cómo está?',
				time: '10:30',
			},
			{
				id: 2,
				sender: 'doctor',
				message: `Hola ${
					patient.nombre.split(' ')[0]
				}, muy bien gracias. ¿Cómo te sientes con el nuevo plan?`,
				time: '10:32',
			},
		]);
		setNewMessage('');
		setMealPlan('');
		setAppointmentForm({ date: '', time: '', type: 'consulta' });
	};

	const sendMessage = () => {
		if (newMessage.trim()) {
			const message = {
				id: chatMessages.length + 1,
				sender: 'doctor',
				message: newMessage,
				time: new Date().toLocaleTimeString('es-HN', {
					hour: '2-digit',
					minute: '2-digit',
				}),
			};
			setChatMessages([...chatMessages, message]);
			setNewMessage('');
		}
	};

	const scheduleAppointment = () => {
		if (appointmentForm.date && appointmentForm.time) {
			alert(
				`Cita programada para ${appointmentForm.date} a las ${appointmentForm.time}`
			);
			setAppointmentForm({ date: '', time: '', type: 'consulta' });
		}
	};

	const cancelAppointment = () => {
		if (confirm('¿Está seguro de que desea cancelar la próxima cita?')) {
			alert('Cita cancelada exitosamente');
		}
	};

	const generateMealPlan = () => {
		if (mealPlan.trim()) {
			alert('Plan alimenticio generado y enviado al paciente');
			setMealPlan('');
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('es-HN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<>
			<div
				id='content'
				className='bg-nutrisys-background-200 rounded-2xl w-full h-full flex overflow-hidden'
			>
				{/* Panel Izquierdo - Lista de Pacientes */}
				<div className='w-1/3 bg-nutrisys-background-200 rounded-l-2xl border-r border-nutrisys-background-200 flex flex-col'>
					{/* Header del Panel Izquierdo */}
					<div className='p-6 border-b border-nutrisys-background-200 font-montserrat'>
						<div className='flex items-center gap-3 mb-2'>
							<FontAwesomeIcon
								icon={faUserDoctor}
								className='text-5xl text-nutrisys-primary-500'
							/>
							<h1 className='text-xl font-bold text-nutrisys-primary-500 font-kodchasan'>
								Pacientes Activos
							</h1>
						</div>
						<p className='text-md font-normal'>
							Selecciona un paciente para ver sus detalles
						</p>
					</div>

					{/* Lista de Pacientes */}
					<div className='flex-1 overflow-y-auto p-4'>
						<div className='space-y-3'>
							{activePatients.map((patient) => (
								<div
									key={patient.id}
									onClick={() => selectPatient(patient)}
									className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md font-montserrat ${
										selectedPatient?.id === patient.id
											? 'border-nutrisys-primary-500 bg-nutrisys-primary-50'
											: 'border-nutrisys-background-200 bg-white hover:border-nutrisys-secondary-500'
									}`}
								>
									<div className='flex items-start gap-3'>
										<img
											src={patient.avatar}
											alt={patient.nombre}
											className='w-12 h-12 rounded-full object-cover'
										/>
										<div className='flex-1 min-w-0'>
											<h3 className='font-semibold text-nutrisys-text-900 truncate'>
												{patient.nombre}
											</h3>
											<div className='space-y-1 text-xs'>
												<p>
													<FontAwesomeIcon
														icon={faBirthdayCake}
														className='w-3 mr-1'
													/>
													{patient.edad} años
												</p>
												<p>
													<FontAwesomeIcon
														icon={faPhone}
														className='w-3 mr-1'
													/>
													{patient.telefono}
												</p>
												<p className='text-nutrisys-primary-600 font-medium'>
													Próxima cita:{' '}
													{formatDate(
														patient.proximaCita
													)}
												</p>
											</div>
										</div>
									</div>

									<div className='mt-3 pt-3 border-t border-nutrisys-background-200'>
										<div className='text-xs text-nutrisys-text-500 truncate'>
											Objetivo: {patient.objetivo}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Panel Derecho - Detalles del Paciente */}
				<div className='w-2/3 bg-nutrisys-background-200 rounded-r-2xl flex flex-col font-montserrat'>
					{selectedPatient ? (
						<>
							{/* Header del Panel Derecho */}
							<div className='p-6 m-6 bg-white border-b mb-0 border-nutrisys-background-200 rounded-t-lg'>
								<div className='flex items-center gap-4'>
									<img
										src={selectedPatient.avatar}
										alt={selectedPatient.nombre}
										className='w-16 h-16 rounded-full object-cover'
									/>
									<div>
										<h2 className='text-2xl font-bold text-nutrisys-text-900'>
											{selectedPatient.nombre}
										</h2>
										<p className='text-nutrisys-primary-600 font-medium'>
											{selectedPatient.objetivo}
										</p>
										<p className='text-sm text-nutrisys-text-500'>
											Próxima cita:{' '}
											{formatDate(
												selectedPatient.proximaCita
											)}
										</p>
									</div>
								</div>
							</div>

							{/* Tabs */}
							<div className='bg-white border-b m-6 mb-2 mt-0 shadow-md shadow-gray-200 border-t-gray-200 border-t-2 rounded-b-lg'>
								<nav className='flex px-6'>
									{[
										{
											id: 'info',
											label: 'Información',
											icon: faUser,
										},
										{
											id: 'appointments',
											label: 'Citas',
											icon: faCalendarPlus,
										},
										{
											id: 'meal-plan',
											label: 'Plan Alimenticio',
											icon: faUtensils,
										},
										{
											id: 'chat',
											label: 'Chat',
											icon: faComments,
										},
									].map((tab) => (
										<button
											key={tab.id}
											onClick={() => setActiveTab(tab.id)}
											className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors duration-200 flex items-center gap-2 ${
												activeTab === tab.id
													? 'border-nutrisys-primary-500 text-nutrisys-primary-600'
													: 'border-transparent text-nutrisys-text-600 hover:text-nutrisys-text-900'
											}`}
										>
											<FontAwesomeIcon icon={tab.icon} />
											{tab.label}
										</button>
									))}
								</nav>
							</div>

							{/* Content Area */}
							<div className='flex-1 overflow-y-auto p-6'>
								{activeTab === 'info' && (
									<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
										<div className='bg-white rounded-lg p-6 shadow-sm'>
											<h3 className='font-semibold text-lg mb-4 text-nutrisys-text-900'>
												Datos Personales
											</h3>
											<div className='space-y-4'>
												<div className='flex items-center gap-3'>
													<FontAwesomeIcon
														icon={faEnvelope}
														className='text-nutrisys-primary-500 w-5'
													/>
													<div>
														<p className='text-sm text-nutrisys-text-500'>
															Email
														</p>
														<p className='font-medium'>
															{
																selectedPatient.email
															}
														</p>
													</div>
												</div>
												<div className='flex items-center gap-3'>
													<FontAwesomeIcon
														icon={faPhone}
														className='text-nutrisys-primary-500 w-5'
													/>
													<div>
														<p className='text-sm text-nutrisys-text-500'>
															Teléfono
														</p>
														<p className='font-medium'>
															{
																selectedPatient.telefono
															}
														</p>
													</div>
												</div>
												<div className='flex items-center gap-3'>
													<FontAwesomeIcon
														icon={faBirthdayCake}
														className='text-nutrisys-primary-500 w-5'
													/>
													<div>
														<p className='text-sm text-nutrisys-text-500'>
															Edad
														</p>
														<p className='font-medium'>
															{
																selectedPatient.edad
															}{' '}
															años
														</p>
													</div>
												</div>
												<div className='flex items-center gap-3'>
													<FontAwesomeIcon
														icon={faWeight}
														className='text-nutrisys-primary-500 w-5'
													/>
													<div>
														<p className='text-sm text-nutrisys-text-500'>
															Peso
														</p>
														<p className='font-medium'>
															{
																selectedPatient.peso
															}
														</p>
													</div>
												</div>
												<div className='flex items-center gap-3'>
													<FontAwesomeIcon
														icon={faRulerVertical}
														className='text-nutrisys-primary-500 w-5'
													/>
													<div>
														<p className='text-sm text-nutrisys-text-500'>
															Altura
														</p>
														<p className='font-medium'>
															{
																selectedPatient.altura
															}
														</p>
													</div>
												</div>
											</div>
										</div>

										<div className='bg-white rounded-lg p-6 shadow-sm'>
											<h3 className='font-semibold text-lg mb-4 text-nutrisys-text-900'>
												Información Médica
											</h3>
											<div className='space-y-4'>
												<div>
													<div className='flex items-center gap-3 mb-2'>
														<FontAwesomeIcon
															icon={faAllergies}
															className='text-nutrisys-primary-500 w-5'
														/>
														<span className='font-medium text-nutrisys-text-700'>
															Alergias
														</span>
													</div>
													<p className='ml-8 text-nutrisys-text-600 bg-red-50 p-2 rounded'>
														{
															selectedPatient.alergias
														}
													</p>
												</div>
												<div>
													<div className='flex items-center gap-3 mb-2'>
														<FontAwesomeIcon
															icon={
																faNotesMedical
															}
															className='text-nutrisys-primary-500 w-5'
														/>
														<span className='font-medium text-nutrisys-text-700'>
															Historial Médico
														</span>
													</div>
													<p className='ml-8 text-nutrisys-text-600 bg-nutrisys-background-50 p-2 rounded'>
														{
															selectedPatient.historialMedico
														}
													</p>
												</div>
												<div>
													<span className='font-medium text-nutrisys-text-700'>
														Notas del Tratamiento
													</span>
													<p className='mt-2 text-nutrisys-text-600 bg-green-50 p-3 rounded'>
														{selectedPatient.notas}
													</p>
												</div>
											</div>
										</div>
									</div>
								)}

								{activeTab === 'appointments' && (
									<div className='space-y-6'>
										<div className='bg-white rounded-lg p-6 shadow-sm'>
											<h3 className='font-semibold text-lg mb-4 text-nutrisys-text-900'>
												Próxima Cita
											</h3>
											<div className='bg-nutrisys-primary-50 border border-nutrisys-primary-200 p-4 rounded-lg'>
												<p className='text-nutrisys-primary-700 font-medium text-lg'>
													{formatDate(
														selectedPatient.proximaCita
													)}
												</p>
												<button
													onClick={cancelAppointment}
													className='mt-3 bg-red-500 hover:bg-error text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors'
												>
													<FontAwesomeIcon
														icon={faCalendarTimes}
													/>
													Cancelar Cita
												</button>
											</div>
										</div>

										<div className='bg-white rounded-lg p-6 shadow-sm'>
											<h3 className='font-semibold text-lg mb-4 text-nutrisys-text-900'>
												Programar Nueva Cita
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
												<div>
													<label className='block text-sm font-medium text-nutrisys-text-700 mb-1'>
														Fecha
													</label>
													<input
														type='date'
														value={
															appointmentForm.date
														}
														onChange={(e) =>
															setAppointmentForm({
																...appointmentForm,
																date: e.target
																	.value,
															})
														}
														className='w-full border border-nutrisys-background-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-nutrisys-primary-500 focus:border-transparent'
													/>
												</div>
												<div>
													<label className='block text-sm font-medium text-nutrisys-text-700 mb-1'>
														Hora
													</label>
													<input
														type='time'
														value={
															appointmentForm.time
														}
														onChange={(e) =>
															setAppointmentForm({
																...appointmentForm,
																time: e.target
																	.value,
															})
														}
														className='w-full border border-nutrisys-background-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-nutrisys-primary-500 focus:border-transparent'
													/>
												</div>
												<div>
													<label className='block text-sm font-medium text-nutrisys-text-700 mb-1'>
														Tipo
													</label>
													<select
														value={
															appointmentForm.type
														}
														onChange={(e) =>
															setAppointmentForm({
																...appointmentForm,
																type: e.target
																	.value,
															})
														}
														className='w-full border border-nutrisys-background-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-nutrisys-primary-500 focus:border-transparent'
													>
														<option value='consulta'>
															Consulta
														</option>
														<option value='seguimiento'>
															Seguimiento
														</option>
														<option value='control'>
															Control
														</option>
													</select>
												</div>
											</div>
											<button
												onClick={scheduleAppointment}
												className='bg-nutrisys-primary-500 hover:bg-nutrisys-primary-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors'
											>
												<FontAwesomeIcon
													icon={faCalendarPlus}
												/>
												Programar Cita
											</button>
										</div>
									</div>
								)}

								{activeTab === 'meal-plan' && (
									<div className='bg-white rounded-lg p-6 shadow-sm'>
										<h3 className='font-semibold text-lg mb-4 text-nutrisys-text-900'>
											Generar Plan Alimenticio
										</h3>
										<div className='mb-4'>
											<label className='block text-sm font-medium text-nutrisys-text-700 mb-2'>
												Plan alimenticio para{' '}
												{selectedPatient.nombre}
											</label>
											<textarea
												value={mealPlan}
												onChange={(e) =>
													setMealPlan(e.target.value)
												}
												placeholder='Escriba el plan alimenticio detallado para el paciente...&#10;&#10;Ejemplo:&#10;DESAYUNO:&#10;- 1 taza de avena con frutas&#10;- 1 vaso de leche descremada&#10;&#10;ALMUERZO:&#10;- Ensalada verde&#10;- Pollo a la plancha (150g)...'
												className='w-full h-80 border border-nutrisys-background-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-nutrisys-primary-500 focus:border-transparent resize-none'
											/>
										</div>
										<div className='flex gap-3'>
											<button
												onClick={generateMealPlan}
												className='bg-nutrisys-primary-500 hover:bg-nutrisys-primary-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors'
											>
												<FontAwesomeIcon
													icon={faUtensils}
												/>
												Generar y Enviar Plan
											</button>
											<button className='bg-nutrisys-background-300 hover:bg-nutrisys-background-400 text-nutrisys-text-700 px-6 py-2 rounded-lg flex items-center gap-2 transition-colors'>
												<FontAwesomeIcon
													icon={faDownload}
												/>
												Exportar PDF
											</button>
										</div>
									</div>
								)}

								{activeTab === 'chat' && (
									<div className='bg-white rounded-lg p-6 shadow-sm h-full flex flex-col'>
										<h3 className='font-semibold text-lg mb-4 text-nutrisys-text-900'>
											Chat con {selectedPatient.nombre}
										</h3>

										{/* Messages */}
										<div className='bg-nutrisys-background-50 rounded-lg p-4 flex-1 overflow-y-auto mb-4 min-h-80'>
											{chatMessages.map((msg) => (
												<div
													key={msg.id}
													className={`mb-3 flex ${
														msg.sender === 'doctor'
															? 'justify-end'
															: 'justify-start'
													}`}
												>
													<div
														className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
															msg.sender ===
															'doctor'
																? 'bg-nutrisys-primary-500 text-white'
																: 'bg-nutrisys-secondary-500 text-white border border-nutrisys-background-200'
														}`}
													>
														<p className='text-sm'>
															{msg.message}
														</p>
														<p
															className={`text-xs mt-1 ${
																msg.sender ===
																'doctor'
																	? 'text-white'
																	: 'text-white'
															}`}
														>
															{msg.time}
														</p>
													</div>
												</div>
											))}
										</div>

										{/* Send Message */}
										<div className='flex gap-3'>
											<input
												type='text'
												value={newMessage}
												onChange={(e) =>
													setNewMessage(
														e.target.value
													)
												}
												placeholder='Escriba su mensaje...'
												className='flex-1 border border-nutrisys-secondary-500 rounded-lg px-4 py-2 focus:ring-2 focus:ring-nutrisys-primary-500 focus:border-transparent'
												onKeyPress={(e) =>
													e.key === 'Enter' &&
													sendMessage()
												}
											/>
											<button
												onClick={sendMessage}
												className='bg-nutrisys-primary-500 hover:bg-nutrisys-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors'
											>
												<FontAwesomeIcon
													icon={faPaperPlane}
												/>
												Enviar
											</button>
										</div>
									</div>
								)}
							</div>
						</>
					) : (
						/* Estado inicial - No hay paciente seleccionado */
						<div className='flex-1 flex items-center justify-center'>
							<div className='text-center'>
								<FontAwesomeIcon
									icon={faUser}
									className='text-6xl text-nutrisys-primary-500 mb-4'
								/>
								<h3 className='text-xl font-semibold font-kodchasan mb-2 text-nutrisys-primary-500'>
									Selecciona un paciente
								</h3>
								<p className='font-montserrat text-md font-normal'>
									Elige un paciente de la lista para ver sus
									detalles y gestionar su tratamiento
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
