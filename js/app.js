/**
 * app.js
 * Punto de entrada principal de la aplicación
 */

import { AppController } from './controllers/AppController.js';

// Instancia global de la aplicación
window.app = null;

/**
 * Inicializa la aplicación cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Crear instancia del controlador principal
    window.app = new AppController();
    
    // Inicializar la aplicación
    window.app.init();
    
    console.log('✅ Finance Dashboard inicializado correctamente');
  } catch (error) {
    console.error('❌ Error al inicializar la aplicación:', error);
    
    // Mostrar mensaje de error al usuario
    document.body.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: #f3f4f6;
        font-family: system-ui, sans-serif;
      ">
        <div style="
          background: white;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          max-width: 500px;
          text-align: center;
        ">
          <h1 style="color: #ef4444; margin-bottom: 1rem;">Error al cargar la aplicación</h1>
          <p style="color: #6b7280; margin-bottom: 1rem;">
            Ocurrió un error al inicializar Finance Dashboard. Por favor, recarga la página.
          </p>
          <button 
            onclick="location.reload()"
            style="
              background: #2563eb;
              color: white;
              padding: 0.5rem 1rem;
              border: none;
              border-radius: 0.375rem;
              cursor: pointer;
              font-weight: 500;
            "
          >
            Recargar página
          </button>
          <details style="margin-top: 1rem; text-align: left;">
            <summary style="cursor: pointer; color: #6b7280;">
              Ver detalles del error
            </summary>
            <pre style="
              background: #f3f4f6;
              padding: 1rem;
              border-radius: 0.375rem;
              overflow-x: auto;
              font-size: 0.875rem;
              margin-top: 0.5rem;
            ">${error.message}</pre>
          </details>
        </div>
      </div>
    `;
  }
});

/**
 * Manejo de errores no capturados
 */
window.addEventListener('error', (event) => {
  console.error('Error no capturado:', event.error);
});

/**
 * Manejo de promesas rechazadas no capturadas
 */
window.addEventListener('unhandledrejection', (event) => {
  console.error('Promesa rechazada no capturada:', event.reason);
});