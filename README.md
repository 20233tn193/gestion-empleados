# CRUD de Empleados

Aplicación web tipo CRUD para la gestión de empleados, desarrollada como proyecto de la materia **Desarrollo Web** del 9° cuatrimestre de la UTEZ.

## Descripción

Sistema completo que permite registrar, consultar, editar y eliminar empleados de una empresa. La aplicación está construida con una arquitectura cliente–servidor desacoplada: un **frontend SPA** en React + Vite que consume una **API REST** servida por Django (Django REST Framework) y respaldada por una base de datos **MySQL**.

Cada registro de empleado almacena 7 campos: nombre completo, correo electrónico, puesto, departamento, salario, fecha de contratación y estado (activo / inactivo).

## Tecnologías utilizadas

### Frontend
- **React 18** (con Hooks: `useState`, `useEffect`, `useMemo`)
- **Vite 6** (bundler / servidor de desarrollo)
- **JavaScript (ESM)**
- **Axios** (cliente HTTP)
- **CSS3** moderno (gradientes, variables CSS, animaciones)

### Backend
- **Python 3.13**
- **Django 5.1**
- **Django REST Framework 3.15** (ViewSets + Routers)
- **django-cors-headers** (manejo de CORS)
- **python-dotenv** (variables de entorno)

### Base de datos
- **MySQL 8** (configuración por defecto)
- **mysqlclient** (driver de Python)
- *Opcional*: SQLite para desarrollo rápido (set `USE_MYSQL=False`)

## Funcionalidades

- ✓ **Crear** nuevos empleados con validación de datos
- ✓ **Listar** todos los empleados en una tabla con búsqueda por nombre, email o puesto
- ✓ **Editar** información de empleados existentes
- ✓ **Eliminar** empleados con diálogo de confirmación
- ✓ **Búsqueda en tiempo real** (debounce de 300 ms)
- ✓ Filtrado por **departamento** (TI, RH, Ventas, Marketing, Finanzas, Operaciones)
- ✓ Estadísticas en vivo: total, activos, inactivos y nómina total
- ✓ **Validación** en el frontend y en el backend
- ✓ Notificaciones tipo *toast* para feedback al usuario
- ✓ Diseño **responsive** y moderno
- ✓ Panel de administración de Django (`/admin/`) para gestión avanzada

## Estructura del proyecto

```
crud-empleados/
├── backend/                     # API Django
│   ├── empleados_project/       # Configuración del proyecto
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── empleados/               # App de empleados
│   │   ├── models.py            # Modelo Empleado
│   │   ├── serializers.py       # DRF Serializer
│   │   ├── views.py             # ModelViewSet
│   │   ├── urls.py              # Rutas del router
│   │   └── admin.py
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/                    # SPA React + Vite
│   ├── src/
│   │   ├── api/empleadosApi.js  # Cliente Axios
│   │   ├── components/
│   │   │   ├── EmpleadosTable.jsx
│   │   │   ├── EmpleadoForm.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   └── Toast.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
└── README.md
```

## Endpoints de la API

| Método   | Endpoint                          | Descripción                          |
| -------- | --------------------------------- | ------------------------------------ |
| `GET`    | `/api/empleados/`                 | Lista todos los empleados            |
| `POST`   | `/api/empleados/`                 | Crea un nuevo empleado               |
| `GET`    | `/api/empleados/{id}/`            | Obtiene un empleado específico       |
| `PUT`    | `/api/empleados/{id}/`            | Actualiza un empleado completo       |
| `PATCH`  | `/api/empleados/{id}/`            | Actualiza parcialmente un empleado   |
| `DELETE` | `/api/empleados/{id}/`            | Elimina un empleado                  |
| `GET`    | `/api/empleados/?search=texto`    | Busca por nombre, email o puesto     |
| `GET`    | `/api/empleados/departamentos/`   | Lista los departamentos disponibles  |

## Instrucciones para ejecutar el proyecto

### Requisitos previos

- **Python 3.10+**
- **Node.js 18+** y **npm**
- **MySQL 8** (o usar SQLite con `USE_MYSQL=False`)
- **Git**

### 1. Clonar el repositorio

```bash
git clone https://github.com/<tu-usuario>/crud-empleados.git
cd crud-empleados
```

### 2. Configurar la base de datos MySQL

Inicia sesión en MySQL y crea la base de datos:

```sql
CREATE DATABASE crud_empleados CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configurar y ejecutar el backend

```bash
cd backend

# Crear y activar entorno virtual
python -m venv venv
source venv/bin/activate         # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de MySQL
# (o pon USE_MYSQL=False para usar SQLite)

# Aplicar migraciones
python manage.py makemigrations empleados
python manage.py migrate

# (Opcional) Crear superusuario para acceder al admin
python manage.py createsuperuser

# Levantar el servidor
python manage.py runserver
```

El backend quedará disponible en **http://127.0.0.1:8000**.
- API: `http://127.0.0.1:8000/api/empleados/`
- Admin: `http://127.0.0.1:8000/admin/`

### 4. Configurar y ejecutar el frontend

En otra terminal:

```bash
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env si tu API corre en otra URL

# Levantar el servidor de desarrollo
npm run dev
```

El frontend quedará disponible en **http://localhost:5173**.

### 5. Listo

Abre tu navegador en `http://localhost:5173` y comienza a gestionar empleados.

## Modelo de datos

```python
class Empleado(models.Model):
    nombre              = CharField(max_length=100)
    email               = EmailField(unique=True)
    puesto              = CharField(max_length=100)
    departamento        = CharField(choices=[TI, RH, VEN, MKT, FIN, OPE])
    salario             = DecimalField(max_digits=10, decimal_places=2)
    fecha_contratacion  = DateField()
    activo              = BooleanField(default=True)
    created_at          = DateTimeField(auto_now_add=True)
    updated_at          = DateTimeField(auto_now=True)
```

## Evidencias / Capturas de pantalla

> Las capturas se encuentran en la carpeta `docs/screenshots/` del repositorio. (Agrega aquí las imágenes una vez subas el proyecto a GitHub).

| Vista | Descripción |
| --- | --- |
| `screenshots/01-listado.png`   | Pantalla principal con la lista de empleados |
| `screenshots/02-crear.png`     | Formulario para crear un nuevo empleado     |
| `screenshots/03-editar.png`    | Edición de un empleado existente            |
| `screenshots/04-eliminar.png`  | Diálogo de confirmación para eliminar       |
| `screenshots/05-busqueda.png`  | Búsqueda en tiempo real                     |

Para insertar las imágenes en este README:

```markdown
![Listado de empleados](docs/screenshots/01-listado.png)
![Crear empleado](docs/screenshots/02-crear.png)
```

## Pruebas rápidas con cURL

```bash
# Crear empleado
curl -X POST http://127.0.0.1:8000/api/empleados/ \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Manuel Chávez","email":"juan@empresa.com","puesto":"Desarrollador","departamento":"TI","salario":"35000","fecha_contratacion":"2024-01-15","activo":true}'

# Listar empleados
curl http://127.0.0.1:8000/api/empleados/

# Actualizar empleado (id=1)
curl -X PUT http://127.0.0.1:8000/api/empleados/1/ \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan M. Chávez","email":"juan@empresa.com","puesto":"Senior Dev","departamento":"TI","salario":"45000","fecha_contratacion":"2024-01-15","activo":true}'

# Eliminar empleado (id=1)
curl -X DELETE http://127.0.0.1:8000/api/empleados/1/
```

## Uso de Inteligencia Artificial

**Sí, se usó IA en el desarrollo de este proyecto.**

Se utilizó **Cursor (Claude)** para apoyar en las siguientes tareas:

- **Generación inicial del scaffolding** del proyecto (estructura de carpetas, `settings.py`, `urls.py`, `package.json`, etc.).
- **Diseño de la interfaz** y los estilos CSS (paleta de colores, gradientes, animaciones, layout responsive).
- **Sugerencias de buenas prácticas** en Django REST Framework (uso de `ModelViewSet`, `Routers`, validaciones en serializers).
- **Documentación** y redacción del README.

El **diseño de la entidad** (campos del modelo `Empleado`), la **lógica de negocio** y la **arquitectura** del proyecto fueron decididos por el alumno. La IA actuó como asistente para acelerar la implementación, no como autora del proyecto. El código fue revisado, probado y ajustado manualmente.

## Autor

**Juan Manuel Chávez** — UTEZ, 9° Cuatrimestre, Ingeniería en TIC
