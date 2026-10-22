# InnovaStock Web — Sistema de Control de Inventario y Auditoría de Equipos TI (v2.0.0)

Aplicación web funcional desarrollada para el Área de Soporte e Infraestructura TI de **InnovaTech Solutions S.A.C.** para automatizar el registro, edición, control de estados, exportación y auditoría de movimientos de activos tecnológicos.

## 1. Evolución Funcional en el Avance 2 (APF2 — Release v2.0.0)
- **Módulo Base (APF1):** Registro validado de equipos, catálogo dinámico con búsqueda/filtros y panel de indicadores KPI con exportación JSON.
- **Nuevas Funcionalidades Incorporadas en APF2:**
  1. **Bitácora de Movimientos y Auditoría (`feature/historial-movimientos`):** Registro automático con marca de tiempo de cada alta, edición, rotación de estado, eliminación y exportación realizada en el inventario.
  2. **Edición de Equipos y Exportación CSV (`feature/edicion-equipos-csv`):** Modo de edición directa desde la tabla para actualizar datos de cualquier activo existente y descarga de reportes compatibles con Microsoft Excel en formato `.csv`.

## 2. Flujo Colaborativo y Gestión del Proyecto (APF2)
- **Gestión de Actividades y Proyectos:** Tablero Kanban en **GitHub Projects** con estados *Todo (Pendiente)*, *In Progress (En Proceso)* y *Done (Finalizado)*, hitos (*Milestones*) y tareas vinculadas a ramas.
- **Integración mediante Pull Requests:** Revisión de código y discusión técnica antes de fusionar cada rama `feature/*` hacia `main`.
- **Versión Publicada:** Release oficial etiquetada como **`v2.0.0`** en GitHub Releases.

## 3. Estructura del Repositorio
```text
innovastock-web/
├── index.html        # Interfaz principal (Dashboard KPI, Formulario Registro/Edición, Tabla y Bitácora)
├── css/
│   └── styles.css    # Estilos modernos responsivos y estilos de bitácora
├── js/
│   └── app.js        # Lógica CRUD con edición, bitácora de auditoría y exportación CSV/JSON
├── README.md         # Documentación técnica actualizada para APF2
└── .gitignore        # Exclusión de archivos temporales
```