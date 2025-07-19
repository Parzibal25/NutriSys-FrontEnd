import { useState } from 'react';
import nutrisysLogoNoText from '/logo/logo-no-text.svg';
import './styles/App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CleanLayout from './layouts/CleanLayout';
import DocLayout from './layouts/DocLayout';
import PxLayout from './layouts/PxLayout';
import AdminLayout from './layouts/AdminLayout';
import RequireAuth from './utils/RequireAuth';
import Landing from './pages/Landing';
import Login from './pages/Login';
import RegisterDoc from './pages/doc/RegisterDoc';
import RegisterPx from './pages/px/RegisterPx';
import RegisterSelect from './pages/RegisterSelect';
import LoginAdmin from './pages/admin/LoginAdmin';
import LandingAdmin from './pages/admin/LandingAdmin';
import LandingDoc from './pages/doc/LandingDoc';
import LandingPx from './pages/px/LandingPx';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Paginas publicas (no requieren autenticacion) */}
				<Route path='/' element={<MainLayout />}>
					<Route index element={<Landing />} />
				</Route>
				{/* Paginas publicas (no requieren autenticacion) */}
				<Route element={<CleanLayout />}>
					<Route path='/login' element={<Login />} />
					<Route
						path='/select-register-type'
						element={<RegisterSelect />}
					/>
					<Route
						path='/register-as-doctor'
						element={<RegisterDoc />}
					/>
					<Route
						path='/register-as-patient'
						element={<RegisterPx />}
					/>
					<Route path='/login/admin' element={<LoginAdmin />} />
				</Route>

				{/* Paginas de administrador */}
				<Route
					path='/admin'
					element={
						<RequireAuth allowedRoles={['admin']}>
							<AdminLayout />
						</RequireAuth>
					}
				>
					<Route path='landing' element={<LandingAdmin />} />
				</Route>

				{/* Paginas de nutricionista */}
				<Route
					path='/doctor'
					element={
						<RequireAuth allowedRoles={['doctor']}>
							<DocLayout />
						</RequireAuth>
					}
				>
					<Route path='landing-doctor' element={<LandingDoc />} />
				</Route>

				{/* Paginas de paciente */}
				<Route
					path='/'
					element={
						<RequireAuth allowedRoles={['patient']}>
							<PxLayout />
						</RequireAuth>
					}
				>
					<Route path='/landing-doctor' element={<LandingPx />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
