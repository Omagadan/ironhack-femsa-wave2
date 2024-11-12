// La clase MemeSolicitud implementa el patrón Observer para notificar cambios en su estado
// a todos los observadores que se hayan suscrito, como el estado de solicitud de un meme.
class MemeSolicitud {
  constructor(descripcion) {
    this.descripcion = descripcion;
    this.estado = "En proceso";
    this.observadores = []; // Lista de observadores suscritos.
  }

  // Método para agregar un observador a la lista.
  agregarObservador(observador) {
    this.observadores.push(observador);
  }

  // Método para notificar a todos los observadores sobre un cambio de estado.
  notificar() {
    this.observadores.forEach((observador) => observador.actualizar(this));
  }

  // Cambia el estado de la solicitud y notifica a los observadores.
  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
    this.notificar();
  }
}

module.exports = MemeSolicitud;
