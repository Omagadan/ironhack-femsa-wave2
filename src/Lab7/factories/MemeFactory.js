// La clase MemeFactory sigue el patrón Factory para crear distintos tipos de memes
// dependiendo del tipo solicitado. Esto permite crear objetos de memes específicos
// sin exponer la lógica de creación al cliente.
const MemeTexto = require("../models/MemeTexto");
const MemeImagen = require("../models/MemeImagen");
const MemeGIF = require("../models/MemeGIF");

class MemeFactory {
  // Método estático para crear un tipo de meme basado en el tipo solicitado.
  // Esta abstracción permite agregar fácilmente nuevos tipos de memes en el futuro.
  static crearMeme(tipo, contenido) {
    switch (tipo) {
      case "Texto":
        return new MemeTexto(contenido);
      case "Imagen":
        return new MemeImagen(contenido);
      case "GIF":
        return new MemeGIF(contenido);
      default:
        throw new Error("Tipo de meme no reconocido");
    }
  }
}

module.exports = MemeFactory;
