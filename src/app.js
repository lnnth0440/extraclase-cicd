import express from "express";

import {
  obtenerTrabajos,
  guardarTrabajos
} from "./services/trabajosService.js";

import {
  obtenerClientes,
  guardarClientes
} from "./services/clientesService.js";

import {
  generarNuevoId,
  clienteExiste,
  filtrarTrabajos,
  calcularEstadisticas,
  clienteTieneTrabajos
} from "./utils/trabajosUtils.js";

const app = express();

app.use(express.json());
app.use(express.static("src/public"));


/* ======================================================
   TRABAJOS
====================================================== */

app.get("/api/trabajos", (req, res) => {
  const trabajos = obtenerTrabajos();

  const buscar = req.query.buscar;
  const estado = req.query.estado;

  const resultados = filtrarTrabajos(
    trabajos,
    buscar,
    estado
  );

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

  const existeCliente = clienteExiste(
    clientes,
    cliente
  );

  if (!existeCliente) {
    return res.status(400).json({
      mensaje:
        "El cliente seleccionado no está registrado"
    });
  }

  const nuevoId = generarNuevoId(trabajos);

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
    const existeCliente = clienteExiste(
      clientes,
      cliente
    );

    if (!existeCliente) {
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

  const nombreDuplicado = clienteExiste(
    clientes,
    nombre
  );

  if (nombreDuplicado) {
    return res.status(400).json({
      mensaje:
        "Ya existe un cliente con ese nombre"
    });
  }

  const nuevoId = generarNuevoId(clientes);

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

  const tieneTrabajos =
    clienteTieneTrabajos(
      trabajos,
      cliente.nombre
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

  const estadisticas =
    calcularEstadisticas(trabajos);

  const trabajosRecientes =
    [...trabajos]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);

  res.json({
    ...estadisticas,
    trabajosRecientes
  });
});


export default app;