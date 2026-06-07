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
      <div className="bg-primary/90 backdrop-blur-md text-white/80 text-center py-1 px-4 text-[11px] font-medium tracking-wider border-b border-white/10">
        Confianza y Excelencia en Movilidad — WhatsApp: +1 (587) 856-9144
      </div>
      <div className="bg-primary/90 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <CarFront className="h-6 w-6" />
              </div>
              <div>
                <span className="font-headline text-lg font-bold tracking-tight leading-tight block">Cuba Car Renta</span>
                <span className="text-[10px] text-white/60 font-medium tracking-wider uppercase hidden sm:block">Renta de Autos en Cuba</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.target}
                  className="px-3 py-2 text-sm text-white/85 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/reserva?carId=4"
                className="ml-2 px-5 py-2 text-sm font-bold bg-white text-primary rounded-full hover:bg-white/90 hover:shadow-lg transition-all"
              >
                Reservar
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/15878569144"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                +1 (587) 856-9144
              </a>
              <button
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
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
        <div className="md:hidden bg-primary border-t border-white/10 shadow-lg animate-fade-in">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.target}
                className="text-white/85 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reserva?carId=4"
              className="text-center font-bold bg-white text-primary py-2.5 px-3 rounded-lg hover:bg-white/90 transition-colors mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Reservar Ahora
            </Link>
            <a
              href="https://wa.me/15878569144"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white/85 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
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
