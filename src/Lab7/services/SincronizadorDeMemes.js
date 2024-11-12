// La clase SincronizadorDeMemes se encarga de manejar la sincronización de memes
// de forma asíncrona. Este servicio permite enviar memes a un servidor sin bloquear
// el flujo principal de la aplicación.
class SincronizadorDeMemes {
  // Método estático para sincronizar un meme con el servidor.
  static async sincronizar(meme) {
    try {
      console.log("Sincronizando meme con el servidor...");

      // Simulación de solicitud asíncrona a una API.
      const respuesta = await fetch("https://memesapi.com/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meme),
      });

      // Verificación de la respuesta de la API.
      if (!respuesta.ok) throw new Error("Error en la sincronización");

      console.log("Meme sincronizado exitosamente");
    } catch (error) {
      console.log("Error al sincronizar meme:", error.message);
    }
  }
}

module.exports = SincronizadorDeMemes;
