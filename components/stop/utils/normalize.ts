/**
 * Normaliza una cadena de texto para facilitar comparaciones y votaciones:
 * - Elimina espacios en blanco al inicio y al final
 * - Convierte a minúsculas
 * - Elimina tildes y diacríticos
 */
export function normalizeWord(str: string): string {
  if (!str) return '';
  
  return str
    .trim()
    .toLowerCase()
    // Normalización Unicode para separar los caracteres base de sus marcas diacríticas
    .normalize("NFD")
    // Remover todas las marcas diacríticas (rango Unicode U+0300 a U+036f)
    .replace(/[\u0300-\u036f]/g, "");
}
