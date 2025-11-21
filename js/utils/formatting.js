/**
 * formatting.js
 * Funciones de formateo de datos para visualización
 */

export const Formatter = {
  /**
   * Formatea un número como moneda
   * @param {number} amount - Monto a formatear
   * @param {string} currency - Código de moneda (default: ARS)
   * @returns {string}
   */
  currency(amount, currency = 'ARS') {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  },

  /**
   * Formatea una fecha en formato legible
   * @param {string} dateString - Fecha en formato YYYY-MM-DD
   * @returns {string}
   */
  date(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  },

  /**
   * Formatea una fecha con día de la semana
   * @param {string} dateString
   * @returns {string}
   */
  dateWithDay(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return new Intl.DateFormat('es-AR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  },

  /**
   * Formatea un porcentaje
   * @param {number} value - Valor entre 0-100
   * @param {number} decimals - Cantidad de decimales (default: 1)
   * @returns {string}
   */
  percentage(value, decimals = 1) {
    return `${value.toFixed(decimals)}%`;
  },

  /**
   * Formatea un número grande con separadores
   * @param {number} num
   * @returns {string}
   */
  number(num) {
    return new Intl.NumberFormat('es-AR').format(num);
  },

  /**
   * Abrevia números grandes (1000 -> 1K, 1000000 -> 1M)
   * @param {number} num
   * @returns {string}
   */
  abbreviateNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  },

  /**
   * Formatea un timestamp a fecha/hora
   * @param {number} timestamp
   * @returns {string}
   */
  timestamp(timestamp) {
    return new Intl.DateFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  },

  /**
   * Convierte mes numérico a nombre
   * @param {number} month - Mes (0-11)
   * @returns {string}
   */
  monthName(month) {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[month];
  },

  /**
   * Convierte mes numérico a nombre corto
   * @param {number} month - Mes (0-11)
   * @returns {string}
   */
  monthShort(month) {
    const months = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    return months[month];
  },

  /**
   * Capitaliza la primera letra de un string
   * @param {string} str
   * @returns {string}
   */
  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
};