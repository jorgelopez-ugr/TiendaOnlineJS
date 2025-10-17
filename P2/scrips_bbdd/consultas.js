import mongoose from 'mongoose'
import connectDB from '../model/db.js'
import Producto from '../model/Producto.js'


async function main() {

  await connectDB()
  
  console.log('Van a mostrarse los productos:\n\n\n')
  console.log('\nProductos de MENOS de 1 €:')
  await mostrarProductos({ precio_euros: { $lt: 1 } })
  console.log('\nProductos de MENOS de 1 € que NO SEAN AGUA:')
  await mostrarProductos({ precio_euros: { $lt: 1 }, categoria: { $ne: 'Agua' } })
  console.log('\nACEITES ordenados por PRECIO DESCENDENTE:')
  await mostrarProductos({ subcategoria: /Aceite/ }, { precio_euros: -1 })
  console.log('\nACEITES ordenados por PRECIO ASCENDENTE:')
  await mostrarProductos({ subcategoria: /Aceite/ }, { precio_euros: 1 })
  console.log('\nProductos EN GARRAFA:')
  await mostrarProductos({ texto_2: /Garrafa/ })

  mongoose.connection.close()
}

async function mostrarProductos(filtro) {
  const productos = await Producto.find(filtro)

  if (!productos.length) {
    console.log('No se encontraron productos con estas características o hay un error en la query.')
    return;
  }

  for (const producto of productos) {
    const {categoria, subcategoria,  texto_1, texto_2, precio_euros } = producto
    // const {categoria, subcategoria, url_img,  texto_1, texto_2, precio_euros } = producto
    console.log('\n------------------------------')
    console.log('\nMostrando un producto:')
    console.log(`\n cat: ${categoria} \n subcat: ${subcategoria} \n txt1: ${texto_1} \n txt2: ${texto_2} \n prec: ${precio_euros}€ `)
    // console.log(`\n cat: ${categoria} \n subcat: ${subcategoria} \n url_img: ${url_img} \n txt1: ${texto_1} \n txt2: ${texto_2} \n prec: ${precio_euros}€ `)
    console.log('\n------------------------------')
  }
}

main()