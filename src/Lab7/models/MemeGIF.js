// Clase que representa un meme en formato GIF.
class MemeGIF {
  constructor(gifURL) {
    this.tipo = "GIF";
    this.contenido = gifURL;
  }

  // Método específico para mostrar el meme GIF.
  render() {
    return `Meme en GIF: ${this.contenido}`;
  }
}

module.exports = MemeGIF;
