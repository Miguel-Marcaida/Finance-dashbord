/**
 * TransactionView.js
 * Manejo de la vista de transacciones (lista, modales)
 */

import { Formatter } from '../utils/formatting.js';

export class TransactionView {
  /**
   * Renderiza la lista de transacciones
   * @param {Array} transactions - Transacciones a mostrar
   * @param {Function} onEdit - Callback para editar
   * @param {Function} onDelete - Callback para eliminar
   */
  renderList(transactions, onEdit, onDelete) {
    const container = document.getElementById('transactionsContainer');

    if (transactions.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📊</div>
          <h3 class="empty-state-title">No hay transacciones</h3>
          <p class="empty-state-text">Comienza agregando tu primera transacción para visualizar tus finanzas</p>
          <button class="btn btn-primary" onclick="window.app.openModal()">
            ➕ Agregar Transacción
          </button>
        </div>
      `;
      return;
    }

    const html = `
      <div class="transactions-list">
        ${transactions.map(t => this.renderTransactionItem(t, onEdit, onDelete)).join('')}
      </div>
    `;

    container.innerHTML = html;
  }

  /**
   * Renderiza un item de transacción
   * @param {Object} transaction
   * @param {Function} onEdit
   * @param {Function} onDelete
   * @returns {string} HTML
   */
  renderTransactionItem(transaction, onEdit, onDelete) {
    const typeIcon = transaction.tipo === 'ingreso' ? '💰' : '💸';
    const amountClass = transaction.tipo === 'ingreso' ? 'income' : 'expense';
    const amountPrefix = transaction.tipo === 'ingreso' ? '+' : '-';

    return `
      <div class="transaction-item">
        <div class="transaction-info">
          <div class="transaction-description">
            ${typeIcon} ${transaction.descripcion || transaction.categoria}
          </div>
          <div class="transaction-meta">
             <span>📅 ${Formatter.date(transaction.fecha)}</span>
            <span>🏷️ ${transaction.categoria}</span>
          </div>
        </div>
        <div class="transaction-amount ${amountClass}">
          ${amountPrefix}${Formatter.currency(transaction.monto)}
        </div>
        <div class="transaction-actions">
          <button 
            class="btn btn-secondary btn-icon" 
            onclick='window.app.openModal(${JSON.stringify(transaction).replace(/'/g, "\\'")})'
            title="Editar"
            aria-label="Editar transacción"
          >
            ✏️
          </button>
          <button 
            class="btn btn-danger btn-icon" 
            onclick="window.app.openDeleteModal('${transaction.id}')"
            title="Eliminar"
            aria-label="Eliminar transacción"
          >
            🗑️
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Abre el modal de transacción
   * @param {Object|null} transaction - null para nuevo, objeto para editar
   */
  openModal(transaction = null) {
    const modal = document.getElementById('transactionModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('transactionForm');
    
    if (transaction) {
      title.textContent = 'Editar Transacción';
      this.populateForm(transaction);
    } else {
      title.textContent = 'Nueva Transacción';
      form.reset();
      this.setDefaultDate();
      this.updateCategoriesForType('');
    }
    
    modal.classList.remove('hidden');
    document.getElementById('tipo').focus();
  }

  /**
   * Cierra el modal de transacción
   */
  closeModal() {
    const modal = document.getElementById('transactionModal');
    modal.classList.add('hidden');
    document.getElementById('transactionForm').reset();
  }

  /**
   * Rellena el formulario con datos de transacción
   * @param {Object} transaction
   */
  populateForm(transaction) {
    document.getElementById('transactionId').value = transaction.id;
    document.getElementById('tipo').value = transaction.tipo;
    this.updateCategoriesForType(transaction.tipo);
    document.getElementById('categoria').value = transaction.categoria;
    document.getElementById('monto').value = transaction.monto;
    document.getElementById('fecha').value = transaction.fecha;
    document.getElementById('descripcion').value = transaction.descripcion || '';
  }

  /**
   * Obtiene los datos del formulario
   * @returns {Object}
   */
  getFormData() {
    return {
      id: document.getElementById('transactionId').value || null,
      tipo: document.getElementById('tipo').value,
      categoria: document.getElementById('categoria').value,
      monto: document.getElementById('monto').value,
      fecha: document.getElementById('fecha').value,
      descripcion: document.getElementById('descripcion').value
    };
  }

  /**
   * Actualiza las categorías según el tipo seleccionado
   * @param {string} type - 'ingreso' o 'gasto'
   */
  updateCategoriesForType(type) {
    const categoriaSelect = document.getElementById('categoria');
    categoriaSelect.innerHTML = '<option value="">Seleccionar...</option>';
    
    const CATEGORIES = {
      gasto: [
        'Alimentación', 'Transporte', 'Vivienda', 'Servicios',
        'Salud', 'Educación', 'Entretenimiento', 'Compras', 'Otros'
      ],
      ingreso: [
        'Salario', 'Freelance', 'Inversiones', 'Regalos', 'Otros'
      ]
    };
    
    if (type && CATEGORIES[type]) {
      CATEGORIES[type].forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoriaSelect.appendChild(option);
      });
    }
  }

  /**
   * Establece la fecha por defecto (hoy)
   */
  setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').value = today;
  }

  /**
   * Abre el modal de confirmación de eliminación
   */
  openDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.classList.remove('hidden');
  }

  /**
   * Cierra el modal de confirmación de eliminación
   */
  closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.classList.add('hidden');
  }
}