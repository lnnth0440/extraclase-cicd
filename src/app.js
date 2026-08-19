import express from "express";

import {
  obtenerTrabajos,
  guardarTrabajos
} from "./services/trabajosService.js";

import {
  obtenerClientes,
  guardarClientes
} from "./services/clientesService.js";

const app = express();

app.use(express.json());
app.use(express.static("src/public"));


/* ======================================================
   TRABAJOS
====================================================== */

app.get("/api/trabajos", (req, res) => {
  const trabajos = obtenerTrabajos();

  const buscar = req.query.buscar?.toLowerCase();
  const estado = req.query.estado;

  let resultados = trabajos;

  if (buscar) {
    resultados = resultados.filter((trabajo) => {
      return (
        trabajo.nombre.toLowerCase().includes(buscar) ||
        trabajo.cliente.toLowerCase().includes(buscar)
      );
    });
  }

  if (estado) {
    resultados = resultados.filter(
      (trabajo) => trabajo.estado === estado
    );
  }

  res.json(resultados);
});


app.get("/api/trabajos/:id", (req, res) => {
  const id = Number(req.params.id);
  const trabajos = obtenerTrabajos();

  const trabajo = trabajos.find(
    (item) => item.id === id
  );

  if (!trabajo) {
    return res.status(404).json({
      mensaje: "Trabajo no encontrado"
    });
  }

  res.json(trabajo);
});


app.post("/api/trabajos", (req, res) => {
  const trabajos = obtenerTrabajos();
  const clientes = obtenerClientes();

  const {
    nombre,
    cliente,
    tipo,
    fechaInicio,
    fechaEntrega,
    precio,
    estado,
    descripcion
  } = req.body;

  if (!nombre || !cliente || !tipo) {
    return res.status(400).json({
      mensaje:
        "Nombre, cliente y tipo son obligatorios"
    });
  }

  const clienteExiste = clientes.some(
    (item) => item.nombre === cliente
  );

  if (!clienteExiste) {
    return res.status(400).json({
      mensaje:
        "El cliente seleccionado no está registrado"
    });
  }

  const nuevoId =
    trabajos.length > 0
      ? Math.max(
          ...trabajos.map(
            (trabajo) => trabajo.id
          )
        ) + 1
      : 1;

  const nuevoTrabajo = {
    id: nuevoId,
    nombre,
    cliente,
    tipo,
    fechaInicio: fechaInicio || "",
    fechaEntrega: fechaEntrega || "",
    precio: Number(precio) || 0,
    estado: estado || "Pendiente",
    descripcion: descripcion || ""
  };

  trabajos.push(nuevoTrabajo);

  guardarTrabajos(trabajos);

  res.status(201).json(nuevoTrabajo);
});


app.put("/api/trabajos/:id", (req, res) => {
  const id = Number(req.params.id);

  const trabajos = obtenerTrabajos();
  const clientes = obtenerClientes();

  const trabajo = trabajos.find(
    (item) => item.id === id
  );

  if (!trabajo) {
    return res.status(404).json({
      mensaje: "Trabajo no encontrado"
    });
  }

  const {
    nombre,
    cliente,
    tipo,
    fechaInicio,
    fechaEntrega,
    precio,
    estado,
    descripcion
  } = req.body;

  if (cliente !== undefined) {
    const clienteExiste = clientes.some(
      (item) => item.nombre === cliente
    );

    if (!clienteExiste) {
      return res.status(400).json({
        mensaje:
          "El cliente seleccionado no está registrado"
      });
    }
  }

  trabajo.nombre =
    nombre ?? trabajo.nombre;

  trabajo.cliente =
    cliente ?? trabajo.cliente;

  trabajo.tipo =
    tipo ?? trabajo.tipo;

  trabajo.fechaInicio =
    fechaInicio ?? trabajo.fechaInicio;

  trabajo.fechaEntrega =
    fechaEntrega ?? trabajo.fechaEntrega;

  trabajo.precio =
    precio !== undefined
      ? Number(precio)
      : trabajo.precio;

  trabajo.estado =
    estado ?? trabajo.estado;

  trabajo.descripcion =
    descripcion ?? trabajo.descripcion;

  guardarTrabajos(trabajos);

  res.json(trabajo);
});


app.delete("/api/trabajos/:id", (req, res) => {
  const id = Number(req.params.id);
  const trabajos = obtenerTrabajos();

  const indice = trabajos.findIndex(
    (item) => item.id === id
  );

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Trabajo no encontrado"
    });
  }

  const trabajoEliminado =
    trabajos.splice(indice, 1)[0];

  guardarTrabajos(trabajos);

  res.json({
    mensaje:
      "Trabajo eliminado correctamente",
    trabajo: trabajoEliminado
  });
});


/* ======================================================
   CLIENTES
====================================================== */

app.get("/api/clientes", (req, res) => {
  const clientes = obtenerClientes();

  res.json(clientes);
});


app.get("/api/clientes/:id", (req, res) => {
  const id = Number(req.params.id);
  const clientes = obtenerClientes();

  const cliente = clientes.find(
    (item) => item.id === id
  );

  if (!cliente) {
    return res.status(404).json({
      mensaje: "Cliente no encontrado"
    });
  }

  res.json(cliente);
});


app.post("/api/clientes", (req, res) => {
  const clientes = obtenerClientes();

  const {
    nombre,
    telefono,
    correo,
    direccion,
    notas
  } = req.body;

  if (!nombre || !telefono) {
    return res.status(400).json({
      mensaje:
        "Nombre y teléfono son obligatorios"
    });
  }

  const nombreDuplicado = clientes.some(
    (cliente) =>
      cliente.nombre.toLowerCase() ===
      nombre.toLowerCase()
  );

  if (nombreDuplicado) {
    return res.status(400).json({
      mensaje:
        "Ya existe un cliente con ese nombre"
    });
  }

  const nuevoId =
    clientes.length > 0
      ? Math.max(
          ...clientes.map(
            (cliente) => cliente.id
          )
        ) + 1
      : 1;

  const nuevoCliente = {
    id: nuevoId,
    nombre,
    telefono,
    correo: correo || "",
    direccion: direccion || "",
    notas: notas || ""
  };

  clientes.push(nuevoCliente);

  guardarClientes(clientes);

  res.status(201).json(nuevoCliente);
});


app.put("/api/clientes/:id", (req, res) => {
  const id = Number(req.params.id);

  const clientes = obtenerClientes();
  const trabajos = obtenerTrabajos();

  const cliente = clientes.find(
    (item) => item.id === id
  );

  if (!cliente) {
    return res.status(404).json({
      mensaje: "Cliente no encontrado"
    });
  }

  const {
    nombre,
    telefono,
    correo,
    direccion,
    notas
  } = req.body;

  if (nombre) {
    const nombreDuplicado =
      clientes.some(
        (item) =>
          item.id !== id &&
          item.nombre.toLowerCase() ===
            nombre.toLowerCase()
      );

    if (nombreDuplicado) {
      return res.status(400).json({
        mensaje:
          "Ya existe otro cliente con ese nombre"
      });
    }
  }

  const nombreAnterior = cliente.nombre;

  cliente.nombre =
    nombre ?? cliente.nombre;

  cliente.telefono =
    telefono ?? cliente.telefono;

  cliente.correo =
    correo ?? cliente.correo;

  cliente.direccion =
    direccion ?? cliente.direccion;

  cliente.notas =
    notas ?? cliente.notas;

  /*
    Si cambia el nombre del cliente,
    actualizamos sus trabajos.
  */

  if (
    nombre &&
    nombre !== nombreAnterior
  ) {
    trabajos.forEach((trabajo) => {
      if (
        trabajo.cliente === nombreAnterior
      ) {
        trabajo.cliente = nombre;
      }
    });

    guardarTrabajos(trabajos);
  }

  guardarClientes(clientes);

  res.json(cliente);
});


app.delete("/api/clientes/:id", (req, res) => {
  const id = Number(req.params.id);

  const clientes = obtenerClientes();
  const trabajos = obtenerTrabajos();

  const indice = clientes.findIndex(
    (item) => item.id === id
  );

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Cliente no encontrado"
    });
  }

  const cliente = clientes[indice];

  const tieneTrabajos = trabajos.some(
    (trabajo) =>
      trabajo.cliente === cliente.nombre
  );

  if (tieneTrabajos) {
    return res.status(400).json({
      mensaje:
        "No puedes eliminar este cliente porque tiene trabajos asociados"
    });
  }

  const clienteEliminado =
    clientes.splice(indice, 1)[0];

  guardarClientes(clientes);

  res.json({
    mensaje:
      "Cliente eliminado correctamente",
    cliente: clienteEliminado
  });
});


/* ======================================================
   DASHBOARD
====================================================== */

app.get("/api/dashboard", (req, res) => {
  const trabajos = obtenerTrabajos();

  const total = trabajos.length;

  const pendientes = trabajos.filter(
    (trabajo) =>
      trabajo.estado === "Pendiente"
  ).length;

  const enProceso = trabajos.filter(
    (trabajo) =>
      trabajo.estado === "En proceso"
  ).length;

  const completados = trabajos.filter(
    (trabajo) =>
      trabajo.estado === "Completado"
  ).length;

  const cancelados = trabajos.filter(
    (trabajo) =>
      trabajo.estado === "Cancelado"
  ).length;

  const trabajosRecientes =
    [...trabajos]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);

  res.json({
    total,
    pendientes,
    enProceso,
    completados,
    cancelados,
    trabajosRecientes
  });
});


export default app;