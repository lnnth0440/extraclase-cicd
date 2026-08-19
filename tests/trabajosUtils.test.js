import { describe, expect, it } from "vitest";

import {
  generarNuevoId,
  clienteExiste,
  filtrarTrabajos,
  calcularEstadisticas,
  clienteTieneTrabajos
} from "../src/utils/trabajosUtils.js";

describe("trabajosUtils", () => {
  const clientes = [
    {
      id: 1,
      nombre: "Ana Vargas"
    },
    {
      id: 2,
      nombre: "Carlos Hernández"
    }
  ];

  const trabajos = [
    {
      id: 1,
      nombre: "Cocina integral",
      cliente: "Carlos Hernández",
      estado: "En proceso"
    },
    {
      id: 2,
      nombre: "Closet principal",
      cliente: "Ana Vargas",
      estado: "Pendiente"
    },
    {
      id: 3,
      nombre: "Mesa de comedor",
      cliente: "Ana Vargas",
      estado: "Completado"
    },
    {
      id: 4,
      nombre: "Puerta principal",
      cliente: "Carlos Hernández",
      estado: "Cancelado"
    }
  ];

  it("genera el ID 1 cuando la lista está vacía", () => {
    expect(generarNuevoId([])).toBe(1);
  });

  it("genera el siguiente ID disponible", () => {
    expect(generarNuevoId(trabajos)).toBe(5);
  });

  it("detecta cuando un cliente existe sin importar mayúsculas", () => {
    expect(clienteExiste(clientes, "ana vargas")).toBe(true);
  });

  it("devuelve false cuando el cliente no existe", () => {
    expect(clienteExiste(clientes, "María López")).toBe(false);
  });

  it("filtra trabajos por nombre", () => {
    const resultado = filtrarTrabajos(
      trabajos,
      "cocina",
      ""
    );

    expect(resultado).toHaveLength(1);
    expect(resultado[0].nombre).toBe("Cocina integral");
  });

  it("filtra trabajos por cliente", () => {
    const resultado = filtrarTrabajos(
      trabajos,
      "Ana Vargas",
      ""
    );

    expect(resultado).toHaveLength(2);
  });

  it("filtra trabajos por estado", () => {
    const resultado = filtrarTrabajos(
      trabajos,
      "",
      "Pendiente"
    );

    expect(resultado).toHaveLength(1);
    expect(resultado[0].estado).toBe("Pendiente");
  });

  it("calcula correctamente las estadísticas de trabajos", () => {
    expect(calcularEstadisticas(trabajos)).toEqual({
      total: 4,
      pendientes: 1,
      enProceso: 1,
      completados: 1,
      cancelados: 1
    });
  });

  it("detecta si un cliente tiene trabajos asociados", () => {
    expect(
      clienteTieneTrabajos(trabajos, "Ana Vargas")
    ).toBe(true);
  });

  it("detecta si un cliente no tiene trabajos asociados", () => {
    expect(
      clienteTieneTrabajos(trabajos, "Roberto Castro")
    ).toBe(false);
  });
});