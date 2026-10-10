import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  alternates: { canonical: "/politica-privacidad" },
  description:
    "Política de privacidad de Arreglos Express Madrid. Información sobre el tratamiento de datos personales conforme al RGPD.",
};

export default function PoliticaPrivacidad() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🔐 POLÍTICA DE PRIVACIDAD – ARREGLOS EXPRESS MADRID
      </h1>

      <p className="text-sm text-muted-foreground mb-6 text-center">
        Última actualización: {new Date().toLocaleDateString("es-ES")}
      </p>

      <p className="mb-8 text-justify">
        En cumplimiento de lo dispuesto en el Reglamento (UE) 2016/679 (RGPD) y
        la Ley Orgánica 3/2018 (LOPDGDD), se informa a los usuarios del sitio
        web https://arreglosexpressmadrid.com sobre el tratamiento de sus datos
        personales.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">
            1. Responsable del tratamiento
          </h2>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="mb-2">
              <strong>Nombre comercial:</strong> Arreglos Express Madrid
            </p>
            <p className="mb-2">
              <strong>Dirección:</strong> Calle de los Madrazo 14, 28014 Madrid, España
            </p>
            <p className="mb-2">
              <strong>Correo electrónico:</strong>{" "}
              <a href="mailto:info@arreglosexpressmadrid.com" className="underline">
                info@arreglosexpressmadrid.com
              </a>
            </p>
          </div>
          <p className="mt-3">
            El responsable garantiza la protección y confidencialidad de los
            datos personales conforme a la normativa vigente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            2. Datos personales que se recogen
          </h2>
          <p className="mb-3">
            A través del formulario de contacto de este sitio web se recogen los
            siguientes datos:
          </p>
          <ul className="list-disc list-inside space-y-1 bg-muted/50 p-4 rounded-lg">
            <li>Nombre</li>
            <li>Correo electrónico</li>
            <li>Código postal (opcional)</li>
            <li>Mensaje</li>
            <li>Imágenes adjuntas (opcional)</li>
            <li>Dirección IP</li>
            <li>Fecha y hora del envío</li>
          </ul>
          <p className="mt-3">
            Si pagas un arreglo desde la web, el pago lo gestiona Stripe, que
            recoge tu nombre, correo electrónico, el nombre o número de
            presupuesto que indiques y los datos del medio de pago. Nosotros
            nunca vemos los datos completos de tu tarjeta.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            3. Finalidad del tratamiento
          </h2>
          <p className="mb-3">
            Los datos personales se utilizan únicamente para:
          </p>
          <ul className="list-disc list-inside space-y-1 bg-muted/50 p-4 rounded-lg">
            <li>Gestionar solicitudes de contacto</li>
            <li>Atender presupuestos y consultas</li>
            <li>Prestar los servicios solicitados por el usuario</li>
            <li>Cobrar los arreglos pagados a través de la web</li>
            <li>Comunicar información relacionada con el servicio</li>
          </ul>
          <p className="mt-3">
            No se utilizarán los datos para fines comerciales sin consentimiento
            previo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Legitimación</h2>
          <p>
            La base legal para el tratamiento de los datos es el consentimiento
            del usuario, al marcar el checkbox de aceptación y enviar el
            formulario. Los datos del pago se tratan para ejecutar el servicio
            contratado por el usuario.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            5. Conservación de los datos
          </h2>
          <p className="mb-3">Los datos se conservarán:</p>
          <ul className="list-disc list-inside space-y-1 bg-muted/50 p-4 rounded-lg">
            <li>Durante el tiempo necesario para atender la solicitud</li>
            <li>Mientras exista una relación comercial</li>
            <li>O hasta que el usuario solicite su eliminación</li>
            <li>Los datos de los pagos, durante los plazos que exija la ley</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            6. Destinatarios de los datos
          </h2>
          <p className="mb-3">
            Los datos se almacenan de forma segura mediante los servicios de:
          </p>
          <ul className="list-disc list-inside space-y-1 bg-muted/50 p-4 rounded-lg">
            <li>Netlify Forms (gestión de formularios)</li>
            <li>Stripe Payments Europe, Ltd. (Irlanda), para el cobro de los pagos</li>
            <li>Umami (estadísticas anónimas de visitas, sin cookies)</li>
            <li>Servicios de alojamiento en la nube</li>
          </ul>
          <p className="mt-3">
            No se cederán datos a terceros salvo obligación legal.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            7. Derechos del usuario
          </h2>
          <p className="mb-3">
            El usuario puede ejercer en cualquier momento los siguientes
            derechos:
          </p>
          <ul className="list-disc list-inside space-y-1 bg-muted/50 p-4 rounded-lg">
            <li>Acceso</li>
            <li>Rectificación</li>
            <li>Supresión</li>
            <li>Oposición</li>
            <li>Limitación del tratamiento</li>
            <li>Portabilidad de los datos</li>
          </ul>
          <p className="mt-3">
            Para ejercer estos derechos, escríbenos a{" "}
            <a href="mailto:info@arreglosexpressmadrid.com" className="underline">
              info@arreglosexpressmadrid.com
            </a>{" "}
            o envíanos un mensaje a través del formulario de contacto.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            8. Medidas de seguridad
          </h2>
          <p className="mb-3">El sitio web cuenta con:</p>
          <ul className="list-disc list-inside space-y-1 bg-muted/50 p-4 rounded-lg">
            <li>Certificado SSL (HTTPS)</li>
            <li>Sistemas de almacenamiento cifrados</li>
            <li>Control de accesos</li>
            <li>Protección contra accesos no autorizados</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Cookies y estadísticas de uso</h2>
          <p className="mb-3">
            Este sitio web no utiliza cookies de seguimiento ni de publicidad.
          </p>
          <p className="mb-3">
            Para saber cuántas personas visitan la web y qué secciones les
            resultan útiles usamos Umami, una herramienta de analítica que no
            instala cookies ni guarda datos que permitan identificarte. Solo
            obtenemos estadísticas agregadas y anónimas: páginas vistas, país,
            tipo de dispositivo y navegador, página de procedencia y botones
            pulsados (por ejemplo, el de WhatsApp o el calculador de recogida).
          </p>
          <p>
            Los pagos se realizan en la página de Stripe, que aplica su propia
            política de privacidad y de cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">10. Enlaces externos</h2>
          <p>
            Este sitio web puede contener enlaces a otros sitios web. Arreglos
            Express Madrid no se responsabiliza de las políticas de privacidad
            de dichos sitios.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            11. Modificación de la política
          </h2>
          <p>
            Arreglos Express Madrid se reserva el derecho a modificar la
            presente política para adaptarla a cambios legislativos o técnicos.
            Los cambios serán publicados en esta misma página.
          </p>
        </section>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-8">
          <p className="text-green-800 dark:text-green-200 font-medium">
            ✅ Esta política cumple con: RGPD Europeo, LOPDGDD Española,
            Requisitos de Google, Netlify y motores de búsqueda
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <a
          href="/"
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
}
