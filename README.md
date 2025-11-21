# 💰 Finance Dashboard

Dashboard interactivo para gestión de finanzas personales. Permite visualizar, trackear y analizar ingresos y gastos de forma simple y segura, sin necesidad de backend.

![Finance Dashboard Preview](./screenshot.png)

## ✨ Características

- ✅ **CRUD Completo**: Agregar, editar y eliminar transacciones
- 📊 **Visualizaciones Interactivas**: Gráficos de líneas y barras con Chart.js
- 📈 **KPIs en Tiempo Real**: Ingresos, gastos, balance y tasa de ahorro
- 🔍 **Filtros Avanzados**: Por tipo, categoría y rango de fechas
- 💾 **Persistencia Local**: Todos los datos se guardan en localStorage
- 📥 **Import/Export**: Exporta e importa datos en formato CSV
- 🌙 **Tema Claro/Oscuro**: Cambia entre temas según tu preferencia
- 📱 **Responsive**: Funciona perfectamente en desktop, tablet y móvil
- ♿ **Accesible**: Cumple con estándares WCAG 2.1 AA

## 🚀 Inicio Rápido

### Opción 1: Descarga directa

1. Descarga todos los archivos del proyecto
2. Abre `index.html` en tu navegador
3. ¡Listo! Ya puedes comenzar a usar la aplicación

### Opción 2: Clonar repositorio

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/finance-dashboard.git

# Navegar al directorio
cd finance-dashboard

# Abrir con Live Server o simplemente abrir index.html
```

## 📁 Estructura del Proyecto

```
finance-dashboard/
├── index.html                  # Página principal
├── styles/
│   ├── reset.css              # Reset de estilos
│   ├── variables.css          # Variables CSS
│   ├── components.css         # Estilos de componentes
│   └── responsive.css         # Media queries
├── js/
│   ├── app.js                 # Punto de entrada
│   ├── models/
│   │   ├── Transaction.js     # Modelo de transacción
│   │   ├── Budget.js          # Modelo de presupuesto
│   │   └── Storage.js         # Capa de persistencia
│   ├── views/
│   │   ├── DashboardView.js   # Vista del dashboard
│   │   ├── TransactionView.js # Vista de transacciones
│   │   └── ChartView.js       # Vista de gráficos
│   ├── controllers/
│   │   ├── AppController.js   # Controlador principal
│   │   └── TransactionController.js
│   └── utils/
│       ├── validation.js      # Validaciones
│       ├── formatting.js      # Formateo de datos
│       └── calculations.js    # Cálculos financieros
└── README.md
```

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Custom Properties, Flexbox, Grid
- **JavaScript ES6+**: Módulos, Clases, Arrow Functions
- **Chart.js 4.x**: Visualización de datos
- **LocalStorage API**: Persistencia de datos

## 📖 Uso

### Agregar una Transacción

1. Click en el botón "➕ Nueva Transacción" o en el botón flotante
2. Selecciona el tipo (Ingreso o Gasto)
3. Elige una categoría
4. Ingresa el monto y la fecha
5. Opcionalmente agrega una descripción
6. Click en "Guardar"

### Filtrar Transacciones

- **Por tipo**: Selecciona "Ingresos" o "Gastos" en el filtro
- **Por categoría**: Elige una categoría específica
- **Por fecha**: Define un rango con "Desde" y "Hasta"
- **Limpiar**: Click en "Limpiar filtros" para resetear

### Exportar/Importar Datos

**Exportar:**
1. Click en el botón 📊 en el header
2. Se descargará un archivo CSV con todas tus transacciones

**Importar:**
1. Click en "📥 Importar"
2. Selecciona un archivo CSV con el formato correcto
3. Las transacciones válidas se agregarán automáticamente

**Formato CSV esperado:**
```csv
Tipo,Categoría,Monto,Fecha,Descripción
gasto,Alimentación,1500.50,2024-01-15,Supermercado
ingreso,Salario,50000.00,2024-01-01,Salario mensual
```

## 🎨 Personalización

### Cambiar Colores

Edita las variables en `styles/variables.css`:

```css
:root {
  --primary: #2563eb;      /* Color principal */
  --success: #10b981;      /* Color de éxito/ingresos */
  --danger: #ef4444;       /* Color de peligro/gastos */
  --warning: #f59e0b;      /* Color de advertencia */
}
```

### Agregar Categorías

Edita el archivo `js/utils/validation.js`:

```javascript
export const CATEGORIES = {
  gasto: [
    'Alimentación',
    'Transporte',
    'Tu Nueva Categoría',  // Agregar aquí
    // ...
  ],
  ingreso: [
    'Salario',
    'Tu Nueva Categoría',  // Agregar aquí
    // ...
  ]
};
```

## 🧪 Testing Manual

### Checklist de Pruebas

- [ ] Crear transacción de ingreso
- [ ] Crear transacción de gasto
- [ ] Editar transacción existente
- [ ] Eliminar transacción con confirmación
- [ ] Filtrar por tipo
- [ ] Filtrar por categoría
- [ ] Filtrar por rango de fechas
- [ ] Exportar a CSV
- [ ] Importar desde CSV
- [ ] Cambiar tema claro/oscuro
- [ ] Verificar persistencia (recargar página)
- [ ] Probar en móvil
- [ ] Probar validaciones (datos inválidos)

## 📊 Arquitectura

Este proyecto sigue el patrón **MVC (Model-View-Controller)** adaptado para frontend:

- **Models**: Lógica de negocio y estructura de datos
- **Views**: Renderizado y manipulación del DOM
- **Controllers**: Coordinación entre Models y Views
- **Utils**: Funciones auxiliares reutilizables

### Flujo de Datos

```
Usuario → View → Controller → Model → Storage
                    ↓
                  View (actualiza UI)
```

## 🔒 Seguridad y Privacidad

- ✅ **Sin backend**: Todos los datos permanecen en tu dispositivo
- ✅ **Sin analytics**: No se envía información a servidores externos
- ✅ **Sanitización**: Los inputs son sanitizados para prevenir XSS
- ✅ **Validación**: Todas las transacciones son validadas antes de guardarse

## ⚠️ Limitaciones

- Los datos se guardan en localStorage (límite de ~5-10MB según navegador)
- Los datos no se sincronizan entre dispositivos
- Si borras los datos del navegador, perderás las transacciones
- **Recomendación**: Exporta backups periódicamente en CSV

## 🚀 Mejoras Futuras

- [ ] Gráfico circular de distribución
- [ ] Sistema de presupuestos con alertas
- [ ] Transacciones recurrentes
- [ ] Exportación a PDF
- [ ] PWA (Progressive Web App)
- [ ] Multi-moneda con conversión
- [ ] Metas de ahorro
- [ ] Estadísticas avanzadas
- [ ] Sincronización en la nube (opcional)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👤 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Portfolio: [tuportfolio.com](https://tuportfolio.com)

## 🙏 Agradecimientos

- [Chart.js](https://www.chartjs.org/) - Librería de gráficos
- [MDN Web Docs](https://developer.mozilla.org/) - Documentación
- Comunidad de desarrolladores

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub

📧 ¿Preguntas o sugerencias? Abre un issue o contáctame directamente