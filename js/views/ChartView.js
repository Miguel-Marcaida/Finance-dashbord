/**
 * ChartView.js
 * Manejo de visualizaciones con Chart.js
 */

import { Calculations } from '../utils/calculations.js';
import { Formatter } from '../utils/formatting.js';

export class ChartView {
  constructor() {
    this.charts = {
      line: null,
      bar: null
    };
  }

  /**
   * Renderiza el gráfico de líneas (evolución temporal)
   * @param {Array} transactions - Transacciones filtradas
   */
  renderLineChart(transactions) {
    const monthlyData = Calculations.getMonthlyTrend(transactions);
    const sortedMonths = Object.keys(monthlyData).sort();
    
    const labels = sortedMonths.map(m => {
      const [year, month] = m.split('-');
      const date = new Date(year, month - 1);
      return date.toLocaleDateString('es-AR', { month: 'short', year: 'numeric' });
    });

    const incomeData = sortedMonths.map(m => monthlyData[m].ingresos);
    const expenseData = sortedMonths.map(m => monthlyData[m].gastos);
    const balanceData = sortedMonths.map(m => monthlyData[m].balance);

    const ctx = document.getElementById('lineChart');
    
    // Destruir gráfico anterior si existe
    if (this.charts.line) {
      this.charts.line.destroy();
    }

    this.charts.line = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Ingresos',
            data: incomeData,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Gastos',
            data: expenseData,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Balance',
            data: balanceData,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.dataset.label}: ${Formatter.currency(context.parsed.y)}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => Formatter.currency(value)
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  /**
   * Renderiza el gráfico de barras (gastos por categoría)
   * @param {Array} transactions - Transacciones filtradas
   */
  renderBarChart(transactions) {
    const expensesByCategory = Calculations.getExpensesByCategory(transactions);
    const sortedCategories = Object.entries(expensesByCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Top 10 categorías

    const labels = sortedCategories.map(([cat]) => cat);
    const data = sortedCategories.map(([, amount]) => amount);

    const ctx = document.getElementById('barChart');
    
    // Destruir gráfico anterior si existe
    if (this.charts.bar) {
      this.charts.bar.destroy();
    }

    // Colores para las barras
    const colors = [
      '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6',
      '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#84cc16'
    ];

    this.charts.bar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Gastos',
          data,
          backgroundColor: colors.slice(0, data.length),
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: context => Formatter.currency(context.parsed.y)
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => Formatter.currency(value)
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  /**
   * Renderiza todos los gráficos
   * @param {Array} transactions
   */
  renderAll(transactions) {
    this.renderLineChart(transactions);
    this.renderBarChart(transactions);
  }

  /**
   * Destruye todos los gráficos (útil para cleanup)
   */
  destroyAll() {
    if (this.charts.line) {
      this.charts.line.destroy();
      this.charts.line = null;
    }
    if (this.charts.bar) {
      this.charts.bar.destroy();
      this.charts.bar = null;
    }
  }
}