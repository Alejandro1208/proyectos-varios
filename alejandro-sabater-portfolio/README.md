<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Portfolio CMS (React + PHP)

Frontend en Vite/React/TS y backend PHP sencillo con MySQL. El panel `/admin` permite editar perfil, proyectos, videos y redes sociales de forma persistente.

## Prerrequisitos
- Node.js 18+ (frontend)
- PHP 8+ con extensiones PDO MySQL
- MySQL disponible y accesible

## Configuración de entorno
1. Copia `.env.example` a `.env.local` y ajusta:
   - `VITE_API_URL`: URL del backend (ej: `http://localhost:8000/api`)
   - `GEMINI_API_KEY`: placeholder si no lo usas
   - Opcionales para backend si los exportas en el entorno: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
2. Backend toma los valores de `api/config/config.php`; variables de entorno sobrescriben los defaults.

## Base de datos
1. Ejecuta el SQL de `database.sql` en tu base:
   - Tablas: `profiles`, `profile_skills`, `projects`, `project_technologies` (ON DELETE CASCADE), `socials`, `videos`
   - Incluye datos seed de ejemplo.

## Ejecutar backend (PHP)
Ejemplo con servidor embebido:
```bash
php -S localhost:8000 -t api
```
Si sirves desde otro docroot, asegúrate de apuntar `VITE_API_URL` a la ruta `/api`.

## Ejecutar frontend
```bash
npm install
npm run dev
```
La app usa `VITE_API_URL` para hablar con el backend. Si backend y frontend corren en el mismo host/puerto, puedes dejar `/api`; de lo contrario usa la URL completa.

## Pruebas manuales
1) Abrir frontend y entrar a `/admin` (credenciales actuales: `AleejandroSabater1992` / `Giovanni2906`).  
2) Editar Perfil: texto + subir avatar → Guardar Perfil → recargar para confirmar persistencia.  
3) Proyectos: crear/editar (incluye imagen y tecnologías), eliminar proyecto → recargar.  
4) Videos: crear/editar (id YouTube + título), eliminar → recargar y ver en pestaña Contacto.  
5) Redes sociales: crear/editar/eliminar → verificar en Contacto.  
6) Observar mensajes de error si el backend no responde; el fallback local se usa sólo si la API falla.
