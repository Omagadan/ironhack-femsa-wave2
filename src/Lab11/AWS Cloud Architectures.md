# **Diseño de Arquitectura en la Nube con AWS**

## ** Diseño de la Arquitectura en la Nube**

### **Parte 1: Diseño de la Infraestructura en la Nube**

#### **Objetivo:**

Desarrollar una infraestructura en la nube que permita la escalabilidad y seguridad de una aplicación web.

#### **Requisitos:**

Implementar los servicios principales de AWS para establecer una infraestructura robusta:

- **EC2** para el procesamiento.
- **S3** para almacenamiento de objetos.
- **VPC** para crear una red privada segura.

#### **Descripción y Justificación:**

1. **Amazon EC2 (Elastic Compute Cloud):**

   - **Función**: Proporciona el procesamiento necesario para la aplicación web, ejecutando el código de la aplicación y manejando el tráfico entrante.
   - **Justificación**: EC2 es flexible y escalable, permitiendo ajustar la capacidad de cómputo según el tráfico. Además, soporta configuraciones como autoescalado y balanceo de carga para asegurar el rendimiento en picos de tráfico.

2. **Amazon S3 (Simple Storage Service):**

   - **Función**: Actúa como almacenamiento de contenido estático, ideal para guardar archivos multimedia, documentos y otros recursos.
   - **Justificación**: S3 ofrece almacenamiento seguro, escalable y con alta disponibilidad, perfecto para alojar contenido estático de manera accesible y rentable, dado que se paga solo por el uso real.

3. **Amazon VPC (Virtual Private Cloud):**
   - **Función**: Crea una red privada que permite administrar la seguridad y el acceso a los recursos de AWS.
   - **Justificación**: VPC permite segmentar la infraestructura en subredes privadas y públicas, protegiendo servicios críticos y habilitando configuraciones de seguridad avanzadas (Security Groups y ACLs) para controlar el tráfico.

#### **Diagrama de Arquitectura (Recomendado)**:

- Un diagrama visual mostrando EC2 (con Auto Scaling), S3 para contenido estático, y una VPC segmentada en subredes públicas y privadas.

---

### **Parte 2: Configuración de IAM (Identity and Access Management)**

#### **Objetivo:**

Definir roles y políticas para gestionar el acceso y asegurar que cada componente de la arquitectura funcione según el principio de mínimo privilegio.

#### **Requisitos:**

- Crear roles específicos para desarrolladores, administradores y servidores de la aplicación.
- Limitar permisos según las necesidades de cada rol para asegurar la menor exposición posible.

#### **Descripción y Justificación:**

1. **Rol de Administrador**:

   - **Permisos**: Acceso total a los servicios necesarios para la gestión completa de la infraestructura.
   - **Justificación**: Los administradores requieren acceso amplio para realizar configuraciones avanzadas y gestionar los recursos, aunque siempre restringido a los servicios específicos usados.

2. **Rol de Desarrollador**:

   - **Permisos**: Acceso a entornos de desarrollo y permisos de solo lectura en el entorno de producción.
   - **Justificación**: Limitar a los desarrolladores para que no puedan modificar recursos en producción, manteniendo así la seguridad y estabilidad del entorno.

3. **Rol para Servidores de Aplicación**:
   - **Permisos**: Acceso a S3 para lectura/escritura del contenido estático que requiere la aplicación y otros permisos mínimos para su correcto funcionamiento.
   - **Justificación**: Este rol permite a la aplicación acceder solo a los recursos necesarios, reduciendo el riesgo de comprometer recursos no autorizados.

#### **Implementación y Mantenimiento de las Políticas**:

- Uso de políticas de IAM predefinidas y personalizadas para cumplir con los niveles de acceso necesarios.
- Revisión periódica de políticas para asegurarse de que los permisos no sobrepasen lo necesario.

---

### **Parte 3: Estrategia de Administración de Recursos**

#### **Objetivo:**

Desarrollar una estrategia de administración que permita escalar y optimizar el uso de los recursos, además de reducir costos.

#### **Requisitos:**

- Autoescalado con **Auto Scaling** para gestionar el incremento y reducción de instancias.
- Balanceo de carga con **Elastic Load Balancing (ELB)**.
- Control de presupuesto con **AWS Budgets**.

#### **Descripción y Justificación:**

1. **Auto Scaling**:

   - **Función**: Añadir o eliminar instancias de EC2 automáticamente según la demanda.
   - **Justificación**: Permite mantener la disponibilidad en picos de tráfico y reducir el gasto durante tiempos de baja actividad.

2. **Elastic Load Balancing (ELB)**:

   - **Función**: Distribuye el tráfico entrante entre las instancias de EC2.
   - **Justificación**: Asegura que el tráfico se gestione equitativamente, evitando sobrecargar servidores y mejorando la resiliencia de la aplicación.

3. **AWS Budgets**:
   - **Función**: Monitoreo de presupuesto con alertas al alcanzar ciertos umbrales de costo.
   - **Justificación**: Ayuda a controlar los costos y evitar gastos excesivos, permitiendo al equipo actuar en caso de que el uso exceda el presupuesto planificado.

---

### **Parte 4: Implementación Teórica de la Arquitectura**

#### **Objetivo:**

Describir cómo los servicios de AWS se interconectan para crear una arquitectura funcional y resiliente para la aplicación.

#### **Descripción del Flujo de Datos y Conexiones:**

1. **Flujo de Datos**:
   - **ELB** recibe el tráfico de los usuarios y lo distribuye a las instancias de **EC2**.
   - **EC2** maneja el procesamiento de la aplicación y solicita recursos estáticos desde **S3**.
   - **Auto Scaling** ajusta el número de instancias de EC2 según el volumen de tráfico.
2. **Interacciones entre Componentes**:
   - **ELB** actúa como el primer punto de contacto para el usuario, distribuyendo el tráfico.
   - Las instancias de **EC2** en la subred pública procesan las solicitudes y acceden a **S3** para cargar contenido.
   - **VPC** segmenta la infraestructura, manteniendo bases de datos y otros recursos internos en una subred privada.

---

### **Parte 5: Discusión y Evaluación de la Arquitectura**

1. **Justificación de Servicios**:

   - **EC2 y Auto Scaling** aseguran que la aplicación tenga capacidad de cómputo flexible.
   - **S3** proporciona un almacenamiento seguro y escalable para contenido estático.
   - **VPC** permite separar recursos críticos, aumentando la seguridad.
   - **IAM** asegura que cada rol tenga el acceso mínimo necesario, mejorando la seguridad.

2. **Seguridad con IAM**:

   - Las políticas de IAM limitan el acceso, asegurando que cada usuario solo pueda acceder a los recursos que necesita para su función.

3. **Evaluación de Estrategia de Recursos**:
   - La estrategia de autoescalado y balanceo de carga permite gestionar variaciones en el tráfico eficientemente, y **AWS Budgets** controla el presupuesto para mantener costos en niveles aceptables.

---

## **Conclusión**

Este diseño de arquitectura permite aprovechar los componentes clave de AWS para crear una solución en la nube que prioriza la seguridad, escalabilidad y eficiencia de costos. La implementación de roles y políticas de IAM refuerza la seguridad, y las estrategias de autoescalado y optimización de costos aseguran el uso eficiente de los recursos. Esta solución es ideal para despliegues en la nube que requieren una infraestructura robusta y flexible.
