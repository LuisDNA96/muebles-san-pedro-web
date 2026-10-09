export const productos = [
  {
    id: 1,
    nombre: "Sala contemporánea",
    categoria: "Salas",
    descripcion: "Sala diseñada para brindar comodidad y estilo al hogar.",
    precio: 12500,
    imagen: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
  },
  {
    id: 2,
    nombre: "Comedor de madera",
    categoria: "Comedores",
    descripcion: "Comedor de diseño moderno para espacios familiares.",
    precio: 9800,
    imagen: "https://images.unsplash.com/photo-1617806118233-18e1de247200",
  },
  {
    id: 3,
    nombre: "Recámara matrimonial",
    categoria: "Recámaras",
    descripcion: "Conjunto de recámara pensado para brindar comodidad.",
    precio: 15700,
    imagen: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    id: 4,
    nombre: "Sillón individual",
    categoria: "Sillones",
    descripcion: "Sillón individual para complementar diferentes espacios.",
    precio: 4500,
    imagen: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
  },
];

export const categorias = ["Todos", ...new Set(productos.map((producto) => producto.categoria))];

export function obtenerProductoPorId(id) {
  return productos.find((producto) => String(producto.id) === String(id));
}
