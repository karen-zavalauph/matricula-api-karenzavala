from fastapi import APIRouter, Depends, HTTPException

from app.database import conexion_lectura
from app.helpers import filas_a_lista
from app.routers.auth import requiere_roles


router = APIRouter(
    prefix="/mi-cuenta",
    tags=["Portal del estudiante"],
)


def obtener_estudiante_vinculado(usuario: dict) -> int:
    estudiante_id = usuario.get("estudiante_id")

    if estudiante_id is None:
        raise HTTPException(
            status_code=403,
            detail="La cuenta no está vinculada a un registro de estudiante.",
        )

    return estudiante_id


@router.get("/matriculas")
def mis_matriculas(
    usuario: dict = Depends(requiere_roles("ESTUDIANTE")),
):
    estudiante_id = obtener_estudiante_vinculado(usuario)

    with conexion_lectura() as conexion:
        filas = conexion.execute(
            """
            SELECT
                m.id,
                a.codigo AS asignatura_codigo,
                a.nombre AS asignatura_nombre,
                s.codigo AS seccion_codigo,
                p.anio || '-' || p.numero AS periodo_nombre,
                m.fecha_matricula,
                m.estado
            FROM matriculas m
            JOIN secciones s ON s.id = m.seccion_id
            JOIN asignaturas a ON a.id = s.asignatura_id
            JOIN periodos p ON p.id = s.periodo_id
            WHERE m.estudiante_id = ?
            ORDER BY p.anio DESC, p.numero DESC, a.codigo
            """,
            (estudiante_id,),
        ).fetchall()

    return filas_a_lista(filas)


@router.get("/calificaciones")
def mis_calificaciones(
    usuario: dict = Depends(requiere_roles("ESTUDIANTE")),
):
    estudiante_id = obtener_estudiante_vinculado(usuario)

    with conexion_lectura() as conexion:
        filas = conexion.execute(
            """
            SELECT
                m.id AS matricula_id,
                a.codigo AS asignatura_codigo,
                a.nombre AS asignatura_nombre,
                s.codigo AS seccion_codigo,
                p.anio || '-' || p.numero AS periodo_nombre,
                m.estado AS estado_matricula,
                c.primer_parcial,
                c.segundo_parcial,
                c.tercer_parcial,
                c.nota_final,
                c.observacion
            FROM matriculas m
            JOIN secciones s ON s.id = m.seccion_id
            JOIN asignaturas a ON a.id = s.asignatura_id
            JOIN periodos p ON p.id = s.periodo_id
            LEFT JOIN calificaciones c ON c.matricula_id = m.id
            WHERE m.estudiante_id = ?
            ORDER BY p.anio DESC, p.numero DESC, a.codigo
            """,
            (estudiante_id,),
        ).fetchall()

    return filas_a_lista(filas)
