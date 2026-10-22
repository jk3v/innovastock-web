const STORAGE_KEY = 'innovastock_equipos_v1';

const SEED_EQUIPOS = [
  {
    id: 'eq-1',
    codigo: 'INV-2026-001',
    nombre: 'Laptop Dell Latitude 5440 Core i7',
    categoria: 'Laptops',
    serie: 'DL5440-9821A',
    ubicacion: 'Lab Cómputo 302',
    responsable: 'Ing. Carlos Mendoza',
    estado: 'Disponible',
    fechaRegistro: '2026-04-10'
  },
  {
    id: 'eq-2',
    codigo: 'INV-2026-002',
    nombre: 'Proyector Epson PowerLite E20',
    categoria: 'Proyectores',
    serie: 'EP-E20-4410B',
    ubicacion: 'Aula Magna B-201',
    responsable: 'Área Académica',
    estado: 'En Préstamo',
    fechaRegistro: '2026-04-12'
  },
  {
    id: 'eq-3',
    codigo: 'INV-2026-003',
    nombre: 'Switch Cisco Catalyst 2960-X 24P',
    categoria: 'Redes',
    serie: 'CSC-2960X-7732',
    ubicacion: 'Sala de Servidores Piso 3',
    responsable: 'Soporte Redes TI',
    estado: 'Disponible',
    fechaRegistro: '2026-04-14'
  },
  {
    id: 'eq-4',
    codigo: 'INV-2026-004',
    nombre: 'Monitor LG UltraWide 29" IPS',
    categoria: 'Monitores',
    serie: 'LG29WP-1109C',
    ubicacion: 'Oficina Desarrollo TI',
    responsable: 'Soporte TI',
    estado: 'En Mantenimiento',
    fechaRegistro: '2026-04-15'
  }
];

let equipos = [];

function cargarInventario() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (guardado) {
      equipos = JSON.parse(guardado);
    } else {
      equipos = [...SEED_EQUIPOS];
      guardarInventario();
    }
  } catch (e) {
    equipos = [...SEED_EQUIPOS];
  }
}

function guardarInventario() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(equipos));
  } catch (e) {
    // Fallback en memoria si localStorage está restringido
  }
}

function mostrarNotificacion(texto, tipo = 'success') {
  const box = document.getElementById('formToast');
  if (!box) return;
  box.textContent = texto;
  box.className = 'toast-msg show ' + (tipo === 'error' ? 'toast-error' : 'toast-success');
  setTimeout(() => {
    box.className = 'toast-msg';
  }, 3500);
}

function obtenerClaseEstado(estado) {
  if (estado === 'Disponible') return 'status-disponible';
  if (estado === 'En Préstamo') return 'status-prestamo';
  if (estado === 'En Mantenimiento') return 'status-mantenimiento';
  return 'status-baja';
}

function actualizarIndicadores() {
  const total = equipos.length;
  const disponibles = equipos.filter(e => e.estado === 'Disponible').length;
  const prestamo = equipos.filter(e => e.estado === 'En Préstamo').length;
  const mantenimiento = equipos.filter(e => e.estado === 'En Mantenimiento').length;

  document.getElementById('kpiTotal').textContent = total;
  document.getElementById('kpiDisponibles').textContent = disponibles;
  document.getElementById('kpiPrestamo').textContent = prestamo;
  document.getElementById('kpiMantenimiento').textContent = mantenimiento;
}

function renderizarTabla() {
  const tbody = document.getElementById('tablaEquiposBody');
  const textoBusqueda = document.getElementById('inputBuscar').value.trim().toLowerCase();
  const filtroCat = document.getElementById('selectFiltroCategoria').value;
  const filtroEst = document.getElementById('selectFiltroEstado').value;

  const filtrados = equipos.filter(item => {
    const coincideTexto =
      item.codigo.toLowerCase().includes(textoBusqueda) ||
      item.nombre.toLowerCase().includes(textoBusqueda) ||
      item.responsable.toLowerCase().includes(textoBusqueda) ||
      item.ubicacion.toLowerCase().includes(textoBusqueda);
    const coincideCat = filtroCat === 'Todas' || item.categoria === filtroCat;
    const coincideEst = filtroEst === 'Todos' || item.estado === filtroEst;
    return coincideTexto && coincideCat && coincideEst;
  });

  tbody.innerHTML = '';

  if (filtrados.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="7" style="text-align:center; padding: 1.5rem; color:#64748b;">No se encontraron equipos con los filtros seleccionados.</td>';
    tbody.appendChild(tr);
    actualizarIndicadores();
    return;
  }

  filtrados.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.codigo}</strong><br><small style="color:#64748b">${item.serie}</small></td>
      <td>${item.nombre}</td>
      <td>${item.categoria}</td>
      <td>${item.ubicacion}</td>
      <td>${item.responsable}</td>
      <td><span class="status-badge ${obtenerClaseEstado(item.estado)}">${item.estado}</span></td>
      <td>
        <div style="display:flex; gap:0.35rem;">
          <button type="button" class="btn btn-secondary btn-sm btn-rotar" data-id="${item.id}" title="Cambiar Estado">Estado ↻</button>
          <button type="button" class="btn btn-danger btn-sm btn-eliminar" data-id="${item.id}" title="Eliminar equipo">✕</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.btn-rotar').forEach(btn => {
    btn.addEventListener('click', () => rotarEstadoEquipo(btn.getAttribute('data-id')));
  });

  tbody.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', () => eliminarEquipo(btn.getAttribute('data-id')));
  });

  actualizarIndicadores();
}

function registrarEquipo(evento) {
  evento.preventDefault();
  const codigo = document.getElementById('codigo').value.trim().toUpperCase();
  const nombre = document.getElementById('nombre').value.trim();
  const categoria = document.getElementById('categoria').value;
  const serie = document.getElementById('serie').value.trim().toUpperCase();
  const ubicacion = document.getElementById('ubicacion').value.trim();
  const responsable = document.getElementById('responsable').value.trim();
  const estado = document.getElementById('estado').value;

  if (!codigo || !nombre || !serie || !ubicacion || !responsable) {
    mostrarNotificacion('Por favor, completa todos los campos obligatorios.', 'error');
    return;
  }

  const existeCodigo = equipos.some(e => e.codigo.toUpperCase() === codigo);
  if (existeCodigo) {
    mostrarNotificacion(`El código patrimonial ${codigo} ya existe en el inventario.`, 'error');
    return;
  }

  const nuevoEquipo = {
    id: 'eq-' + Date.now(),
    codigo,
    nombre,
    categoria,
    serie,
    ubicacion,
    responsable,
    estado,
    fechaRegistro: new Date().toISOString().slice(0, 10)
  };

  equipos.unshift(nuevoEquipo);
  guardarInventario();
  renderizarTabla();
  document.getElementById('formEquipo').reset();
  mostrarNotificacion(`Equipo ${codigo} registrado correctamente.`);
}

function rotarEstadoEquipo(id) {
  const ordenEstados = ['Disponible', 'En Préstamo', 'En Mantenimiento', 'De Baja'];
  const idx = equipos.findIndex(e => e.id === id);
  if (idx === -1) return;
  const actual = equipos[idx].estado;
  const siguiente = ordenEstados[(ordenEstados.indexOf(actual) + 1) % ordenEstados.length];
  equipos[idx].estado = siguiente;
  guardarInventario();
  renderizarTabla();
  mostrarNotificacion(`Estado de ${equipos[idx].codigo} actualizado a "${siguiente}".`);
}

function eliminarEquipo(id) {
  const equipo = equipos.find(e => e.id === id);
  if (!equipo) return;
  equipos = equipos.filter(e => e.id !== id);
  guardarInventario();
  renderizarTabla();
  mostrarNotificacion(`Equipo ${equipo.codigo} eliminado del registro.`);
}

function exportarInventarioJSON() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(equipos, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', 'inventario_innovastock.json');
  document.body.appendChild(link);
  link.click();
  link.remove();
  mostrarNotificacion('Archivo inventario_innovastock.json exportado.');
}

function restaurarDatosDemo() {
  equipos = [...SEED_EQUIPOS];
  guardarInventario();
  renderizarTabla();
  mostrarNotificacion('Datos de demostración restaurados.');
}

document.addEventListener('DOMContentLoaded', () => {
  cargarInventario();
  renderizarTabla();

  document.getElementById('formEquipo').addEventListener('submit', registrarEquipo);
  document.getElementById('inputBuscar').addEventListener('input', renderizarTabla);
  document.getElementById('selectFiltroCategoria').addEventListener('change', renderizarTabla);
  document.getElementById('selectFiltroEstado').addEventListener('change', renderizarTabla);
  document.getElementById('btnExportarJSON').addEventListener('click', exportarInventarioJSON);
  document.getElementById('btnRestaurarDemo').addEventListener('click', restaurarDatosDemo);
});