### Consulta original

```pseudo
db.posts
.find(
{ status: "active" }, // Filtro para encontrar solo los posts activos
{ title: 1, likes: 1 } // Proyección para mostrar solo el título y los "likes" de cada post
)
.sort({ likes: -1 }); // Ordena los resultados de mayor a menor cantidad de "likes"
```

### Optimizaciones Sugeridas

1. Índice compuesto en los campos "status" y "likes":
   Crear un índice compuesto en `{ status: 1, likes: -1 }` permite a MongoDB filtrar por "status" y clasificar los posts
   por "likes" en un solo paso, mejorando el rendimiento.
   Esto evita el escaneo completo de la colección y permite usar el índice directamente para ordenar.

2. Uso de "limit":
   Si solo queremos los posts más populares (por ejemplo, los 10 principales), agregar `limit` ayuda a que MongoDB devuelva solo una cantidad limitada de documentos. Esto reduce la carga en el servidor y la transferencia de datos, mejorando la eficiencia.

3. Proyección optimizada:
   Al incluir solo los campos necesarios en la proyección (`title` y `likes`), se reduce la cantidad de datos
   transferidos en la respuesta, optimizando la consulta al minimizar el tamaño del documento resultante.

### Nuevo Código Optimizado

```pseudo
// Crear índice compuesto para mejorar el rendimiento en la consulta por "status" y ordenación por "likes"
db.posts.createIndex({ status: 1, likes: -1 });

// Consulta optimizada
db.posts
.find(
{ status: "active" }, // Filtra los posts activos
{ title: 1, likes: 1 } // Proyecta solo los campos necesarios: "title" y "likes"
)
.sort({ likes: -1 }) // Ordena de mayor a menor según el campo "likes"
.limit(10); // Limita la respuesta a los 10 posts más populares

```
