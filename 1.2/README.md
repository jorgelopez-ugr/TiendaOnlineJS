# Proyecto DAI - Práctica P1.2

Este proyecto contiene una pequeña aplicación en JavaScript que usa Mongoose para trabajar con unos productos en `json`. Consulta una base de datos MongoDB local en un contenedor docker.

## Estructura principal

- `model/db.js` — función `connectDB()` conecta con MongoDB usando Mongoose. Exporta una función async que realiza `mongoose.connect(url)`. (Este archivo pertenece al código de la asignatura)
- `model/Producto.js` — esquema Mongoose para documentos `Producto` (campos como `categoria`, `subcategoria`, `texto_1`, `texto_2`, `texto_precio`, `precio_euros`).(Se ha completado el código de la asignatura con los datos faltantes)
- `seed.js` — script que carga el fichero `datos_mercadona.json` y realiza `Producto.insertMany(lista)` para rellenar la colección. Se ha incluido una definición para la función `Lee_archivo(ruta)` que consiste en llamar a `fs.readFileSync(ruta,'utf8')` para extraer los datos del archivo de la ruta.
- `consultas.js` es el script principal que conecta con la base de datos y ejecuta varias consultas llamando a la función auxiliar m`mostrarProductos` y muestra resultados por consola.
- `datos_mercadona.json` — fichero con los datos a insertar en json. Proviene de la práctica anterior.
- `docker-compose-mongo.yml` — fichero para arrancar un contenedor MongoDB. Proviene de la práctica anterior también.

## Cómo se conectan los componentes

1. `consultas.js` y `seed.js` importan `connectDB` desde `model/db.js` y llaman `await connectDB()` al inicio. `connectDB` se encarga de establecer la conexión con la URL:

   `mongodb://root:example@localhost:27017/DAI?authSource=admin`

2. Una vez conectados, ambos scripts usan el esquema `Producto` (`model/Producto.js`) para interactuar con la colección `productos` de la base de datos:
   - `consultas.js` ejecuta varias consultas con `Producto.find(filtro)` dentro de la función `mostrarProductos`, itera los resultados y los imprime por consola.

3. Al finalizar se cierra la conexión con `mongoose.connection.close()`.

## Cómo se hacen y muestran las consultas

- Las consultas usan Mongoose y devuelven Promesas. Por eso los scripts usan `async/await`:

  - `const productos = await Producto.find(filtro)`

  - Luego se comprueba si `productos.length` es 0 y, si no, se itera con `for (const producto of productos) { ... }` y se imprime por consola los campos deseados (ej. `categoria`, `subcategoria`, `texto_1`, `texto_2`, `precio_euros`).

  - La linea comentada muestra la url pero en la implementación se ignora este campo por ser dificil de leer. Considero que no tiene sentido mostrar la url en texto plano.

## Ejecutar MongoDB con Docker Compose

El repositorio incluye `docker-compose-mongo.yml` para lanzar MongoDB.

```bash
docker compose -f docker-compose-mongo.yml up
```

## Pasos para rellenar la base de datos (seed)

1. Asegúrate de tener MongoDB corriendo.
2. Ejecuta el seed para insertar los datos:

```bash
node seed.js
```

Esto lee `datos_mercadona.json` y completa nuestra base de datos en mongo.

## Ejecutar las consultas y ver resultados por pantalla

Una vez la base de datos contiene documentos, ejecuta:

```bash
node consultas.js
```

El script conectará a la DB, ejecutará las consultas requeridas en la práctica y mostrará los resultados por consola. Al terminar cerrará la conexión.
