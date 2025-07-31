# 📖 Documentación de Tama Web

## 🐾 ¿Qué es Tama Web?

**Tama Web** es una aplicación web moderna que simula una mascota virtual. Es un juego nostálgico donde los usuarios pueden cuidar de una mascota digital alimentándola, limpiándola, jugando con ella y asegurándose de que esté feliz y saludable.

### 🎯 Concepto Principal

La aplicación recrea la experiencia clásica de los Virutal Pets de los años 90, pero adaptada para navegadores web modernos. Los usuarios deben mantener viva y feliz a su mascota virtual atendiendo sus necesidades básicas en tiempo real.

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

- **Frontend Framework**: React 18 con TypeScript
- **UI Library**: Tamagui (componentes nativos multiplataforma)
- **Styling**: Tailwind CSS + Tamagui
- **Build Tool**: Vite
- **State Management**: Zustand + React Hooks
- **Internacionalización**: i18next
- **Package Manager**: pnpm
- **Web Workers**: Para lógica de juego en segundo plano

### 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── virtualPet/      # Componentes específicos de la mascota
│   ├── LanguageSwitcher.tsx
│   ├── SEO.tsx
│   └── Empty.tsx
├── hooks/               # Custom hooks
│   ├── virtualPet/     # Hooks específicos del juego
│   ├── useTheme.ts
│   └── useTranslation.ts
├── pages/              # Páginas de la aplicación
│   └── Home.tsx
├── types/              # Definiciones de TypeScript
│   └── pet-types.ts
├── utils/              # Utilidades y helpers
│   ├── gameUtils.ts
│   └── keyboard.ts
├── workers/            # Web Workers
│   └── virtualpet.worker.ts
├── i18n/              # Configuración de idiomas
│   └── locales/       # Archivos de traducción
└── lib/               # Librerías y configuraciones
```

## 🎮 Cómo Funciona el Juego

### 🐱 Sistema de Mascota Virtual

La mascota virtual tiene **5 estadísticas principales** que cambian con el tiempo:

1. **Hambre (0-100)**: Disminuye con el tiempo, se restaura alimentando
2. **Felicidad (0-100)**: Disminuye gradualmente, se mejora jugando
3. **Salud (0-100)**: Calculada como promedio de otras estadísticas
4. **Energía (0-100)**: Disminuye con actividad, se restaura durmiendo
5. **Limpieza (0-100)**: Disminuye lentamente, se restaura limpiando

### 📊 Estadísticas Adicionales

- **Edad**: Incrementa en tiempo real (mostrada en horas/días)
- **Peso**: Aumenta al alimentar, afecta la apariencia
- **Estado de Ánimo**: Determinado por las estadísticas principales

### 🎭 Estados de Ánimo y Animaciones

#### Estados de Ánimo:

- 😊 **Feliz**: Cuando todas las estadísticas están bien
- 😢 **Triste**: Cuando la felicidad es baja
- 😠 **Enojado**: En situaciones de estrés
- 🤒 **Enfermo**: Cuando la salud es crítica
- 😴 **Durmiendo**: Durante el descanso
- 🤤 **Hambriento**: Cuando necesita comida
- 🤢 **Sucio**: Cuando necesita limpieza

#### Animaciones:

- **Idle**: Estado de reposo normal
- **Walking**: Movimiento aleatorio por la pantalla
- **Eating**: Durante la alimentación
- **Sleeping**: Durante el descanso
- **Playing**: Durante el juego
- **Sick**: Cuando está enfermo
- **Dead**: Si la salud llega a 0

## 🎯 Mecánicas de Juego

### 🕹️ Acciones Disponibles

1. **🍎 Alimentar (F)**:

   - Aumenta hambre +30
   - Aumenta felicidad +10
   - Aumenta peso +2
   - Activa animación de comer

2. **😴 Dormir (S)**:

   - Aumenta energía +40
   - Aumenta felicidad +5
   - Activa animación de dormir

3. **🧽 Limpiar (C)**:

   - Restaura limpieza a 100
   - Aumenta felicidad +15
   - Mejora el estado general

4. **🎮 Jugar (P)**:
   - Aumenta felicidad +25
   - Disminuye energía -10
   - Activa animación de juego

### ⏰ Sistema de Tiempo Real

El juego utiliza un **Web Worker** que ejecuta la lógica en segundo plano:

- **Actualización cada 2 segundos**
- **Degradación automática** de estadísticas:
  - Hambre: -10 por hora
  - Felicidad: -5 por hora
  - Energía: -8 por hora
  - Limpieza: -3 por hora
- **Movimiento aleatorio** de la mascota
- **Persistencia automática** en localStorage

### 🚨 Sistema de Alertas

- **⚠️ Salud Crítica**: Cuando la salud < 20
- **🍎 Hambriento**: Cuando el hambre < 30
- **💀 Muerte**: Cuando la salud llega a 0

## 🖥️ Interfaz de Usuario

### 📱 Diseño del Dispositivo

La interfaz simula una consola:

- **Carcasa**: Diseño redondeado con gradientes y sombras
- **Pantalla**: Área verde oscura con efectos de CRT
- **Indicadores LED**: Muestran la página actual
- **Botones**: Estilo retro con efectos hover

### 🧭 Navegación

Tres páginas principales:

1. **MAIN**: Vista principal con la mascota y controles
2. **STATS**: Estadísticas detalladas y gráficos
3. **SETTINGS**: Configuraciones del juego

### ⌨️ Controles

- **Botones en pantalla**: Click directo en acciones
- **Atajos de teclado**:
  - `F` = Alimentar
  - `S` = Dormir
  - `C` = Limpiar
  - `P` = Jugar

## 🌍 Características Técnicas Avanzadas

### 🔄 Web Workers

La lógica del juego se ejecuta en un Web Worker separado para:

- **No bloquear la UI** durante cálculos
- **Mantener el juego activo** en segundo plano
- **Mejor rendimiento** y responsividad

### 💾 Persistencia de Datos

- **Guardado automático** en localStorage
- **Carga automática** al iniciar
- **Estado completo** de la mascota preservado
- **Historial de cuidados** (implementación futura)

### 🌐 Internacionalización

- **Soporte multiidioma**: Inglés y Español
- **Detección automática** del idioma del navegador
- **Cambio dinámico** de idioma sin recargar
- **Todas las interfaces** traducidas

### 📱 Progressive Web App (PWA)

- **Instalable** en dispositivos móviles
- **Funciona offline** (funcionalidad básica)
- **Manifest.json** configurado
- **Service Worker** para caching

### 🔍 SEO Optimizado

- **Meta tags** completos para redes sociales
- **Open Graph** para Facebook
- **Twitter Cards** para Twitter
- **Structured Data** (JSON-LD)
- **Sitemap.xml** y robots.txt
- **URLs canónicas**

## 🚀 Instalación y Desarrollo

### Prerrequisitos

```bash
# Node.js 18+
# pnpm (recomendado)
npm install -g pnpm
```

### Instalación

```bash
# Clonar repositorio
git clone [repository-url]
cd tamaweb

# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Construir para producción
pnpm build

# Vista previa de producción
pnpm preview
```

### Scripts Disponibles

- `pnpm dev`: Servidor de desarrollo
- `pnpm build`: Construcción para producción
- `pnpm lint`: Verificación de código
- `pnpm preview`: Vista previa de build
- `pnpm check`: Verificación de tipos TypeScript

## 🎨 Personalización

### 🎨 Temas y Estilos

- **Tamagui**: Para componentes base
- **Tailwind CSS**: Para estilos utilitarios
- **CSS personalizado**: Para efectos especiales
- **Variables CSS**: Para fácil personalización

### 🔧 Configuración

- **Velocidades de degradación** ajustables
- **Intervalos de actualización** configurables
- **Atajos de teclado** personalizables
- **Efectos de sonido** (preparado para implementar)

## 🔮 Funcionalidades Futuras

### 🎯 Roadmap

- **🔊 Efectos de sonido** y música
- **🎮 Mini-juegos** interactivos
- **🏆 Sistema de logros**
- **📊 Estadísticas avanzadas**
- **👥 Múltiples mascotas**
- **🎨 Personalización visual**
- **☁️ Sincronización en la nube**
- **📱 Notificaciones push**

### 🛠️ Mejoras Técnicas

- **Optimización de rendimiento**
- **Más animaciones fluidas**
- **Sistema de plugins**
- **API para extensiones**
- **Tests automatizados**
- **Documentación interactiva**

## 🤝 Contribución

### 📋 Guías de Desarrollo

1. **Seguir las convenciones** de TypeScript y React
2. **Usar componentes funcionales** con hooks
3. **Mantener código limpio** y documentado
4. **Optimizar rendimiento** con memo y callbacks
5. **Seguir principios DRY**
6. **Accesibilidad (a11y)** en todos los componentes

### 🔒 Seguridad

- **No exponer secretos** en el código
- **Validar todas las entradas**
- **Sanitizar datos** del localStorage
- **Headers de seguridad** configurados

---

## 📞 Soporte

Para preguntas, sugerencias o reportes de bugs, por favor:

1. **Revisar la documentación** completa
2. **Buscar en issues** existentes
3. **Crear un nuevo issue** con detalles
4. **Seguir las plantillas** de contribución

---

_Tama Web - Tu compañero virtual nostálgico en la web moderna_ 🐾✨
