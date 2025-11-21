/**
 * Budget.js
 * Modelo para gestión de presupuestos (implementación futura)
 */

export const Budget = {
  /**
   * Crea un nuevo presupuesto
   * @param {Object} data - Datos del presupuesto
   * @returns {Object}
   */
  create(data) {
    return {
      id: data.id || `budget_${Date.now()}`,
      periodo: data.periodo || 'mensual',
      montoTotal: parseFloat(data.montoTotal) || 0,
      categorias: data.categorias || {},
      alertas: {
        umbral80: data.alertas?.umbral80 ?? true,
        umbral100: data.alertas?.umbral100 ?? true
      },
      createdAt: data.createdAt || Date.now(),
      updatedAt: Date.now()
    };
  },

  /**
   * Calcula el porcentaje usado del presupuesto
   * @param {number} gastado - Monto gastado
   * @param {number} presupuesto - Monto presupuestado
   * @returns {number}
   */
  calculateUsagePercentage(gastado, presupuesto) {
    if (presupuesto === 0) return 0;
    return (gastado / presupuesto) * 100;
  },

  /**
   * Verifica si se debe mostrar una alerta
   * @param {number} porcentaje - Porcentaje usado
   * @param {Object} alertas - Configuración de alertas
   * @returns {string|null} - Tipo de alerta o null
   */
  checkAlert(porcentaje, alertas) {
    if (porcentaje >= 100 && alertas.umbral100) {
      return 'danger';
    }
    if (porcentaje >= 80 && alertas.umbral80) {
      return 'warning';
    }
    return null;
  },

  /**
   * Calcula días restantes del mes
   * @returns {number}
   */
  getDaysRemainingInMonth() {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return lastDay.getDate() - today.getDate();
  }
};