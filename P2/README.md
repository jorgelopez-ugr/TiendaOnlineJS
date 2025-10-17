# Proyecto DAI - Práctica P2

Este proyecto contiene una aplicación en JavaScript que utiliza Mongoose para interactuar con una base de datos MongoDB local en un contenedor Docker y nos muestra los productos en un servidor web.

## Estructura principal

- `model/db.js` — función `connectDB()` conecta con MongoDB usando Mongoose. Exporta una función async que realiza `mongoose.connect(url)`.
- `model/Producto.js` — esquema Mongoose para documentos `Producto` (campos como `categoria`, `subcategoria`, `texto_1`, `texto_2`, `texto_precio`, `precio_euros`).
- `seed.js` — script que carga el fichero `datos_mercadona.json` y realiza `Producto.insertMany(lista)` para rellenar la colección.
- `router_tienda.js` — archivo que define las rutas del servidor para mostrar los productos almacenados en la base de datos.
- `tienda.js` — script principal que inicia el servidor web y conecta con la base de datos para servir los productos.
- `datos_mercadona.json` — fichero con los datos a insertar en formato JSON.
- `docker-compose.yml` — fichero para arrancar un contenedor MongoDB.

## Cómo se conectan los componentes

1. `tienda.js` importa `connectDB` desde `model/db.js` y llama `await connectDB()` al inicio. `connectDB` se encarga de establecer la conexión con la URL:

   `mongodb://root:example@localhost:27017/DAI?authSource=admin`

2. Una vez conectado, el servidor utiliza el esquema `Producto` (`model/Producto.js`) para interactuar con la colección `productos` de la base de datos.

3. Las rutas definidas en `router_tienda.js` permiten realizar peticiones HTTP para obtener los productos y mostrarlos en el navegador.

4. Al finalizar, el servidor cierra la conexión con `mongoose.connection.close()` cuando se detiene.

## Cómo se muestran los productos

- Los productos se obtienen desde la base de datos utilizando Mongoose y se envían como respuesta a las peticiones HTTP:

  - `const productos = await Producto.find(filtro)`

  - Los productos se renderizan en vistas HTML utilizando los datos obtenidos (ej. `categoria`, `subcategoria`, `texto_1`, `texto_2`, `precio_euros`).

## Ejecutar MongoDB con Docker Compose

El repositorio incluye `docker-compose.yml` para lanzar MongoDB.

```bash
docker compose -f docker-compose.yml up
```

## Pasos para rellenar la base de datos (seed)

1. Asegúrate de tener MongoDB corriendo.
2. Ejecuta el seed para insertar los datos:

```bash
node seed.js
```

Esto lee `datos_mercadona.json` y completa nuestra base de datos en MongoDB.

## Iniciar el servidor y ver los productos

Una vez la base de datos contiene documentos, inicia el servidor:

```bash
node tienda.js
```

El servidor estará disponible en `http://localhost:8000`, donde podrás ver los productos almacenados en la base de datos.
