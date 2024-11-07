### Query Original

```pseudo
-- Seleccionamos el nombre del cliente desde la tabla "Customers"
-- donde la ciudad es "London" y ordenamos los resultados por "CustomerName"
SELECT CustomerName
FROM Customers
-- Filtro para seleccionar solo los clientes cuya ciudad es "London"
-- Para mejorar el rendimiento, sería recomendable crear un índice en la columna "City"
-- si la tabla "Customers" contiene muchos registros.
-- Esto optimizaría el proceso de búsqueda al filtrar por ciudad.
WHERE City = 'London'

-- Ordenamos los resultados alfabéticamente por "CustomerName"
-- Si "CustomerName" se utiliza frecuentemente en operaciones de ordenación,
-- sería útil crear un índice en esta columna para mejorar la eficiencia del `ORDER BY`.
ORDER BY CustomerName;

```

### Query Optimizado

```pseudo
-- Crear un índice en la columna City para optimizar la búsqueda de clientes en London
-- Esto acelera el filtro WHERE y evita escaneos completos de la tabla cuando la ciudad tiene muchos registros
CREATE INDEX idx_city ON Customers(City);

-- Crear un índice en la columna CustomerName para optimizar la ordenación en la consulta
-- Si se realiza un `ORDER BY` en esta columna con frecuencia, este índice reducirá el tiempo de procesamiento
CREATE INDEX idx_customername ON Customers(CustomerName);

SELECT CustomerName FROM Customers WHERE City = 'London' ORDER BY CustomerName;

```
