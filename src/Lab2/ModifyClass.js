// Interface para procesadores de orden
class IOrderProcessor {
  process(order) {
    throw new Error("Method 'process()' must be implemented.");
  }
}

// Interface para gestores de inventario
class IInventoryManager {
  verifyInventory(order) {
    throw new Error("Method 'verifyInventory()' must be implemented.");
  }
}

// Interface para servicios de pago
class IPaymentService {
  process(amount, priority = null) {
    throw new Error("Method 'process()' must be implemented.");
  }
}

// Interface para actualizar el estado de órdenes en la base de datos
class IDatabaseService {
  updateOrderStatus(orderId, status) {
    throw new Error("Method 'updateOrderStatus()' must be implemented.");
  }
}

// Interface para el servicio de notificación por correo
class IEmailService {
  sendEmail(email, message) {
    throw new Error("Method 'sendEmail()' must be implemented.");
  }
}

// Implementación del gestor de inventario que cumple con IInventoryManager
class InventoryManager extends IInventoryManager {
  verifyInventory(order) {
    // Comprueba si hay suficiente inventario para la cantidad solicitada
    if (inventory < order.quantity) {
      throw new Error("Out of stock");
    }
  }
}

// Implementación del procesador de órdenes estándar que cumple con IOrderProcessor
class StandardOrderProcessor extends IOrderProcessor {
  constructor(paymentService) {
    super();
    this.paymentService = paymentService; // Servicio de pago estándar (inyección de dependencia)
  }

  // Procesa la orden estándar usando el servicio de pago
  process(order) {
    // Procesa el pago estándar utilizando el servicio de pago inyectado
    if (!this.paymentService.process(order.amount)) {
      throw new Error("Payment failed");
    }
  }
}

// Implementación del procesador de órdenes express que cumple con IOrderProcessor
class ExpressOrderProcessor extends IOrderProcessor {
  constructor(paymentService) {
    super();
    this.paymentService = paymentService; // Servicio de pago express (inyección de dependencia)
  }

  // Procesa la orden express con prioridad alta
  process(order) {
    // Procesa el pago express utilizando el servicio de pago inyectado con prioridad
    if (!this.paymentService.process(order.amount, "express")) {
      throw new Error("Express payment failed");
    }
  }
}

// Clase de fábrica para seleccionar el procesador de orden correcto basado en el tipo de orden
class OrderProcessorFactory {
  constructor(standardProcessor, expressProcessor) {
    this.standardProcessor = standardProcessor;
    this.expressProcessor = expressProcessor;
  }

  // Devuelve el procesador adecuado basado en el tipo de orden
  getProcessor(orderType) {
    switch (orderType) {
      case "standard":
        return this.standardProcessor;
      case "express":
        return this.expressProcessor;
      default:
        throw new Error("Invalid order type"); // Permite agregar más tipos en el futuro sin cambiar el código actual
    }
  }
}

// Implementación del servicio de pago estándar que cumple con IPaymentService
class StandardPaymentService extends IPaymentService {
  process(amount) {
    // Lógica para procesar el pago estándar
    return paymentService.process(amount); // Simulando el procesamiento de pago
  }
}

// Implementación del servicio de pago express que cumple con IPaymentService
class ExpressPaymentService extends IPaymentService {
  process(amount, priority) {
    // Lógica para procesar el pago express
    return expressPaymentService.process(amount, priority); // Simulando el procesamiento de pago
  }
}

// Implementación de actualizador de estado de órdenes que cumple con IDatabaseService
class OrderStatusUpdater extends IDatabaseService {
  updateOrderStatus(orderId, status) {
    // Actualiza el estado de la orden en la base de datos
    database.updateOrderStatus(orderId, status);
  }
}

// Implementación de notificador de cliente que cumple con IEmailService
class CustomerNotifier extends IEmailService {
  sendEmail(email, message) {
    // Envía un correo electrónico al cliente notificando que su orden ha sido procesada
    emailService.sendEmail(email, message);
  }
}

// Ejemplo de uso:
const standardPaymentService = new StandardPaymentService();
const expressPaymentService = new ExpressPaymentService();
const inventoryManager = new InventoryManager();
const orderStatusUpdater = new OrderStatusUpdater();
const customerNotifier = new CustomerNotifier();

// Creamos instancias de procesadores de órdenes
const standardOrderProcessor = new StandardOrderProcessor(
  standardPaymentService
);
const expressOrderProcessor = new ExpressOrderProcessor(expressPaymentService);

// Creamos la fábrica de procesadores de órdenes
const orderProcessorFactory = new OrderProcessorFactory(
  standardOrderProcessor,
  expressOrderProcessor
);

// Clase principal que gestiona el procesamiento de órdenes
class SystemManager {
  constructor(
    orderProcessorFactory,
    inventoryManager,
    orderStatusUpdater,
    customerNotifier
  ) {
    this.orderProcessorFactory = orderProcessorFactory; // Fábrica de procesadores de órdenes
    this.inventoryManager = inventoryManager; // Verificador de inventario
    this.orderStatusUpdater = orderStatusUpdater; // Actualizador de estado de órdenes
    this.customerNotifier = customerNotifier; // Notificador de clientes
  }

  // Método principal para procesar una orden
  processOrder(order) {
    // Verifica el inventario antes de proceder
    this.inventoryManager.verifyInventory(order);

    // Selecciona el procesador de órdenes adecuado a través de la fábrica
    const orderProcessor = this.orderProcessorFactory.getProcessor(order.type);

    // Procesa la orden utilizando el procesador seleccionado
    orderProcessor.process(order);

    // Actualiza el estado de la orden después de procesarla
    this.orderStatusUpdater.updateOrderStatus(order.id, "processed");

    // Notifica al cliente que la orden ha sido procesada
    this.customerNotifier.sendEmail(
      order.customerEmail,
      "Your order has been processed."
    );
  }
}

// Creamos el gestor del sistema
const systemManager = new SystemManager(
  orderProcessorFactory,
  inventoryManager,
  orderStatusUpdater,
  customerNotifier
);

// Simulación de una orden
const order = {
  id: 1,
  type: "standard",
  amount: 100,
  quantity: 2,
  customerEmail: "customer@example.com",
};

// Procesamos la orden
systemManager.processOrder(order);
