/**
 * AppController.js
 * Controlador principal de la aplicación
 */

import { TransactionController } from './TransactionController.js';
import { DashboardView } from '../views/DashboardView.js';
import { TransactionView } from '../views/TransactionView.js';
import { ChartView } from '../views/ChartView.js';
import { Storage } from '../models/Storage.js';
import { CATEGORIES } from '../utils/validation.js';

const CONFIG_KEY = 'finance_dashboard_config';

export class AppController {
  constructor() {
    this.transactionController = new TransactionController();
    this.dashboardView = new DashboardView();
    this.transactionView = new TransactionView();
    this.chartView = new ChartView();
    
    this.filteredTransactions = [];
    this.currentFilters = {};
    this.editingId = null;
    this.deleteId = null;
  }

  /**
   * Inicializa la aplicación
   */
  init() {
    this.loadConfig();
    this.setupEventListeners();
    this.populateCategoryFilters();
    this.setDefaultDateFilters();
    this.applyFilters();
    this.render();
  }

  /**
   * Carga la configuración guardada
   */
  loadConfig() {
    const config = Storage.get(CONFIG_KEY);
    if (config && config.theme) {
      this.dashboardView.updateTheme(config.theme);
    }
  }

  /**
   * Configura todos los event listeners
   */
  setupEventListeners() {
    // Botones principales
    document.getElementById('addTransactionBtn').addEventListener('click', () => this.openModal());
    document.getElementById('fabBtn').addEventListener('click', () => this.openModal());
    document.getElementById('exportBtn').addEventListener('click', () => this.exportData());
    document.getElementById('importBtn').addEventListener('click', () => this.importData());
    document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

    // Modal de transacción
    document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
    document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
    document.getElementById('saveBtn').addEventListener('click', () => this.saveTransaction());
    
    // Click fuera del modal para cerrar
    document.getElementById('transactionModal').addEventListener('click', (e) => {
      if (e.target.id === 'transactionModal') this.closeModal();
    });

    // Modal de eliminación
    document.getElementById('closeDeleteModal').addEventListener('click', () => this.closeDeleteModal());
    document.getElementById('cancelDeleteBtn').addEventListener('click', () => this.closeDeleteModal());
    document.getElementById('confirmDeleteBtn').addEventListener('click', () => this.deleteTransaction());
    
    document.getElementById('deleteModal').addEventListener('click', (e) => {
      if (e.target.id === 'deleteModal') this.closeDeleteModal();
    });

    // Cambio de tipo actualiza categorías
    document.getElementById('tipo').addEventListener('change', (e) => {
      this.transactionView.updateCategoriesForType(e.target.value);
    });

    // Filtros
    document.getElementById('filterType').addEventListener('change', () => this.applyFilters());
    document.getElementById('filterCategory').addEventListener('change', () => this.applyFilters());
    document.getElementById('filterDateFrom').addEventListener('change', () => this.applyFilters());
    document.getElementById('filterDateTo').addEventListener('change', () => this.applyFilters());
    document.getElementById('resetFilters').addEventListener('click', () => this.resetFilters());

    // Teclado (Escape cierra modales)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
        this.closeDeleteModal();
      }
    });
  }

  /**
   * Popula el filtro de categorías
   */
  populateCategoryFilters() {
    const allCategories = [...new Set([...CATEGORIES.gasto, ...CATEGORIES.ingreso])].sort();
    const filterSelect = document.getElementById('filterCategory');
    
    allCategories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      filterSelect.appendChild(option);
    });
  }

  /**
   * Establece filtros de fecha por defecto (mes actual)
   */
  setDefaultDateFilters() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('filterDateTo').value = today;
    
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    document.getElementById('filterDateFrom').value = firstDayOfMonth.toISOString().split('T')[0];
  }

  /**
   * Aplica los filtros actuales
   */
  applyFilters() {
    this.currentFilters = {
      tipo: document.getElementById('filterType').value,
      categoria: document.getElementById('filterCategory').value,
      dateFrom: document.getElementById('filterDateFrom').value,
      dateTo: document.getElementById('filterDateTo').value
    };

    this.filteredTransactions = this.transactionController.filter(this.currentFilters);
    this.render();
  }

  /**
   * Resetea todos los filtros
   */
  resetFilters() {
    document.getElementById('filterType').value = '';
    document.getElementById('filterCategory').value = '';
    this.setDefaultDateFilters();
    this.applyFilters();
  }

  /**
   * Renderiza toda la UI
   */
  render() {
    this.dashboardView.renderKPIs(this.filteredTransactions);
    this.chartView.renderAll(this.filteredTransactions);
    this.transactionView.renderList(
      this.filteredTransactions,
      (t) => this.openModal(t),
      (id) => this.openDeleteModal(id)
    );
  }

  /**
   * Abre el modal de transacción
   */
  openModal(transaction = null) {
    this.editingId = transaction ? transaction.id : null;
    this.transactionView.openModal(transaction);
  }

  /**
   * Cierra el modal de transacción
   */
  closeModal() {
    this.transactionView.closeModal();
    this.editingId = null;
  }

  /**
   * Guarda una transacción (crear o actualizar)
   */
  saveTransaction() {
    const formData = this.transactionView.getFormData();
    let result;

    if (this.editingId) {
      result = this.transactionController.update(this.editingId, formData);
    } else {
      result = this.transactionController.create(formData);
    }

    if (!result.success) {
      this.dashboardView.showToast(result.errors.join('. '), 'error');
      return;
    }

    const message = this.editingId 
      ? 'Transacción actualizada correctamente' 
      : 'Transacción agregada correctamente';
    
    this.dashboardView.showToast(message, 'success');
    this.closeModal();
    this.applyFilters();
  }

  /**
   * Abre el modal de confirmación de eliminación
   */
  openDeleteModal(id) {
    this.deleteId = id;
    this.transactionView.openDeleteModal();
  }

  /**
   * Cierra el modal de confirmación de eliminación
   */
  closeDeleteModal() {
    this.transactionView.closeDeleteModal();
    this.deleteId = null;
  }

  /**
   * Elimina una transacción
   */
  deleteTransaction() {
    if (!this.deleteId) return;

    const result = this.transactionController.delete(this.deleteId);

    if (!result.success) {
      this.dashboardView.showToast(result.errors.join('. '), 'error');
      return;
    }

    this.dashboardView.showToast('Transacción eliminada correctamente', 'success');
    this.closeDeleteModal();
    this.applyFilters();
  }

  /**
   * Exporta datos a CSV
   */
  exportData() {
    const transactions = this.transactionController.getAll();
    
    if (transactions.length === 0) {
      this.dashboardView.showToast('No hay datos para exportar', 'warning');
      return;
    }

    const csv = this.transactionController.exportToCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `finanzas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.dashboardView.showToast('Datos exportados correctamente', 'success');
  }

  /**
   * Importa datos desde CSV
   */
  importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          this.parseAndImportCSV(event.target.result);
        } catch (error) {
          this.dashboardView.showToast('Error al importar archivo: ' + error.message, 'error');
        }
      };
      reader.readAsText(file);
    };

    input.click();
  }

  /**
   * Parsea e importa un CSV
   */
  parseAndImportCSV(csv) {
    const lines = csv.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      throw new Error('Archivo CSV vacío');
    }

    // Ignorar header
    const dataLines = lines.slice(1);
    const transactions = [];

    dataLines.forEach(line => {
      const values = line.split(',').map(v => v.replace(/^"|"$/g, '').trim());
      
      if (values.length >= 4) {
        const [tipo, categoria, monto, fecha, descripcion] = values;
        transactions.push({
          tipo,
          categoria,
          monto: parseFloat(monto),
          fecha,
          descripcion: descripcion || ''
        });
      }
    });

    const result = this.transactionController.importTransactions(transactions);
    
    this.applyFilters();

    if (result.errors > 0) {
      this.dashboardView.showToast(
        `Importadas ${result.imported} transacciones (${result.errors} errores)`,
        'warning'
      );
    } else {
      this.dashboardView.showToast(
        `${result.imported} transacciones importadas correctamente`,
        'success'
      );
    }
  }

  /**
   * Alterna entre tema claro y oscuro
   */
  toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    this.dashboardView.updateTheme(newTheme);
    Storage.set(CONFIG_KEY, { theme: newTheme });
  }
}