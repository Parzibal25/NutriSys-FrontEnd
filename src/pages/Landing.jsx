import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import nutrisysLogoNoText from "/logo/logo-no-text.svg";
import nutrisysLogoNoTextNegative from "/logo/logo-no-text-negative.svg";
import nutrisysLogo from "/logo/logo.svg";
import "../styles/App.css";

export default function Landing() {
  return (
    <>
      <div className="bg-white p-4 ml-4 mr-4 mt-10 flex mb-20 row-to-col gap-y-10 gap-x-40 items-center justify-self-center">
        <div className="flex flex-col">
          <div className="text-nutrisys-primary-500 font-kodchasan font-bold text-6xl">
            Conecta con tu nutriólogo ideal
          </div>
          <div className="text-black font-montserrat font-normal text-xl mt-8">
            Somos una solución para conectar pacientes y nutriologos para hacer
            tu vida más saludable
          </div>
          <div className="flex gap-4 mt-8">
            <Link
              to="/register/patient"
              className="bg-nutrisys-primary-500 border-nutrisys-primary-500 text-white border-2 pt-1 pb-1 pl-2 pr-2 rounded-2xl font-kodchasan font-bold"
            >
              Buscar nutriólogo
            </Link>
            <Link
              to="/register/doctor"
              className="bg-white border-nutrisys-primary-500 border-2 pt-1 pb-1 pl-2 pr-2 text-nutrisys-primary-500 rounded-2xl font-kodchasan font-bold"
            >
              Soy nutriólogo
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img src={nutrisysLogo} className=" h-64 w-64" alt="nutrisys logo" />
        </div>
      </div>
      <div className="bg-nutrisys-background-200 p-4 ml-4 mr-4 items-center justify-items-center flex flex-col w-full justify-self-center h-fit pb-8">
        <span className="w-full text-nutrisys-primary-500 rounded-2xl font-kodchasan font-bold text-center text-4xl">
          ¿Cómo funciona?
        </span>
        <div className="flex justify-center gap-x-40 gap-y-10 mt-10 row-to-col h-fit">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-nutrisys-primary-500 text-white rounded-full flex items-center justify-center text-xl font-kodchasan font-bold">
              1
            </div>
            <span className="text-nutrisys-primary-500 rounded-2xl font-kodchasan font-bold text-center text-lg">
              Busca
            </span>
            <span className="text-black rounded-2xl font-montserrat font-normal text-center text-sm">
              Encuentra nutriologos
            </span>
            <span className="text-black rounded-2xl font-montserrat font-normal text-center text-sm">
              acorde a tus necesidades
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-nutrisys-secondary-500 text-white rounded-full flex items-center justify-center text-xl font-kodchasan font-bold">
              2
            </div>
            <span className="text-nutrisys-secondary-500 rounded-2xl font-kodchasan font-bold text-center text-lg">
              Agenda
            </span>
            <span className="text-black rounded-2xl font-montserrat font-normal text-center text-sm">
              Reserva tu cita
            </span>
            <span className="text-black rounded-2xl font-montserrat font-normal text-center text-sm">
              fácilmente
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-nutrisys-primary-500 text-white rounded-full flex items-center justify-center text-xl font-kodchasan font-bold">
              3
            </div>
            <span className="text-nutrisys-primary-500 rounded-2xl font-kodchasan font-bold text-center text-lg">
              Consulta
            </span>
            <span className="text-black rounded-2xl font-montserrat font-normal text-center text-sm">
              Recibe tu plan nutricional
            </span>
            <span className="text-black rounded-2xl font-montserrat font-normal text-center text-sm">
              personalizado
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
