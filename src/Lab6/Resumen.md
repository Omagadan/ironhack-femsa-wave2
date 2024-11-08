# Análisis de Docker en el proceso de CI/CD

## Resumen

| Etapa                     | Ventajas                                        | Desventajas                                                      | Mejora Sugerida                                |
| ------------------------- | ----------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| **Code Commit**           | Automático y rápido para detectar errores       | Falta de validación previa                                       | Usar hooks de pre-commit                       |
| **Docker Image Creation** | Portabilidad y control sobre las dependencias   | Imágenes grandes y Dockerfile complejo                           | Optimizar Dockerfile                           |
| **Automated Testing**     | Consistencia entre entornos y pruebas paralelas | Uso alto de recursos y problemas con la limpieza de contenedores | Contenedores ligeros y eliminación automática  |
| **Container Registry**    | Centraliza imágenes y facilita versiones        | Riesgo de seguridad y costos de almacenamiento                   | Usar registro privado y políticas de retención |
| **Orchestration**         | Escalabilidad y recuperación ante fallas        | Complejidad y costo de infraestructura                           | Usar soluciones gestionadas (EKS, GKE)         |

---
