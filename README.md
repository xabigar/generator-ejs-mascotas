# ejemplo-ejs

Dueños y mascotas con Express + EJS, generado con `express --view=ejs` y ampliado.
Es el mismo ejemplo que `express-ejs-duenos-mascotas`, pero con la estructura que crea Express Generator.

## Ejecutar
    npm install
    npm start        # http://localhost:3000

## Rutas
| Ruta | Archivo | Vista |
|---|---|---|
| `GET /` | `routes/index.js` | `views/index.ejs` (lista de dueños) |
| `POST /pets` | `routes/index.js` | redirige al dueño |
| `GET /owner/:id` | `routes/owner.js` | `views/owner.ejs` (dueño + mascotas) |
| cualquier otra | `app.js` | `views/error.ejs` (404) |

`views/partials/` contiene la cabecera y el pie reutilizables (`include`). Los datos están en `data.js`.
