# Playlist Manager Frontend

Una aplicación web Angular para gestionar playlists musicales que consume la API REST de Playlist Manager.

## Características

- 🔐 **Autenticación JWT**: Login y registro de usuarios
- 📝 **Gestión de Playlists**: Crear, ver y eliminar playlists
- 🎵 **Gestión de Canciones**: Agregar canciones con título, artista, álbum, año y género
- 🔒 **Rutas Protegidas**: Acceso controlado con guards
- 📱 **Diseño Responsivo**: Funciona en dispositivos móviles y desktop
- ⚡ **Interceptores HTTP**: Manejo automático de tokens y refresh tokens

## Requisitos Previos

- Node.js 18+ 
- Angular CLI 17+
- API Backend ejecutándose en `http://localhost:8080`

## Instalación y Ejecución

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar la aplicación:
```bash
npm start
# o alternativamente
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/           # Componentes de la aplicación
│   │   ├── login.component.ts
│   │   ├── register.component.ts
│   │   └── playlists.component.ts
│   ├── services/            # Servicios para API
│   │   ├── auth.service.ts
│   │   ├── playlist.service.ts
│   │   └── spotify.service.ts
│   ├── models/              # Interfaces y tipos
│   │   └── api.models.ts
│   ├── guards/              # Guards de rutas
│   │   └── auth.guard.ts
│   ├── interceptors/        # Interceptores HTTP
│   │   └── auth.interceptor.ts
│   ├── app.routes.ts        # Configuración de rutas
│   └── app.config.ts        # Configuración de la app
└── styles.css               # Estilos globales
```

## Funcionalidades

### Autenticación
- **Registro**: Crear nueva cuenta con usuario, email, nombre, apellido y contraseña
- **Login**: Acceso con usuario/contraseña
- **Auto-login**: Verificación automática de tokens almacenados
- **Logout**: Cierre de sesión seguro con revocación de tokens

### Gestión de Playlists
- **Crear Playlist**: Formulario para crear playlists con canciones
- **Ver Playlists**: Lista de todas las playlists del usuario
- **Eliminar Playlist**: Eliminación con confirmación
- **Validaciones**: Formularios con validación en tiempo real

### Gestión de Canciones
- **Campos**: Título*, Artista*, Álbum, Año, Género (* requeridos)
- **Agregar/Quitar**: Dinámicamente agregar y quitar canciones del formulario
- **Validación**: Validación de tipos y rangos (año: 1900-2030)

## API Endpoints Utilizados

### Autenticación
- `POST /api/v1/auth/login` - Iniciar sesión
- `POST /api/v1/auth/register` - Registrar usuario  
- `POST /api/v1/auth/logout` - Cerrar sesión
- `POST /api/v1/auth/refresh` - Renovar token
- `GET /api/v1/auth/verify-token` - Verificar token
- `GET /api/v1/auth/me` - Obtener usuario actual

### Playlists
- `GET /lists` - Obtener todas las playlists
- `POST /lists` - Crear nueva playlist
- `GET /lists/{name}` - Obtener playlist por nombre
- `DELETE /lists/{name}` - Eliminar playlist

## Uso

1. **Primera vez**: Accede a la aplicación y serás redirigido al login
2. **Registro**: Si no tienes cuenta, haz clic en "Regístrate aquí"
3. **Login**: Ingresa tus credenciales para acceder
4. **Crear Playlist**: En el dashboard, completa el formulario de nueva playlist
5. **Agregar Canciones**: Usa el botón "+ Agregar Canción" para más canciones
6. **Gestionar**: Ve, elimina y administra tus playlists desde la lista

## Scripts de Angular CLI

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Tecnologías

- **Angular 17**: Framework principal con componentes standalone
- **Angular Router**: Navegación y guards de ruta
- **Angular Forms**: Formularios reactivos con validación
- **Angular HTTP**: Cliente HTTP con interceptores
- **RxJS**: Programación reactiva
- **TypeScript**: Tipado estático
- **CSS Grid/Flexbox**: Layout responsivo

## Troubleshooting

### Error de CORS
Si encuentras errores de CORS, asegúrate de que el backend tenga configurado el origen correcto para `http://localhost:4200`.

### Token Expirado
La aplicación maneja automáticamente la renovación de tokens. Si persisten problemas, cierra sesión e inicia nuevamente.

### Errores de Conexión
Verifica que el backend esté ejecutándose en `http://localhost:8080` y que todos los endpoints estén disponibles.
