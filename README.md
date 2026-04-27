<div align="center">

<!-- Para usar el logo: guarda orbix-logo.svg en la raíz del repo -->
<img src="./src/assets/Favicon.png" width="100" height="100" alt="Orbix Logo" />

<svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="11" stroke="#22d3ee" stroke-width="0.5" opacity="0.2"/>
  <path 
    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.4323 2 18.467 3.73147 20.25 6.38" 
    stroke="#22d3ee" 
    stroke-width="1.5" 
    stroke-linecap="round"
  />
  <circle cx="12" cy="12" r="3.5" fill="#22d3ee"/>
  <circle cx="12" cy="12" r="3.5" fill="#22d3ee" opacity="0.3" r="5.5"/>
</svg>
 

# Orbix

**Visualización de datos espaciales en tiempo real, potenciada por IA.**

Orbix es una aplicación web que permite consultar y explorar datos del espacio exterior en tiempo real — asteroides, planetas, misiones activas y más

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Gemini AI](https://img.shields.io/badge/Gemini_Flash-Free_Tier-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)

</div>

---

## 🚀 ¿Qué es Orbix?

Orbix nace como proyecto de semana completa en Ironhack con un objetivo claro: hacer que los datos del espacio sean **accesibles, visuales e interactivos**. En lugar de tablas frías con coordenadas, Orbix presenta la información con animaciones fluidas.

**Casos de uso:**
- Consultar los Astronautas que estan en Orbita
- Explorar los datos de los siguientes lanzamientos
- informacion de astronautas y Lanazmientos

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Uso |
|------|-----------|-----|
| **UI Framework** | React 18 | Componentes y estado de la app |
| **Estilos** | Tailwind CSS | Diseño utility-first, tema oscuro espacial |
| **Animaciones** | Framer Motion | Transiciones, animaciones de órbita y efectos glow |
| **HTTP Client** | Axios | Llamadas a APIs externas |
| **IA** | Gemini Flash (Free Tier) | Asistente de interpretación de datos |
| **Data** | NASA APIs / Open APIs | Datos astronómicos en tiempo real |

---

## ⏱️ Timeline de Desarrollo

El proyecto se desarrolló en **una semana** (lunes a viernes), con una fase previa de planificación:

```
PRE-SEMANA  ─────────────────────────────────────────────
  Arquitectura & Preparación          ~8h
  · Definición de estructura de carpetas
  · Elección del stack tecnológico
  · Diseño inicial del sistema de componentes
  · Investigación de APIs disponibles

SEMANA DE DESARROLLO  ───────────────────────────────────
  Lunes - Martes   │ Estilos & UI                ~30h
                   │ · Sistema de diseño espacial
                   │ · Componentes base con Tailwind
                   │ · Animaciones con Framer Motion
                   │ · Layout y navegación

  Miércoles - Viernes │ Lógica & Integración     ~40h
                      │ · Integración con APIs de datos
                      │ · Estado global y gestión de datos
                      │ · Testing y refinamiento

TOTAL  ───────────────────────────────────────────────────
  ~78 horas de trabajo efectivo
        -Por Hacer | · Optimizar la parte Responsive  30H aprox
                   │ · Añadir utilidad a el Dashboard del usuario
                   │ · Dar funcionalidad al chat
```

---

## 📁 Estructura del Proyecto

```
Orbix/
├── public/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── pages/            # Vistas principales
│   ├── hooks/            # Custom hooks
│   ├── services/         # Llamadas a APIs (Axios)
│   ├── utils/            # Helpers y formatters
│   └── App.jsx
└── README.md
```

---

## ⚙️ Instalación y uso

```bash
# Clona el repositorio
git clone https://github.com/iDankest/Orbix.git
cd Orbix

# Instala dependencias
npm install

# Arranca en desarrollo
npm run dev
```

---

## 🌌 Desarrollado por

**Kilian** — Ironhack Web Development Bootcamp  
[github.com/iDankest](https://github.com/iDankest)

---

<div align="center">
  <sub>Hecho con ☕ y demasiadas horas mirando datos de asteroides</sub>
</div>
