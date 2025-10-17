// seed.js
import mongoose from 'mongoose'
	
import connectDB from './model/db.js'
import Producto from './model/Producto.js'
import fs from 'fs'
	
await connectDB()
	
const datos_productos = Lee_archivo('datos_mercadona.json')
const lista_productos = JSON.parse(datos_productos)
	
await Producto.deleteMany({})
await Guardar_en_modelo(Producto, lista_productos)
	
mongoose.connection.close()
		
// https://mongoosejs.com/docs/api/model.html#Model.insertMany()
// devuelve una 'Promise', por tanto asíncrono
	
async function Guardar_en_modelo(modelo, lista) {
	try {
		const insertados = await modelo.insertMany(lista)           // await siempre en funciones async
		console.log(`Insertados ${insertados.length} documentos`)
	} catch (error) {
		console.error(`Error guardando lista ${error.message}`)
	}
}

function Lee_archivo(ruta) {
    try {
        const datos = fs.readFileSync(ruta, 'utf8')
        return datos
    } catch (error) {
        console.error(`Error leyendo el archivo ${ruta}: ${error.message}`)
        process.exit(1)
    }
}

