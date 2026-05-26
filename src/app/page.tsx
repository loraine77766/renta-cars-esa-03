import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CarList } from '@/components/CarList';
import { cars } from '@/lib/cars';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Clock, ShieldCheck, ListChecks, Map, CalendarSearch, Car, User, CreditCard, MailCheck, ArrowRight, Star } from 'lucide-react';


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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <section className="hero-gradient text-white">
          <div className="container mx-auto px-4 py-24 md:py-32 text-center">
            <div className="inline-block bg-black/30 px-5 py-2 rounded mb-6 text-sm font-medium tracking-wider uppercase">Excelencia en Movilidad</div>
            <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
              Renta de Autos en Cuba
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Vehiculos de calidad con el respaldo y la confianza que mereces.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/autos" className="inline-flex items-center justify-center text-lg font-bold rounded px-8 py-3 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Ver Flota <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#como-funciona" className="inline-flex items-center justify-center text-lg rounded px-8 py-3 border-2 border-white/40 text-white hover:bg-white/10 transition-colors">
                Como funciona?
              </a>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-2 text-secondary">Como reservar?</h2>
            <p className="text-primary text-center text-sm font-bold uppercase tracking-widest mb-12">5 pasos sencillos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
               {howToSteps.map((step, index) => (
                   <div key={index} className="relative text-center group">
                       <div className="mx-auto bg-secondary text-primary rounded h-16 w-16 flex items-center justify-center mb-3 shadow group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                           <span className="absolute -top-2 -right-2 bg-primary text-secondary rounded h-6 w-6 flex items-center justify-center font-bold text-xs">{index + 1}</span>
                           {step.icon}
                       </div>
                       <h3 className="font-headline text-sm font-bold text-secondary mb-1 uppercase tracking-wide">{step.title}</h3>
                       <p className="text-xs text-muted-foreground">{step.description}</p>
                   </div>
               ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-secondary">Flota Destacada</h2>
                <p className="text-muted-foreground mt-2 text-sm">Seleccion exclusiva</p>
              </div>
              <a href="/autos" className="hidden sm:inline-flex items-center justify-center rounded px-4 py-2 border-2 border-secondary/30 text-secondary hover:bg-secondary hover:text-white transition-colors">
                Ver todos <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            <CarList cars={recommendedCars} />
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-2 text-secondary">Por que elegirnos?</h2>
            <p className="text-primary text-sm font-bold uppercase tracking-widest text-center mb-12">Nuestra promesa</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <MessageSquare className="h-10 w-10" />, title: "Asistencia Exclusiva", desc: "Atencion personalizada antes, durante y despues de tu reserva." },
                { icon: <Clock className="h-10 w-10" />, title: "Confirmacion Rapida", desc: "Respuesta en menos de 24 horas." },
                { icon: <ShieldCheck className="h-10 w-10" />, title: "Respaldo en Cuba", desc: "Contactos locales para apoyarte durante tu viaje." }
              ].map((item, i) => (
                <Card key={i} className="text-center border-0 bg-muted shadow-sm hover:shadow-md transition-all duration-300 rounded-sm">
                  <CardHeader>
                    <div className="mx-auto bg-secondary text-primary rounded-sm h-16 w-16 flex items-center justify-center mb-2">
                      {item.icon}
                    </div>
                    <CardTitle className="font-headline text-lg font-bold text-secondary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm">{item.desc}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm border-0 bg-white rounded-sm">
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-secondary flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-primary" />
                    Informaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><span className="text-primary font-bold mt-1">-</span>Edad minima 21 anos, maxima 80 anos.</li>
                    <li className="flex gap-2"><span className="text-primary font-bold mt-1">-</span>Licencia de conduccion vigente (min. 2 anos).</li>
                    <li className="flex gap-2"><span className="text-primary font-bold mt-1">-</span>Pasaporte vigente y Voucher impreso.</li>
                    <li className="flex gap-2"><span className="text-primary font-bold mt-1">-</span>Gasolina, impuesto aeropuerto y seguro pueden estar incluidos.</li>
                    <li className="flex gap-2"><span className="text-primary font-bold mt-1">-</span>Devolucion en punto diferente: cargo extra.</li>
                    <li className="flex gap-2"><span className="text-primary font-bold mt-1">-</span>Seguro obligatorio. Pagos solo con tarjeta.</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="shadow-sm border-0 bg-white rounded-sm">
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-secondary flex items-center gap-2">
                    <Map className="h-5 w-5 text-primary" />
                    Cuba te espera
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {["Pasear por el Malecon de La Habana.", "Tomar un Mojito en La Bodeguita del Medio.", "Recorrer la Habana Vieja.", "Banarte en Varadero.", "Visitar Trinidad colonial.", "Vinales a caballo.", "Cienfuegos neoclasico."].map((item, i) => (
                      <li key={i} className="flex gap-2"><Star className="h-4 w-4 text-primary shrink-0 mt-0.5" />{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="hero-gradient py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold text-white mb-4 tracking-tight">Tu viaje comienza aqui</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto text-sm">Reserva tu auto hoy y recorre Cuba con estilo</p>
            <a href="/autos" className="inline-flex items-center justify-center text-lg font-bold rounded px-10 py-3 shadow-lg bg-primary text-secondary hover:bg-primary/90 transition-colors">
              Ver Autos <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
