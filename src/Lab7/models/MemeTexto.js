// Clase que representa un meme de texto.
// Seguir esta estructura permite implementar métodos específicos para cada tipo de meme.
class MemeTexto {
  constructor(texto) {
    this.tipo = "Texto";
    this.contenido = texto;
  }

  // Método que muestra el contenido del meme. Es útil para implementar métodos específicos
  // en cada tipo de meme y facilitar la extensibilidad.
  render() {
    return `Meme de Texto: ${this.contenido}`;
  }
}

module.exports = MemeTexto;
