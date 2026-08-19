const API_TRABAJOS = "/api/trabajos";
const API_CLIENTES = "/api/clientes";
const API_DASHBOARD = "/api/dashboard";

const pageTitle =
  document.getElementById("pageTitle");

const pageSubtitle =
  document.getElementById("pageSubtitle");

const navItems =
  document.querySelectorAll(".nav-item");

const sidebar =
  document.getElementById("sidebar");

const sidebarOverlay =
  document.getElementById("sidebarOverlay");

const btnMenuMobile =
  document.getElementById("btnMenuMobile");

const sections =
  document.querySelectorAll(".page-section");

const statTotal =
  document.getElementById("statTotal");

const statPendientes =
  document.getElementById("statPendientes");

const statProceso =
  document.getElementById("statProceso");

const statCompletados =
  document.getElementById("statCompletados");

const statCancelados =
  document.getElementById("statCancelados");

const dashboardTrabajos =
  document.getElementById("dashboardTrabajos");

const listaTrabajos =
  document.getElementById("listaTrabajos");

const listaClientes =
  document.getElementById("listaClientes");

const buscarTrabajo =
  document.getElementById("buscarTrabajo");

const filtroEstado =
  document.getElementById("filtroEstado");

const btnNuevoTrabajo =
  document.getElementById("btnNuevoTrabajo");

const btnVerTodosTrabajos =
  document.getElementById("btnVerTodosTrabajos");

const btnNuevoCliente =
  document.getElementById("btnNuevoCliente");

const modalTrabajo =
  document.getElementById("modalTrabajo");

const modalCliente =
  document.getElementById("modalCliente");

const modalDetalle =
  document.getElementById("modalDetalle");

const modalConfirmacion =
  document.getElementById("modalConfirmacion");

const formTrabajo =
  document.getElementById("formTrabajo");

const formCliente =
  document.getElementById("formCliente");

const detalleTrabajo =
  document.getElementById("detalleTrabajo");

const btnCancelarEliminar =
  document.getElementById("btnCancelarEliminar");

const btnConfirmarEliminar =
  document.getElementById("btnConfirmarEliminar");

const toast =
  document.getElementById("toast");

let tipoEliminacion = null;
let idEliminar = null;
let timeoutBusqueda = null;


/* ======================================================
   UTILIDADES
====================================================== */

function formatearPrecio(precio) {
  return new Intl.NumberFormat(
    "es-CR",
    {
      style: "currency",
      currency: "CRC",
      maximumFractionDigits: 0
    }
  ).format(precio || 0);
}


function formatearFecha(fecha) {
  if (!fecha) {
    return "Sin fecha";
  }

  const [anio, mes, dia] =
    fecha.split("-");

  return `${dia}/${mes}/${anio}`;
}


function claseEstado(estado) {
  const clases = {
    Pendiente: "status-pendiente",
    "En proceso": "status-proceso",
    Completado: "status-completado",
    Cancelado: "status-cancelado"
  };

  return (
    clases[estado] ||
    "status-pendiente"
  );
}


function mostrarToast(mensaje) {
  toast.textContent = mensaje;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


function abrirModal(modal) {
  modal.classList.add("active");

  document.body.style.overflow =
    "hidden";
}


function cerrarModal(modal) {
  modal.classList.remove("active");

  document.body.style.overflow = "";
}


/* ======================================================
   NAVEGACIÓN
====================================================== */

function abrirMenuMobile() {
  sidebar.classList.add("open");

  sidebarOverlay.classList.add(
    "active"
  );

  document.body.classList.add(
    "menu-open"
  );

  btnMenuMobile.setAttribute(
    "aria-expanded",
    "true"
  );
}


function cerrarMenuMobile() {
  sidebar.classList.remove("open");

  sidebarOverlay.classList.remove(
    "active"
  );

  document.body.classList.remove(
    "menu-open"
  );

  btnMenuMobile.setAttribute(
    "aria-expanded",
    "false"
  );
}


function toggleMenuMobile() {
  if (
    sidebar.classList.contains("open")
  ) {
    cerrarMenuMobile();

    return;
  }

  abrirMenuMobile();
}


btnMenuMobile.addEventListener(
  "click",
  toggleMenuMobile
);


sidebarOverlay.addEventListener(
  "click",
  cerrarMenuMobile
);


window.addEventListener(
  "resize",
  () => {
    if (window.innerWidth > 900) {
      cerrarMenuMobile();
    }
  }
);


function cambiarSeccion(nombre) {
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
  });

  const seccion =
    document.getElementById(nombre);

  const nav =
    document.querySelector(
      `[data-section="${nombre}"]`
    );

  if (seccion) {
    seccion.classList.add("active");
  }

  if (nav) {
    nav.classList.add("active");
  }

  if (nombre === "dashboard") {
    pageTitle.textContent =
      "Dashboard";

    pageSubtitle.textContent =
      "Resumen general de la ebanistería";

    cargarDashboard();
  }

  if (nombre === "trabajos") {
    pageTitle.textContent =
      "Trabajos";

    pageSubtitle.textContent =
      "Administra los proyectos de la ebanistería";

    cargarTrabajos();
  }

  if (nombre === "clientes") {
    pageTitle.textContent =
      "Clientes";

    pageSubtitle.textContent =
      "Consulta y administra los clientes registrados";

    cargarClientes();
  }
}


navItems.forEach((item) => {
  item.addEventListener(
    "click",
    () => {
      cambiarSeccion(
        item.dataset.section
      );

      cerrarMenuMobile();
    }
  );
});


btnVerTodosTrabajos.addEventListener(
  "click",
  () => {
    cambiarSeccion("trabajos");
  }
);


/* ======================================================
   DASHBOARD
====================================================== */

async function cargarDashboard() {
  try {
    const respuesta =
      await fetch(API_DASHBOARD);

    const datos =
      await respuesta.json();

    statTotal.textContent =
      datos.total;

    statPendientes.textContent =
      datos.pendientes;

    statProceso.textContent =
      datos.enProceso;

    statCompletados.textContent =
      datos.completados;

    statCancelados.textContent =
      datos.cancelados;

    renderTrabajosRecientes(
      datos.trabajosRecientes
    );

  } catch (error) {
    console.error(error);
  }
}


function renderTrabajosRecientes(
  trabajos
) {
  if (
    !trabajos ||
    trabajos.length === 0
  ) {
    dashboardTrabajos.innerHTML = `
      <div class="empty-state">

        <div class="empty-state-icon">
          ▣
        </div>

        <h4>
          No hay trabajos registrados
        </h4>

        <p>
          Registra un cliente y después crea su primer trabajo.
        </p>

      </div>
    `;

    return;
  }

  dashboardTrabajos.innerHTML = `
    <div class="trabajo-row trabajo-header dashboard-header">

      <div>
        Trabajo
      </div>

      <div>
        Tipo
      </div>

      <div>
        Fecha prevista de entrega
      </div>

      <div>
        Estado
      </div>

      <div>
        Acción
      </div>

    </div>

    ${trabajos
      .map(
        (trabajo) => `
          <div class="trabajo-row dashboard-row">

            <div class="row-main">

              <strong>
                ${trabajo.nombre}
              </strong>

              <span>
                ${trabajo.cliente}
              </span>

            </div>

            <div
              class="row-info mobile-field"
              data-label="Tipo"
            >
              ${trabajo.tipo}
            </div>

            <div
              class="row-info mobile-field"
              data-label="Entrega"
            >
              ${
                formatearFecha(
                  trabajo.fechaEntrega
                )
              }
            </div>

            <div
              class="mobile-field"
              data-label="Estado"
            >

              <span
                class="status ${
                  claseEstado(
                    trabajo.estado
                  )
                }"
              >
                ${trabajo.estado}
              </span>

            </div>

            <div
              class="row-actions mobile-field"
              data-label="Acciones"
            >

              <button
                class="action-btn"
                onclick="verDetalleTrabajo(${trabajo.id})"
              >
                Ver
              </button>

            </div>

          </div>
        `
      )
      .join("")}
  `;
}


/* ======================================================
   TRABAJOS
====================================================== */

async function cargarTrabajos() {
  try {
    const params =
      new URLSearchParams();

    const textoBusqueda =
      buscarTrabajo.value.trim();

    const estado =
      filtroEstado.value;

    if (textoBusqueda) {
      params.append(
        "buscar",
        textoBusqueda
      );
    }

    if (estado) {
      params.append(
        "estado",
        estado
      );
    }

    const url =
      params.toString()
        ? `${API_TRABAJOS}?${params.toString()}`
        : API_TRABAJOS;

    const respuesta =
      await fetch(url);

    const trabajos =
      await respuesta.json();

    renderTrabajos(trabajos);

  } catch (error) {
    console.error(error);
  }
}


function renderTrabajos(trabajos) {
  if (
    !trabajos ||
    trabajos.length === 0
  ) {
    listaTrabajos.innerHTML = `
      <div class="empty-state">

        <div class="empty-state-icon">
          ⌕
        </div>

        <h4>
          No se encontraron trabajos
        </h4>

        <p>
          Prueba con otra búsqueda o cambia el filtro.
        </p>

      </div>
    `;

    return;
  }

  listaTrabajos.innerHTML = `
    <div class="trabajo-row trabajo-header trabajos-header">

      <div>
        Trabajo
      </div>

      <div>
        Tipo
      </div>

      <div>
        Precio
      </div>

      <div>
        Estado
      </div>

      <div>
        Acciones
      </div>

    </div>

    ${trabajos
      .map(
        (trabajo) => `
          <div class="trabajo-row trabajos-row">

            <div class="row-main">

              <strong>
                ${trabajo.nombre}
              </strong>

              <span>
                ${trabajo.cliente}
              </span>

            </div>

            <div
              class="row-info mobile-field"
              data-label="Tipo"
            >
              ${trabajo.tipo}
            </div>

            <div
              class="row-info mobile-field"
              data-label="Precio"
            >
              ${
                formatearPrecio(
                  trabajo.precio
                )
              }
            </div>

            <div
              class="mobile-field"
              data-label="Estado"
            >

              <span
                class="status ${
                  claseEstado(
                    trabajo.estado
                  )
                }"
              >
                ${trabajo.estado}
              </span>

            </div>

            <div
              class="row-actions mobile-field"
              data-label="Acciones"
            >

              <button
                class="action-btn"
                onclick="verDetalleTrabajo(${trabajo.id})"
              >
                Ver
              </button>

              <button
                class="action-btn"
                onclick="editarTrabajo(${trabajo.id})"
              >
                Editar
              </button>

              <button
                class="action-btn delete"
                onclick="solicitarEliminarTrabajo(${trabajo.id})"
              >
                Eliminar
              </button>

            </div>

          </div>
        `
      )
      .join("")}
  `;
}


buscarTrabajo.addEventListener(
  "input",
  () => {
    clearTimeout(
      timeoutBusqueda
    );

    timeoutBusqueda =
      setTimeout(() => {
        cargarTrabajos();
      }, 300);
  }
);


filtroEstado.addEventListener(
  "change",
  cargarTrabajos
);


/* ======================================================
   CLIENTES EN FORMULARIO
====================================================== */

async function cargarClientesEnSelect(
  clienteSeleccionado = ""
) {
  const select =
    document.getElementById(
      "trabajoCliente"
    );

  const respuesta =
    await fetch(API_CLIENTES);

  const clientes =
    await respuesta.json();

  select.innerHTML = `
    <option value="">
      Seleccionar cliente
    </option>
  `;

  clientes.forEach((cliente) => {
    const option =
      document.createElement(
        "option"
      );

    option.value =
      cliente.nombre;

    option.textContent =
      cliente.nombre;

    if (
      cliente.nombre ===
      clienteSeleccionado
    ) {
      option.selected = true;
    }

    select.appendChild(option);
  });

  return clientes;
}


/* ======================================================
   NUEVO TRABAJO
====================================================== */

function limpiarFormularioTrabajo() {
  formTrabajo.reset();

  document.getElementById(
    "trabajoId"
  ).value = "";

  document.getElementById(
    "trabajoEstado"
  ).value = "Pendiente";

  document.getElementById(
    "tituloModalTrabajo"
  ).textContent =
    "Nuevo trabajo";
}


async function abrirNuevoTrabajo() {
  limpiarFormularioTrabajo();

  try {
    const clientes =
      await cargarClientesEnSelect();

    if (clientes.length === 0) {
      mostrarToast(
        "Primero debes registrar un cliente"
      );

      cambiarSeccion("clientes");

      return;
    }

    abrirModal(modalTrabajo);

  } catch (error) {
    console.error(error);

    mostrarToast(
      "No se pudieron cargar los clientes"
    );
  }
}


btnNuevoTrabajo.addEventListener(
  "click",
  abrirNuevoTrabajo
);


/* ======================================================
   GUARDAR TRABAJO
====================================================== */

formTrabajo.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const id =
      document.getElementById(
        "trabajoId"
      ).value;

    const datos = {
      nombre:
        document
          .getElementById(
            "trabajoNombre"
          )
          .value
          .trim(),

      cliente:
        document.getElementById(
          "trabajoCliente"
        ).value,

      tipo:
        document.getElementById(
          "trabajoTipo"
        ).value,

      fechaInicio:
        document.getElementById(
          "trabajoFechaInicio"
        ).value,

      fechaEntrega:
        document.getElementById(
          "trabajoFechaEntrega"
        ).value,

      precio:
        Number(
          document.getElementById(
            "trabajoPrecio"
          ).value
        ),

      estado:
        document.getElementById(
          "trabajoEstado"
        ).value,

      descripcion:
        document
          .getElementById(
            "trabajoDescripcion"
          )
          .value
          .trim()
    };

    try {
      const respuesta =
        await fetch(
          id
            ? `${API_TRABAJOS}/${id}`
            : API_TRABAJOS,
          {
            method:
              id
                ? "PUT"
                : "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify(datos)
          }
        );

      const resultado =
        await respuesta.json();

      if (!respuesta.ok) {
        mostrarToast(
          resultado.mensaje ||
          "No se pudo guardar el trabajo"
        );

        return;
      }

      cerrarModal(modalTrabajo);

      mostrarToast(
        id
          ? "Trabajo actualizado correctamente"
          : "Trabajo creado correctamente"
      );

      await cargarTrabajos();
      await cargarDashboard();

    } catch (error) {
      console.error(error);

      mostrarToast(
        "Ocurrió un error al guardar"
      );
    }
  }
);


/* ======================================================
   EDITAR TRABAJO
====================================================== */

async function editarTrabajo(id) {
  try {
    const respuesta =
      await fetch(
        `${API_TRABAJOS}/${id}`
      );

    if (!respuesta.ok) {
      mostrarToast(
        "No se encontró el trabajo"
      );

      return;
    }

    const trabajo =
      await respuesta.json();

    await cargarClientesEnSelect(
      trabajo.cliente
    );

    document.getElementById(
      "trabajoId"
    ).value =
      trabajo.id;

    document.getElementById(
      "trabajoNombre"
    ).value =
      trabajo.nombre;

    document.getElementById(
      "trabajoTipo"
    ).value =
      trabajo.tipo;

    document.getElementById(
      "trabajoFechaInicio"
    ).value =
      trabajo.fechaInicio || "";

    document.getElementById(
      "trabajoFechaEntrega"
    ).value =
      trabajo.fechaEntrega || "";

    document.getElementById(
      "trabajoPrecio"
    ).value =
      trabajo.precio || "";

    document.getElementById(
      "trabajoEstado"
    ).value =
      trabajo.estado;

    document.getElementById(
      "trabajoDescripcion"
    ).value =
      trabajo.descripcion || "";

    document.getElementById(
      "tituloModalTrabajo"
    ).textContent =
      "Editar trabajo";

    abrirModal(modalTrabajo);

  } catch (error) {
    console.error(error);

    mostrarToast(
      "No se pudo cargar el trabajo"
    );
  }
}


/* ======================================================
   DETALLE DE TRABAJO
====================================================== */

async function verDetalleTrabajo(id) {
  try {
    const respuesta =
      await fetch(
        `${API_TRABAJOS}/${id}`
      );

    if (!respuesta.ok) {
      mostrarToast(
        "No se encontró el trabajo"
      );

      return;
    }

    const trabajo =
      await respuesta.json();

    detalleTrabajo.innerHTML = `
      <div class="detail-header">

        <span class="eyebrow">
          DETALLE DEL TRABAJO
        </span>

        <h3>
          ${trabajo.nombre}
        </h3>

      </div>


      <div class="detail-grid">

        <div class="detail-item">
          <span>Cliente</span>

          <strong>
            ${trabajo.cliente}
          </strong>
        </div>


        <div class="detail-item">
          <span>Tipo</span>

          <strong>
            ${trabajo.tipo}
          </strong>
        </div>


        <div class="detail-item">

          <span>
            Estado
          </span>

          <span
            class="status ${
              claseEstado(
                trabajo.estado
              )
            }"
          >
            ${trabajo.estado}
          </span>

        </div>


        <div class="detail-item">

          <span>
            Precio estimado
          </span>

          <strong>
            ${
              formatearPrecio(
                trabajo.precio
              )
            }
          </strong>

        </div>


        <div class="detail-item">

          <span>
            Fecha de inicio
          </span>

          <strong>
            ${
              formatearFecha(
                trabajo.fechaInicio
              )
            }
          </strong>

        </div>


        <div class="detail-item">

          <span>
            Fecha prevista de entrega
          </span>

          <strong>
            ${
              formatearFecha(
                trabajo.fechaEntrega
              )
            }
          </strong>

        </div>

      </div>


      <div class="detail-description">

        <strong>
          Descripción
        </strong>

        <p style="margin-top: 8px;">
          ${
            trabajo.descripcion ||
            "No se agregó una descripción."
          }
        </p>

      </div>


      <div class="form-actions">

        <button
          class="btn btn-secondary"
          onclick="cerrarDetalleTrabajo()"
        >
          Cerrar
        </button>

        <button
          class="btn btn-primary"
          onclick="editarDesdeDetalle(${trabajo.id})"
        >
          Editar trabajo
        </button>

      </div>
    `;

    abrirModal(modalDetalle);

  } catch (error) {
    console.error(error);

    mostrarToast(
      "No se pudo cargar el detalle"
    );
  }
}


function cerrarDetalleTrabajo() {
  cerrarModal(modalDetalle);
}


function editarDesdeDetalle(id) {
  cerrarModal(modalDetalle);

  editarTrabajo(id);
}


/* ======================================================
   ELIMINAR TRABAJO
====================================================== */

function solicitarEliminarTrabajo(id) {
  tipoEliminacion =
    "trabajo";

  idEliminar = id;

  abrirModal(
    modalConfirmacion
  );
}


/* ======================================================
   CLIENTES
====================================================== */

async function cargarClientes() {
  try {
    const respuesta =
      await fetch(API_CLIENTES);

    const clientes =
      await respuesta.json();

    renderClientes(clientes);

  } catch (error) {
    console.error(error);
  }
}


function renderClientes(clientes) {
  if (
    !clientes ||
    clientes.length === 0
  ) {
    listaClientes.innerHTML = `
      <div class="empty-state">

        <div class="empty-state-icon">
          ♙
        </div>

        <h4>
          No hay clientes registrados
        </h4>

        <p>
          Agrega un cliente antes de registrar trabajos.
        </p>

      </div>
    `;

    return;
  }

  listaClientes.innerHTML =
    clientes
      .map(
        (cliente) => `
          <div class="cliente-row">

            <div class="row-main">

              <strong>
                ${cliente.nombre}
              </strong>

              <span>
                ${
                  cliente.direccion ||
                  "Sin dirección"
                }
              </span>

            </div>

            <div
              class="row-info mobile-field"
              data-label="Teléfono"
            >
              ${cliente.telefono}
            </div>

            <div
              class="row-info mobile-field"
              data-label="Correo"
            >
              ${
                cliente.correo ||
                "Sin correo"
              }
            </div>

            <div
              class="row-actions mobile-field"
              data-label="Acciones"
            >

              <button
                class="action-btn"
                onclick="editarCliente(${cliente.id})"
              >
                Editar
              </button>

              <button
                class="action-btn delete"
                onclick="solicitarEliminarCliente(${cliente.id})"
              >
                Eliminar
              </button>

            </div>

          </div>
        `
      )
      .join("");
}


/* ======================================================
   NUEVO CLIENTE
====================================================== */

function limpiarFormularioCliente() {
  formCliente.reset();

  document.getElementById(
    "clienteId"
  ).value = "";

  document.getElementById(
    "tituloModalCliente"
  ).textContent =
    "Nuevo cliente";
}


btnNuevoCliente.addEventListener(
  "click",
  () => {
    limpiarFormularioCliente();

    abrirModal(modalCliente);
  }
);


/* ======================================================
   GUARDAR CLIENTE
====================================================== */

formCliente.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const id =
      document.getElementById(
        "clienteId"
      ).value;

    const datos = {
      nombre:
        document
          .getElementById(
            "clienteNombre"
          )
          .value
          .trim(),

      telefono:
        document
          .getElementById(
            "clienteTelefono"
          )
          .value
          .trim(),

      correo:
        document
          .getElementById(
            "clienteCorreo"
          )
          .value
          .trim(),

      direccion:
        document
          .getElementById(
            "clienteDireccion"
          )
          .value
          .trim(),

      notas:
        document
          .getElementById(
            "clienteNotas"
          )
          .value
          .trim()
    };

    try {
      const respuesta =
        await fetch(
          id
            ? `${API_CLIENTES}/${id}`
            : API_CLIENTES,
          {
            method:
              id
                ? "PUT"
                : "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify(datos)
          }
        );

      const resultado =
        await respuesta.json();

      if (!respuesta.ok) {
        mostrarToast(
          resultado.mensaje ||
          "No se pudo guardar el cliente"
        );

        return;
      }

      cerrarModal(
        modalCliente
      );

      mostrarToast(
        id
          ? "Cliente actualizado correctamente"
          : "Cliente creado correctamente"
      );

      await cargarClientes();
      await cargarDashboard();

    } catch (error) {
      console.error(error);

      mostrarToast(
        "Ocurrió un error al guardar"
      );
    }
  }
);


/* ======================================================
   EDITAR CLIENTE
====================================================== */

async function editarCliente(id) {
  try {
    const respuesta =
      await fetch(
        `${API_CLIENTES}/${id}`
      );

    if (!respuesta.ok) {
      mostrarToast(
        "No se encontró el cliente"
      );

      return;
    }

    const cliente =
      await respuesta.json();

    document.getElementById(
      "clienteId"
    ).value =
      cliente.id;

    document.getElementById(
      "clienteNombre"
    ).value =
      cliente.nombre;

    document.getElementById(
      "clienteTelefono"
    ).value =
      cliente.telefono;

    document.getElementById(
      "clienteCorreo"
    ).value =
      cliente.correo || "";

    document.getElementById(
      "clienteDireccion"
    ).value =
      cliente.direccion || "";

    document.getElementById(
      "clienteNotas"
    ).value =
      cliente.notas || "";

    document.getElementById(
      "tituloModalCliente"
    ).textContent =
      "Editar cliente";

    abrirModal(modalCliente);

  } catch (error) {
    console.error(error);

    mostrarToast(
      "No se pudo cargar el cliente"
    );
  }
}


function solicitarEliminarCliente(id) {
  tipoEliminacion =
    "cliente";

  idEliminar = id;

  abrirModal(
    modalConfirmacion
  );
}


/* ======================================================
   CONFIRMACIÓN
====================================================== */

btnCancelarEliminar.addEventListener(
  "click",
  () => {
    cerrarModal(
      modalConfirmacion
    );

    tipoEliminacion = null;
    idEliminar = null;
  }
);


btnConfirmarEliminar.addEventListener(
  "click",
  async () => {
    if (
      !tipoEliminacion ||
      !idEliminar
    ) {
      return;
    }

    try {
      const url =
        tipoEliminacion ===
        "trabajo"
          ? `${API_TRABAJOS}/${idEliminar}`
          : `${API_CLIENTES}/${idEliminar}`;

      const respuesta =
        await fetch(
          url,
          {
            method: "DELETE"
          }
        );

      const resultado =
        await respuesta.json();

      if (!respuesta.ok) {
        cerrarModal(
          modalConfirmacion
        );

        mostrarToast(
          resultado.mensaje ||
          "No se pudo eliminar"
        );

        tipoEliminacion = null;
        idEliminar = null;

        return;
      }

      cerrarModal(
        modalConfirmacion
      );

      if (
        tipoEliminacion ===
        "trabajo"
      ) {
        mostrarToast(
          "Trabajo eliminado correctamente"
        );

        await cargarTrabajos();
        await cargarDashboard();

      } else {
        mostrarToast(
          "Cliente eliminado correctamente"
        );

        await cargarClientes();
      }

      tipoEliminacion = null;
      idEliminar = null;

    } catch (error) {
      console.error(error);

      mostrarToast(
        "Ocurrió un error al eliminar"
      );
    }
  }
);


/* ======================================================
   CERRAR MODALES
====================================================== */

document
  .querySelectorAll(
    "[data-close-modal]"
  )
  .forEach((boton) => {
    boton.addEventListener(
      "click",
      () => {
        const modalId =
          boton.dataset.closeModal;

        cerrarModal(
          document.getElementById(
            modalId
          )
        );
      }
    );
  });


document
  .querySelectorAll(
    ".modal-overlay"
  )
  .forEach((overlay) => {
    overlay.addEventListener(
      "click",
      () => {
        cerrarModal(
          overlay.closest(
            ".modal"
          )
        );
      }
    );
  });


document.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key === "Escape"
    ) {
      document
        .querySelectorAll(
          ".modal.active"
        )
        .forEach((modal) => {
          cerrarModal(modal);
        });

      cerrarMenuMobile();
    }
  }
);


/* ======================================================
   FUNCIONES GLOBALES
====================================================== */

window.verDetalleTrabajo =
  verDetalleTrabajo;

window.editarTrabajo =
  editarTrabajo;

window.solicitarEliminarTrabajo =
  solicitarEliminarTrabajo;

window.editarCliente =
  editarCliente;

window.solicitarEliminarCliente =
  solicitarEliminarCliente;

window.cerrarDetalleTrabajo =
  cerrarDetalleTrabajo;

window.editarDesdeDetalle =
  editarDesdeDetalle;


/* ======================================================
   INICIO
====================================================== */

document.addEventListener(
  "DOMContentLoaded",
  async () => {
    await cargarDashboard();
  }
);