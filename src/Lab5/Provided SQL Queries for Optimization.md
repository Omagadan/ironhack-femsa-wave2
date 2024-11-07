### Query Original

```pseudo
-- Selección principal para calcular el total por OrderID
SELECT Orders.OrderID,
       SUM(OrderDetails.Quantity * OrderDetails.UnitPrice) AS TotalPrice
FROM Orders
JOIN
    OrderDetails
    -- Realizamos un JOIN entre las tablas Orders y OrderDetails utilizando OrderID
    -- Es recomendable crear un índice de Orders.OrderID
    -- lo cual mejorará la eficiencia del JOIN al evitar búsquedas lineales.
    ON Orders.OrderID = OrderDetails.OrderID  -- Clave foránea en OrderDetails y clave primaria en Orders

WHERE OrderDetails.Quantity > 10
    -- Filtro de filas donde Quantity es mayor que 10.
    -- Es recomendable crear un índice en OrderDetails.Quantity para acelerar este filtro,
    -- especialmente si hay una gran cantidad de datos en OrderDetails.

GROUP BY Orders.OrderID;
    -- Agrupamos los resultados por OrderID para calcular el total de cada pedido.
    -- Si OrderID está indexado, esto puede optimizar la operación de agrupación,
    -- ya que MySQL puede ordenar y agrupar más eficientemente los datos.

```

### Query Optimizado

```pseudo
-- Índice en Orders.OrderID para optimizar el JOIN
CREATE INCEX idx_orders_orderid on Orders(OrderID)

-- Índice en OrderDetails.OrderID para optimizar el JOIN
CREATE INDEX idx_orderdetails_orderid ON OrderDetails(OrderID);

-- Índice en OrderDetails.Quantity para optimizar el filtro WHERE
CREATE INDEX idx_orderdetails_quantity ON OrderDetails(Quantity);


-- Selección principal para calcular el total por OrderID
SELECT Orders.OrderID,
       SubQuery.TotalPrice
FROM Orders
JOIN
    ( -- Subconsulta para filtrar y calcular TotalPrice solo en los registros necesarios
      SELECT OrderDetails.OrderID,
             SUM(OrderDetails.Quantity * OrderDetails.UnitPrice) AS TotalPrice
      FROM OrderDetails
      WHERE OrderDetails.Quantity > 10         -- Filtro aplicado antes de la unión
      GROUP BY OrderDetails.OrderID            -- Agrupación en la subconsulta para calcular total
    ) AS SubQuery
ON Orders.OrderID = SubQuery.OrderID;          -- Unión entre Orders y subconsulta para traer TotalPrice


```
