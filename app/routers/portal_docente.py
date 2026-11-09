from fastapi import APIRouter, Depends, HTTPException

from app.database import conexion_lectura
from app.routers.auth import requiere_roles


router = APIRouter(
    prefix="/mi-cuenta",
    tags=["Portal docente"],
)


@router.get("/perfil-docente")
def obtener_mi_perfil_docente(
    usuario: dict = Depends(requiere_roles("DOCENTE")),
):
    docente_id = usuario.get("docente_id")

    if docente_id is None:
        raise HTTPException(
            status_code=403,
            detail="La cuenta no está vinculada a un registro docente.",
        )

    with conexion_lectura() as conexion:
        fila = conexion.execute(
            """
            SELECT
                id,
                numero_empleado,
                nombres,
                apellidos,
                correo,
                especialidad,
                estado
            FROM docentes
            WHERE id = ?
            """,
            (docente_id,),
        ).fetchone()

    if fila is None:
        raise HTTPException(
            status_code=404,
            detail="No se encontró el perfil docente vinculado.",
        )

    return dict(fila)