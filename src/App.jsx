import "./styles/App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import CleanLayout from "./layouts/CleanLayout";
import CleanLayout2 from "./layouts/CleanLayout2";
import DocLayout from "./layouts/DocLayout";
import PxLayout from "./layouts/PxLayout";
import AdminLayout from "./layouts/AdminLayout";
import RequireAuth from "./utils/RequireAuth";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RegisterDoc from "./pages/doc/RegisterDoc";
import RegisterPx from "./pages/px/RegisterPx";
import RegisterSelect from "./pages/RegisterSelect";
import LoginAdmin from "./pages/admin/LoginAdmin";
import LandingAdmin from "./pages/admin/LandingAdmin";
import LandingDoc from "./pages/doc/LandingDoc";
import LandingPx from "./pages/px/LandingPx";
import MarketplaceDoc from "./pages/doc/MarketplaceDoc";
import AgendaDoc from "./pages/doc/AgendaDoc";
import PatientsDoc from "./pages/doc/PatientsDoc";
import ProfileDoc from "./pages/doc/ProfileDoc";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Paginas publicas (no requieren autenticacion) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
        </Route>
        {/* Paginas publicas (no requieren autenticacion) */}
        <Route element={<CleanLayout2 />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register/doctor" element={<RegisterDoc />} />
          <Route path="/register/patient" element={<RegisterPx />} />
          <Route path="/login/admin" element={<LoginAdmin />} />
        </Route>
        <Route element={<CleanLayout />}>
          <Route path="/register/select-type" element={<RegisterSelect />} />
        </Route>

        {/* Paginas de administrador */}
        <Route
          path="/admin"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route path="landing" element={<LandingAdmin />} />
        </Route>

        {/* Paginas de nutricionista */}
        <Route
          path="/doc"
          element={
            <RequireAuth allowedRoles={["doctor"]}>
              <DocLayout />
            </RequireAuth>
          }
        >
          <Route path="landing" element={<LandingDoc />} />
          <Route path="marketplace" element={<MarketplaceDoc />} />
          <Route path="agenda" element={<AgendaDoc />} />
          <Route path="pacientes" element={<PatientsDoc />} />
          <Route path="perfil" element={<ProfileDoc />} />
        </Route>

        {/* Paginas de paciente */}
        <Route
          path="/px"
          element={
            <RequireAuth allowedRoles={["paciente"]}>
              <PxLayout />
            </RequireAuth>
          }
        >
          <Route path="landing" element={<LandingPx />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
