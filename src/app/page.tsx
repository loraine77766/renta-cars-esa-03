import { CarList } from '@/components/CarList';
import { cars } from '@/lib/cars';
import { MessageSquare, Clock, ShieldCheck, ListChecks, Map, CalendarSearch, Car, User, CreditCard, MailCheck, ArrowRight, Star, Zap } from 'lucide-react';


export default function Home() {
  const sortedCars = [...cars].sort((a, b) => a.pricePerDay - b.pricePerDay);
  const cheapestCar = sortedCars[0];
  const corolla = cars.find(c => c.id === 15);
  const otherCar = sortedCars.find(c => c.id !== cheapestCar.id && c.id !== corolla?.id);
  const recommendedCars = [cheapestCar, corolla, otherCar].filter((c): c is NonNullable<typeof c> => c !== undefined);

  const howToSteps = [
    { icon: <CalendarSearch className="h-8 w-8" />, title: "Elige fecha y lugar", description: "Selecciona cuando y donde recoges el auto." },
    { icon: <Car className="h-8 w-8" />, title: "Escoge tu auto", description: "Elige entre nuestra flota de vehiculos." },
    { icon: <User className="h-8 w-8" />, title: "Tus datos", description: "Completa tus datos y te confirmamos." },
    { icon: <CreditCard className="h-8 w-8" />, title: "Pago seguro", description: "Recibes un link para pagar." },
    { icon: <MailCheck className="h-8 w-8" />, title: "Voucher", description: "Recibes tu factura y Voucher." }
  ];

  return (
    <div>
      <section className="hero-gradient text-white relative overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.15)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-5 py-2 rounded-full mb-6 text-sm font-medium tracking-wider uppercase backdrop-blur-sm animate-fade-in">
            Excelencia en Movilidad
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight animate-slide-up">
            Cuba Car Renta
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 animate-slide-up">
            Vehículos de calidad con el respaldo y la confianza que mereces.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/autos" className="inline-flex items-center justify-center text-lg font-bold rounded-full px-8 py-3 shadow-lg bg-white text-primary hover:bg-white/90 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Ver Autos <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a href="#como-funciona" className="inline-flex items-center justify-center text-lg rounded-full px-8 py-3 border-2 border-white/40 text-white hover:bg-white/10 transition-colors">
              Cómo funciona?
            </a>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-2 text-foreground">Cómo reservar?</h2>
          <p className="text-primary text-center text-sm font-bold uppercase tracking-widest mb-12">5 pasos sencillos</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {howToSteps.map((step, index) => (
              <div key={index} className="relative text-center group">
                <div className="mx-auto bg-gray-50 text-gray-400 rounded-2xl h-16 w-16 flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center font-bold text-xs shadow-sm">{index + 1}</span>
                  {step.icon}
                </div>
                <h3 className="font-headline text-sm font-bold text-foreground mb-1 uppercase tracking-wide">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Flota Destacada</h2>
              <p className="text-muted-foreground mt-2 text-sm">Selección exclusiva</p>
            </div>
            <a href="/autos" className="hidden sm:inline-flex items-center justify-center rounded-full px-4 py-2 border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          <CarList cars={recommendedCars} />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-2 text-foreground">Por qué elegirnos?</h2>
          <p className="text-primary text-sm font-bold uppercase tracking-widest text-center mb-12">Nuestra promesa</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <MessageSquare className="h-10 w-10" />, title: "Asistencia Exclusiva", desc: "Atención personalizada antes, durante y después de tu reserva." },
              { icon: <Clock className="h-10 w-10" />, title: "Confirmación Rápida", desc: "Respuesta en menos de 24 horas." },
              { icon: <ShieldCheck className="h-10 w-10" />, title: "Respaldo en Cuba", desc: "Contactos locales para apoyarte durante tu viaje." }
            ].map((item, i) => (
              <div key={i} className="text-center bg-white border border-primary/10 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="mx-auto bg-gradient-to-br from-primary to-primary/70 text-primary-foreground rounded-2xl h-16 w-16 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-headline text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-primary/10">
              <h3 className="font-headline text-xl text-foreground flex items-center gap-2 mb-4">
                <ListChecks className="h-5 w-5 text-primary" /> Informaciones
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary font-bold mt-1">-</span>Edad mínima 21 años, máxima 80 años.</li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-1">-</span>Licencia de conducción vigente (min. 2 años).</li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-1">-</span>Pasaporte vigente y Voucher impreso.</li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-1">-</span>Gasolina, impuesto aeropuerto y seguro pueden estar incluidos.</li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-1">-</span>Devolución en punto diferente: cargo extra.</li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-1">-</span>Seguro obligatorio. Pagos solo con tarjeta.</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-primary/10">
              <h3 className="font-headline text-xl text-foreground flex items-center gap-2 mb-4">
                <Map className="h-5 w-5 text-primary" /> Cuba te espera
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Pasear por el Malecón de La Habana.", "Tomar un Mojito en La Bodeguita del Medio.", "Recorrer la Habana Vieja.", "Bañarte en Varadero.", "Visitar Trinidad colonial.", "Viñales a caballo.", "Cienfuegos neoclásico."].map((item, i) => (
                  <li key={i} className="flex gap-2"><Star className="h-4 w-4 text-primary shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1)_0%,transparent_60%)]"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-white/80 text-xs font-medium mb-4 backdrop-blur-sm">
            <Zap className="h-3.5 w-3.5" /> Listo para viajar
          </div>
          <h2 className="font-headline text-3xl font-bold text-white mb-4 tracking-tight">Tu viaje comienza aquí</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto text-sm">Reserva tu auto hoy y recorre Cuba con estilo</p>
          <a href="/autos" className="inline-flex items-center justify-center text-lg font-bold rounded-full px-10 py-3 shadow-lg bg-white text-primary hover:bg-white/90 hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Ver Autos <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
