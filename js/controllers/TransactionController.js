/**
 * TransactionController.js
 * Controlador para operaciones CRUD de transacciones
 */

import { Transaction } from '../models/Transaction.js';
import { Storage } from '../models/Storage.js';

const STORAGE_KEY = 'finance_dashboard_data';

export class TransactionController {
  constructor() {
    this.transactions = [];
    this.loadTransactions();
  }

  /**
   * Carga las transacciones desde el storage
   */
  loadTransactions() {
    const data = Storage.get(STORAGE_KEY);
    this.transactions = data || [];
    return this.transactions;
  }

  /**
   * Guarda las transacciones en el storage
   * @returns {boolean}
   */
  saveTransactions() {
    return Storage.set(STORAGE_KEY, this.transactions);
  }

  /**
   * Obtiene todas las transacciones
   * @returns {Array}
   */
  getAll() {
    return [...this.transactions];
  }

  /**
   * Obtiene una transacción por ID
   * @param {string} id
   * @returns {Object|null}
   */
  getById(id) {
    return this.transactions.find(t => t.id === id) || null;
  }

  /**
   * Crea una nueva transacción
   * @param {Object} data
   * @returns {Object} - { success: boolean, transaction?: Object, errors?: Array }
   */
  create(data) {
    const transaction = Transaction.create(data);
    const validation = Transaction.validate(transaction);

    if (!validation.valid) {
      return {
        success: false,
        errors: validation.errors
      };
    }

    this.transactions.unshift(transaction);
    const saved = this.saveTransactions();

    if (!saved) {
      return {
        success: false,
        errors: ['Error al guardar en el almacenamiento']
      };
    }

    return {
      success: true,
      transaction
    };
  }

  /**
   * Actualiza una transacción existente
   * @param {string} id
   * @param {Object} data
   * @returns {Object}
   */
  update(id, data) {
    const index = this.transactions.findIndex(t => t.id === id);
    
    if (index === -1) {
      return {
        success: false,
        errors: ['Transacción no encontrada']
      };
    }

    const transaction = Transaction.create({
      ...data,
      id,
      createdAt: this.transactions[index].createdAt
    });

    const validation = Transaction.validate(transaction);

    if (!validation.valid) {
      return {
        success: false,
        errors: validation.errors
      };
    }

    this.transactions[index] = transaction;
    const saved = this.saveTransactions();

    if (!saved) {
      return {
        success: false,
        errors: ['Error al guardar en el almacenamiento']
      };
    }

    return {
      success: true,
      transaction
    };
  }

  /**
   * Elimina una transacción
   * @param {string} id
   * @returns {Object}
   */
  delete(id) {
    const index = this.transactions.findIndex(t => t.id === id);
    
    if (index === -1) {
      return {
        success: false,
        errors: ['Transacción no encontrada']
      };
    }

    this.transactions.splice(index, 1);
    const saved = this.saveTransactions();

    if (!saved) {
      return {
        success: false,
        errors: ['Error al guardar en el almacenamiento']
      };
    }

    return {
      success: true
    };
  }

  /**
   * Filtra transacciones según criterios
   * @param {Object} filters
   * @returns {Array}
   */
  filter(filters) {
    return Transaction.filter(this.transactions, filters);
  }

  /**
   * Importa transacciones desde un array
   * @param {Array} transactions
   * @returns {Object} - { imported: number, errors: number }
   */
  importTransactions(transactions) {
    let imported = 0;
    let errors = 0;

    transactions.forEach(data => {
      const result = this.create(data);
      if (result.success) {
        imported++;
      } else {
        errors++;
      }
    });

    return { imported, errors };
  }

  /**
   * Exporta transacciones a formato CSV
   * @returns {string}
   */
  exportToCSV() {
    const headers = ['Tipo', 'Categoría', 'Monto', 'Fecha', 'Descripción'];
    const rows = this.transactions.map(t => [
      t.tipo,
      t.categoria,
      t.monto,
      t.fecha,
      t.descripcion || ''
    ]);

    return [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
  }

  /**
   * Limpia todas las transacciones (usar con precaución)
   */
  clearAll() {
    this.transactions = [];
    return this.saveTransactions();
  }
}