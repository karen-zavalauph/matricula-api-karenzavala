from pathlib import Path
import shutil
import sqlite3
import sys

CARPETA_PROYECTO = Path(__file__).resolve().parents[1]
RUTA_BD = CARPETA_PROYECTO / "sistema_academico.db"
RUTA_COPIA = CARPETA_PROYECTO / "sistema_academico_antes_roles.db"

if not RUTA_BD.exists():
    sys.exit(f"No se encontró la base de datos: {RUTA_BD}")

# Crea una copia si todavía no existe.
if not RUTA_COPIA.exists():
    shutil.copy2(RUTA_BD, RUTA_COPIA)
    print(f"Copia de seguridad creada: {RUTA_COPIA.name}")

conexion = sqlite3.connect(RUTA_BD)

try:
    # SQLite necesita esto para reconstruir la tabla que tiene la
    # restricción de roles ADMIN y DOCENTE.
    conexion.execute("PRAGMA foreign_keys = OFF")

    columnas = {
        fila[1]
        for fila in conexion.execute("PRAGMA table_info(usuarios)").fetchall()
    }

    definicion = conexion.execute(
        """
        SELECT sql
        FROM sqlite_master
        WHERE type = 'table' AND name = 'usuarios'
        """
    ).fetchone()

    if definicion is None:
        sys.exit("No existe la tabla usuarios.")

    sql_actual = definicion[0] or ""

    if "ESTUDIANTE" in sql_actual and "estudiante_id" in columnas:
        print("La tabla usuarios ya tiene los cambios.")
        sys.exit(0)

    expresion_estudiante = (
        "estudiante_id" if "estudiante_id" in columnas else "NULL"
    )

    conexion.execute("BEGIN IMMEDIATE")

    conexion.execute(
        """
        CREATE TABLE usuarios_nuevo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario TEXT NOT NULL UNIQUE,
            nombre_completo TEXT NOT NULL,
            clave_hash TEXT NOT NULL,
            rol TEXT NOT NULL DEFAULT 'DOCENTE'
                CHECK (rol IN ('ADMIN', 'DOCENTE', 'ESTUDIANTE')),
            activo INTEGER NOT NULL DEFAULT 1
                CHECK (activo IN (0, 1)),
            estudiante_id INTEGER UNIQUE,
            creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (estudiante_id)
                REFERENCES estudiantes(id)
                ON DELETE SET NULL
        )
        """
    )

    conexion.execute(
        f"""
        INSERT INTO usuarios_nuevo (
            id,
            usuario,
            nombre_completo,
            clave_hash,
            rol,
            activo,
            estudiante_id,
            creado_en
        )
        SELECT
            id,
            usuario,
            nombre_completo,
            clave_hash,
            rol,
            activo,
            {expresion_estudiante},
            creado_en
        FROM usuarios
        """
    )

    conexion.execute("DROP TABLE usuarios")
    conexion.execute("ALTER TABLE usuarios_nuevo RENAME TO usuarios")
    conexion.execute(
        """
        CREATE INDEX IF NOT EXISTS idx_usuarios_estudiante
        ON usuarios(estudiante_id)
        """
    )

    conexion.commit()
    conexion.execute("PRAGMA foreign_keys = ON")

    print("Migración completada.")
    print("Se conservaron las cuentas existentes.")
    print("Ahora se permite el rol ESTUDIANTE y el vínculo estudiante_id.")

except Exception:
    conexion.rollback()
    raise

finally:
    conexion.close()