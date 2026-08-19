import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const archivoClientes = path.join(__dirname, "../data/clientes.json");

export function obtenerClientes() {
  const contenido = fs.readFileSync(archivoClientes, "utf-8");

  return JSON.parse(contenido);
}

export function guardarClientes(clientes) {
  fs.writeFileSync(
    archivoClientes,
    JSON.stringify(clientes, null, 2),
    "utf-8"
  );
}