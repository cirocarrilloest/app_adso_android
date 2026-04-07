# Demo CRUD de Empleados con React Native y Expo

Aplicacion movil de ejemplo pensada para estudiantes principiantes del SENA. La app consume una API REST real de empleados y muestra de forma sencilla las operaciones CRUD.

## API usada

La aplicacion usa este recurso:

`https://nodejs-test-tfzg.onrender.com/api/empleados`

Endpoints disponibles:

- `GET /api/empleados`: consultar empleados
- `POST /api/empleados`: crear empleado
- `GET /api/empleados/:id`: consultar un empleado
- `PUT /api/empleados/:id`: actualizar empleado
- `DELETE /api/empleados/:id`: eliminar empleado

## Campos del empleado

Segun la respuesta del servicio, cada empleado maneja estos campos:

- `_id`
- `name`
- `position`
- `office`
- `salary`

Ejemplo:

```json
[
  {
    "_id": "emp-demo-1",
    "name": "Ana Gomez",
    "position": "Desarrolladora",
    "office": "Bogota",
    "salary": 4200
  }
]
```

## Estructura del proyecto

```
APP_ADSO_ANDROID
├──src/
│ ├── components/
│ │ ├─ EmployeeForm.js
│ │ ├─ EmployeeItem.js
│ │ └─ MessageBox.js
│ ├── screens/
│ │ ├─ CreateEmployeeScreen.js
│ │ ├─ EditEmployeeScreen.js
│ │ └─ EmployeeListScreen.js
│ └── services/
│ └── api.js
├─────App.js
├─────app.json
└─────Babel.config.js
```

- `App.js`: configura la navegacion principal
- `src/screens/EmployeeListScreen.js`: pantalla de lista de empleados
- `src/screens/CreateEmployeeScreen.js`: pantalla para crear empleados
- `src/screens/EditEmployeeScreen.js`: pantalla para editar empleados
- `src/services/api.js`: URL base y funciones para consumir la API
- `src/components/EmployeeForm.js`: formulario reutilizable de crear y editar
- `src/components/EmployeeItem.js`: tarjeta visual de cada empleado
- `src/components/MessageBox.js`: mensajes simples de exito o error
- `app.json`: Define como se presenta la app dentro del ecosistema Expo y Expo Go.
- `babel.config.js`: Babel es la herramienta que transforma el codigo JavaScript moderno para que React Native y Expo puedan ejecutarlo correctamente.

## Como ejecutar

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar Expo:

```bash
npx expo start --tunnel
```

3. Abrir en un emulador Android o en Expo Go.

## Que aprende el estudiante con este proyecto

- Como organizar una app React Native con una estructura simple
- Como consumir una API REST real con `fetch`
- Como listar registros en una `FlatList`
- Como reutilizar un formulario para crear y editar
- Como mostrar mensajes de exito y error
- Como conectar la navegacion con acciones CRUD

## Donde cambiar la URL de la API

La URL base se encuentra en:

`src/services/api.js`

Busca esta linea:

```javascript
export const BASE_URL = "https://nodejs-test-tfzg.onrender.com/api/empleados";
```

Si deseas usar otra API, cambia esa direccion y adapta los campos del formulario segun la estructura del nuevo recurso.
