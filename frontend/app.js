// Sistema Académico — frontend (vanilla JS, sin dependencias).
// Como este archivo se sirve desde la misma API (FastAPI + StaticFiles),
// las rutas son relativas: no hay problema de CORS.

const URL_BASE_API = "/api/v1";

const vistaLogin = document.getElementById("vista-login");
const vistaDashboard = document.getElementById("vista-dashboard");


//menu plegable
const layoutDashboard = document.getElementById("layout-dashboard");
const botonMenu = document.getElementById("boton-menu");

const formularioLogin = document.getElementById("formulario-login");
const campoUsuario = document.getElementById("campo-usuario");
const campoClave = document.getElementById("campo-clave");
const botonEntrar = document.getElementById("boton-entrar");
const mensajeLogin = document.getElementById("mensaje-login");

const tituloBienvenida = document.getElementById("titulo-bienvenida");
const chipUsuario = document.getElementById("chip-usuario");
const botonActualizar = document.getElementById("boton-actualizar");
const botonSalir = document.getElementById("boton-salir");
const filaTarjetas = document.getElementById("fila-tarjetas");
const textoPeriodo = document.getElementById("texto-periodo");
const campoBuscar = document.getElementById("campo-buscar");
const cuerpoTablaEstudiantes = document.getElementById("cuerpo-tabla-estudiantes");
const textoSinResultados = document.getElementById("texto-sin-resultados");

const tituloFormulario = document.getElementById("titulo-formulario");
const formularioEstudiante = document.getElementById("formulario-estudiante");
const campoEstudianteId = document.getElementById("estudiante-id");
const campoNombres = document.getElementById("estudiante-nombres");
const campoApellidos = document.getElementById("estudiante-apellidos");
const campoCuenta = document.getElementById("estudiante-cuenta");
const campoCorreo = document.getElementById("estudiante-correo");
const campoTelefono = document.getElementById("estudiante-telefono");
const campoNacimiento = document.getElementById("estudiante-nacimiento");
const campoCarrera = document.getElementById("estudiante-carrera");
const campoEstado = document.getElementById("estudiante-estado");
const botonGuardarEstudiante = document.getElementById("boton-guardar-estudiante");
const botonCancelarEdicion = document.getElementById("boton-cancelar-edicion");
const mensajeFormulario = document.getElementById("mensaje-formulario");



//referencias a carreras
const formularioCarrera = document.getElementById("formulario-carrera");
const campoCarreraId = document.getElementById("carrera-id");
const campoCarreraCodigo = document.getElementById("carrera-codigo");
const campoCarreraNombre = document.getElementById("carrera-nombre");
const campoCarreraDuracion = document.getElementById("carrera-duracion");
const campoCarreraActiva = document.getElementById("carrera-activa");
const botonGuardarCarrera = document.getElementById("boton-guardar-carrera");
const mensajeCarrera = document.getElementById("mensaje-carrera");
const cuerpoTablaCarreras = document.getElementById("cuerpo-tabla-carreras");

// referencias a docentes
const formularioDocente = document.getElementById("formulario-docente");
const campoDocenteId = document.getElementById("docente-id");
const cuerpoTablaDocentes = document.getElementById("cuerpo-tabla-docentes");
const mensajeDocente = document.getElementById("mensaje-docente");
const botonGuardarDocente = document.getElementById("boton-guardar-docente");



//referencias a periodos
const formularioPeriodo = document.getElementById("formulario-periodo");
const campoPeriodoId = document.getElementById("periodo-id");
const campoPeriodoAnio = document.getElementById("periodo-anio");
const campoPeriodoNumero = document.getElementById("periodo-numero");
const campoPeriodoInicio = document.getElementById("periodo-fecha-inicio");
const campoPeriodoFin = document.getElementById("periodo-fecha-fin");
const campoPeriodoActivo = document.getElementById("periodo-activo");
const botonGuardarPeriodo = document.getElementById("boton-guardar-periodo");
const mensajePeriodo = document.getElementById("mensaje-periodo");
const cuerpoTablaPeriodos = document.getElementById("cuerpo-tabla-periodos");


//referencias a aulas
const formularioAula = document.getElementById("formulario-aula");
const campoAulaId = document.getElementById("aula-id");
const campoAulaCodigo = document.getElementById("aula-codigo");
const campoAulaEdificio = document.getElementById("aula-edificio");
const campoAulaCapacidad = document.getElementById("aula-capacidad");
const campoAulaActiva = document.getElementById("aula-activa");
const botonGuardarAula = document.getElementById("boton-guardar-aula");
const mensajeAula = document.getElementById("mensaje-aula");
const cuerpoTablaAulas = document.getElementById("cuerpo-tabla-aulas");




//referencias a asignaturas
const formularioAsignatura = document.getElementById("formulario-asignatura");
const campoAsignaturaId = document.getElementById("asignatura-id");
const campoAsignaturaCodigo = document.getElementById("asignatura-codigo");
const campoAsignaturaNombre = document.getElementById("asignatura-nombre");
const campoAsignaturaUnidades = document.getElementById("asignatura-unidades");
const campoAsignaturaCarrera = document.getElementById("asignatura-carrera");
const campoAsignaturaRequisito = document.getElementById("asignatura-requisito");
const campoAsignaturaActiva = document.getElementById("asignatura-activa");
const botonGuardarAsignatura = document.getElementById("boton-guardar-asignatura");
const mensajeAsignatura = document.getElementById("mensaje-asignatura");
const cuerpoTablaAsignaturas = document.getElementById("cuerpo-tabla-asignaturas");


//referencias a secciones
const formularioSeccion = document.getElementById("formulario-seccion");
const campoSeccionId = document.getElementById("seccion-id");
const campoSeccionCodigo = document.getElementById("seccion-codigo");
const campoSeccionAsignatura = document.getElementById("seccion-asignatura");
const campoSeccionDocente = document.getElementById("seccion-docente");
const campoSeccionPeriodo = document.getElementById("seccion-periodo");
const campoSeccionAula = document.getElementById("seccion-aula");
const campoSeccionDias = document.getElementById("seccion-dias");
const campoSeccionInicio = document.getElementById("seccion-hora-inicio");
const campoSeccionFin = document.getElementById("seccion-hora-fin");
const campoSeccionCupo = document.getElementById("seccion-cupo");
const campoSeccionEstado = document.getElementById("seccion-estado");
const botonGuardarSeccion = document.getElementById("boton-guardar-seccion");
const mensajeSeccion = document.getElementById("mensaje-seccion");
const cuerpoTablaSecciones = document.getElementById("cuerpo-tabla-secciones");


//referencias a matriculas
const formularioMatricula = document.getElementById("formulario-matricula");
const campoMatriculaEstudiante = document.getElementById("matricula-estudiante");
const campoMatriculaSeccion = document.getElementById("matricula-seccion");
const botonGuardarMatricula = document.getElementById("boton-guardar-matricula");
const mensajeMatricula = document.getElementById("mensaje-matricula");
const cuerpoTablaMatriculas = document.getElementById("cuerpo-tabla-matriculas");


//referencias a calificaciones
const formularioCalificacion = document.getElementById("formulario-calificacion");
const campoCalificacionMatricula =
  document.getElementById("calificacion-matricula");
const campoParcial1 = document.getElementById("calificacion-parcial-1");
const campoParcial2 = document.getElementById("calificacion-parcial-2");
const campoParcial3 = document.getElementById("calificacion-parcial-3");
const campoObservacion = document.getElementById("calificacion-observacion");
const botonGuardarCalificacion =
  document.getElementById("boton-guardar-calificacion");
const mensajeCalificacion = document.getElementById("mensaje-calificacion");
const cuerpoTablaCalificaciones =
  document.getElementById("cuerpo-tabla-calificaciones");




  //referencias a reportes
  const selectorReporteEstudiante =
  document.getElementById("reporte-estudiante");
const selectorReporteSeccion =
  document.getElementById("reporte-seccion");
const selectorReporteDocente =
  document.getElementById("reporte-docente");
const selectorReportePeriodo =
  document.getElementById("reporte-periodo");
const mensajeReportes = document.getElementById("mensaje-reportes");
const resultadoReporte = document.getElementById("resultado-reporte");




//manejador botón menú plegable
botonMenu.addEventListener("click", () => {
  const plegado = layoutDashboard.classList.toggle("menu-plegado");
  botonMenu.setAttribute("aria-expanded", String(!plegado));
});

let usuarioActual = null;
let temporizadorBusqueda = null;






//conectar botones
function mostrarVistaModulo(destino) {
  const vistaSeleccionada = document.getElementById(`vista-${destino}`);

  if (!vistaSeleccionada) {
    console.error(`No existe la vista: vista-${destino}`);
    return;
  }

  document.querySelectorAll(".vista-modulo").forEach((vista) => {
    vista.classList.add("oculto");
  });

  vistaSeleccionada.classList.remove("oculto");

  document.querySelectorAll(".menu-lateral [data-destino]").forEach((boton) => {
    boton.classList.toggle("activo", boton.dataset.destino === destino);
  });
}

document.querySelectorAll(".menu-lateral [data-destino]").forEach((boton) => {
  boton.addEventListener("click", () => {
    mostrarVistaModulo(boton.dataset.destino);
  });
});



const TARJETAS_KPI = [
  { clave: "estudiantes_activos", etiqueta: "Estudiantes activos" },
  { clave: "docentes_activos", etiqueta: "Docentes activos" },
  { clave: "carreras_activas", etiqueta: "Carreras activas" },
  { clave: "asignaturas_activas", etiqueta: "Asignaturas activas" },
  { clave: "secciones_abiertas", etiqueta: "Secciones abiertas" },
  { clave: "matriculas_activas", etiqueta: "Matrículas activas" },
];

// ------------------------- Autenticación -------------------------

formularioLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  mensajeLogin.textContent = "";
  botonEntrar.disabled = true;
  botonEntrar.textContent = "Entrando...";

  try {
    const respuesta = await fetch(`${URL_BASE_API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario: campoUsuario.value.trim(),
        clave: campoClave.value,
      }),
    });

    if (!respuesta.ok) {
      mensajeLogin.textContent =
        respuesta.status === 401
          ? "Usuario o contraseña incorrectos."
          : "No se pudo iniciar sesión.";
      return;
    }

    usuarioActual = await respuesta.json();
    mostrarDashboard();
  } catch (error) {
    mensajeLogin.textContent =
      "No se pudo conectar con la API. ¿Está corriendo uvicorn?";
  } finally {
    botonEntrar.disabled = false;
    botonEntrar.textContent = "Iniciar sesión";
  }
});

botonSalir.addEventListener("click", () => {
  usuarioActual = null;
  formularioLogin.reset();
  vistaDashboard.classList.add("oculto");
  vistaLogin.classList.remove("oculto");
});

// ------------------------- Dashboard -------------------------

function mostrarDashboard() {
  vistaLogin.classList.add("oculto");
  vistaDashboard.classList.remove("oculto");
  mostrarVistaModulo("inicio");

  tituloBienvenida.textContent = `Hola, ${usuarioActual.nombre_completo}`;
  chipUsuario.textContent = `Rol: ${usuarioActual.rol}`;

  construirTarjetasVacias();
  cargarDashboard();
  cargarCarreras();
  cargarEstudiantes();
  cargarDocentes();
  cargarPeriodos();
  cargarAulas();
  cargarAsignaturas();
  cargarSecciones();
  cargarMatriculas();
  cargarCalificaciones();
  cargarOpcionesReportes();
  cargarCarrerasTabla();
}

function construirTarjetasVacias() {
  filaTarjetas.innerHTML = "";
  TARJETAS_KPI.forEach(({ clave, etiqueta }) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-kpi";
    tarjeta.innerHTML = `
      <div class="valor" data-kpi="${clave}">—</div>
      <div class="etiqueta-kpi">${etiqueta}</div>
    `;
    filaTarjetas.appendChild(tarjeta);
  });
}

async function cargarDashboard() {
  try {
    const respuesta = await fetch(`${URL_BASE_API}/reportes/dashboard`);
    if (!respuesta.ok) throw new Error("dashboard no disponible");
    const resumen = await respuesta.json();

    TARJETAS_KPI.forEach(({ clave }) => {
      const nodo = filaTarjetas.querySelector(`[data-kpi="${clave}"]`);
      if (nodo) nodo.textContent = resumen[clave] ?? "—";
    });

    textoPeriodo.textContent = resumen.periodo_activo
      ? `Período académico activo: ${resumen.periodo_activo}`
      : "No hay un período académico activo.";
  } catch (error) {
    textoPeriodo.textContent = "No se pudieron cargar los indicadores.";
  }
}

// ------------------------- Carreras (para el <select>) -------------------------

async function cargarCarreras() {
  try {
    const respuesta = await fetch(`${URL_BASE_API}/carreras?solo_activas=true`);
    if (!respuesta.ok) throw new Error("carreras no disponible");
    const carreras = await respuesta.json();

    campoCarrera.innerHTML = '<option value="">Seleccione una carrera</option>';
    carreras.forEach((carrera) => {
      const opcion = document.createElement("option");
      opcion.value = carrera.id;
      opcion.textContent = `${carrera.codigo} — ${carrera.nombre}`;
      campoCarrera.appendChild(opcion);
    });
  } catch (error) {
    campoCarrera.innerHTML = '<option value="">No se pudieron cargar las carreras</option>';
  }
}

// ------------------------- Crear / editar estudiante -------------------------

formularioEstudiante.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  mensajeFormulario.textContent = "";
  mensajeFormulario.className = "mensaje-error";

  const datos = {
    nombres: campoNombres.value.trim(),
    apellidos: campoApellidos.value.trim(),
    cuenta: campoCuenta.value.trim(),
    correo: campoCorreo.value.trim(),
    telefono: campoTelefono.value.trim() || null,
    fecha_nacimiento: campoNacimiento.value,
    carrera_id: Number(campoCarrera.value),
    estado: campoEstado.value,
  };

  const idEnEdicion = campoEstudianteId.value;
  const esEdicion = Boolean(idEnEdicion);

  botonGuardarEstudiante.disabled = true;
  botonGuardarEstudiante.textContent = "Guardando...";

  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/estudiantes${esEdicion ? `/${idEnEdicion}` : ""}`,
      {
        method: esEdicion ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeFormulario.textContent =
        detalle?.detail ?? "No se pudo guardar el estudiante. Revise los datos.";
      return;
    }

    mensajeFormulario.textContent = esEdicion
      ? "Estudiante actualizado correctamente."
      : "Estudiante creado correctamente.";
    mensajeFormulario.className = "mensaje-exito";

    cancelarEdicion();
    cargarDashboard();
    cargarEstudiantes(campoBuscar.value.trim());
  } catch (error) {
    mensajeFormulario.textContent = "No se pudo conectar con la API.";
  } finally {
    botonGuardarEstudiante.disabled = false;
    botonGuardarEstudiante.textContent = "Guardar estudiante";
  }
});

function editarEstudiante(estudiante) {
  campoEstudianteId.value = estudiante.id;
  campoNombres.value = estudiante.nombres;
  campoApellidos.value = estudiante.apellidos;
  campoCuenta.value = estudiante.cuenta;
  campoCorreo.value = estudiante.correo;
  campoTelefono.value = estudiante.telefono ?? "";
  campoNacimiento.value = estudiante.fecha_nacimiento;
  campoCarrera.value = estudiante.carrera_id;
  campoEstado.value = estudiante.estado;

  tituloFormulario.textContent = `Editar estudiante — ${estudiante.nombres} ${estudiante.apellidos}`;
  botonGuardarEstudiante.textContent = "Guardar cambios";
  botonCancelarEdicion.classList.remove("oculto");
  mensajeFormulario.textContent = "";
  formularioEstudiante.scrollIntoView({ behavior: "smooth", block: "start" });
}

function cancelarEdicion() {
  formularioEstudiante.reset();
  campoEstudianteId.value = "";
  tituloFormulario.textContent = "Nuevo estudiante";
  botonGuardarEstudiante.textContent = "Guardar estudiante";
  botonCancelarEdicion.classList.add("oculto");
}

botonCancelarEdicion.addEventListener("click", cancelarEdicion);

async function eliminarEstudiante(estudiante) {
  const confirmado = window.confirm(
    `¿Eliminar a ${estudiante.nombres} ${estudiante.apellidos}? Esta acción no se puede deshacer.`
  );
  if (!confirmado) return;

  try {
    const respuesta = await fetch(`${URL_BASE_API}/estudiantes/${estudiante.id}`, {
      method: "DELETE",
    });
    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      window.alert(
        detalle?.detail ?? "No se pudo eliminar (puede tener historial de matrículas)."
      );
      return;
    }
    cargarDashboard();
    cargarEstudiantes(campoBuscar.value.trim());
  } catch (error) {
    window.alert("No se pudo conectar con la API.");
  }
}

// ------------------------- Listado de estudiantes -------------------------

async function cargarEstudiantes(buscar = "") {
  try {
    const parametros = buscar ? `?buscar=${encodeURIComponent(buscar)}` : "";
    const respuesta = await fetch(`${URL_BASE_API}/estudiantes${parametros}`);
    if (!respuesta.ok) throw new Error("estudiantes no disponible");
    const estudiantes = await respuesta.json();
    renderizarTablaEstudiantes(estudiantes);
  } catch (error) {
    cuerpoTablaEstudiantes.innerHTML = "";
    textoSinResultados.textContent = "No se pudo cargar la lista de estudiantes.";
    textoSinResultados.classList.remove("oculto");
  }
}

function renderizarTablaEstudiantes(estudiantes) {
  cuerpoTablaEstudiantes.innerHTML = "";

  if (estudiantes.length === 0) {
    textoSinResultados.textContent = "No se encontraron estudiantes con ese criterio.";
    textoSinResultados.classList.remove("oculto");
    return;
  }
  textoSinResultados.classList.add("oculto");

  estudiantes.forEach((estudiante) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${estudiante.cuenta}</td>
      <td>${estudiante.nombres} ${estudiante.apellidos}</td>
      <td>${estudiante.correo}</td>
      <td>${estudiante.carrera_nombre}</td>
      <td>${pastillaEstado(estudiante.estado)}</td>
      <td class="acciones-fila">
        <button type="button" class="boton-icono" data-accion="editar">Editar</button>
        <button type="button" class="boton-icono peligro" data-accion="eliminar">Eliminar</button>
      </td>
    `;
    fila.querySelector('[data-accion="editar"]').addEventListener("click", () =>
      editarEstudiante(estudiante)
    );
    fila.querySelector('[data-accion="eliminar"]').addEventListener("click", () =>
      eliminarEstudiante(estudiante)
    );
    cuerpoTablaEstudiantes.appendChild(fila);
  });
}

function pastillaEstado(estado) {
  if (estado === "ACTIVO") {
    return `<span class="pastilla-estado pastilla-activo">Activo</span>`;
  }
  const etiquetas = { INACTIVO: "Inactivo", GRADUADO: "Graduado" };
  return `<span class="pastilla-estado pastilla-neutral">${etiquetas[estado] ?? estado}</span>`;
}

botonActualizar.addEventListener("click", () => {
  cargarDashboard();
  cargarEstudiantes(campoBuscar.value.trim());
});

campoBuscar.addEventListener("input", () => {
  clearTimeout(temporizadorBusqueda);
  temporizadorBusqueda = setTimeout(() => {
    cargarEstudiantes(campoBuscar.value.trim());
  }, 300);
});






//consultar docentes
async function cargarDocentes() {
  try {
    const respuesta = await fetch(`${URL_BASE_API}/docentes`);
    if (!respuesta.ok) throw new Error("No se pudieron cargar los docentes");

    const docentes = await respuesta.json();
    cuerpoTablaDocentes.innerHTML = "";

    docentes.forEach((docente) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${docente.numero_empleado}</td>
        <td>${docente.nombres} ${docente.apellidos}</td>
        <td>${docente.correo}</td>
        <td>${docente.especialidad}</td>
        <td>${docente.estado}</td>
        <td>
          <button type="button" data-accion="editar">Editar</button>
          <button type="button" data-accion="eliminar">Eliminar</button>
        </td>
      `;

      fila.querySelector('[data-accion="editar"]').addEventListener("click", () => {
        editarDocente(docente);
      });

      fila.querySelector('[data-accion="eliminar"]').addEventListener("click", () => {
        eliminarDocente(docente);
      });

      cuerpoTablaDocentes.appendChild(fila);
    });
  } catch (error) {
    mensajeDocente.textContent = "No se pudo cargar la lista de docentes.";
  }
}

function editarDocente(docente) {
  campoDocenteId.value = docente.id;
  document.getElementById("docente-numero").value = docente.numero_empleado;
  document.getElementById("docente-nombres").value = docente.nombres;
  document.getElementById("docente-apellidos").value = docente.apellidos;
  document.getElementById("docente-correo").value = docente.correo;
  document.getElementById("docente-especialidad").value = docente.especialidad;
  document.getElementById("docente-estado").value = docente.estado;

  mensajeDocente.textContent = "Edita los datos y guarda los cambios.";
  formularioDocente.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function eliminarDocente(docente) {
  const confirmado = window.confirm(
    `¿Eliminar a ${docente.nombres} ${docente.apellidos}?`
  );
  if (!confirmado) return;

  try {
    const respuesta = await fetch(`${URL_BASE_API}/docentes/${docente.id}`, {
      method: "DELETE",
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeDocente.textContent =
        detalle?.detail ?? "No se pudo eliminar el docente.";
      return;
    }

    mensajeDocente.textContent = "Docente eliminado.";
    await cargarDocentes();
  } catch (error) {
    mensajeDocente.textContent = "No se pudo conectar con la API.";
  }
}

async function guardarDocente() {
  mensajeDocente.textContent = "";

  const id = campoDocenteId.value;
  const datos = {
    numero_empleado: document.getElementById("docente-numero").value.trim(),
    nombres: document.getElementById("docente-nombres").value.trim(),
    apellidos: document.getElementById("docente-apellidos").value.trim(),
    correo: document.getElementById("docente-correo").value.trim(),
    especialidad: document.getElementById("docente-especialidad").value.trim(),
    estado: document.getElementById("docente-estado").value,
  };

  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/docentes${id ? `/${id}` : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeDocente.textContent =
        detalle?.detail ?? "No se pudo guardar. Revisa los datos.";
      return;
    }

    formularioDocente.reset();
    campoDocenteId.value = "";
    botonGuardarDocente.textContent = "Guardar docente";
    mensajeDocente.textContent = id
      ? "Docente actualizado correctamente."
      : "Docente creado correctamente.";

    await cargarDocentes();
  } catch (error) {
    mensajeDocente.textContent = "No se pudo conectar con la API.";
  }
}

botonGuardarDocente.addEventListener("click", guardarDocente);
formularioDocente.addEventListener("submit", (evento) => {
  evento.preventDefault();
  guardarDocente();
});





//sección de periodos
async function cargarPeriodos() {
  try {
    const respuesta = await fetch(`${URL_BASE_API}/periodos`);
    if (!respuesta.ok) throw new Error("No se pudieron cargar los períodos");

    const periodos = await respuesta.json();
    cuerpoTablaPeriodos.innerHTML = "";

    periodos.forEach((periodo) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${periodo.nombre}</td>
        <td>${periodo.fecha_inicio}</td>
        <td>${periodo.fecha_fin}</td>
        <td>${periodo.activo ? "Sí" : "No"}</td>
        <td>
          <button type="button" data-accion="editar">Editar</button>
          <button type="button" data-accion="eliminar">Eliminar</button>
        </td>
      `;

      fila.querySelector('[data-accion="editar"]').addEventListener("click", () => {
        editarPeriodo(periodo);
      });

      fila.querySelector('[data-accion="eliminar"]').addEventListener("click", () => {
        eliminarPeriodo(periodo);
      });

      cuerpoTablaPeriodos.appendChild(fila);
    });
  } catch (error) {
    mensajePeriodo.textContent = "No se pudieron cargar los períodos.";
  }
}

function editarPeriodo(periodo) {
  campoPeriodoId.value = periodo.id;
  campoPeriodoAnio.value = periodo.anio;
  campoPeriodoNumero.value = periodo.numero;
  campoPeriodoInicio.value = periodo.fecha_inicio;
  campoPeriodoFin.value = periodo.fecha_fin;
  campoPeriodoActivo.value = String(periodo.activo);

  document.getElementById("titulo-formulario-periodo").textContent =
    `Editar período ${periodo.nombre}`;
  botonGuardarPeriodo.textContent = "Guardar cambios";
  mensajePeriodo.textContent = "Modifica los datos y guarda los cambios.";

  formularioPeriodo.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function guardarPeriodo() {
  if (!formularioPeriodo.reportValidity()) return;

  mensajePeriodo.textContent = "";
  const id = campoPeriodoId.value;

  const datos = {
    anio: Number(campoPeriodoAnio.value),
    numero: Number(campoPeriodoNumero.value),
    fecha_inicio: campoPeriodoInicio.value,
    fecha_fin: campoPeriodoFin.value,
    activo: campoPeriodoActivo.value === "true",
  };

  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/periodos${id ? `/${id}` : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajePeriodo.textContent =
        detalle?.detail ?? "No se pudo guardar el período.";
      return;
    }

    formularioPeriodo.reset();
    campoPeriodoId.value = "";
    botonGuardarPeriodo.textContent = "Guardar período";
    document.getElementById("titulo-formulario-periodo").textContent =
      "Nuevo período";
    mensajePeriodo.textContent = id
      ? "Período actualizado correctamente."
      : "Período creado correctamente.";

    await cargarPeriodos();
    await cargarDashboard();
  } catch (error) {
    mensajePeriodo.textContent = "No se pudo conectar con la API.";
  }
}

async function eliminarPeriodo(periodo) {
  const confirmado = window.confirm(
    `¿Eliminar el período ${periodo.nombre}?`
  );
  if (!confirmado) return;

  try {
    const respuesta = await fetch(`${URL_BASE_API}/periodos/${periodo.id}`, {
      method: "DELETE",
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajePeriodo.textContent =
        detalle?.detail ?? "No se pudo eliminar el período.";
      return;
    }

    mensajePeriodo.textContent = "Período eliminado.";
    await cargarPeriodos();
    await cargarDashboard();
  } catch (error) {
    mensajePeriodo.textContent = "No se pudo conectar con la API.";
  }
}

botonGuardarPeriodo.addEventListener("click", guardarPeriodo);

formularioPeriodo.addEventListener("submit", (evento) => {
  evento.preventDefault();
  guardarPeriodo();
});







//cargar aulas
async function cargarAulas() {
  try {
    const respuesta = await fetch(`${URL_BASE_API}/aulas`);
    if (!respuesta.ok) throw new Error("No se pudieron cargar las aulas");

    const aulas = await respuesta.json();
    cuerpoTablaAulas.innerHTML = "";

    aulas.forEach((aula) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${aula.codigo}</td>
        <td>${aula.edificio}</td>
        <td>${aula.capacidad}</td>
        <td>${aula.activo ? "Sí" : "No"}</td>
        <td>
          <button type="button" data-accion="editar">Editar</button>
          <button type="button" data-accion="eliminar">Eliminar</button>
        </td>
      `;

      fila.querySelector('[data-accion="editar"]').addEventListener("click", () => {
        editarAula(aula);
      });

      fila.querySelector('[data-accion="eliminar"]').addEventListener("click", () => {
        eliminarAula(aula);
      });

      cuerpoTablaAulas.appendChild(fila);
    });
  } catch (error) {
    mensajeAula.textContent = "No se pudieron cargar las aulas.";
  }
}

function editarAula(aula) {
  campoAulaId.value = aula.id;
  campoAulaCodigo.value = aula.codigo;
  campoAulaEdificio.value = aula.edificio;
  campoAulaCapacidad.value = aula.capacidad;
  campoAulaActiva.value = String(aula.activo);

  document.getElementById("titulo-formulario-aula").textContent =
    `Editar aula ${aula.codigo}`;
  botonGuardarAula.textContent = "Guardar cambios";
  mensajeAula.textContent = "Modifica los datos y guarda los cambios.";

  formularioAula.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function guardarAula() {
  if (!formularioAula.reportValidity()) return;

  mensajeAula.textContent = "";
  const id = campoAulaId.value;

  const datos = {
    codigo: campoAulaCodigo.value.trim(),
    edificio: campoAulaEdificio.value.trim(),
    capacidad: Number(campoAulaCapacidad.value),
    activo: campoAulaActiva.value === "true",
  };

  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/aulas${id ? `/${id}` : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeAula.textContent =
        detalle?.detail ?? "No se pudo guardar el aula.";
      return;
    }

    formularioAula.reset();
    campoAulaId.value = "";
    botonGuardarAula.textContent = "Guardar aula";
    document.getElementById("titulo-formulario-aula").textContent =
      "Nueva aula";
    mensajeAula.textContent = id
      ? "Aula actualizada correctamente."
      : "Aula creada correctamente.";

    await cargarAulas();
  } catch (error) {
    mensajeAula.textContent = "No se pudo conectar con la API.";
  }
}

async function eliminarAula(aula) {
  const confirmado = window.confirm(`¿Eliminar el aula ${aula.codigo}?`);
  if (!confirmado) return;

  try {
    const respuesta = await fetch(`${URL_BASE_API}/aulas/${aula.id}`, {
      method: "DELETE",
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeAula.textContent =
        detalle?.detail ?? "No se pudo eliminar el aula.";
      return;
    }

    mensajeAula.textContent = "Aula eliminada.";
    await cargarAulas();
  } catch (error) {
    mensajeAula.textContent = "No se pudo conectar con la API.";
  }
}

botonGuardarAula.addEventListener("click", guardarAula);

formularioAula.addEventListener("submit", (evento) => {
  evento.preventDefault();
  guardarAula();
});






//cargar asignaturas
async function cargarAsignaturas() {
  try {
    const [respuestaAsignaturas, respuestaCarreras] = await Promise.all([
      fetch(`${URL_BASE_API}/asignaturas`),
      fetch(`${URL_BASE_API}/carreras?solo_activas=true`),
    ]);

    if (!respuestaAsignaturas.ok || !respuestaCarreras.ok) {
      throw new Error("No se pudieron cargar asignaturas o carreras");
    }

    const [asignaturas, carreras] = await Promise.all([
      respuestaAsignaturas.json(),
      respuestaCarreras.json(),
    ]);

    campoAsignaturaCarrera.innerHTML =
      '<option value="">Seleccione una carrera</option>';

    carreras.forEach((carrera) => {
      const opcion = document.createElement("option");
      opcion.value = carrera.id;
      opcion.textContent = `${carrera.codigo} — ${carrera.nombre}`;
      campoAsignaturaCarrera.appendChild(opcion);
    });

    campoAsignaturaRequisito.innerHTML =
      '<option value="">Sin requisito</option>';

    asignaturas.forEach((asignatura) => {
      const opcion = document.createElement("option");
      opcion.value = asignatura.id;
      opcion.textContent = `${asignatura.codigo} — ${asignatura.nombre}`;
      campoAsignaturaRequisito.appendChild(opcion);
    });

    cuerpoTablaAsignaturas.innerHTML = "";

    asignaturas.forEach((asignatura) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${asignatura.codigo}</td>
        <td>${asignatura.nombre}</td>
        <td>${asignatura.unidades_valorativas}</td>
        <td>${asignatura.carrera_nombre}</td>
        <td>${asignatura.requisito_codigo ?? "—"}</td>
        <td>${asignatura.activo ? "Sí" : "No"}</td>
        <td>
          <button type="button" data-accion="editar">Editar</button>
          <button type="button" data-accion="eliminar">Eliminar</button>
        </td>
      `;

      fila.querySelector('[data-accion="editar"]').addEventListener("click", () => {
        editarAsignatura(asignatura);
      });

      fila.querySelector('[data-accion="eliminar"]').addEventListener("click", () => {
        eliminarAsignatura(asignatura);
      });

      cuerpoTablaAsignaturas.appendChild(fila);
    });
  } catch (error) {
    mensajeAsignatura.textContent =
      "No se pudieron cargar las asignaturas y carreras.";
  }
}

function editarAsignatura(asignatura) {
  campoAsignaturaId.value = asignatura.id;
  campoAsignaturaCodigo.value = asignatura.codigo;
  campoAsignaturaNombre.value = asignatura.nombre;
  campoAsignaturaUnidades.value = asignatura.unidades_valorativas;
  campoAsignaturaCarrera.value = asignatura.carrera_id;
  campoAsignaturaRequisito.value = asignatura.requisito_id ?? "";
  campoAsignaturaActiva.value = String(asignatura.activo);

  document.getElementById("titulo-formulario-asignatura").textContent =
    `Editar asignatura ${asignatura.codigo}`;
  botonGuardarAsignatura.textContent = "Guardar cambios";
  mensajeAsignatura.textContent = "Modifica los datos y guarda los cambios.";

  formularioAsignatura.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function guardarAsignatura() {
  if (!formularioAsignatura.reportValidity()) return;

  mensajeAsignatura.textContent = "";
  const id = campoAsignaturaId.value;

  const datos = {
    codigo: campoAsignaturaCodigo.value.trim(),
    nombre: campoAsignaturaNombre.value.trim(),
    unidades_valorativas: Number(campoAsignaturaUnidades.value),
    carrera_id: Number(campoAsignaturaCarrera.value),
    requisito_id: campoAsignaturaRequisito.value
      ? Number(campoAsignaturaRequisito.value)
      : null,
    activo: campoAsignaturaActiva.value === "true",
  };

  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/asignaturas${id ? `/${id}` : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeAsignatura.textContent =
        detalle?.detail ?? "No se pudo guardar la asignatura.";
      return;
    }

    formularioAsignatura.reset();
    campoAsignaturaId.value = "";
    botonGuardarAsignatura.textContent = "Guardar asignatura";
    document.getElementById("titulo-formulario-asignatura").textContent =
      "Nueva asignatura";
    mensajeAsignatura.textContent = id
      ? "Asignatura actualizada correctamente."
      : "Asignatura creada correctamente.";

    await cargarAsignaturas();
  } catch (error) {
    mensajeAsignatura.textContent = "No se pudo conectar con la API.";
  }
}

async function eliminarAsignatura(asignatura) {
  const confirmado = window.confirm(
    `¿Eliminar la asignatura ${asignatura.codigo}?`
  );
  if (!confirmado) return;

  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/asignaturas/${asignatura.id}`,
      { method: "DELETE" }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeAsignatura.textContent =
        detalle?.detail ?? "No se pudo eliminar la asignatura.";
      return;
    }

    mensajeAsignatura.textContent = "Asignatura eliminada.";
    await cargarAsignaturas();
  } catch (error) {
    mensajeAsignatura.textContent = "No se pudo conectar con la API.";
  }
}

botonGuardarAsignatura.addEventListener("click", guardarAsignatura);

formularioAsignatura.addEventListener("submit", (evento) => {
  evento.preventDefault();
  guardarAsignatura();
});





//cargar secciones
async function cargarSecciones() {
  try {
    const rutas = [
      "/secciones",
      "/asignaturas",
      "/docentes",
      "/periodos",
      "/aulas",
    ];

    const respuestas = await Promise.all(
      rutas.map((ruta) => fetch(`${URL_BASE_API}${ruta}`))
    );

    if (respuestas.some((respuesta) => !respuesta.ok)) {
      throw new Error("No se pudieron cargar los datos de las secciones");
    }

    const [secciones, asignaturas, docentes, periodos, aulas] =
      await Promise.all(respuestas.map((respuesta) => respuesta.json()));

    llenarSelector(
      campoSeccionAsignatura,
      asignaturas,
      (item) => `${item.codigo} — ${item.nombre}`
    );
    llenarSelector(
      campoSeccionDocente,
      docentes,
      (item) => `${item.nombres} ${item.apellidos}`
    );
    llenarSelector(
      campoSeccionPeriodo,
      periodos,
      (item) => `${item.nombre}${item.activo ? " (activo)" : ""}`
    );

    campoSeccionAula.innerHTML = '<option value="">Sin aula asignada</option>';
    aulas.forEach((aula) => {
      const opcion = document.createElement("option");
      opcion.value = aula.id;
      opcion.textContent = `${aula.codigo} — ${aula.edificio} (${aula.capacidad})`;
      campoSeccionAula.appendChild(opcion);
    });

    cuerpoTablaSecciones.innerHTML = "";

    secciones.forEach((seccion) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${seccion.codigo}</td>
        <td>${seccion.asignatura_codigo} — ${seccion.asignatura_nombre}</td>
        <td>${seccion.docente_nombre}</td>
        <td>${seccion.periodo_nombre}</td>
        <td>${seccion.aula_codigo ?? "—"}</td>
        <td>${seccion.dias}, ${seccion.hora_inicio}–${seccion.hora_fin}</td>
        <td>${seccion.cupos_disponibles} / ${seccion.cupo_maximo}</td>
        <td>${seccion.estado}</td>
        <td>
          <button type="button" data-accion="editar">Editar</button>
          <button type="button" data-accion="eliminar">Eliminar</button>
        </td>
      `;

      fila.querySelector('[data-accion="editar"]').addEventListener("click", () => {
        editarSeccion(seccion);
      });

      fila.querySelector('[data-accion="eliminar"]').addEventListener("click", () => {
        eliminarSeccion(seccion);
      });

      cuerpoTablaSecciones.appendChild(fila);
    });
  } catch (error) {
    mensajeSeccion.textContent =
      "No se pudieron cargar las secciones o sus datos relacionados.";
  }
}

function llenarSelector(selector, elementos, texto) {
  selector.innerHTML = '<option value="">Seleccione una opción</option>';

  elementos.forEach((elemento) => {
    const opcion = document.createElement("option");
    opcion.value = elemento.id;
    opcion.textContent = texto(elemento);
    selector.appendChild(opcion);
  });
}

function editarSeccion(seccion) {
  campoSeccionId.value = seccion.id;
  campoSeccionCodigo.value = seccion.codigo;
  campoSeccionAsignatura.value = seccion.asignatura_id;
  campoSeccionDocente.value = seccion.docente_id;
  campoSeccionPeriodo.value = seccion.periodo_id;
  campoSeccionAula.value = seccion.aula_id ?? "";
  campoSeccionDias.value = seccion.dias;
  campoSeccionInicio.value = seccion.hora_inicio;
  campoSeccionFin.value = seccion.hora_fin;
  campoSeccionCupo.value = seccion.cupo_maximo;
  campoSeccionEstado.value = seccion.estado;

  document.getElementById("titulo-formulario-seccion").textContent =
    `Editar sección ${seccion.codigo}`;
  botonGuardarSeccion.textContent = "Guardar cambios";
  mensajeSeccion.textContent = "Modifica los datos y guarda los cambios.";

  formularioSeccion.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function guardarSeccion() {
  if (!formularioSeccion.reportValidity()) return;

  mensajeSeccion.textContent = "";
  const id = campoSeccionId.value;

  const datos = {
    codigo: campoSeccionCodigo.value.trim(),
    asignatura_id: Number(campoSeccionAsignatura.value),
    docente_id: Number(campoSeccionDocente.value),
    periodo_id: Number(campoSeccionPeriodo.value),
    aula_id: campoSeccionAula.value
      ? Number(campoSeccionAula.value)
      : null,
    dias: campoSeccionDias.value.trim(),
    hora_inicio: campoSeccionInicio.value,
    hora_fin: campoSeccionFin.value,
    cupo_maximo: Number(campoSeccionCupo.value),
    estado: campoSeccionEstado.value,
  };

  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/secciones${id ? `/${id}` : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeSeccion.textContent =
        detalle?.detail ?? "No se pudo guardar la sección.";
      return;
    }

    formularioSeccion.reset();
    campoSeccionId.value = "";
    botonGuardarSeccion.textContent = "Guardar sección";
    document.getElementById("titulo-formulario-seccion").textContent =
      "Nueva sección";
    mensajeSeccion.textContent = id
      ? "Sección actualizada correctamente."
      : "Sección creada correctamente.";

    await cargarSecciones();
  } catch (error) {
    mensajeSeccion.textContent = "No se pudo conectar con la API.";
  }
}

async function eliminarSeccion(seccion) {
  const confirmado = window.confirm(
    `¿Eliminar la sección ${seccion.codigo}?`
  );
  if (!confirmado) return;

  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/secciones/${seccion.id}`,
      { method: "DELETE" }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeSeccion.textContent =
        detalle?.detail ?? "No se pudo eliminar la sección.";
      return;
    }

    mensajeSeccion.textContent = "Sección eliminada.";
    await cargarSecciones();
  } catch (error) {
    mensajeSeccion.textContent = "No se pudo conectar con la API.";
  }
}

botonGuardarSeccion.addEventListener("click", guardarSeccion);

formularioSeccion.addEventListener("submit", (evento) => {
  evento.preventDefault();
  guardarSeccion();
});




//cargar matrículas
async function cargarMatriculas() {
  try {
    const rutas = [
      "/matriculas",
      "/estudiantes",
      "/secciones/disponibles",
    ];

    const respuestas = await Promise.all(
      rutas.map((ruta) => fetch(`${URL_BASE_API}${ruta}`))
    );

    if (respuestas.some((respuesta) => !respuesta.ok)) {
      throw new Error("No se pudieron cargar los datos de matrículas");
    }

    const [matriculas, estudiantes, secciones] = await Promise.all(
      respuestas.map((respuesta) => respuesta.json())
    );

    campoMatriculaEstudiante.innerHTML =
      '<option value="">Seleccione un estudiante</option>';

    estudiantes
      .filter((estudiante) => estudiante.estado === "ACTIVO")
      .forEach((estudiante) => {
        const opcion = document.createElement("option");
        opcion.value = estudiante.id;
        opcion.textContent =
          `${estudiante.cuenta} — ${estudiante.nombres} ${estudiante.apellidos}`;
        campoMatriculaEstudiante.appendChild(opcion);
      });

    campoMatriculaSeccion.innerHTML =
      '<option value="">Seleccione una sección</option>';

    secciones.forEach((seccion) => {
      const opcion = document.createElement("option");
      opcion.value = seccion.id;
      opcion.textContent =
        `${seccion.asignatura_codigo} — Sección ${seccion.codigo} ` +
        `(${seccion.periodo_nombre}; ${seccion.cupos_disponibles} cupos)`;
      campoMatriculaSeccion.appendChild(opcion);
    });

    cuerpoTablaMatriculas.innerHTML = "";

    matriculas.forEach((matricula) => {
      const fila = document.createElement("tr");

      const accion =
        matricula.estado === "MATRICULADA"
          ? '<button type="button" data-accion="cancelar">Cancelar</button>'
          : "—";

      fila.innerHTML = `
        <td>${matricula.estudiante_cuenta}</td>
        <td>${matricula.estudiante_nombre}</td>
        <td>${matricula.asignatura_codigo} — ${matricula.asignatura_nombre}</td>
        <td>${matricula.seccion_codigo}</td>
        <td>${matricula.periodo_nombre}</td>
        <td>${matricula.fecha_matricula}</td>
        <td>${matricula.estado}</td>
        <td>${accion}</td>
      `;

      const botonCancelar = fila.querySelector('[data-accion="cancelar"]');
      if (botonCancelar) {
        botonCancelar.addEventListener("click", () => {
          cancelarMatricula(matricula);
        });
      }

      cuerpoTablaMatriculas.appendChild(fila);
    });
  } catch (error) {
    mensajeMatricula.textContent =
      "No se pudieron cargar estudiantes, secciones o matrículas.";
  }
}

async function guardarMatricula() {
  if (!formularioMatricula.reportValidity()) return;

  mensajeMatricula.textContent = "";

  const datos = {
    estudiante_id: Number(campoMatriculaEstudiante.value),
    seccion_id: Number(campoMatriculaSeccion.value),
  };

  try {
    const respuesta = await fetch(`${URL_BASE_API}/matriculas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeMatricula.textContent =
        detalle?.detail ?? "No se pudo crear la matrícula.";
      return;
    }

    formularioMatricula.reset();
    mensajeMatricula.textContent = "Matrícula creada correctamente.";
    await cargarMatriculas();
  } catch (error) {
    mensajeMatricula.textContent = "No se pudo conectar con la API.";
  }
}

async function cancelarMatricula(matricula) {
  const confirmado = window.confirm(
    `¿Cancelar la matrícula de ${matricula.estudiante_nombre} ` +
    `en ${matricula.asignatura_codigo}?`
  );
  if (!confirmado) return;

  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/matriculas/${matricula.id}/cancelar`,
      { method: "PATCH" }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeMatricula.textContent =
        detalle?.detail ?? "No se pudo cancelar la matrícula.";
      return;
    }

    mensajeMatricula.textContent = "Matrícula cancelada; se liberó el cupo.";
    await cargarMatriculas();
  } catch (error) {
    mensajeMatricula.textContent = "No se pudo conectar con la API.";
  }
}

botonGuardarMatricula.addEventListener("click", guardarMatricula);

formularioMatricula.addEventListener("submit", (evento) => {
  evento.preventDefault();
  guardarMatricula();
});




async function cargarCalificaciones() {
  try {
    const [respuestaMatriculas, respuestaCalificaciones] = await Promise.all([
      fetch(`${URL_BASE_API}/matriculas`),
      fetch(`${URL_BASE_API}/calificaciones`),
    ]);

    if (!respuestaMatriculas.ok || !respuestaCalificaciones.ok) {
      throw new Error("No se pudieron cargar las matrículas o calificaciones");
    }

    const [matriculas, calificaciones] = await Promise.all([
      respuestaMatriculas.json(),
      respuestaCalificaciones.json(),
    ]);

    const matriculasValidas = matriculas.filter(
      (matricula) => matricula.estado !== "CANCELADA"
    );

    campoCalificacionMatricula.innerHTML =
      '<option value="">Seleccione una matrícula</option>';

    matriculasValidas.forEach((matricula) => {
      const opcion = document.createElement("option");
      opcion.value = matricula.id;
      opcion.textContent =
        `${matricula.estudiante_cuenta} — ${matricula.estudiante_nombre} — ` +
        `${matricula.asignatura_codigo}, sección ${matricula.seccion_codigo} ` +
        `(${matricula.periodo_nombre})`;
      campoCalificacionMatricula.appendChild(opcion);
    });

    const matriculaPorId = new Map(
      matriculas.map((matricula) => [matricula.id, matricula])
    );

    cuerpoTablaCalificaciones.innerHTML = "";

    calificaciones.forEach((calificacion) => {
      const matricula = matriculaPorId.get(calificacion.matricula_id);
      if (!matricula) return;

      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${matricula.estudiante_nombre}</td>
        <td>${matricula.asignatura_codigo} — ${matricula.asignatura_nombre}</td>
        <td>${matricula.periodo_nombre}</td>
        <td>
          ${calificacion.primer_parcial} /
          ${calificacion.segundo_parcial} /
          ${calificacion.tercer_parcial}
        </td>
        <td>${calificacion.nota_final}</td>
        <td>${calificacion.resultado}</td>
        <td>
          <button type="button" data-accion="editar">Editar</button>
          <button type="button" data-accion="eliminar">Eliminar</button>
        </td>
      `;

      fila.querySelector('[data-accion="editar"]').addEventListener("click", () => {
        editarCalificacion(calificacion);
      });

      fila.querySelector('[data-accion="eliminar"]').addEventListener("click", () => {
        eliminarCalificacion(calificacion);
      });

      cuerpoTablaCalificaciones.appendChild(fila);
    });
  } catch (error) {
    mensajeCalificacion.textContent =
      "No se pudieron cargar matrículas o calificaciones.";
  }
}

async function editarCalificacion(calificacion) {
  campoCalificacionMatricula.value = calificacion.matricula_id;
  campoParcial1.value = calificacion.primer_parcial;
  campoParcial2.value = calificacion.segundo_parcial;
  campoParcial3.value = calificacion.tercer_parcial;
  campoObservacion.value = calificacion.observacion ?? "";

  mensajeCalificacion.textContent =
    "Modifica las notas y guarda los cambios.";
  formularioCalificacion.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

async function guardarCalificacion() {
  if (!formularioCalificacion.reportValidity()) return;

  mensajeCalificacion.textContent = "";
  const matriculaId = campoCalificacionMatricula.value;

  const datos = {
    primer_parcial: Number(campoParcial1.value),
    segundo_parcial: Number(campoParcial2.value),
    tercer_parcial: Number(campoParcial3.value),
    observacion: campoObservacion.value.trim() || null,
  };

  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/calificaciones/matricula/${matriculaId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeCalificacion.textContent =
        detalle?.detail ?? "No se pudieron guardar las calificaciones.";
      return;
    }

    formularioCalificacion.reset();
    mensajeCalificacion.textContent =
      "Calificaciones guardadas. La nota final se calculó automáticamente.";

    await cargarCalificaciones();
    await cargarMatriculas();
  } catch (error) {
    mensajeCalificacion.textContent = "No se pudo conectar con la API.";
  }
}

async function eliminarCalificacion(calificacion) {
  const confirmado = window.confirm(
    "¿Eliminar estas calificaciones? La matrícula volverá al estado matriculado."
  );
  if (!confirmado) return;

  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/calificaciones/matricula/${calificacion.matricula_id}`,
      { method: "DELETE" }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeCalificacion.textContent =
        detalle?.detail ?? "No se pudieron eliminar las calificaciones.";
      return;
    }

    mensajeCalificacion.textContent =
      "Calificaciones eliminadas; la matrícula volvió a estar activa.";
    await cargarCalificaciones();
    await cargarMatriculas();
  } catch (error) {
    mensajeCalificacion.textContent = "No se pudo conectar con la API.";
  }
}

botonGuardarCalificacion.addEventListener("click", guardarCalificacion);

formularioCalificacion.addEventListener("submit", (evento) => {
  evento.preventDefault();
  guardarCalificacion();
});







async function cargarOpcionesReportes() {
  try {
    const rutas = [
      "/estudiantes",
      "/secciones",
      "/docentes",
      "/periodos",
    ];

    const respuestas = await Promise.all(
      rutas.map((ruta) => fetch(`${URL_BASE_API}${ruta}`))
    );

    if (respuestas.some((respuesta) => !respuesta.ok)) {
      throw new Error("No se pudieron cargar las opciones de reportes");
    }

    const [estudiantes, secciones, docentes, periodos] = await Promise.all(
      respuestas.map((respuesta) => respuesta.json())
    );

    selectorReporteEstudiante.innerHTML =
      '<option value="">Seleccione un estudiante</option>';
    estudiantes.forEach((estudiante) => {
      const opcion = document.createElement("option");
      opcion.value = estudiante.id;
      opcion.textContent =
        `${estudiante.cuenta} — ${estudiante.nombres} ${estudiante.apellidos}`;
      selectorReporteEstudiante.appendChild(opcion);
    });

    selectorReporteSeccion.innerHTML =
      '<option value="">Seleccione una sección</option>';
    secciones.forEach((seccion) => {
      const opcion = document.createElement("option");
      opcion.value = seccion.id;
      opcion.textContent =
        `${seccion.asignatura_codigo} — Sección ${seccion.codigo} ` +
        `(${seccion.periodo_nombre})`;
      selectorReporteSeccion.appendChild(opcion);
    });

    selectorReporteDocente.innerHTML =
      '<option value="">Seleccione un docente</option>';
    docentes.forEach((docente) => {
      const opcion = document.createElement("option");
      opcion.value = docente.id;
      opcion.textContent = `${docente.nombres} ${docente.apellidos}`;
      selectorReporteDocente.appendChild(opcion);
    });

    selectorReportePeriodo.innerHTML =
      '<option value="">Todos los períodos</option>';
    periodos.forEach((periodo) => {
      const opcion = document.createElement("option");
      opcion.value = periodo.id;
      opcion.textContent = periodo.nombre;
      selectorReportePeriodo.appendChild(opcion);
    });
  } catch (error) {
    mensajeReportes.textContent =
      "No se pudieron cargar los datos para los reportes.";
  }
}

async function mostrarReporte(url) {
  mensajeReportes.textContent = "";
  resultadoReporte.textContent = "Consultando…";

  try {
    const respuesta = await fetch(`${URL_BASE_API}${url}`);
    const datos = await respuesta.json().catch(() => null);

    if (!respuesta.ok) {
      throw new Error(datos?.detail ?? "No se pudo obtener el reporte.");
    }

    resultadoReporte.textContent = JSON.stringify(datos, null, 2);
  } catch (error) {
    resultadoReporte.textContent = "";
    mensajeReportes.textContent = error.message;
  }
}

document
  .getElementById("boton-reporte-historial")
  .addEventListener("click", () => {
    const id = selectorReporteEstudiante.value;
    if (!id) {
      mensajeReportes.textContent = "Selecciona un estudiante.";
      return;
    }

    mostrarReporte(`/reportes/historial-estudiante/${id}`);
  });

document
  .getElementById("boton-reporte-seccion")
  .addEventListener("click", () => {
    const id = selectorReporteSeccion.value;
    if (!id) {
      mensajeReportes.textContent = "Selecciona una sección.";
      return;
    }

    mostrarReporte(`/reportes/lista-seccion/${id}`);
  });

document
  .getElementById("boton-reporte-docente")
  .addEventListener("click", () => {
    const docenteId = selectorReporteDocente.value;
    if (!docenteId) {
      mensajeReportes.textContent = "Selecciona un docente.";
      return;
    }

    const periodoId = selectorReportePeriodo.value;
    const filtroPeriodo = periodoId ? `?periodo_id=${periodoId}` : "";

    mostrarReporte(
      `/reportes/carga-docente/${docenteId}${filtroPeriodo}`
    );
  });


  //cargar tablas de carreras
async function cargarCarrerasTabla() {
  try {
    const respuesta = await fetch(`${URL_BASE_API}/carreras`);
    if (!respuesta.ok) throw new Error("No se pudieron cargar las carreras");

    const carreras = await respuesta.json();
    cuerpoTablaCarreras.innerHTML = "";

    carreras.forEach((carrera) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${carrera.codigo}</td>
        <td>${carrera.nombre}</td>
        <td>${carrera.duracion_anios} años</td>
        <td>${carrera.activo ? "Sí" : "No"}</td>
        <td>
          <button type="button" data-accion="editar">Editar</button>
          <button type="button" data-accion="eliminar">Eliminar</button>
        </td>
      `;

      fila.querySelector('[data-accion="editar"]').addEventListener("click", () => {
        editarCarrera(carrera);
      });

      fila.querySelector('[data-accion="eliminar"]').addEventListener("click", () => {
        eliminarCarrera(carrera);
      });

      cuerpoTablaCarreras.appendChild(fila);
    });
  } catch (error) {
    mensajeCarrera.textContent = "No se pudieron cargar las carreras.";
  }
}

function editarCarrera(carrera) {
  campoCarreraId.value = carrera.id;
  campoCarreraCodigo.value = carrera.codigo;
  campoCarreraNombre.value = carrera.nombre;
  campoCarreraDuracion.value = carrera.duracion_anios;
  campoCarreraActiva.value = String(carrera.activo);

  document.getElementById("titulo-formulario-carrera").textContent =
    `Editar carrera ${carrera.codigo}`;
  botonGuardarCarrera.textContent = "Guardar cambios";
  mensajeCarrera.textContent = "Modifica los datos y guarda los cambios.";

  formularioCarrera.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function guardarCarrera() {
  if (!formularioCarrera.reportValidity()) return;

  mensajeCarrera.textContent = "";
  const id = campoCarreraId.value;

  const datos = {
    codigo: campoCarreraCodigo.value.trim(),
    nombre: campoCarreraNombre.value.trim(),
    duracion_anios: Number(campoCarreraDuracion.value),
    activo: campoCarreraActiva.value === "true",
  };

  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/carreras${id ? `/${id}` : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeCarrera.textContent =
        detalle?.detail ?? "No se pudo guardar la carrera.";
      return;
    }

    formularioCarrera.reset();
    campoCarreraId.value = "";
    botonGuardarCarrera.textContent = "Guardar carrera";
    document.getElementById("titulo-formulario-carrera").textContent =
      "Nueva carrera";
    mensajeCarrera.textContent = id
      ? "Carrera actualizada correctamente."
      : "Carrera creada correctamente.";

    await cargarCarrerasTabla();
    await cargarCarreras();
  } catch (error) {
    mensajeCarrera.textContent = "No se pudo conectar con la API.";
  }
}

async function eliminarCarrera(carrera) {
  const confirmado = window.confirm(
    `¿Eliminar la carrera ${carrera.nombre}?`
  );
  if (!confirmado) return;

  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/carreras/${carrera.id}`,
      { method: "DELETE" }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      mensajeCarrera.textContent =
        detalle?.detail ?? "No se pudo eliminar la carrera.";
      return;
    }

    mensajeCarrera.textContent = "Carrera eliminada.";
    await cargarCarrerasTabla();
    await cargarCarreras();
  } catch (error) {
    mensajeCarrera.textContent = "No se pudo conectar con la API.";
  }
}

botonGuardarCarrera.addEventListener("click", guardarCarrera);

formularioCarrera.addEventListener("submit", (evento) => {
  evento.preventDefault();
  guardarCarrera();
});