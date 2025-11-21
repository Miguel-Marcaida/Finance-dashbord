/**
 * DashboardView.js
 * Manejo de la vista del dashboard y KPIs
 */

import { Calculations } from '../utils/calculations.js';
import { Formatter } from '../utils/formatting.js';

export class DashboardView {
  /**
   * Renderiza los KPIs principales
   * @param {Array} transactions - Transacciones filtradas
   */
  renderKPIs(transactions) {
    const income = Calculations.getTotalIncome(transactions);
    const expenses = Calculations.getTotalExpenses(transactions);
    const balance = Calculations.getNetBalance(transactions);
    const savingsRate = Calculations.getSavingsRate(transactions);

    // Total de ingresos
    const incomeEl = document.getElementById('totalIncome');
    incomeEl.textContent = Formatter.currency(income);

    // Total de gastos
    const expensesEl = document.getElementById('totalExpenses');
    expensesEl.textContent = Formatter.currency(expenses);

    // Balance neto
    const balanceEl = document.getElementById('netBalance');
    balanceEl.textContent = Formatter.currency(balance);
    balanceEl.className = 'kpi-value';
    if (balance > 0) {
      balanceEl.classList.add('positive');
    } else if (balance < 0) {
      balanceEl.classList.add('negative');
    }

    // Tasa de ahorro
    const savingsEl = document.getElementById('savingsRate');
    savingsEl.textContent = Formatter.percentage(savingsRate);
    savingsEl.className = 'kpi-value';
    if (savingsRate > 20) {
      savingsEl.classList.add('positive');
    } else if (savingsRate < 0) {
      savingsEl.classList.add('negative');
    }
  }

  /**
   * Actualiza el tema visual
   * @param {string} theme - 'light' o 'dark'
   */
  updateTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeBtn = document.getElementById('themeToggle');
    themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  /**
   * Muestra un toast/notificación
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - success | error | warning
   */
  showToast(message, type = 'success') {
    // Remover toasts anteriores
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);

    // Auto-remover después de 3 segundos
    setTimeout(() => {
      toast.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  /**
   * Muestra un indicador de carga
   * @param {boolean} show
   */
  showLoading(show) {
    let loader = document.getElementById('loader');
    
    if (show) {
      if (!loader) {
        loader = document.createElement('div');
        loader.id = 'loader';
        loader.innerHTML = `
          <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          ">
            <div style="
              background: white;
              padding: 2rem;
              border-radius: 0.5rem;
              font-weight: 500;
            ">
              Cargando...
            </div>
          </div>
        `;
        document.body.appendChild(loader);
      }
    } else {
      if (loader) {
        loader.remove();
      }
    }
  }
}