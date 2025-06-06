// src/pages/Inicio.jsx
import React from "react";
import { Leaf, Truck, Sprout, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Inicio() {
  const navigate = useNavigate();
  const pages = [
    { label: "Cosechas", icon: <Leaf size={28} />,  path: "/cosechas", description: "Gestión de lotes cosechados y rendimiento." },
    { label: "Camiones", icon: <Truck size={28} />,  path: "/camiones", description: "Registro de transporte por lote y destino." },
    { label: "Siembras", icon: <Sprout size={28} />, path: "/siembras", description: "Registro de siembras por campaña y lote." },
    { label: "Stock/Ventas", icon: <ShoppingCart size={28} />, path: "/ventas", description: "Gestión de stock y registro de ventas." },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-4">
        <Sprout size={40} className="text-green-700" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">La Reina – Don Felipe</h1>
          <p className="text-gray-600 text-sm">Gestión agropecuaria técnica y comercial</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {pages.map((page) => (
          <div
            key={page.label}
            onClick={() => navigate(page.path)}
            className="cursor-pointer border border-gray-200 rounded-lg p-6 hover:shadow-xl hover:border-green-600 transition flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 text-green-700">
              {page.icon}
              <h2 className="text-xl font-semibold">{page.label}</h2>
            </div>
            <p className="text-gray-600 text-sm">{page.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
