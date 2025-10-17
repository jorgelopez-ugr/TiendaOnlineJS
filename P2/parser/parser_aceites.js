import fs from "node:fs";

// https://github.com/taoqf/node-html-parser
// se instala
// npm i node-html-parser
import { parse } from "node-html-parser";

// Para acumular la informÃ¡cion de los productos
const Info = [];

// cambiar el programa para usar una lista de varios archivos html
// con distintas categorÃ­as
// elemento:
//<div class="grid-layout__main-container" style="height: calc(-76px + 100vh)">
// ...
// </div>

const src_files = ["aceites.html", "aguas.html", "cacaos.html"];
let string_para_guardar_en_fomato_json = "";

// Si haces el console.log de la variable en si te da la info del parseo
// y la forma que tiene de entenderse con sus funciones. Si usas el .toString()
// lo que te va a dar es el html.

// duda en que hace el .text o ausencia del mismo

for (let i = 0; i < src_files.length; i++) {
  const html = Lee_archivo(src_files[i]);
  const root = parse(html);
  // console.log(html.toString());
  // console.log(root.toString());
	const categoria = root.querySelector("h1").text;
  // console.log(categoria);
  // console.log("\n\n\n\n\n");
  // console.log(lista_productos.toString());
  // console.log("\n\n\n\n\n");
	const seccion = root.querySelectorAll("section.section");
	// esto saca html perfect
	// console.log(seccion.toString());
	// console.log("\n\n\n\n\n");
	// ¿QUÉ OCURRE EN ESTE PASO?
	for (const sc of seccion){
		// esto solo saca numeros 0 , 1 , 2 , 0 , 1, 0 , 1 ...
		// console.log(sc.toString());
  	// console.log("\n\n\n\n\n");
	    const subcategoria = sc.querySelector("h2").text;
		const lista_productos = sc.querySelectorAll("div.product-cell");
		// console.log(lista_productos);
		// console.log("\n\n\n\n\n");
		for (const producto of lista_productos) {
			//esto si saca un producto con su html completo
			// console.log(producto.toString());
			// console.log("\n\n\n\n\n");
			const img = producto.querySelector("img");
			const url_img = img.attrs.src;
			const texto_1 = img.attrs.alt;
			const t2 = producto.querySelector("div.product-format");
			const texto_2 = Arregla_texto(t2.text);
			const texto_precio = Arregla_texto(
				producto.querySelector("div.product-price").innerText
			);
			const r1 = texto_precio.match(/(\d+),?(\d+)?(.+)/);
			//console.log(r1)
			const precio_euros =
				r1.length > 2 ? Number(r1[1] + "." + r1[2]) : undefined;
			const info_prod = {
				categoria,
				subcategoria,
				url_img,
				texto_1,
				texto_2,
				texto_precio,
				precio_euros,
			};
			Info.push(info_prod);
		}
	}

  string_para_guardar_en_fomato_json = JSON.stringify(Info, null, 2);
  fs.appendFileSync(
    "string_para_guardar_en_fomato_json",
    string_para_guardar_en_fomato_json
  );
}

try {
  fs.writeFileSync("datos_mercadona.json", string_para_guardar_en_fomato_json);
  // fs.appendFileSync('datos_mercadona.json', string_para_guardar_en_fomato_json)

  console.log("Guardado archivo");
} catch (error) {
  console.error("Error guardando archivo: ", error);
}

function Arregla_texto(texto) {
  let arreglado = texto.replace("\n", "");
  arreglado = arreglado.replace(/\s+/g, " ");
  return arreglado.trim();
}

function Lee_archivo(archivo) {
  try {
    return fs.readFileSync(archivo, "utf8");
  } catch (error) {
    console.error("Error leyendo archivo: ", error);
  }
}

//   const lista_productos = root.querySelectorAll("div.product-cell");
//   for (const producto of lista_productos) {
//     const img = producto.querySelector("img");
//     const url_img = img.attrs.src;
//     const texto_1 = img.attrs.alt;
//     const t2 = producto.querySelector("div.product-format");
//     const texto_2 = Arregla_texto(t2.text);
//     const texto_precio = Arregla_texto(
//       producto.querySelector("div.product-price").innerText
//     );
//     const r1 = texto_precio.match(/(\d+),?(\d+)?(.+)/);
//     //console.log(r1)
//     const precio_euros =
//       r1.length > 2 ? Number(r1[1] + "." + r1[2]) : undefined;
//     const info_prod = {
//       categoria,
//       url_img,
//       texto_1,
//       texto_2,
//       texto_precio,
//       precio_euros,
//     };
//     Info.push(info_prod);
//   }