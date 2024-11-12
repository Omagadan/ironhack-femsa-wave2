// Clase que representa un meme de imagen.
class MemeImagen {
  constructor(imagenURL) {
    this.tipo = "Imagen";
    this.contenido = imagenURL;
  }

  // Método para mostrar el contenido del meme en un formato específico de imagen.
  render() {
    return `Meme de Imagen: ${this.contenido}`;
  }
}

module.exports = MemeImagen;
