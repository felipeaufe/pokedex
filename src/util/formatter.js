/**
 * Uppercase the first letter
 * 
 * @param {String} name 
 * @returns String
 */
export function nameFormat (name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Add three zeros before the number;
 * 
 * @param {Number} num 
 * @returns String
 */
export function numberFormat (num) {
  return num.toString().padStart(3, "0");
}