export function generarNuevoId(items) {
  if (items.length === 0) {
    return 1;
  }

  return Math.max(...items.map((item) => item.id)) + 1;
}

export function clienteExiste(clientes, nombreCliente) {
  return clientes.some(
    (cliente) =>
      cliente.nombre.toLowerCase() === nombreCliente.toLowerCase()
  );
}

export function filtrarTrabajos(trabajos, buscar, estado) {
  let resultados = [...trabajos];

  if (buscar) {
    const textoBusqueda = buscar.toLowerCase();

    resultados = resultados.filter(
      (trabajo) =>
        trabajo.nombre.toLowerCase().includes(textoBusqueda) ||
        trabajo.cliente.toLowerCase().includes(textoBusqueda)
    );
  }

  if (estado) {
    resultados = resultados.filter(
      (trabajo) => trabajo.estado === estado
    );
  }

  return resultados;
}

export function calcularEstadisticas(trabajos) {
  return {
    total: trabajos.length,
    pendientes: trabajos.filter(
      (trabajo) => trabajo.estado === "Pendiente"
    ).length,
    enProceso: trabajos.filter(
      (trabajo) => trabajo.estado === "En proceso"
    ).length,
    completados: trabajos.filter(
      (trabajo) => trabajo.estado === "Completado"
    ).length,
    cancelados: trabajos.filter(
      (trabajo) => trabajo.estado === "Cancelado"
    ).length
  };
}

export function clienteTieneTrabajos(trabajos, nombreCliente) {
  return trabajos.some(
    (trabajo) =>
      trabajo.cliente.toLowerCase() === nombreCliente.toLowerCase()
  );
}