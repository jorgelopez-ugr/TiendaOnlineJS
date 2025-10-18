// ./routes/router_tienda.js
import express from "express";
import Producto from "../model/Producto.js";
const router = express.Router();
      
// Portada en /
router.get('/', async (req, res)=>{
  try {
    const productos = await Producto.find({})   // todos los productos
		// elegir 3 aquí
    res.render('portada.html', { productos })    // ../views/portada.html, 
  } catch (err) {                                // se le pasa { productos:productos }
	console.error(err)
    res.status(500).send({error: err.message})
  }
})

/* Se define una nueva ruta que es la que se tomará cuando se use
el buscador. El parámetro de la búsqueda se recoge en req.query que
es basicamente el objeto buscador que hemos definido en portada.html
con el nombre "query". Se usa una expresión regular para buscar en el
campo texto_1 de los productos aquellos que contengan la cadena de
búsqueda, sin importar mayúsculas o minúsculas ($options: 'i').
Finalmente se renderiza la misma vista portada.html con los productos
encontrados. Esto se hace al indicarle que el vector productos en el que
va a buscar los productos que mostrar es el que ha resultado de la búsqueda.
Al ser asi te quitas todos los productos de enmedio y solo va a tratar de 
renderizar los que ha encontrado en la búsqueda. Si no encuentra nada
el vector productos estará vacío y no se mostrará nada en la página. Si encuentra
menos de 6 mostrará los que haya. Si encuentra más de 6 solo mostrará 6 por el limit(6).
*/
//REVISAR ESTA SINTAXIS
router.get('/buscar', async (req, res) => {
  const { query } = req.query; // Recoge el parámetro de búsqueda desde la URL

  try {
    // Busca productos cuyo campo texto_1 contenga la cadena de búsqueda (case-insensitive)
    const productos = await Producto.find({ texto_1: { $regex: query, $options: 'i' } }).limit(6);

    res.render('portada.html', { productos }); // Renderiza la vista con los productos encontrados
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

export default router