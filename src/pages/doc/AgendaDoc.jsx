import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCalendarAlt,
	faClock,
	faEdit,
	faSave,
	faTimes,
	faUser,
	faPhone,
	faCalendarTimes,
	faCalendarPlus,
	faExclamationTriangle,
	faChevronLeft,
	faChevronRight,
	faMapMarkerAlt,
	faNotesMedical,
	faCheck,
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/App.css';

export default function AgendaDoc() {
	const [currentWeek, setCurrentWeek] = useState(new Date());
	const [showScheduleModal, setShowScheduleModal] = useState(false);
	const [showAppointmentModal, setShowAppointmentModal] = useState(false);
	const [showRescheduleModal, setShowRescheduleModal] = useState(false);
	const [showConflictModal, setShowConflictModal] = useState(false);
	const [selectedAppointment, setSelectedAppointment] = useState(null);
	const [conflictingAppointments, setConflictingAppointments] = useState([]);
	const [editingSchedule, setEditingSchedule] = useState(false);

	// Horario de trabajo del nutricionista
	const [workSchedule, setWorkSchedule] = useState({
		lunes: { active: true, start: '08:00', end: '17:00' },
		martes: { active: true, start: '08:00', end: '17:00' },
		miercoles: { active: true, start: '08:00', end: '17:00' },
		jueves: { active: true, start: '08:00', end: '17:00' },
		viernes: { active: true, start: '08:00', end: '17:00' },
		sabado: { active: true, start: '09:00', end: '13:00' },
		domingo: { active: false, start: '09:00', end: '13:00' },
	});

	const [tempSchedule, setTempSchedule] = useState(workSchedule);

	// Formulario de reprogramación
	const [rescheduleForm, setRescheduleForm] = useState({
		date: '',
		time: '',
	});

	// Citas de ejemplo
	const [appointments, setAppointments] = useState([
		{
			id: 1,
			patientName: 'María González',
			patientPhone: '+504 9876-5432',
			date: '2025-08-15',
			time: '10:00',
			duration: 60,
			type: 'Consulta inicial',
			notes: 'Primera consulta para plan de pérdida de peso',
			status: 'confirmada',
			location: 'Consultorio 1',
		},
		{
			id: 2,
			patientName: 'Carlos Rodríguez',
			patientPhone: '+504 8765-4321',
			date: '2025-08-15',
			time: '14:30',
			duration: 45,
			type: 'Seguimiento',
			notes: 'Control de progreso semanal',
			status: 'confirmada',
			location: 'Consultorio 1',
		},
		{
			id: 3,
			patientName: 'Ana Martínez',
			patientPhone: '+504 7654-3210',
			date: '2025-08-16',
			time: '09:00',
			duration: 60,
			type: 'Control nutricional',
			notes: 'Evaluación de dieta sin gluten',
			status: 'pendiente',
			location: 'Consultorio 2',
		},
		{
			id: 4,
			patientName: 'Roberto Silva',
			patientPhone: '+504 6543-2109',
			date: '2025-08-17',
			time: '11:30',
			duration: 30,
			type: 'Consulta rápida',
			notes: 'Ajuste de plan alimenticio',
			status: 'confirmada',
			location: 'Consultorio 1',
		},
	]);

	const daysOfWeek = [
		'lunes',
		'martes',
		'miercoles',
		'jueves',
		'viernes',
		'sabado',
		'domingo',
	];
	const dayLabels = [
		'Lunes',
		'Martes',
		'Miércoles',
		'Jueves',
		'Viernes',
		'Sábado',
		'Domingo',
	];

	// Generar las horas del día (8:00 - 18:00)
	const generateTimeSlots = () => {
		const slots = [];
		for (let hour = 8; hour <= 18; hour++) {
			slots.push(`${hour.toString().padStart(2, '0')}:00`);
			if (hour < 18) {
				slots.push(`${hour.toString().padStart(2, '0')}:30`);
			}
		}
		return slots;
	};

	const timeSlots = generateTimeSlots();

	// Obtener fechas de la semana actual
	const getWeekDates = (date) => {
		const week = [];
		const startOfWeek = new Date(date);
		const day = startOfWeek.getDay();
		const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
		startOfWeek.setDate(diff);

		for (let i = 0; i < 7; i++) {
			const date = new Date(startOfWeek);
			date.setDate(startOfWeek.getDate() + i);
			week.push(date);
		}
		return week;
	};

	const weekDates = getWeekDates(currentWeek);

	// Navegación de semanas
	const goToPreviousWeek = () => {
		const newDate = new Date(currentWeek);
		newDate.setDate(currentWeek.getDate() - 7);
		setCurrentWeek(newDate);
	};

	const goToNextWeek = () => {
		const newDate = new Date(currentWeek);
		newDate.setDate(currentWeek.getDate() + 7);
		setCurrentWeek(newDate);
	};

	const goToToday = () => {
		setCurrentWeek(new Date());
	};

	// Obtener citas para una fecha y hora específica
	const getAppointmentForSlot = (date, time) => {
		const dateStr = date.toISOString().split('T')[0];
		return appointments.find(
			(apt) => apt.date === dateStr && apt.time === time
		);
	};

	// Verificar si una hora está dentro del horario de trabajo
	const isWorkingHour = (dayIndex, time) => {
		const dayName = daysOfWeek[dayIndex];
		const schedule = workSchedule[dayName];

		if (!schedule.active) return false;

		return time >= schedule.start && time <= schedule.end;
	};

	// Abrir modal de cita
	const openAppointmentModal = (appointment) => {
		setSelectedAppointment(appointment);
		setShowAppointmentModal(true);
	};

	// Cerrar modal de cita
	const closeAppointmentModal = () => {
		setSelectedAppointment(null);
		setShowAppointmentModal(false);
		setShowRescheduleModal(false);
		setRescheduleForm({ date: '', time: '' });
	};

	// Cancelar cita
	const cancelAppointment = () => {
		if (confirm('¿Está seguro de que desea cancelar esta cita?')) {
			setAppointments(
				appointments.filter((apt) => apt.id !== selectedAppointment.id)
			);
			closeAppointmentModal();
			alert('Cita cancelada exitosamente');
		}
	};

	// Abrir modal de reprogramación
	const openRescheduleModal = () => {
		setShowRescheduleModal(true);
		setRescheduleForm({
			date: selectedAppointment.date,
			time: selectedAppointment.time,
		});
	};

	// Reprogramar cita
	const rescheduleAppointment = () => {
		if (rescheduleForm.date && rescheduleForm.time) {
			const updatedAppointments = appointments.map((apt) =>
				apt.id === selectedAppointment.id
					? {
							...apt,
							date: rescheduleForm.date,
							time: rescheduleForm.time,
					  }
					: apt
			);
			setAppointments(updatedAppointments);
			closeAppointmentModal();
			alert('Cita reprogramada exitosamente');
		}
	};

	// Abrir modal de horario
	const openScheduleModal = () => {
		setTempSchedule(workSchedule);
		setShowScheduleModal(true);
		setEditingSchedule(false);
	};

	// Guardar horario
	const saveSchedule = () => {
		// Verificar si hay citas fuera del nuevo horario
		const conflicts = [];

		appointments.forEach((apt) => {
			const aptDate = new Date(apt.date);
			const dayIndex = (aptDate.getDay() + 6) % 7; // Ajustar para que lunes sea 0
			const dayName = daysOfWeek[dayIndex];
			const newSchedule = tempSchedule[dayName];

			if (
				!newSchedule.active ||
				apt.time < newSchedule.start ||
				apt.time > newSchedule.end
			) {
				conflicts.push(apt);
			}
		});

		if (conflicts.length > 0) {
			setConflictingAppointments(conflicts);
			setShowConflictModal(true);
		} else {
			setWorkSchedule(tempSchedule);
			setShowScheduleModal(false);
			alert('Horario actualizado exitosamente');
		}
	};

	// Confirmar cambio de horario con conflictos
	const confirmScheduleChange = () => {
		setWorkSchedule(tempSchedule);
		setShowScheduleModal(false);
		setShowConflictModal(false);
		alert(
			`Horario actualizado. ${conflictingAppointments.length} citas quedan fuera del nuevo horario.`
		);
	};

	// Formatear fecha
	const formatDate = (date) => {
		return date.toLocaleDateString('es-HN', {
			day: 'numeric',
			month: 'short',
		});
	};

	const formatWeekRange = () => {
		const start = weekDates[0];
		const end = weekDates[6];
		return `${formatDate(start)} - ${formatDate(
			end
		)} ${start.getFullYear()}`;
	};

	return (
		<>
			<div className='bg-nutrisys-background-200 rounded-2xl w-full h-full p-6'>
				{/* Header */}
				<div className='flex justify-between items-center mb-6'>
					<div className='flex items-center gap-3'>
						<FontAwesomeIcon
							icon={faCalendarAlt}
							className='text-2xl text-nutrisys-primary-500'
						/>
						<div>
							<h1 className='text-2xl font-bold text-nutrisys-text-900'>
								Agenda
							</h1>
							<p className='text-nutrisys-text-600'>
								Gestiona tu horario y citas
							</p>
						</div>
					</div>
					<div className='flex gap-3'>
						<button
							onClick={goToToday}
							className='bg-nutrisys-background-300 hover:bg-nutrisys-background-400 text-nutrisys-text-700 px-4 py-2 rounded-lg font-medium transition-colors'
						>
							Hoy
						</button>
						<button
							onClick={openScheduleModal}
							className='bg-nutrisys-primary-500 hover:bg-nutrisys-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2'
						>
							<FontAwesomeIcon icon={faClock} />
							Horario de Trabajo
						</button>
					</div>
				</div>

				{/* Navigation */}
				<div className='flex justify-between items-center mb-6 bg-white rounded-lg p-4'>
					<button
						onClick={goToPreviousWeek}
						className='p-2 hover:bg-nutrisys-background-100 rounded-lg transition-colors'
					>
						<FontAwesomeIcon
							icon={faChevronLeft}
							className='text-nutrisys-text-600'
						/>
					</button>

					<h2 className='text-lg font-semibold text-nutrisys-text-900'>
						{formatWeekRange()}
					</h2>

					<button
						onClick={goToNextWeek}
						className='p-2 hover:bg-nutrisys-background-100 rounded-lg transition-colors'
					>
						<FontAwesomeIcon
							icon={faChevronRight}
							className='text-nutrisys-text-600'
						/>
					</button>
				</div>

				{/* Calendar Grid */}
				<div className='bg-white rounded-lg overflow-hidden shadow-sm'>
					{/* Header de días */}
					<div className='grid grid-cols-8 border-b border-nutrisys-background-200'>
						<div className='p-4 bg-nutrisys-background-50 font-medium text-nutrisys-text-600'>
							Hora
						</div>
						{dayLabels.map((day, index) => (
							<div
								key={day}
								className='p-4 bg-nutrisys-background-50 text-center'
							>
								<div className='font-medium text-nutrisys-text-900'>
									{day}
								</div>
								<div className='text-sm text-nutrisys-text-600'>
									{formatDate(weekDates[index])}
								</div>
							</div>
						))}
					</div>

					{/* Grid de horarios */}
					<div className='max-h-96 overflow-y-auto'>
						{timeSlots.map((time) => (
							<div
								key={time}
								className='grid grid-cols-8 border-b border-nutrisys-background-100'
							>
								<div className='p-3 bg-nutrisys-background-50 text-sm text-nutrisys-text-600 font-medium border-r border-nutrisys-background-200'>
									{time}
								</div>
								{weekDates.map((date, dayIndex) => {
									const appointment = getAppointmentForSlot(
										date,
										time
									);
									const isWorking = isWorkingHour(
										dayIndex,
										time
									);

									return (
										<div
											key={`${date.toISOString()}-${time}`}
											className={`p-2 border-r border-nutrisys-background-100 min-h-12 ${
												!isWorking
													? 'bg-nutrisys-background-50'
													: 'bg-white hover:bg-nutrisys-background-50'
											} transition-colors cursor-pointer`}
										>
											{appointment && (
												<div
													onClick={() =>
														openAppointmentModal(
															appointment
														)
													}
													className={`p-2 rounded text-xs cursor-pointer transition-colors ${
														appointment.status ===
														'confirmada'
															? 'bg-green-100 text-green-800 hover:bg-green-200'
															: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
													}`}
												>
													<div className='font-medium truncate'>
														{
															appointment.patientName
														}
													</div>
													<div className='text-xs opacity-75'>
														{appointment.type}
													</div>
												</div>
											)}
										</div>
									);
								})}
							</div>
						))}
					</div>
				</div>

				{/* Modal de Horario de Trabajo */}
				{showScheduleModal && (
					<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
						<div className='bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden'>
							<div className='flex justify-between items-center p-6 border-b border-nutrisys-background-200'>
								<h2 className='text-xl font-bold text-nutrisys-text-900'>
									Horario de Trabajo
								</h2>
								<button
									onClick={() => setShowScheduleModal(false)}
									className='text-nutrisys-text-400 hover:text-nutrisys-text-600 text-2xl'
								>
									<FontAwesomeIcon icon={faTimes} />
								</button>
							</div>

							<div className='p-6 max-h-96 overflow-y-auto'>
								{!editingSchedule ? (
									<>
										<div className='space-y-4 mb-6'>
											{dayLabels.map((day, index) => {
												const dayKey =
													daysOfWeek[index];
												const schedule =
													workSchedule[dayKey];
												return (
													<div
														key={day}
														className='flex justify-between items-center p-3 bg-nutrisys-background-50 rounded-lg'
													>
														<span className='font-medium text-nutrisys-text-900'>
															{day}
														</span>
														<span className='text-nutrisys-text-600'>
															{schedule.active
																? `${schedule.start} - ${schedule.end}`
																: 'No laboral'}
														</span>
													</div>
												);
											})}
										</div>
										<button
											onClick={() =>
												setEditingSchedule(true)
											}
											className='w-full bg-nutrisys-primary-500 hover:bg-nutrisys-primary-600 text-white py-2 rounded-lg flex items-center justify-center gap-2'
										>
											<FontAwesomeIcon icon={faEdit} />
											Editar Horario
										</button>
									</>
								) : (
									<>
										<div className='space-y-4 mb-6'>
											{dayLabels.map((day, index) => {
												const dayKey =
													daysOfWeek[index];
												const schedule =
													tempSchedule[dayKey];
												return (
													<div
														key={day}
														className='p-4 border border-nutrisys-background-200 rounded-lg'
													>
														<div className='flex items-center justify-between mb-3'>
															<span className='font-medium text-nutrisys-text-900'>
																{day}
															</span>
															<label className='flex items-center gap-2'>
																<input
																	type='checkbox'
																	checked={
																		schedule.active
																	}
																	onChange={(
																		e
																	) =>
																		setTempSchedule(
																			{
																				...tempSchedule,
																				[dayKey]:
																					{
																						...schedule,
																						active: e
																							.target
																							.checked,
																					},
																			}
																		)
																	}
																	className='rounded border-nutrisys-background-300 text-nutrisys-primary-500 focus:ring-nutrisys-primary-500'
																/>
																<span className='text-sm text-nutrisys-text-600'>
																	Activo
																</span>
															</label>
														</div>
														{schedule.active && (
															<div className='grid grid-cols-2 gap-3'>
																<div>
																	<label className='block text-sm text-nutrisys-text-600 mb-1'>
																		Inicio
																	</label>
																	<input
																		type='time'
																		value={
																			schedule.start
																		}
																		onChange={(
																			e
																		) =>
																			setTempSchedule(
																				{
																					...tempSchedule,
																					[dayKey]:
																						{
																							...schedule,
																							start: e
																								.target
																								.value,
																						},
																				}
																			)
																		}
																		className='w-full border border-nutrisys-background-300 rounded px-3 py-1 text-sm'
																	/>
																</div>
																<div>
																	<label className='block text-sm text-nutrisys-text-600 mb-1'>
																		Fin
																	</label>
																	<input
																		type='time'
																		value={
																			schedule.end
																		}
																		onChange={(
																			e
																		) =>
																			setTempSchedule(
																				{
																					...tempSchedule,
																					[dayKey]:
																						{
																							...schedule,
																							end: e
																								.target
																								.value,
																						},
																				}
																			)
																		}
																		className='w-full border border-nutrisys-background-300 rounded px-3 py-1 text-sm'
																	/>
																</div>
															</div>
														)}
													</div>
												);
											})}
										</div>
										<div className='flex gap-3'>
											<button
												onClick={() =>
													setEditingSchedule(false)
												}
												className='flex-1 bg-nutrisys-background-300 hover:bg-nutrisys-background-400 text-nutrisys-text-700 py-2 rounded-lg'
											>
												Cancelar
											</button>
											<button
												onClick={saveSchedule}
												className='flex-1 bg-nutrisys-primary-500 hover:bg-nutrisys-primary-600 text-white py-2 rounded-lg flex items-center justify-center gap-2'
											>
												<FontAwesomeIcon
													icon={faSave}
												/>
												Guardar
											</button>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				)}

				{/* Modal de Detalles de Cita */}
				{showAppointmentModal && selectedAppointment && (
					<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
						<div className='bg-white rounded-lg w-full max-w-lg max-h-[80vh] overflow-hidden'>
							<div className='flex justify-between items-center p-6 border-b border-nutrisys-background-200'>
								<h2 className='text-xl font-bold text-nutrisys-text-900'>
									Detalles de la Cita
								</h2>
								<button
									onClick={closeAppointmentModal}
									className='text-nutrisys-text-400 hover:text-nutrisys-text-600 text-2xl'
								>
									<FontAwesomeIcon icon={faTimes} />
								</button>
							</div>

							{!showRescheduleModal ? (
								<div className='p-6'>
									<div className='space-y-4 mb-6'>
										<div className='flex items-center gap-3'>
											<FontAwesomeIcon
												icon={faUser}
												className='text-nutrisys-primary-500 w-5'
											/>
											<div>
												<p className='text-sm text-nutrisys-text-500'>
													Paciente
												</p>
												<p className='font-medium text-nutrisys-text-900'>
													{
														selectedAppointment.patientName
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
												<p className='font-medium text-nutrisys-text-900'>
													{
														selectedAppointment.patientPhone
													}
												</p>
											</div>
										</div>

										<div className='flex items-center gap-3'>
											<FontAwesomeIcon
												icon={faCalendarAlt}
												className='text-nutrisys-primary-500 w-5'
											/>
											<div>
												<p className='text-sm text-nutrisys-text-500'>
													Fecha y Hora
												</p>
												<p className='font-medium text-nutrisys-text-900'>
													{new Date(
														selectedAppointment.date
													).toLocaleDateString(
														'es-HN',
														{
															weekday: 'long',
															year: 'numeric',
															month: 'long',
															day: 'numeric',
														}
													)}{' '}
													- {selectedAppointment.time}
												</p>
											</div>
										</div>

										<div className='flex items-center gap-3'>
											<FontAwesomeIcon
												icon={faClock}
												className='text-nutrisys-primary-500 w-5'
											/>
											<div>
												<p className='text-sm text-nutrisys-text-500'>
													Duración
												</p>
												<p className='font-medium text-nutrisys-text-900'>
													{
														selectedAppointment.duration
													}{' '}
													minutos
												</p>
											</div>
										</div>

										<div className='flex items-center gap-3'>
											<FontAwesomeIcon
												icon={faMapMarkerAlt}
												className='text-nutrisys-primary-500 w-5'
											/>
											<div>
												<p className='text-sm text-nutrisys-text-500'>
													Ubicación
												</p>
												<p className='font-medium text-nutrisys-text-900'>
													{
														selectedAppointment.location
													}
												</p>
											</div>
										</div>

										<div className='flex items-start gap-3'>
											<FontAwesomeIcon
												icon={faNotesMedical}
												className='text-nutrisys-primary-500 w-5 mt-1'
											/>
											<div>
												<p className='text-sm text-nutrisys-text-500'>
													Tipo de Consulta
												</p>
												<p className='font-medium text-nutrisys-text-900'>
													{selectedAppointment.type}
												</p>
											</div>
										</div>

										{selectedAppointment.notes && (
											<div className='bg-nutrisys-background-50 p-3 rounded-lg'>
												<p className='text-sm text-nutrisys-text-500 mb-1'>
													Notas
												</p>
												<p className='text-nutrisys-text-700'>
													{selectedAppointment.notes}
												</p>
											</div>
										)}

										<div className='flex items-center gap-2'>
											<span className='text-sm text-nutrisys-text-500'>
												Estado:
											</span>
											<span
												className={`px-2 py-1 rounded-full text-xs font-medium ${
													selectedAppointment.status ===
													'confirmada'
														? 'bg-green-100 text-green-800'
														: 'bg-yellow-100 text-yellow-800'
												}`}
											>
												{selectedAppointment.status ===
												'confirmada'
													? 'Confirmada'
													: 'Pendiente'}
											</span>
										</div>
									</div>

									<div className='flex gap-3'>
										<button
											onClick={openRescheduleModal}
											className='flex-1 bg-nutrisys-primary-500 hover:bg-nutrisys-primary-600 text-white py-2 rounded-lg flex items-center justify-center gap-2'
										>
											<FontAwesomeIcon
												icon={faCalendarPlus}
											/>
											Reprogramar
										</button>
										<button
											onClick={cancelAppointment}
											className='flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2'
										>
											<FontAwesomeIcon
												icon={faCalendarTimes}
											/>
											Cancelar
										</button>
									</div>
								</div>
							) : (
								<div className='p-6'>
									<h3 className='text-lg font-semibold text-nutrisys-text-900 mb-4'>
										Reprogramar Cita
									</h3>

									<div className='space-y-4 mb-6'>
										<div>
											<label className='block text-sm font-medium text-nutrisys-text-700 mb-1'>
												Nueva Fecha
											</label>
											<input
												type='date'
												value={rescheduleForm.date}
												onChange={(e) =>
													setRescheduleForm({
														...rescheduleForm,
														date: e.target.value,
													})
												}
												className='w-full border border-nutrisys-background-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-nutrisys-primary-500'
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-nutrisys-text-700 mb-1'>
												Nueva Hora
											</label>
											<input
												type='time'
												value={rescheduleForm.time}
												onChange={(e) =>
													setRescheduleForm({
														...rescheduleForm,
														time: e.target.value,
													})
												}
												className='w-full border border-nutrisys-background-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-nutrisys-primary-500'
											/>
										</div>
									</div>

									<div className='flex gap-3'>
										<button
											onClick={() =>
												setShowRescheduleModal(false)
											}
											className='flex-1 bg-nutrisys-background-300 hover:bg-nutrisys-background-400 text-nutrisys-text-700 py-2 rounded-lg'
										>
											Cancelar
										</button>
										<button
											onClick={rescheduleAppointment}
											className='flex-1 bg-nutrisys-primary-500 hover:bg-nutrisys-primary-600 text-white py-2 rounded-lg flex items-center justify-center gap-2'
										>
											<FontAwesomeIcon icon={faCheck} />
											Confirmar
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Modal de Conflictos */}
				{showConflictModal && (
					<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
						<div className='bg-white rounded-lg w-full max-w-md'>
							<div className='p-6'>
								<div className='flex items-center gap-3 mb-4'>
									<FontAwesomeIcon
										icon={faExclamationTriangle}
										className='text-2xl text-yellow-500'
									/>
									<h2 className='text-xl font-bold text-nutrisys-text-900'>
										Citas en Conflicto
									</h2>
								</div>

								<p className='text-nutrisys-text-600 mb-4'>
									Las siguientes citas quedarían fuera del
									nuevo horario de trabajo:
								</p>

								<div className='space-y-2 mb-6 max-h-40 overflow-y-auto'>
									{conflictingAppointments.map((apt) => (
										<div
											key={apt.id}
											className='p-3 bg-red-50 border border-red-200 rounded-lg'
										>
											<p className='font-medium text-red-800'>
												{apt.patientName}
											</p>
											<p className='text-sm text-red-600'>
												{new Date(
													apt.date
												).toLocaleDateString(
													'es-HN'
												)}{' '}
												- {apt.time}
											</p>
										</div>
									))}
								</div>

								<p className='text-sm text-nutrisys-text-600 mb-6'>
									¿Desea continuar con el cambio de horario?
									Las citas en conflicto deberán ser
									reprogramadas.
								</p>

								<div className='flex gap-3'>
									<button
										onClick={() =>
											setShowConflictModal(false)
										}
										className='flex-1 bg-nutrisys-background-300 hover:bg-nutrisys-background-400 text-nutrisys-text-700 py-2 rounded-lg'
									>
										Cancelar
									</button>
									<button
										onClick={confirmScheduleChange}
										className='flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg flex items-center justify-center gap-2'
									>
										<FontAwesomeIcon
											icon={faExclamationTriangle}
										/>
										Continuar
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
