import hashlib
import secrets
import time

from fastapi import APIRouter, Depends, HTTPException, Request, Response

from app.database import conexion_lectura, hash_clave, transaccion
from app.schemas import UsuarioLogin, UsuarioRespuesta


router = APIRouter(prefix="/auth", tags=["Autenticación"])

NOMBRE_COOKIE = "sesion_academica"
DURACION_SESION = 60 * 60 * 8  # 8 horas


def obtener_usuario_actual(request: Request) -> dict:
    """Busca la sesión recibida en la cookie y devuelve el usuario activo."""
    token = request.cookies.get(NOMBRE_COOKIE)

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Inicia sesión para continuar.",
        )

    token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()
    ahora = int(time.time())

    with conexion_lectura() as conexion:
        fila = conexion.execute(
            """
            SELECT u.id, u.usuario, u.nombre_completo, u.rol,
                   u.activo, u.estudiante_id
            FROM sesiones s
            JOIN usuarios u ON u.id = s.usuario_id
            WHERE s.token_hash = ? AND s.expira_en > ?
            """,
            (token_hash, ahora),
        ).fetchone()

    if fila is None or not fila["activo"]:
        raise HTTPException(
            status_code=401,
            detail="La sesión expiró o no es válida. Inicia sesión nuevamente.",
        )

    return dict(fila)







def requiere_roles(*roles_permitidos: str):
    """Rechaza la petición si el usuario no tiene un rol permitido."""

    def verificar_rol(
        usuario: dict = Depends(obtener_usuario_actual),
    ) -> dict:
        if usuario["rol"] not in roles_permitidos:
            raise HTTPException(
                status_code=403,
                detail="No tienes permiso para realizar esta acción.",
            )

        return usuario

    return verificar_rol







@router.post("/login", response_model=UsuarioRespuesta)
def iniciar_sesion(datos: UsuarioLogin, response: Response):
    with conexion_lectura() as conexion:
        fila = conexion.execute(
            "SELECT * FROM usuarios WHERE usuario = ?",
            (datos.usuario,),
        ).fetchone()

    if fila is None or fila["clave_hash"] != hash_clave(datos.clave):
        raise HTTPException(
            status_code=401,
            detail="Usuario o contraseña incorrectos",
        )

    if not fila["activo"]:
        raise HTTPException(
            status_code=403,
            detail="Este usuario está inactivo",
        )

    token = secrets.token_urlsafe(32)
    token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()
    ahora = int(time.time())

    with transaccion() as conexion:
        conexion.execute(
            "DELETE FROM sesiones WHERE expira_en <= ?",
            (ahora,),
        )
        conexion.execute(
            """
            INSERT INTO sesiones (token_hash, usuario_id, expira_en)
            VALUES (?, ?, ?)
            """,
            (token_hash, fila["id"], ahora + DURACION_SESION),
        )

    response.set_cookie(
        key=NOMBRE_COOKIE,
        value=token,
        httponly=True,
        secure=False,  # En producción con HTTPS debe cambiarse a True.
        samesite="lax",
        max_age=DURACION_SESION,
        path="/",
    )

    return {
        "id": fila["id"],
        "usuario": fila["usuario"],
        "nombre_completo": fila["nombre_completo"],
        "rol": fila["rol"],
    }


@router.post("/logout")
def cerrar_sesion(request: Request, response: Response):
    token = request.cookies.get(NOMBRE_COOKIE)

    if token:
        token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()

        with transaccion() as conexion:
            conexion.execute(
                "DELETE FROM sesiones WHERE token_hash = ?",
                (token_hash,),
            )

    response.delete_cookie(
        key=NOMBRE_COOKIE,
        path="/",
        httponly=True,
        samesite="lax",
    )

    return {"mensaje": "Sesión cerrada"}
