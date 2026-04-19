# 🌌 Orbix - Space Explorer Dashboard

Un **SPA (Single Page Application)** interactivo construido con **React** que proporciona datos en tiempo real sobre actividad espacial, astronautas en órbita, próximas misiones y lanzamientos espaciales.

**Orbix** es un proyecto desarrollado como parte del **Bootcamp de Ironhack**, demostrando profundo conocimiento de React, estado, hooks avanzados e integración con APIs externas gratuitas.

---

## ✨ Características Principales

### 🚀 Datos en Tiempo Real
- **Astronautas en órbita** - Lista actualizada de personas en el espacio ahora mismo
- **Próximos lanzamientos** - Información de misiones de SpaceX, NASA, ESA, CNSA
- **Estadísticas espaciales** - Tasas de éxito, satélites activos, historial de lanzamientos
- **Auto-refresh** - Los datos se actualizan automáticamente cada 60 segundos

### 🎨 Diseño Moderno
- Interfaz **futurista** con tema oscuro (inspirada en SpaceX)
- Paleta de colores: Azul marino, Cian y Naranja
- **Responsivo** - Mobile-first, funciona en desktop, tablet y móvil
- Animaciones suaves con hover effects elegantes

### ⚡ Tecnología
- **React 19** - Componentes funcionales con Hooks
- **Tailwind CSS** - Estilos modernos y reutilizables
- **Axios** - Cliente HTTP para API calls
- **Vite** - Build tool ultra rápido

---

## 🛠️ Tech Stack

```
Frontend:
  • React 19.2.4
  • Tailwind CSS 3.4.x
  • Axios (HTTP client)
  • React Router DOM (navegación)

Build & Dev:
  • Vite 8.0.4
  • ESLint + Prettier (linting)

APIs (externas, gratuitas):
  • OpenNotify API - Astronautas en órbita
  • SpaceX API - Lanzamientos y cohetes
  • The Space Devs API - Base de datos de lanzamientos
  • NASA Events API - Eventos espaciales
```

---

## 📦 Instalación

### Requisitos Previos
- **Node.js** >= 18.0.0
- **npm** o **yarn**

### Pasos de Instalación

1. **Clonar o descargar el repositorio**
```bash
cd orbix
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

### Build para producción
```bash
npm run build
```

El resultado estará en la carpeta `dist/`

---

## 🏗️ Estructura del Proyecto

```
orbix/
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Navegación principal
│   │   ├── HeroSection.jsx            # Banner de bienvenida
│   │   ├── Card.jsx                   # Componente card reutilizable
│   │   ├── LoadingSpinner.jsx         # Indicador de carga
│   │   ├── AstronautCard.jsx          # (por crear)
│   │   ├── MissionCard.jsx            # (por crear)
│   │   └── ...otros componentes
│   │
│   ├── hooks/
│   │   ├── useAstronauts.js           # Hook para astronautas
│   │   ├── useSpaceXLaunches.js       # Hook para misiones SpaceX
│   │   ├── useCountdown.js            # (por crear) Cuenta atrás
│   │   └── ...otros hooks
│   │
│   ├── pages/
│   │   ├── HomePage.jsx               # (por crear)
│   │   ├── AstronautsPage.jsx         # (por crear)
│   │   ├── MissionsPage.jsx           # (por crear)
│   │   └── DetailPage.jsx             # (por crear)
│   │
│   ├── context/
│   │   └── SpaceDataContext.jsx       # (por crear) Estado global
│   │
│   ├── utils/
│   │   ├── apiClient.js               # Cliente Axios centralizado
│   │   ├── dateFormatters.js          # (por crear)
│   │   └── constants.js               # (por crear)
│   │
│   ├── assets/                        # Imágenes, íconos
│   ├── App.jsx                        # Componente principal
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Estilos Tailwind + CSS personalizado
│
├── public/                            # Assets estáticos
├── package.json                       # Dependencias
├── tailwind.config.js                 # Configuración Tailwind
├── postcss.config.js                  # Configuración PostCSS
├── vite.config.js                     # Configuración Vite
└── README.md                          # Este archivo
```

---

## 🚀 Guía de Uso

### Página Principal
La página de inicio muestra:
- **Header** con navegación y avatar de usuario
- **Hero Section** con botón "Empezar Exploración"
- **4 Cards principales**:
  - Personas en el espacio (actualizado en tiempo real)
  - Próximo lanzamiento con cuenta atrás
  - Misiones activas por agencia
  - Estadísticas generales

- **Grid de astronautas** - Lista de personas actualmente en órbita
- **Footer** con créditos y enlaces

### Datos en Tiempo Real
Los datos se actualizan automáticamente:
- **Astronautas**: cada 60 segundos (auto-refresh)
- **Lanzamientos**: cada 5 minutos
- Los usuarios NO verán interrupciones durante la actualización

### Filtros y Búsqueda (próximas fases)
- Buscar astronautas por nombre
- Filtrar misiones por agencia (NASA, SpaceX, ESA, CNSA)
- Filtrar por estado de misión (planificada, confirmada, en revisión)

---

## 📚 APIs Utilizadas

### 1. **OpenNotify ISS API**
```
Endpoint: http://api.open-notify.org/astros.json
Datos: Astronautas en órbita en tiempo real
Auth: Sin API key requerida
Respuesta: { people: [...], number: 8 }
```

### 2. **SpaceX API**
```
Base: https://api.spacexdata.com/v4/

Endpoints:
  • /launches           - Todos los lanzamientos
  • /launches/next      - Próximo lanzamiento
  • /launches/upcoming  - Próximos 10
  • /rockets            - Especificaciones de cohetes

Auth: Sin API key requerida
```

### 3. **The Space Devs Launch Library**
```
Base: https://ll.thespacedevs.com/2.0.0/

Datos: Base de datos mundial de lanzamientos
Auth: Sin API key requerida
Soporta: Filtros avanzados, datos históricos y futuros
```

### 4. **NASA Events API**
```
Endpoint: https://eonet.gsfc.nasa.gov/api/v3/events
Datos: Eventos naturales detectados por satélites
Auth: Sin API key requerida
```

---

## 🧠 React Concepts Demostrados

### ✅ Fundamentos React
- Componentes funcionales
- Props y composición de componentes
- JSX correcto
- Separación de responsabilidades

### ✅ Hooks Avanzados
- `useState` - Gestión de estado local
- `useEffect` - Efectos secundarios y ciclos de vida
- **Custom Hooks** - `useAstronauts()`, `useSpaceXLaunches()`
- Limpieza de efectos (intervals, abortController)

### ✅ Manejo de Datos
- Fetch desde múltiples APIs externas
- Estados de carga (loading, error, data)
- Manejo de errores con try/catch
- Caché básico de datos

### ✅ Formularios
- Inputs controlados (búsqueda)
- Manejo de eventos onChange
- Validación básica

### ✅ Enrutamiento (próximo)
- React Router v6
- Navegación entre páginas
- Rutas dinámicas

### ✅ Rendimiento
- React.memo para componentes puros
- useMemo para cálculos costosos
- useCallback para funciones memoizadas

### ✅ Estilos
- Tailwind CSS utilities
- CSS personalizado
- Variables de CSS para temas

---

## 📋 Checklist de Implementación (Bootcamp Ironhack)

- [x] Componentes funcionales y JSX correcto
- [x] Props bien tipadas
- [x] useState en componentes
- [x] Eventos (onClick, onChange)
- [x] useEffect con dependencias correctas
- [x] Custom hooks (useAstronauts, useSpaceXLaunches)
- [x] Fetch desde APIs múltiples
- [x] Manejo de estado (loading, error, data)
- [x] Formularios controlados (en progreso)
- [ ] React Router (próximo)
- [ ] Context API para estado global (próximo)
- [ ] React.memo y memoización (próximo)
- [ ] Testing básico (próximo)

---

## 🎯 Próximas Características (Roadmap)

### Fase 2
- [ ] Página detallada de astronautas con búsqueda
- [ ] Página de misiones con filtros por agencia
- [ ] Cuenta atrás animada para próximos lanzamientos
- [ ] Mapa interactivo de ubicación de astronautas

### Fase 3
- [ ] React Router para navegación entre páginas
- [ ] Context API para estado global
- [ ] Persistencia de datos con localStorage
- [ ] Tema oscuro/claro toggle

### Fase 4 (Bonus)
- [ ] React Query para caché avanzado
- [ ] Testing con Vitest + React Testing Library
- [ ] TypeScript para type safety
- [ ] Notificaciones de alertas (toast)

---

## 🎨 Diseño y Paleta de Colores

### Colores Principales
```
Primario (Fondo):  #0f172a - Azul marino oscuro
Secundario:        #00d4ff - Cian brillante
Acento:            #ff6b35 - Naranja
Complementario:    #a78bfa - Púrpura
Texto:             #f0f4f8 - Blanco suave
```

### Componentes Tailwind Personalizados
```css
.btn-primary    /* Botón azul cyan */
.btn-secondary  /* Botón outline */
.card           /* Card con bordes cyan */
.section-title  /* Título de sección */
.btn-nav        /* Botón de navegación */
```

---

## 🐛 Troubleshooting

### "No se cargan los datos de astronautas"
- Verifica conexión a internet
- Abre la consola (F12) y busca errores de CORS
- Comprueba que OpenNotify API está disponible: http://api.open-notify.org/astros.json

### "Estilos de Tailwind no se aplican"
- Asegúrate de tener `npm install` completado
- Reinicia el servidor `npm run dev`
- Comprueba que `index.css` tiene las directivas `@tailwind`

### "Problema con CORS en APIs"
- Algunas APIs pueden tener restricciones CORS
- Verifica que estés usando endpoints públicos sin autenticación
- Para SpaceX y OpenNotify, CORS está habilitado

---

## 📝 Commits Recomendados (Git)

```
git add .
git commit -m "feat: Initial Orbix project setup with React, Tailwind, Axios"
git commit -m "feat: Add Header, HeroSection, Card components"
git commit -m "feat: Implement useAstronauts and useSpaceXLaunches hooks"
git commit -m "feat: Add Overview cards with API data"
git commit -m "feat: Add astronauts grid with real-time data"
```

---

## 📚 Recursos Útiles

### Documentación
- [React Official Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com)
- [Vite Guide](https://vitejs.dev/guide/)

### APIs Documentación
- [OpenNotify API](http://open-notify.org/api/)
- [SpaceX API](https://github.com/r-spacex/SpaceX-API)
- [The Space Devs](https://spacelaunchnow.me/api)
- [NASA Events API](https://eonet.gsfc.nasa.gov)

### Tutoriales Relacionados
- React Hooks - https://react.dev/reference/react/hooks
- Custom Hooks - https://react.dev/learn/reusing-logic-with-custom-hooks
- Tailwind CSS Setup - https://tailwindcss.com/docs/installation

---

## 🤝 Contribuciones

Este es un proyecto educativo de Bootcamp. Las mejoras y sugerencias son bienvenidas:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-feature`
3. Commit: `git commit -m 'Add: nueva feature'`
4. Push: `git push origin feature/nueva-feature`
5. Pull Request

---

## 📄 Licencia

Proyecto educativo - Ironhack Bootcamp 2026

---

## 👤 Autor

Desarrollado por **Kilian** (@iDankest)
- GitHub: [github.com/iDankest](https://github.com/iDankest)
- Bootcamp: Ironhack Madrid 2026

---

## 🙏 Agradecimientos

- **Ironhack** - Por el bootcamp y educación en desarrollo web
- **OpenNotify** - Por API pública de astronautas en órbita
- **SpaceX** - Por su excelente API de lanzamientos
- **NASA** - Por datos espaciales públicos
- **The Space Devs** - Por base de datos de lanzamientos mundial

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa la sección **Troubleshooting**
2. Verifica que todas las dependencias estén instaladas
3. Limpia node_modules: `rm -rf node_modules && npm install`
4. Reinicia el servidor

---

**Última actualización:** Abril 2026
**Versión:** 0.1.0 (Fase 1 - En desarrollo)

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║  🌌 ORBIX - Space Explorer Dashboard                        ║
║                                                              ║
║  Explora la actividad espacial en tiempo real              ║
║  React • Tailwind • Vite • APIs Espaciales                 ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```