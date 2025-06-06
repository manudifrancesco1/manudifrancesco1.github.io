// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Leaf, Truck, Sprout, Home, ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Inicializar colapsado en desktop cuando estamos en /inicio
  const [collapsed, setCollapsed] = useState(() => {
    const isDesktop = window.innerWidth >= 768;
    const isHome = location.pathname === '/inicio';
    return isDesktop && isHome;
  });

  const navItems = [
    { label: 'Inicio', icon: <Home size={22} />, path: '/inicio' },
    { label: 'Cosechas', icon: <Leaf size={22} />, path: '/cosechas' },
    { label: 'Camiones', icon: <Truck size={22} />, path: '/camiones' },
    { label: 'Siembras', icon: <Sprout size={22} />, path: '/siembras' },
    { label: 'Stock/Ventas', icon: <ShoppingCart size={22} />, path: '/ventas' },  // <-- Nuevo ítem
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) setOpen(false);
    else setCollapsed(true);
  };

  const MobileSidebar = () => (
    <aside
      className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[#235633] text-white flex flex-col transition-transform duration-300 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Leaf size={24} />
          <span className="text-lg font-bold leading-tight">
            La Reina<br />Don Felipe
          </span>
        </div>
        <button
          className="p-2 rounded hover:bg-[#1f4f33]"
          onClick={() => setOpen(false)}
        >
          <X size={24} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {navItems.map(({ label, icon, path }) => (
          <button
            key={label}
            onClick={() => handleNavigation(path)}
            className={`flex items-center w-full gap-3 px-4 py-3 text-left hover:bg-[#1f4f33] transition-colors ${
              location.pathname === path ? 'bg-[#1f4f33]' : ''
            }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );

  const DesktopSidebar = () => (
    <aside
      className={`hidden md:flex md:relative md:translate-x-0 fixed inset-y-0 left-0 z-40 bg-[#235633] text-white flex flex-col transition-width duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div
        className={`flex items-center ${
          collapsed ? 'justify-center' : 'justify-between'
        } p-4`}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Leaf size={24} />
            <span className="text-lg font-bold leading-tight">
              La Reina<br />Don Felipe
            </span>
          </div>
        )}
        <button
          className="p-2 rounded hover:bg-[#1f4f33]"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <MenuIcon size={24} className={collapsed ? 'rotate-180' : ''} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {navItems.map(({ label, icon, path }) => (
          <button
            key={label}
            onClick={() => handleNavigation(path)}
            className={`flex items-center w-full gap-3 px-4 py-3 text-left hover:bg-[#1f4f33] transition-colors ${
              location.pathname === path ? 'bg-[#1f4f33]' : ''
            }`}
          >
            {icon}
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );

  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  );
}
