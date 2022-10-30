# Listado de microservicios

## stock-checker-database

Base de datos con el listado de productos, con frecuendia de comprobacion de stock y url de acceso.
Tambien guarda los registros de último stock.

## stock-checker-ticker

Encargado de comprobar que para cada producto se comprueba el stock con la frecuencia adecuada

## stock-checker-crawler

Encargado de extraer la informacion de la web y comprobar si hay stock

## stock-checker-cache
Base de datos en cache, guarda el historial de comprobaciones de stock

### stock-checker-website

Pagina web con el frontend de la web

# Version v1

## stock-checker-ticker (socket.io client)

    · comprueba los productos de un fichero, un unico producto
    · realiza una llamada de productos en lote a un unico endpoint

## stock-checker-crawler (socket.io server)

    - realiza sesiones de crawl mediante llamadas

## stock-checker-website - hace un display del stock del producto
