# 🎵 Playlist Manager - Guía de Usuario

## ¿Qué es Playlist Manager?

Playlist Manager es una aplicación web completa desarrollada en Angular 17 que permite gestionar playlists musicales. La aplicación consume una API REST con autenticación JWT y ofrece una experiencia de usuario moderna y responsiva.

## 🚀 Funcionalidades Principales

### 1. **Página de Inicio** (`/home`)
- Página de bienvenida con información sobre la aplicación
- Enlaces directos a login, registro y estado de la API
- Información sobre endpoints disponibles
- Diseño atractivo con gradientes y animaciones

### 2. **Sistema de Autenticación**
- **Registro** (`/register`): Crear nueva cuenta con validación completa
- **Login** (`/login`): Acceso seguro con JWT tokens
- **Auto-login**: Verificación automática de tokens almacenados
- **Logout**: Cierre de sesión con revocación de tokens

### 3. **Gestión de Playlists** (`/playlists`)
- **Crear playlists**: Formulario completo con validaciones
- **Ver playlists**: Lista de todas las playlists del usuario
- **Eliminar playlists**: Con confirmación de seguridad
- **Gestión de canciones**: Agregar/quitar canciones dinámicamente

### 4. **Estado de la API** (`/api-status`)
- Verificación de conectividad con el backend
- Estado del servicio de Spotify
- Lista completa de endpoints disponibles
- Información de configuración del servidor

## 🔧 Tecnologías Implementadas

### Frontend
- **Angular 17**: Framework principal con componentes standalone
- **Angular Router**: Navegación con guards de seguridad
- **Angular Forms**: Formularios reactivos con validación
- **Angular HTTP**: Cliente HTTP con interceptores automáticos
- **RxJS**: Programación reactiva
- **TypeScript**: Tipado estático
- **CSS Grid/Flexbox**: Layout responsivo

### Características Técnicas
- **SSR (Server-Side Rendering)**: Renderizado del lado del servidor
- **HTTP Interceptors**: Manejo automático de tokens JWT
- **Route Guards**: Protección de rutas con AuthGuard
- **Platform Detection**: Compatibilidad con SSR usando isPlatformBrowser
- **Fetch API**: Configurado para mejor rendimiento en SSR

## 📋 Estructura de la Aplicación

```
src/app/
├── components/              # Componentes de la UI
│   ├── home.component.ts    # Página de inicio
│   ├── login.component.ts   # Formulario de login
│   ├── register.component.ts # Formulario de registro
│   ├── playlists.component.ts # Gestión de playlists
│   ├── navbar.component.ts  # Barra de navegación
│   └── api-status.component.ts # Estado de la API
├── services/               # Servicios para API
│   ├── auth.service.ts     # Autenticación y JWT
│   ├── playlist.service.ts # Gestión de playlists
│   └── spotify.service.ts  # Integración con Spotify
├── models/                 # Interfaces TypeScript
│   └── api.models.ts       # DTOs y tipos de la API
├── guards/                 # Guards de rutas
│   └── auth.guard.ts       # Protección de rutas autenticadas
├── interceptors/           # Interceptores HTTP
│   └── auth.interceptor.ts # Manejo automático de tokens
├── data/                   # Datos de prueba
│   └── mock-data.ts        # Datos mock para desarrollo
├── app.routes.ts           # Configuración de rutas
└── app.config.ts           # Configuración de la aplicación
```

## 🎯 Casos de Uso

### Para Usuarios Nuevos
1. Visitar la página de inicio
2. Hacer clic en "Registrarse"
3. Completar el formulario con datos válidos
4. Automáticamente serás logueado y redirigido a playlists
5. Crear tu primera playlist agregando canciones

### Para Usuarios Existentes
1. Hacer clic en "Iniciar Sesión" desde cualquier página
2. Ingresar credenciales
3. Acceder automáticamente a la gestión de playlists
4. Crear, ver o eliminar playlists según necesites

### Para Desarrolladores
1. Visitar `/api-status` para verificar conectividad
2. Ver documentación de endpoints disponibles
3. Comprobar el estado del servicio de Spotify
4. Verificar configuración del servidor

## 🔒 Seguridad Implementada

- **JWT Authentication**: Tokens seguros para autenticación
- **Route Guards**: Protección de rutas sensibles
- **HTTP Interceptors**: Manejo automático de headers de autorización
- **Token Refresh**: Renovación automática de tokens expirados
- **Input Validation**: Validación completa en formularios
- **XSS Protection**: Sanitización automática de Angular
- **HTTPS Ready**: Preparado para certificados SSL

## 📱 Diseño Responsivo

La aplicación está completamente optimizada para:
- **Desktop**: Experiencia completa con todas las funcionalidades
- **Tablet**: Layout adaptado con navigation colapsable
- **Mobile**: Interfaz optimizada para pantallas pequeñas
- **PWA Ready**: Preparado para convertir en Progressive Web App

## 🔗 Integración con API

### Endpoints Consumidos
```
Autenticación:
- POST /api/v1/auth/login      # Iniciar sesión
- POST /api/v1/auth/register   # Registrar usuario
- POST /api/v1/auth/logout     # Cerrar sesión
- POST /api/v1/auth/refresh    # Renovar token
- GET /api/v1/auth/verify-token # Verificar token
- GET /api/v1/auth/me          # Usuario actual

Playlists:
- GET /lists                   # Obtener playlists
- POST /lists                  # Crear playlist
- GET /lists/{name}            # Obtener por nombre
- DELETE /lists/{name}         # Eliminar playlist

Spotify:
- GET /api/v1/spotify          # Obtener mercados
```

### Formato de Datos
Todos los endpoints responden con el formato estandarizado:
```typescript
{
  success: boolean,
  httpCode: number,
  traceId: string,
  data?: any,
  error?: ApiExceptionResponse
}
```

## 🚀 Instrucciones de Desarrollo

### Prerrequisitos
- Node.js 18+
- Angular CLI 17+
- Backend API ejecutándose en `http://localhost:8080`

### Comandos
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
# La app estará en http://localhost:4200

# Construir para producción
npm run build

# Ejecutar tests
npm test
```

### Personalización
Para cambiar la URL del backend, modificar en:
- `auth.service.ts`: `private apiUrl = 'TU_URL/api/v1/auth'`
- `playlist.service.ts`: `private apiUrl = 'TU_URL/lists'`
- `spotify.service.ts`: `private apiUrl = 'TU_URL/api/v1/spotify'`

## 🎨 Personalización Visual

### Colores Principales
- **Primary**: `#007bff` (Azul)
- **Secondary**: `#6c757d` (Gris)
- **Success**: `#28a745` (Verde)
- **Danger**: `#dc3545` (Rojo)
- **Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

### Tipografía
- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Font Code**: 'Courier New', monospace

Los estilos se pueden personalizar en:
- `src/styles.css`: Estilos globales
- Componentes individuales: Estilos específicos de cada componente

¡Disfruta gestionando tus playlists musicales! 🎵
