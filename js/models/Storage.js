/**
 * Storage.js
 * Capa de abstracción para persistencia de datos usando localStorage
 */

export const Storage = {
  /**
   * Obtiene un valor del localStorage
   * @param {string} key - Clave del dato
   * @returns {any} - Dato parseado o null
   */
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error al leer del storage (${key}):`, error);
      return null;
    }
  },

  /**
   * Guarda un valor en localStorage
   * @param {string} key - Clave del dato
   * @param {any} value - Valor a guardar (será stringificado)
   * @returns {boolean} - true si tuvo éxito, false si falló
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error al guardar en storage (${key}):`, error);
      
      // Verificar si es error de cuota excedida
      if (error.name === 'QuotaExceededError') {
        console.error('Storage lleno. Considera limpiar datos antiguos.');
      }
      
      return false;
    }
  },

  /**
   * Elimina un valor del localStorage
   * @param {string} key - Clave del dato a eliminar
   * @returns {boolean} - true si tuvo éxito
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error al eliminar del storage (${key}):`, error);
      return false;
    }
  },

  /**
   * Limpia todo el localStorage (usar con precaución)
   */
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error al limpiar storage:', error);
      return false;
    }
  },

  /**
   * Verifica si una clave existe en el storage
   * @param {string} key - Clave a verificar
   * @returns {boolean}
   */
  has(key) {
    return localStorage.getItem(key) !== null;
  },

  /**
   * Obtiene el tamaño aproximado del storage en bytes
   * @returns {number}
   */
  getSize() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }
};