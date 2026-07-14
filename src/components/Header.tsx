'use client';

import Link from 'next/link';
import { CarFront, Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/autos", label: "Autos" },
    { href: "/preguntas-frecuentes", label: "FAQ" },
    { href: "https://wa.me/15878569144", label: "Soporte", target: "_blank" },
  ];

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-gray-100 text-gray-600 text-center py-1 px-4 text-[11px] font-medium tracking-wider border-b border-gray-200">
        Confianza y Excelencia en Movilidad — WhatsApp: +1 (587) 856-9144
      </div>
      <div className="bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors">
              <div className="bg-gray-100 p-1.5 rounded-lg">
                <CarFront className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <span className="font-headline text-lg font-bold tracking-tight leading-tight block">Cuba Car Renta</span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase hidden sm:block">Renta de Autos en Cuba</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.target}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/reserva?carId=4"
                className="ml-2 px-5 py-2 text-sm font-bold bg-gray-900 text-white rounded-full hover:bg-gray-700 hover:shadow-lg transition-all"
              >
                Reservar
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/15878569144"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                +1 (587) 856-9144
              </a>
              <button
                className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menú"
              >
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-fade-in">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.target}
                className="text-gray-600 hover:text-gray-900 py-2.5 px-3 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reserva?carId=4"
              className="text-center font-bold bg-gray-900 text-white py-2.5 px-3 rounded-lg hover:bg-gray-700 transition-colors mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Reservar Ahora
            </Link>
            <a
              href="https://wa.me/15878569144"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 py-2.5 px-3 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <Phone className="h-4 w-4" />
              +1 (587) 856-9144
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
