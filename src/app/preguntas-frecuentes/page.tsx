import FAQ from '@/components/FAQ';

export default function PreguntasFrecuentesPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <FAQ />

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="font-headline text-3xl text-primary text-center">¿Quiénes somos?</h2>
        <div className="mt-6 space-y-4 text-gray-500 text-sm">
          <p>
            Cuba Car Renta es una empresa llena de experiencias, donde te ayudamos a encontrar y rentar tu Auto en Cuba a los precios más acogedores del mercado.
          </p>
          <p>
            Nos preocupamos por las necesidades reales de nuestros clientes.
          </p>

          <h3 className="font-headline text-2xl text-primary text-center pt-4">Nuestro objetivo</h3>
          <p>
            Cuba Car Renta se proyecta como objetivo principal el desarrollo servicios que cumplan con las expectativas de nuestros clientes, especialmente cubanos radicados en Europa y el Estado de la Florida. Todo el equipo humano de Cuba Car Renta se involucra para mantener el alto grado de satisfacción al cliente.
          </p>
        </div>
      </div>
    </div>
  );
}
