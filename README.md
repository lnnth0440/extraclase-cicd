# Gestión de Ebanistería

Aplicación web para la gestión básica de clientes y trabajos de un pequeño taller de ebanistería.

El sistema permite registrar clientes, crear trabajos asociados a ellos, actualizar el estado de cada trabajo, consultar fechas previstas de entrega y visualizar un resumen general desde un dashboard.

Además de las funcionalidades propias de la aplicación, el proyecto implementa un flujo de **Integración Continua (CI)** y **Despliegue Continuo (CD)** utilizando GitHub Actions y Render.

Este proyecto fue desarrollado como parte del trabajo extraclase del curso **Programación IV**, con el objetivo de aplicar automatización de pruebas, análisis de calidad de código y despliegue continuo dentro de un proyecto web funcional.

---

## Funcionalidades principales

La aplicación se organiza en tres módulos principales:

- Dashboard
- Clientes
- Trabajos

### Dashboard

El dashboard presenta un resumen del estado general de los trabajos registrados.

Permite visualizar:

- total de trabajos;
- trabajos pendientes;
- trabajos en proceso;
- trabajos completados;
- trabajos cancelados;
- trabajos registrados recientemente;
- próximas fechas previstas de entrega.

De esta forma es posible obtener una vista rápida del taller sin necesidad de revisar cada trabajo individualmente.

### Clientes

El módulo de clientes permite registrar y administrar la información básica de las personas que solicitan trabajos al taller.

Para cada cliente se puede almacenar:

- nombre;
- teléfono;
- correo electrónico;
- dirección;
- notas adicionales.

También es posible editar y eliminar clientes.

El sistema incluye validaciones para evitar clientes duplicados y no permite eliminar un cliente mientras tenga trabajos asociados.

### Trabajos

El módulo de trabajos permite registrar y administrar los proyectos realizados por la ebanistería.

Cada trabajo puede incluir:

- nombre;
- cliente asociado;
- descripción;
- estado;
- precio estimado;
- fecha de inicio;
- fecha prevista de entrega.

Los estados disponibles son:

- Pendiente
- En proceso
- Completado
- Cancelado

Además, el usuario puede:

- editar trabajos;
- eliminar trabajos;
- consultar su información;
- buscar trabajos por nombre;
- buscar trabajos por cliente;
- filtrar trabajos según su estado.

Un trabajo únicamente puede registrarse cuando existe previamente un cliente asociado.

---

## Diseño responsive

La interfaz fue desarrollada para adaptarse a diferentes tamaños de pantalla.

La aplicación puede utilizarse desde:

- computadoras de escritorio;
- laptops;
- tablets;
- teléfonos móviles.

En dispositivos con pantallas pequeñas, la navegación se adapta mediante un menú desplegable y los formularios, tarjetas, tablas y demás componentes reorganizan su distribución para conservar la legibilidad y facilitar la interacción.

---

## Tecnologías utilizadas

### Backend

- **Node.js** — entorno de ejecución del servidor.
- **Express** — framework utilizado para crear el servidor HTTP y las rutas de la aplicación.
- **JavaScript con ES Modules** — utilizado para la lógica y organización del backend.

### Frontend

- **HTML5** — estructura de la interfaz.
- **CSS3** — estilos, distribución visual y diseño responsive.
- **JavaScript** — interacción de la interfaz y comunicación con el backend.

### Persistencia

- **JSON** — almacenamiento de la información de clientes y trabajos.

### Pruebas y calidad

- **Vitest** — ejecución de pruebas unitarias.
- **V8 Coverage** — generación de reportes de cobertura.
- **ESLint** — análisis estático y validación de calidad del código.

### Integración, despliegue y control de versiones

- **Git**
- **GitHub**
- **GitHub Actions**
- **Render**

### Gestor de paquetes

- **pnpm**

---

## Estructura del proyecto

```text
extraclase-cicd/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── cd.yml
│       └── matrix.yml
│
├── src/
│   ├── data/
│   │   ├── clientes.json
│   │   └── trabajos.json
│   │
│   ├── public/
│   │   ├── app.js
│   │   ├── index.html
│   │   └── styles.css
│   │
│   ├── services/
│   │   ├── clientesService.js
│   │   └── trabajosService.js
│   │
│   ├── utils/
│   │   └── trabajosUtils.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   └── trabajosUtils.test.js
│
├── .gitignore
├── eslint.config.js
├── vitest.config.js
├── package.json
├── pnpm-lock.yaml
└── README.md
```

### Archivos y directorios principales

| Elemento | Descripción |
|---|---|
| `.github/workflows/` | Contiene los workflows de CI, CD y matriz de compatibilidad |
| `src/data/` | Archivos JSON utilizados para almacenar los datos |
| `src/public/` | Archivos correspondientes a la interfaz web |
| `src/services/` | Lógica para consultar y modificar los datos |
| `src/utils/` | Funciones auxiliares utilizadas por la aplicación |
| `tests/` | Pruebas unitarias del proyecto |
| `src/app.js` | Configuración de Express y rutas de la aplicación |
| `src/server.js` | Inicio del servidor HTTP |
| `eslint.config.js` | Configuración de ESLint |
| `vitest.config.js` | Configuración de Vitest y cobertura |
| `package.json` | Dependencias, información y scripts del proyecto |
| `pnpm-lock.yaml` | Versiones exactas de las dependencias instaladas |

---

## Persistencia de datos

La aplicación utiliza archivos JSON como mecanismo de persistencia.

Los datos se almacenan en:

```text
src/data/clientes.json
src/data/trabajos.json
```

Este mecanismo fue seleccionado para mantener el alcance del proyecto enfocado en los objetivos principales del extraclase, especialmente la implementación y demostración del flujo CI/CD.

La lógica relacionada con el acceso y modificación de los datos se encuentra separada mediante servicios, lo que facilita sustituir posteriormente el almacenamiento JSON por una base de datos sin tener que reconstruir completamente la aplicación.

---

## Requisitos

Para ejecutar el proyecto localmente se requiere:

- Node.js
- pnpm
- Git

Se puede comprobar la instalación mediante:

```powershell
node --version
pnpm --version
git --version
```

---

## Instalación

### 1. Clonar el repositorio

```powershell
git clone https://github.com/lnnth0440/extraclase-cicd.git
```

### 2. Entrar al proyecto

```powershell
cd extraclase-cicd
```

### 3. Instalar las dependencias

```powershell
pnpm install
```

Una vez finalizada la instalación, el proyecto estará preparado para ejecutarse localmente.

---

## Ejecución local

Para iniciar la aplicación:

```powershell
pnpm start
```

Por defecto, el servidor estará disponible en:

```text
http://localhost:3000
```

Para ejecutar el proyecto en modo de desarrollo:

```powershell
pnpm run dev
```

El modo de desarrollo utiliza la función de observación de Node.js para reiniciar automáticamente el servidor cuando se detectan cambios en los archivos.

Para detener el servidor:

```text
Ctrl + C
```

---

## Scripts disponibles

### Iniciar la aplicación

```powershell
pnpm start
```

Inicia el servidor HTTP.

### Modo de desarrollo

```powershell
pnpm run dev
```

Ejecuta el servidor utilizando el modo de observación.

### Validar el código

```powershell
pnpm run lint
```

Ejecuta ESLint para comprobar la calidad y consistencia del código.

### Ejecutar pruebas

```powershell
pnpm run test
```

Ejecuta las pruebas unitarias mediante Vitest.

### Generar cobertura

```powershell
pnpm run coverage
```

Ejecuta las pruebas y genera el reporte de cobertura mediante V8.

---

## Pruebas unitarias

Las pruebas automatizadas se encuentran en:

```text
tests/trabajosUtils.test.js
```

El proyecto cuenta actualmente con **10 pruebas unitarias** orientadas a validar funciones importantes de la lógica de negocio.

Entre los casos evaluados se encuentran:

- generación del primer identificador;
- generación del siguiente identificador disponible;
- validación de clientes existentes;
- comparación de nombres independientemente de mayúsculas y minúsculas;
- validación de clientes inexistentes;
- filtrado de trabajos por nombre;
- filtrado de trabajos por cliente;
- filtrado de trabajos por estado;
- cálculo de estadísticas;
- verificación de trabajos asociados a un cliente.

Para ejecutar las pruebas:

```powershell
pnpm run test
```

Una ejecución satisfactoria muestra un resultado similar a:

```text
Test Files  1 passed
Tests       10 passed
```

---

## Cobertura de código

La cobertura de las pruebas se genera mediante Vitest utilizando el proveedor V8.

Para generar el reporte:

```powershell
pnpm run coverage
```

Las funciones evaluadas en:

```text
src/utils/trabajosUtils.js
```

alcanzan una cobertura del **100 %** en:

- Statements
- Branches
- Functions
- Lines

La generación de este reporte también forma parte del proceso automático de Integración Continua.

---

## Calidad de código

El proyecto utiliza ESLint para analizar el código fuente y detectar posibles errores o incumplimientos de las reglas configuradas.

La validación puede ejecutarse manualmente mediante:

```powershell
pnpm run lint
```

Este mismo proceso se ejecuta automáticamente dentro del workflow de Integración Continua.

---

# CI/CD

Uno de los objetivos principales del proyecto es implementar un flujo automatizado de **Integración Continua (CI)** y **Despliegue Continuo (CD)**.

GitHub Actions se utiliza como plataforma de automatización y Render como servicio de alojamiento de la aplicación.

---

## Integración Continua (CI)

La configuración de Integración Continua se encuentra en:

```text
.github/workflows/ci.yml
```

El workflow se ejecuta automáticamente ante:

- push hacia `main`;
- push hacia `develop`;
- pull request dirigido a `main`.

Durante la ejecución se realizan las siguientes etapas:

1. obtener el código del repositorio;
2. instalar pnpm;
3. configurar Node.js;
4. instalar las dependencias;
5. ejecutar ESLint;
6. ejecutar las pruebas unitarias;
7. generar el reporte de cobertura;
8. publicar el reporte de cobertura como artifact de GitHub Actions.

Si alguna validación o prueba falla, la ejecución del workflow finaliza con error.

Los propios status checks de GitHub permiten identificar visualmente si la ejecución fue satisfactoria o si alguna etapa presentó un fallo.

Esto permite detectar problemas en el proyecto antes de realizar un despliegue hacia producción.

---

## Matriz de compatibilidad

El proyecto incluye un workflow adicional para comprobar su funcionamiento en distintos entornos.

Su configuración se encuentra en:

```text
.github/workflows/matrix.yml
```

Se prueban las siguientes versiones de Node.js:

```text
Node.js 22
Node.js 23
Node.js 24
```

en los sistemas operativos:

```text
Ubuntu
Windows
```

Esto produce un total de **seis combinaciones de ejecución**:

| Sistema operativo | Node 22 | Node 23 | Node 24 |
|---|---:|---:|---:|
| Ubuntu | ✓ | ✓ | ✓ |
| Windows | ✓ | ✓ | ✓ |

La estrategia utiliza:

```yaml
fail-fast: false
```

De esta forma, todas las combinaciones pueden continuar ejecutándose aunque alguna presente un error.

Esto permite identificar con mayor facilidad si existe algún problema relacionado específicamente con una versión de Node.js o con determinado sistema operativo.

---

## Despliegue Continuo (CD)

La configuración del proceso de Despliegue Continuo se encuentra en:

```text
.github/workflows/cd.yml
```

El workflow de CD se ejecuta únicamente después de que el proceso de Integración Continua finaliza correctamente sobre la rama `main`.

Una vez que CI valida el cambio, el workflow de CD descarga el código correspondiente al commit aprobado y genera un paquete desplegable llamado:

```text
extraclase-cicd.tar.gz
```

El paquete contiene los elementos necesarios de la aplicación y se almacena como artifact dentro de GitHub Actions.

De esta forma, el proceso de CD construye y conserva un artefacto desplegable antes de iniciar la publicación en producción.

Posteriormente, el workflow utiliza:

- GitHub Actions;
- GitHub Artifacts;
- GitHub Environments;
- GitHub Secrets;
- Render Deploy Hook.

El Environment utilizado para producción se denomina:

```text
production
```

Este entorno incluye una regla de protección con tiempo de espera y permite el despliegue únicamente desde la rama principal.

La URL del Deploy Hook de Render se almacena de forma segura mediante el secreto:

```text
RENDER_DEPLOY_HOOK_URL
```

De esta manera, la URL utilizada para activar el despliegue no se expone directamente dentro del código fuente ni en los archivos del repositorio.

Una vez generado y almacenado el artefacto, GitHub Actions utiliza el Deploy Hook para solicitar a Render una nueva publicación de la aplicación.

---

## Flujo general de CI/CD

El proceso implementado puede representarse de la siguiente manera:

```text
Cambio en el código
        │
        ▼
     Git Push
        │
        ▼
      GitHub
        │
        ▼
 GitHub Actions
        │
        ▼
Integración Continua
        │
        ├── ESLint
        ├── Pruebas unitarias
        └── Coverage
        │
        ▼
    CI exitoso
        │
        ▼
Descargar commit validado
        │
        ▼
Construir artefacto desplegable
extraclase-cicd.tar.gz
        │
        ▼
Subir artifact
        │
        ▼
Despliegue Continuo
        │
        ▼
Environment: production
        │
        ▼
 Render Deploy Hook
        │
        ▼
      Render
        │
        ▼
Aplicación actualizada
```

Con este flujo, los cambios enviados a la rama principal deben superar primero las validaciones automáticas de CI. Solo después de una ejecución satisfactoria se genera el artefacto desplegable y se continúa con el proceso de publicación en producción.

---

## Despliegue en Render

La aplicación se encuentra desplegada públicamente en:

**https://extraclase-cicd.onrender.com**

Render utiliza los siguientes comandos para preparar y ejecutar el proyecto:

### Build Command

```text
pnpm install --frozen-lockfile
```

### Start Command

```text
pnpm start
```

El servidor utiliza la variable de entorno `PORT` proporcionada por Render al ejecutarse en producción.

El Auto-Deploy de Render se mantiene desactivado, por lo que el despliegue es iniciado mediante el Deploy Hook utilizado por el workflow de CD de GitHub Actions.

De esta forma, Render no publica automáticamente cada push realizado al repositorio; el despliegue ocurre después de que CI finaliza correctamente y el workflow de CD solicita la nueva publicación.

Debido a que el proyecto utiliza una instancia gratuita de Render, el servicio puede entrar en estado de inactividad después de permanecer cierto tiempo sin solicitudes.

Por esta razón, la primera carga después de un período de inactividad puede tardar algunos segundos adicionales.

---

## Flujo habitual de desarrollo

El flujo utilizado para realizar cambios en el proyecto es:

```text
Desarrollo local
      │
      ▼
Validación con ESLint
      │
      ▼
Pruebas unitarias
      │
      ▼
     Git
      │
      ▼
   GitHub
      │
      ▼
GitHub Actions
      │
      ▼
     CI
      │
      ▼
Artifact desplegable
      │
      ▼
     CD
      │
      ▼
   Render
```

Este proceso permite automatizar tareas que, de otra manera, tendrían que realizarse manualmente cada vez que se modifica la aplicación.

---

## Enlaces del proyecto

### Repositorio de GitHub

https://github.com/lnnth0440/extraclase-cicd

### Aplicación desplegada

https://extraclase-cicd.onrender.com

---

## Posibles mejoras futuras

La aplicación fue desarrollada con un alcance básico, pero su estructura permite ampliar sus funcionalidades posteriormente.

Algunas posibles mejoras son:

- implementar una base de datos;
- incorporar autenticación de usuarios;
- gestionar materiales utilizados en los trabajos;
- controlar inventario;
- registrar pagos;
- generar cotizaciones;
- mantener un historial detallado por cliente;
- administrar proveedores;
- generar reportes;
- incorporar información de costos;
- agregar fotografías de los trabajos;
- enviar recordatorios de fechas de entrega.

Estas funcionalidades no forman parte del alcance actual del extraclase, pero podrían integrarse si el sistema continúa desarrollándose como una herramienta real para la administración de un taller de ebanistería.

---

## Objetivo académico

El proyecto demuestra la aplicación práctica de conceptos relacionados con:

- desarrollo de una aplicación web;
- separación de responsabilidades dentro del código;
- control de versiones con Git;
- alojamiento de código mediante GitHub;
- automatización mediante GitHub Actions;
- pruebas unitarias;
- cobertura de código;
- análisis estático;
- artifacts de GitHub Actions;
- matrices de compatibilidad;
- manejo de secretos;
- environments de despliegue;
- Integración Continua;
- Despliegue Continuo;
- publicación de una aplicación web en Render.

La aplicación de ebanistería funciona como caso práctico para integrar estos elementos dentro de un único flujo de desarrollo.

---

## Autora

**Jendry Murillo Pérez**  
Programación IV  
II Cuatrimestre, 2026