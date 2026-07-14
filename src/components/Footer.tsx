import Link from 'next/link';
import { CarFront, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-500 mt-auto border-t-4 border-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-gray-900 mb-4">
              <div className="bg-gray-200 p-1.5 rounded-lg">
                <CarFront className="h-5 w-5 text-gray-700" />
              </div>
              <div>
                <span className="font-headline text-lg font-bold block">Cuba Car Renta</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Renta de Autos en Cuba</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Agencia On-Line con asistencia telefónica. Te ayudamos a encontrar tu auto ideal en Cuba con la mejor relación calidad-precio.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/15878569144" target="_blank" rel="noopener noreferrer" className="bg-[#25d366]/10 text-[#25d366] p-2 rounded-lg hover:bg-[#25d366]/20 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-gray-900 font-semibold mb-5 uppercase text-xs tracking-widest">Enlaces</h4>
            <div className="flex flex-col gap-2.5">
              <Link href="/autos" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Nuestra Flota</Link>
              <Link href="/preguntas-frecuentes" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Preguntas Frecuentes</Link>
              <Link href="/contactanos" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Contáctanos</Link>
              <Link href="/mis-rentas" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Mis Rentas</Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-gray-900 font-semibold mb-5 uppercase text-xs tracking-widest">Legal</h4>
            <div className="flex flex-col gap-2.5">
              <Link href="/terminos-y-condiciones" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Términos y Condiciones</Link>
              <Link href="/politica-de-privacidad" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Política de Privacidad</Link>
              <Link href="/politica-de-cookies" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Política de Cookies</Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-gray-900 font-semibold mb-5 uppercase text-xs tracking-widest">Contacto</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+15878569144" className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-gray-900 transition-colors group">
                <Phone className="h-4 w-4 text-gray-700 group-hover:scale-110 transition-transform" />
                +1 (587) 856-9144
              </a>
              <a href="https://wa.me/15878569144" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-gray-900 transition-colors group">
                <svg className="h-4 w-4 text-gray-700 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Cuba Car Renta. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="/terminos-y-condiciones" className="hover:text-gray-900 transition-colors">Términos</Link>
            <Link href="/politica-de-privacidad" className="hover:text-gray-900 transition-colors">Privacidad</Link>
            <Link href="/politica-de-cookies" className="hover:text-gray-900 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
