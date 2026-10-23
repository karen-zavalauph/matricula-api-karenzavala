from fastapi import APIRouter, Depends, HTTPException, status

from app.database import conexion_lectura, hash_clave, transaccion
from app.routers.auth import requiere_roles
from app.schemas import (
    UsuarioAdminRespuesta,
    UsuarioActualizar,
    UsuarioCambiarClave,
    UsuarioCrear,
)


router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"],
    dependencies=[Depends(requiere_roles("ADMIN"))],
)


@router.get("", response_model=list[UsuarioAdminRespuesta])
def listar_usuarios():
    with conexion_lectura() as conexion:
        filas = conexion.execute(
            """
            SELECT id, usuario, nombre_completo, rol, activo, estudiante_id
            FROM usuarios
            ORDER BY nombre_completo
            """
        ).fetchall()

    return [dict(fila) for fila in filas]


@router.post(
    "",
    response_model=UsuarioAdminRespuesta,
    status_code=status.HTTP_201_CREATED,
)
def crear_usuario(datos: UsuarioCrear):
    with conexion_lectura() as conexion:
        existente = conexion.execute(
            "SELECT id FROM usuarios WHERE usuario = ?",
            (datos.usuario,),
        ).fetchone()

        if existente:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Ese nombre de usuario ya está registrado.",
            )

        if datos.estudiante_id is not None:
            estudiante = conexion.execute(
                "SELECT id FROM estudiantes WHERE id = ?",
                (datos.estudiante_id,),
            ).fetchone()

            if estudiante is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="No existe el estudiante seleccionado.",
                )

    try:
        with transaccion() as conexion:
            cursor = conexion.execute(
                """
                INSERT INTO usuarios (
                    usuario,
                    nombre_completo,
                    clave_hash,
                    rol,
                    activo,
                    estudiante_id
                )
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    datos.usuario,
                    datos.nombre_completo,
                    hash_clave(datos.clave),
                    datos.rol,
                    int(datos.activo),
                    datos.estudiante_id,
                ),
            )
            usuario_id = cursor.lastrowid

    except Exception as error:
        # También detecta duplicados si dos solicitudes llegan casi juntas.
        if "UNIQUE constraint failed" in str(error):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Ese nombre de usuario ya está registrado.",
            ) from error
        raise

    with conexion_lectura() as conexion:
        fila = conexion.execute(
            """
            SELECT id, usuario, nombre_completo, rol, activo, estudiante_id
            FROM usuarios
            WHERE id = ?
            """,
            (usuario_id,),
        ).fetchone()

    return dict(fila)



@router.put("/{usuario_id}", response_model=UsuarioAdminRespuesta)
def actualizar_usuario(
    usuario_id: int,
    datos: UsuarioActualizar,
    administrador: dict = Depends(requiere_roles("ADMIN")),
):
    with conexion_lectura() as conexion:
        usuario = conexion.execute(
            "SELECT id FROM usuarios WHERE id = ?",
            (usuario_id,),
        ).fetchone()

        if usuario is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado.",
            )

        if datos.estudiante_id is not None:
            estudiante = conexion.execute(
                "SELECT id FROM estudiantes WHERE id = ?",
                (datos.estudiante_id,),
            ).fetchone()

            if estudiante is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="No existe el estudiante seleccionado.",
                )

            cuenta_vinculada = conexion.execute(
                """
                SELECT id FROM usuarios
                WHERE estudiante_id = ? AND id <> ?
                """,
                (datos.estudiante_id, usuario_id),
            ).fetchone()

            if cuenta_vinculada:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Ese estudiante ya tiene una cuenta vinculada.",
                )

    if administrador["id"] == usuario_id and (
        datos.rol != "ADMIN" or not datos.activo
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No puedes desactivar o cambiar el rol de tu propia cuenta.",
        )

    with transaccion() as conexion:
        conexion.execute(
            """
            UPDATE usuarios
            SET nombre_completo = ?,
                rol = ?,
                activo = ?,
                estudiante_id = ?
            WHERE id = ?
            """,
            (
                datos.nombre_completo,
                datos.rol,
                int(datos.activo),
                datos.estudiante_id,
                usuario_id,
            ),
        )

    with conexion_lectura() as conexion:
        fila = conexion.execute(
            """
            SELECT id, usuario, nombre_completo, rol, activo, estudiante_id
            FROM usuarios
            WHERE id = ?
            """,
            (usuario_id,),
        ).fetchone()

    return dict(fila)


@router.put("/{usuario_id}/clave")
def cambiar_clave_usuario(
    usuario_id: int,
    datos: UsuarioCambiarClave,
):
    with conexion_lectura() as conexion:
        usuario = conexion.execute(
            "SELECT id FROM usuarios WHERE id = ?",
            (usuario_id,),
        ).fetchone()

    if usuario is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado.",
        )

    with transaccion() as conexion:
        conexion.execute(
            "UPDATE usuarios SET clave_hash = ? WHERE id = ?",
            (hash_clave(datos.clave), usuario_id),
        )
        # Cierra las sesiones de esa cuenta para que vuelva a iniciar sesión.
        conexion.execute(
            "DELETE FROM sesiones WHERE usuario_id = ?",
            (usuario_id,),
        )

    return {"mensaje": "Contraseña actualizada. El usuario debe iniciar sesión nuevamente."}