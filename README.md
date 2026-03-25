# 1413 Store Virtual (Cycling & Sport)

Proyecto de tienda virtual de ropa deportiva con interfaz moderna: catálogo con búsqueda, filtros, ordenamiento, modal de producto, carrito lateral y checkout por WhatsApp.

## Funcionalidades principales
- Carrusel hero con navegación y puntos
- Catálogo en grid con tarjetas de producto
- Búsqueda en tiempo real
- Filtros reales: categoría, precio (tope), talla y color
- Ordenamiento: recomendados, precio bajo/alto, más nuevos y mayor descuento
- Favoritos persistentes (`localStorage`)
- Carrito persistente (`localStorage`) con drawer lateral
- Modal de detalle de producto
- Checkout por WhatsApp con listado de productos y total
- Cierre de modal/drawer con tecla `Esc`
- Soporte para imágenes de producto (si `prod.image` existe)

## Cómo modificar productos (precios, fotos, tallas, colores)
Los productos están definidos en la constante `productsDB` dentro de `index.html`.

Cada producto puede incluir (además de los campos actuales) estos campos:
- `image`: ruta de la imagen (por ejemplo: `assets/images/jersey-1.jpg`)
- `sizes`: arreglo de tallas disponibles (por ejemplo: `["S","M","L"]`)
- `colors`: arreglo de colores en HEX que coinciden con el sidebar (por ejemplo: `["#cc0000","#ffffff"]`)
- `createdAt`: fecha (string) usada para el orden “más nuevos”

Ejemplo:
```js
{
  id: 9,
  name: "Jersey Pro 1413",
  category: "Ciclismo",
  priceOld: 120000,
  price: 59900,
  discount: "50%",
  discountPercent: 50,
  createdAt: "2025-03-01",
  icon: "🚴",
  sizes: ["S", "M", "L", "XL"],
  colors: ["#cc0000", "#ffffff"],
  image: "assets/images/jersey-9.jpg"
}
```

## Cómo agregar imágenes
1. Coloca las imágenes en `assets/images/`
2. En `productsDB`, asigna la ruta a `image`

## Ejecutar / desplegar
- Es un proyecto estático: basta con abrir `index.html` en el navegador.
- Para una demo/hosting sencilla, puedes subir la carpeta completa a cualquier hosting estático (Netlify, Vercel, GitHub Pages, etc.).

