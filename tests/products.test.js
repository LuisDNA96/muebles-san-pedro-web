import { describe, expect, it } from "vitest";
import {
  categorias,
  filtrarProductos,
  obtenerProductoPorId,
  productos,
} from "../src/data/products.js";

describe("catálogo de productos", () => {
  it("mantiene identificadores únicos y categorías válidas", () => {
    expect(new Set(productos.map((producto) => producto.id)).size).toBe(productos.length);
    expect(productos.every((producto) => categorias.includes(producto.categoria))).toBe(true);
  });

  it("busca por nombre, descripción y sin distinguir acentos", () => {
    expect(filtrarProductos(productos, "SALA")).toHaveLength(1);
    expect(filtrarProductos(productos, "comodidad")).toHaveLength(2);
    expect(filtrarProductos(productos, "recamara")).toEqual([
      expect.objectContaining({ id: 3 }),
    ]);
  });

  it("combina categoría y texto, y permite restaurar todos los resultados", () => {
    expect(filtrarProductos(productos, "", "Sillones")).toEqual([
      expect.objectContaining({ id: 4 }),
    ]);
    expect(filtrarProductos(productos, "diseño", "Comedores")).toEqual([
      expect.objectContaining({ id: 2 }),
    ]);
    expect(filtrarProductos(productos, "no existe")).toEqual([]);
    expect(filtrarProductos(productos)).toHaveLength(productos.length);
  });

  it("selecciona el producto por identificador numérico o textual", () => {
    expect(obtenerProductoPorId("1")).toEqual(expect.objectContaining({ nombre: "Sala contemporánea" }));
    expect(obtenerProductoPorId(999)).toBeUndefined();
  });
});
