/**
 * validation.js
 * Funciones de validación reutilizables
 */

// Categorías permitidas
export const CATEGORIES = {
  gasto: [
    'Alimentación',
    'Transporte',
    'Vivienda',
    'Servicios',
    'Salud',
    'Educación',
    'Entretenimiento',
    'Compras',
    'Otros'
  ],
  ingreso: [
    'Salario',
    'Freelance',
    'Inversiones',
    'Regalos',
    'Otros'
  ]
};

export const Validation = {
  /**
   * Valida que un monto sea válido
   * @param {number} amount - Monto a validar
   * @returns {boolean}
   */
  isValidAmount(amount) {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0 && num <= 999999999.99;
  },

  /**
   * Valida que una fecha sea válida
   * @param {string} dateString - Fecha en formato YYYY-MM-DD
   * @returns {boolean}
   */
  isValidDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
    tenYearsAgo.setHours(0, 0, 0, 0);
    
    return date instanceof Date && 
           !isNaN(date) && 
           date <= today && 
           date >= tenYearsAgo;
  },

  /**
   * Valida que una categoría sea válida para el tipo
   * @param {string} category - Categoría
   * @param {string} type - Tipo (ingreso/gasto)
   * @returns {boolean}
   */
  isValidCategory(category, type) {
    return CATEGORIES[type] && CATEGORIES[type].includes(category);
  },

  /**
   * Valida que una descripción sea válida
   * @param {string} desc - Descripción
   * @returns {boolean}
   */
  isValidDescription(desc) {
    if (!desc) return true; // Es opcional
    const trimmed = desc.trim();
    return trimmed.length > 0 && trimmed.length <= 200;
  },

  /**
   * Sanitiza un string para prevenir XSS
   * @param {string} str - String a sanitizar
   * @returns {string}
   */
  sanitize(str) {
    if (!str) return '';
    return str
      .replace(/[<>]/g, '') // Elimina < y >
      .trim();
  },

  /**
   * Valida un email (para futuras features)
   * @param {string} email
   * @returns {boolean}
   */
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  /**
   * Mensajes de error predefinidos
   */
  errorMessages: {
    required: 'Este campo es obligatorio',
    invalidNumber: 'Ingresa un número válido',
    invalidDate: 'Fecha inválida o futura',
    maxLength: (max) => `Máximo ${max} caracteres`,
    minValue: (min) => `El valor mínimo es ${min}`,
    maxValue: (max) => `El valor máximo es ${max}`,
    invalidCategory: 'Categoría inválida'
  }
};