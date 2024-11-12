// La clase Notificacion es un observador que se actualiza cuando cambia el estado de una solicitud de meme.
// Este patrón permite que múltiples observadores respondan a los cambios de estado de manera desacoplada.
class Notificacion {
  // Método que recibe la actualización del estado de MemeSolicitud.
  actualizar(memeSolicitud) {
    console.log(
      `Notificación: El meme "${memeSolicitud.descripcion}" ahora está en estado ${memeSolicitud.estado}`
    );
  }
}

module.exports = Notificacion;
