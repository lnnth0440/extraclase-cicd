import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const archivoTrabajos = path.join(__dirname, "../data/trabajos.json");

export function obtenerTrabajos() {
  const contenido = fs.readFileSync(archivoTrabajos, "utf-8");

  return JSON.parse(contenido);
}

export function guardarTrabajos(trabajos) {
  fs.writeFileSync(
    archivoTrabajos,
    JSON.stringify(trabajos, null, 2),
    "utf-8"
  );
}