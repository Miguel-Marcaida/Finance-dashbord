/**
 * Transaction.js
 * Modelo de datos para transacciones con validación
 */

import { Validation } from '../utils/validation.js';

export const Transaction = {
  /**
   * Crea una nueva transacción con estructura válida
   * @param {Object} data - Datos de la transacción
   * @returns {Object} - Transacción formateada
   */
  create(data) {
    const now = Date.now();
    return {
      id: data.id || `txn_${now}_${Math.random().toString(36).substr(2, 9)}`,
      tipo: data.tipo,
      categoria: data.categoria,
      monto: parseFloat(data.monto),
      fecha: data.fecha,
      descripcion: Validation.sanitize(data.descripcion || ''),
      createdAt: data.createdAt || now,
      updatedAt: now
    };
  },

  /**
   * Valida una transacción completa
   * @param {Object} transaction - Transacción a validar
   * @returns {Object} - { valid: boolean, errors: string[] }
   */
  validate(transaction) {
    const errors = [];

    // Validar tipo
    if (!['ingreso', 'gasto'].includes(transaction.tipo)) {
      errors.push('Tipo de transacción inválido');
    }

    // Validar monto
    if (!Validation.isValidAmount(transaction.monto)) {
      errors.push('Monto inválido (debe ser mayor a 0 y menor a 999,999,999.99)');
    }

    // Validar fecha
    if (!Validation.isValidDate(transaction.fecha)) {
      errors.push('Fecha inválida (no puede ser futura ni mayor a 10 años)');
    }

    // Validar categoría
    if (!Validation.isValidCategory(transaction.categoria, transaction.tipo)) {
      errors.push('Categoría inválida para el tipo de transacción');
    }

    // Validar descripción
    if (!Validation.isValidDescription(transaction.descripcion)) {
      errors.push('Descripción inválida (máximo 200 caracteres)');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  },

  /**
   * Compara dos transacciones para ordenamiento por fecha
   * @param {Object} a - Primera transacción
   * @param {Object} b - Segunda transacción
   * @returns {number}
   */
  compareByDate(a, b) {
    return new Date(b.fecha) - new Date(a.fecha);
  },

  /**
   * Filtra transacciones por criterios
   * @param {Array} transactions - Array de transacciones
   * @param {Object} filters - Filtros a aplicar
   * @returns {Array}
   */
  filter(transactions, filters) {
    return transactions.filter(t => {
      if (filters.tipo && t.tipo !== filters.tipo) return false;
      if (filters.categoria && t.categoria !== filters.categoria) return false;
      if (filters.dateFrom && t.fecha < filters.dateFrom) return false;
      if (filters.dateTo && t.fecha > filters.dateTo) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchDescription = t.descripcion.toLowerCase().includes(searchLower);
        const matchCategory = t.categoria.toLowerCase().includes(searchLower);
        if (!matchDescription && !matchCategory) return false;
      }
      return true;
    });
  }
};