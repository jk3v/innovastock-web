# InnovaStock Web — Sistema de Control de Inventario de Equipos TI

Aplicación web funcional desarrollada para el Área de Soporte e Infraestructura TI de **InnovaTech Solutions S.A.C.** para automatizar el registro, control de estados (Disponible, En Préstamo, En Mantenimiento, De Baja), búsqueda y reportes de activos tecnológicos.

## 1. Problema o Necesidad
El Área de Soporte e Infraestructura TI gestiona más de 180 activos tecnológicos mediante hojas de cálculo desconectadas y formatos en papel, ocasionando duplicidad de códigos patrimoniales, demoras de hasta 30 minutos en auditorías y falta de trazabilidad en la custodia de los equipos.

## 2. Alcance del Proyecto (Avance de Proyecto Final 1)
- **Funcionalidad 1 (feature/registro-equipos):** Formulario de alta de activos con validación estricta contra códigos duplicados y persistencia en LocalStorage.
- **Funcionalidad 2 (feature/filtros-estados):** Búsqueda reactiva por código/nombre/responsable, filtros por categoría y estado, y rotación rápida del ciclo de vida del activo.
- **Funcionalidad 3 (feature/dashboard-reportes):** Panel de 4 tarjetas de indicadores en tiempo real y descarga de respaldo del inventario en formato JSON.

## 3. Estructura del Repositorio
```text
innovastock-web/
├── index.html        # Interfaz de usuario (Dashboard KPI, Formulario y Tabla)
├── css/
│   └── styles.css    # Estilos modernos responsivos y distintivos por estado
├── js/
│   └── app.js        # Lógica CRUD, validaciones, filtros y persistencia LocalStorage
├── README.md         # Documentación técnica del proyecto
└── .gitignore        # Exclusión de archivos temporales
```

## 4. Instrucciones de Ejecución
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO_GITHUB/innovastock-web.git
   cd innovastock-web
   ```
2. Abrir el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Mozilla Firefox) o mediante **Live Server** en Visual Studio Code.
