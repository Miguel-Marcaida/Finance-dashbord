/**
 * calculations.js
 * Funciones de cálculo para métricas financieras
 */

export const Calculations = {
  /**
   * Calcula el total de ingresos
   * @param {Array} transactions - Array de transacciones
   * @returns {number}
   */
  getTotalIncome(transactions) {
    return transactions
      .filter(t => t.tipo === 'ingreso')
      .reduce((sum, t) => sum + t.monto, 0);
  },

  /**
   * Calcula el total de gastos
   * @param {Array} transactions - Array de transacciones
   * @returns {number}
   */
  getTotalExpenses(transactions) {
    return transactions
      .filter(t => t.tipo === 'gasto')
      .reduce((sum, t) => sum + t.monto, 0);
  },

  /**
   * Calcula el balance neto (ingresos - gastos)
   * @param {Array} transactions
   * @returns {number}
   */
  getNetBalance(transactions) {
    return this.getTotalIncome(transactions) - this.getTotalExpenses(transactions);
  },

  /**
   * Calcula la tasa de ahorro como porcentaje de ingresos
   * @param {Array} transactions
   * @returns {number}
   */
  getSavingsRate(transactions) {
    const income = this.getTotalIncome(transactions);
    if (income === 0) return 0;
    const balance = this.getNetBalance(transactions);
    return (balance / income) * 100;
  },

  /**
   * Agrupa gastos por categoría
   * @param {Array} transactions
   * @returns {Object} - { categoria: monto }
   */
  getExpensesByCategory(transactions) {
    const expenses = transactions.filter(t => t.tipo === 'gasto');
    const byCategory = {};
    
    expenses.forEach(t => {
      byCategory[t.categoria] = (byCategory[t.categoria] || 0) + t.monto;
    });
    
    return byCategory;
  },

  /**
   * Agrupa ingresos por categoría
   * @param {Array} transactions
   * @returns {Object}
   */
  getIncomeByCategory(transactions) {
    const income = transactions.filter(t => t.tipo === 'ingreso');
    const byCategory = {};
    
    income.forEach(t => {
      byCategory[t.categoria] = (byCategory[t.categoria] || 0) + t.monto;
    });
    
    return byCategory;
  },

  /**
   * Calcula tendencia mensual (ingresos, gastos, balance por mes)
   * @param {Array} transactions
   * @returns {Object} - { 'YYYY-MM': { ingresos, gastos, balance } }
   */
  getMonthlyTrend(transactions) {
    const monthlyData = {};
    
    transactions.forEach(t => {
      const date = new Date(t.fecha + 'T00:00:00');
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { ingresos: 0, gastos: 0, balance: 0 };
      }
      
      if (t.tipo === 'ingreso') {
        monthlyData[monthKey].ingresos += t.monto;
      } else {
        monthlyData[monthKey].gastos += t.monto;
      }
    });
    
    // Calcular balance para cada mes
    Object.keys(monthlyData).forEach(month => {
      monthlyData[month].balance = 
        monthlyData[month].ingresos - monthlyData[month].gastos;
    });
    
    return monthlyData;
  },

  /**
   * Calcula el promedio de gastos diarios
   * @param {Array} transactions
   * @returns {number}
   */
  getAverageDailyExpense(transactions) {
    if (transactions.length === 0) return 0;
    
    const expenses = transactions.filter(t => t.tipo === 'gasto');
    if (expenses.length === 0) return 0;
    
    const total = this.getTotalExpenses(transactions);
    
    // Calcular días únicos con transacciones
    const uniqueDates = new Set(expenses.map(t => t.fecha));
    const days = uniqueDates.size;
    
    return days > 0 ? total / days : 0;
  },

  /**
   * Encuentra la categoría con mayor gasto
   * @param {Array} transactions
   * @returns {Object} - { categoria, monto }
   */
  getTopExpenseCategory(transactions) {
    const byCategory = this.getExpensesByCategory(transactions);
    
    let topCategory = null;
    let maxAmount = 0;
    
    for (const [categoria, monto] of Object.entries(byCategory)) {
      if (monto > maxAmount) {
        maxAmount = monto;
        topCategory = categoria;
      }
    }
    
    return topCategory ? { categoria: topCategory, monto: maxAmount } : null;
  },

  /**
   * Calcula estadísticas básicas de un array de números
   * @param {Array<number>} numbers
   * @returns {Object} - { min, max, avg, median }
   */
  getStats(numbers) {
    if (numbers.length === 0) {
      return { min: 0, max: 0, avg: 0, median: 0 };
    }
    
    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = sum / numbers.length;
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
    
    return {
      min: sorted[0],
      max: sorted[sorted.length - 1],
      avg,
      median
    };
  },

  /**
   * Compara dos periodos (mes actual vs mes anterior)
   * @param {Array} currentTransactions
   * @param {Array} previousTransactions
   * @returns {Object} - Comparación de métricas
   */
  comparePeriods(currentTransactions, previousTransactions) {
    const currentIncome = this.getTotalIncome(currentTransactions);
    const currentExpenses = this.getTotalExpenses(currentTransactions);
    const previousIncome = this.getTotalIncome(previousTransactions);
    const previousExpenses = this.getTotalExpenses(previousTransactions);
    
    const incomeChange = previousIncome > 0
      ? ((currentIncome - previousIncome) / previousIncome) * 100
      : 0;
    
    const expenseChange = previousExpenses > 0
      ? ((currentExpenses - previousExpenses) / previousExpenses) * 100
      : 0;
    
    return {
      income: {
        current: currentIncome,
        previous: previousIncome,
        change: incomeChange
      },
      expenses: {
        current: currentExpenses,
        previous: previousExpenses,
        change: expenseChange
      }
    };
  }
};