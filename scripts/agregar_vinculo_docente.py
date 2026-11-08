from pathlib import Path
import shutil
import sqlite3
import sys

CARPETA_PROYECTO = Path(__file__).resolve().parents[1]
RUTA_BD = CARPETA_PROYECTO / "sistema_academico.db"
RUTA_COPIA = CARPETA_PROYECTO / "sistema_academico_antes_vinculo_docente.db"

if not RUTA_BD.exists():
    sys.exit(f"No se encontró la base de datos: {RUTA_BD}")

if not RUTA_COPIA.exists():
    shutil.copy2(RUTA_BD, RUTA_COPIA)
    print(f"Copia de seguridad creada: {RUTA_COPIA.name}")

conexion = sqlite3.connect(RUTA_BD)

try:
    conexion.execute("PRAGMA foreign_keys = ON")

    tablas = {
        fila[0]
        for fila in conexion.execute(
            "SELECT name FROM sqlite_master WHERE type = 'table'"
        ).fetchall()
    }

    if "usuarios" not in tablas or "docentes" not in tablas:
        sys.exit("Falta la tabla usuarios o docentes en la base de datos.")

    columnas = {
        fila[1]
        for fila in conexion.execute(
            "PRAGMA table_info(usuarios)"
        ).fetchall()
    }

    conexion.execute("BEGIN IMMEDIATE")

    if "docente_id" not in columnas:
        conexion.execute(
            """
            ALTER TABLE usuarios
            ADD COLUMN docente_id INTEGER
            REFERENCES docentes(id) ON DELETE SET NULL
            """
        )

    conexion.execute(
        """
        CREATE UNIQUE INDEX IF NOT EXISTS idx_usuarios_docente
        ON usuarios(docente_id)
        """
    )

    # Vincula automáticamente solo cuando el nombre coincide de forma única.
    conexion.execute(
        """
        UPDATE usuarios AS u
        SET docente_id = (
            SELECT d.id
            FROM docentes d
            WHERE LOWER(TRIM(d.nombres || ' ' || d.apellidos)) =
                  LOWER(TRIM(u.nombre_completo))
        )
        WHERE u.rol = 'DOCENTE'
          AND u.docente_id IS NULL
          AND (
              SELECT COUNT(*)
              FROM docentes d
              WHERE LOWER(TRIM(d.nombres || ' ' || d.apellidos)) =
                    LOWER(TRIM(u.nombre_completo))
          ) = 1
          AND (
              SELECT COUNT(*)
              FROM usuarios u2
              WHERE u2.rol = 'DOCENTE'
                AND LOWER(TRIM(u2.nombre_completo)) =
                    LOWER(TRIM(u.nombre_completo))
          ) = 1
        """
    )

    conexion.commit()

    vinculados = conexion.execute(
        """
        SELECT COUNT(*) FROM usuarios
        WHERE rol = 'DOCENTE' AND docente_id IS NOT NULL
        """
    ).fetchone()[0]

    pendientes = conexion.execute(
        """
        SELECT usuario FROM usuarios
        WHERE rol = 'DOCENTE' AND docente_id IS NULL
        ORDER BY usuario
        """
    ).fetchall()

    print("Migración completada.")
    print(f"Cuentas DOCENTE vinculadas automáticamente: {vinculados}")

    if pendientes:
        print("Cuentas que necesitarán vincularse manualmente:")
        for fila in pendientes:
            print(f"- {fila[0]}")

except Exception:
    conexion.rollback()
    raise

finally:
    conexion.close()