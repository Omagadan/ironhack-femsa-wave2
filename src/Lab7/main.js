// Archivo principal donde se integran todos los módulos y patrones de diseño.
// Este archivo muestra cómo los componentes interactúan en el flujo de la aplicación.

const ConfiguracionMemeApp = require("./config/ConfiguracionMemeApp");
const MemeFactory = require("./factories/MemeFactory");
const MemeSolicitud = require("./observers/MemeSolicitud");
const Notificacion = require("./observers/Notificacion");
const SincronizadorDeMemes = require("./services/SincronizadorDeMemes");

async function main() {
  // Uso del Singleton para acceder a la configuración global.
  const configuracion = ConfiguracionMemeApp.getInstance();
  console.log("Configuración de la app:", configuracion.settings);

  // Creación de memes usando el patrón Factory, lo que permite instanciar fácilmente nuevos memes.
  const memeTexto = MemeFactory.crearMeme(
    "Texto",
    "Cuando el código funciona a la primera"
  );
  const memeImagen = MemeFactory.crearMeme(
    "Imagen",
    "https://imagenes.com/meme.jpg"
  );

  console.log(memeTexto.render());
  console.log(memeImagen.render());

  // Manejo del patrón Observer: Se suscriben observadores para cambios de estado en una solicitud de meme.
  const solicitudMeme = new MemeSolicitud("Meme divertido para viernes");
  const notificacion = new Notificacion();
  solicitudMeme.agregarObservador(notificacion);

  // Cambio de estado y notificación a los observadores.
  solicitudMeme.cambiarEstado("Completado");

  // Ejecución asíncrona de la sincronización de un meme usando el patrón Asynchronous Models.
  await SincronizadorDeMemes.sincronizar({
    descripcion: "Meme GIF para el fin de semana",
    tipo: "GIF",
    url: "https://gifmemes.com/meme1.gif",
  });
}

// Ejecución de la función principal.
main();
