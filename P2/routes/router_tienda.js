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

// ... más rutas aquí en la siguiente sesión

export default router