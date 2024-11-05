class SystemManager {
  // Este método incumple SRP (Single Responsibility Principle) ya que tiene múltiples responsabilidades:
  // verifica inventario, procesa pagos, actualiza estado y notifica al cliente.
  // Todas estas tareas deberían estar en clases especializadas.
  processOrder(order) {
    // Este if rompe el Open/Closed Principle (OCP).
    // Cada vez que se agrega un nuevo tipo de orden, se requiere modificar este método.
    if (order.type == "standard") {
      verifyInventory(order);
      processStandardPayment(order);
    } else if (order.type == "express") {
      verifyInventory(order);
      processExpressPayment(order, "highPriority");
    }

    // Esta actualización de estado incumple SRP,
    // ya que una clase distinta debería ser responsable de actualizar el estado de la orden.
    updateOrderStatus(order, "processed");

    // Este método incumple SRP, ya que debería estar en una clase especializada de notificaciones.
    notifyCustomer(order);
  }

  // Este método incumple SRP y DIP (Dependency Inversion Principle),
  // ya que tiene la responsabilidad de gestionar inventario y depende de detalles específicos (inventory).
  verifyInventory(order) {
    if (inventory < order.quantity) {
      throw new Error("Out of stock");
    }
  }

  // Método para procesar pagos estándar.
  // Este método incumple SRP y DIP.
  // Tiene lógica específica de pagos y utiliza una implementación de `paymentService` directamente en lugar de una interfaz abstracta.
  processStandardPayment(order) {
    if (paymentService.process(order.amount)) {
      return true;
    } else {
      throw new Error("Payment failed");
    }
  }

  // Método para procesar pagos express.
  // También rompe SRP y DIP. Tiene lógica específica de pagos y depende directamente de `expressPaymentService`.
  processExpressPayment(order, priority) {
    if (expressPaymentService.process(order.amount, priority)) {
      return true;
    } else {
      throw new Error("Express payment failed");
    }
  }

  // Método para actualizar el estado de la orden.
  // Incumple SRP, ya que SystemManager debería delegar esta función a una clase que gestione la base de datos.
  updateOrderStatus(order, status) {
    database.updateOrderStatus(order.id, status);
  }

  // Método para notificar al cliente.
  // Incumple SRP. El envío de notificaciones debería estar en una clase de notificación separada.
  notifyCustomer(order) {
    emailService.sendEmail(
      order.customerEmail,
      "Your order has been processed."
    );
  }
}
