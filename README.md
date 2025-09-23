# Sistema Experto de Recomendaciones de Viajes - Perú 🇵🇪

Un sistema experto inteligente desarrollado completamente en JavaScript que proporciona recomendaciones personalizadas de destinos turísticos en Perú basado en las preferencias del usuario.

## 🎯 Características

- **Frontend moderno**: Vue.js 3 + TypeScript + Tailwind CSS + Shadcn/UI
- **Sistema experto cliente**: Lógica completa en JavaScript sin necesidad de backend
- **Recomendaciones inteligentes**: Basadas en 6 parámetros clave del usuario
- **Algoritmo de scoring avanzado**: Sistema de puntuación ponderado con bonificaciones especiales
- **Interfaz intuitiva**: Diseño responsive con animaciones suaves
- **Persistencia local**: Guarda preferencias en localStorage

## 🏗️ Arquitectura del Sistema

### Parámetros de Entrada (Inputs del Usuario)

1. **Presupuesto**: Baja (< S/1,000) | Media (S/1,000-3,000) | Alta (> S/3,000)
2. **Tipo de Actividad**: Cultura, Aventura, Naturaleza, Gastronomía, Relax, Trekking, Vida Nocturna, Fotografía
3. **Preferencia Climática**: Cálido (>20°C) | Templado (10-20°C) | Frío (<10°C)
4. **Tipo de Transporte**: Aéreo | Terrestre | Mixto
5. **Duración del Viaje**: 1-3 días | 4-7 días | 7+ días
6. **Tipo de Grupo**: Individual | Pareja | Amigos | Familia | Grupo Organizado

### Sistema de Scoring Inteligente

El sistema experto utiliza un algoritmo de puntuación ponderado:
- **Presupuesto**: 30% del score (esencial para viabilidad)
- **Actividad**: 25% del score (preferencia principal)
- **Clima**: 20% del score (comodidad del viaje)
- **Duración**: 15% del score (tiempo disponible)
- **Transporte**: 5% del score (accesibilidad)
- **Tipo de Grupo**: 5% del score (experiencia social)

**Bonificaciones Especiales**:
- Destinos icónicos que coinciden perfectamente con actividades específicas
- Combinaciones románticas para parejas
- Experiencias únicas (Amazonía, Machu Picchu, etc.)

Solo se muestran destinos con score > 50% de compatibilidad.

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (v18+ recomendado)
- npm o yarn

### Inicio Rápido

1. **Clonar o descargar el proyecto**
2. **Ejecutar el archivo de inicio**:
   ```cmd
   start_frontend.bat
   ```

### Instalación Manual

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sistema estará disponible en: `http://localhost:5173`

## 📂 Estructura del Proyecto

```
sistema-experto-viajes/
│
├── src/
│   ├── App.vue                      # Componente principal
│   ├── main.ts                      # Punto de entrada
│   ├── index.css                    # Estilos globales y animaciones
│   ├── components/ui/               # Componentes Shadcn/UI
│   │   ├── button/
│   │   ├── dialog/
│   │   ├── input/
│   │   ├── label/
│   │   ├── card/
│   │   ├── badge/
│   │   └── select/
│   ├── composables/
│   │   └── useTravelSystem.js       # Composables Vue para estado
│   ├── data/
│   │   └── knowledgeBase.js         # Base de conocimiento completa
│   └── lib/
│       └── expertSystem.js          # Lógica del sistema experto
│
├── public/                          # Archivos estáticos
├── start_frontend.bat               # Script de inicio rápido
└── README.md                        # Documentación
```

## 🎮 Uso del Sistema

1. **Accede a la aplicación** en `http://localhost:5173`
2. **Completa tus preferencias** en el panel izquierdo:
   - Selecciona tu rango de presupuesto
   - Elige el tipo de actividad que prefieres
   - Indica tu preferencia climática
   - Selecciona tu medio de transporte preferido
   - Define la duración de tu viaje
   - Especifica el tipo de grupo de viaje
3. **Haz clic en "Obtener Recomendaciones"**
4. **Revisa los destinos sugeridos** con sus respectivos scores de compatibilidad
5. **Explora los detalles** de cada destino haciendo clic en "Ver Detalles y Actividades"

## 🗂️ Destinos Incluidos

- **Cusco y Machu Picchu**: Historia, cultura y trekking andino
- **Lima**: Capital gastronómica y cultural
- **Iquitos y Amazonía**: Naturaleza y aventura selvática
- **Máncora**: Playas, surf y vida nocturna
- **Arequipa y Colca**: Arquitectura colonial y naturaleza
- **Ica, Huacachina y Paracas**: Desierto, oasis y vida marina
- **Nazca**: Líneas misteriosas y cultura ancestral
- **Trujillo y Chan Chan**: Civilizaciones pre-incas

## 🧠 Lógica del Sistema Experto

### Algoritmo de Recomendación

```javascript
calculateMatchScore(destination, preferences) {
  let score = 0;
  
  // Compatibilidad de presupuesto (30%)
  if (destination.budget_level.includes(preferences.budget)) {
    score += 30;
  }
  
  // Compatibilidad de actividad (25%)
  if (destination.main_activities.includes(preferences.activity_type)) {
    score += 25;
  }
  
  // Bonificaciones especiales
  if (hasSpecialBonus(destination, preferences)) {
    score += calculateSpecialBonus(destination, preferences);
  }
  
  return score;
}
```

### Características Avanzadas

- **Actividades Complementarias**: Si no hay coincidencia exacta, evalúa actividades relacionadas
- **Bonificaciones Contextuales**: Puntos extra para combinaciones icónicas
- **Niveles de Compatibilidad**: Excelente (90%+), Muy buena (80%+), Buena (70%+)
- **Consejos Personalizados**: Tips específicos según preferencias

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Vue.js 3**: Framework reactivo con Composition API
- **TypeScript**: Tipado estático para mejor desarrollo
- **Tailwind CSS**: Framework CSS utility-first
- **Shadcn/UI**: Componentes de interfaz modernos
- **Vite**: Build tool ultrarrápido

### Sistema Experto
- **JavaScript ES6+**: Lógica del sistema experto
- **Vue Composables**: Gestión de estado reactivo
- **LocalStorage**: Persistencia de preferencias
- **Algoritmos personalizados**: Scoring y recomendaciones

## 🎨 Características de UI/UX

- **Diseño Responsive**: Funciona en desktop, tablet y móvil
- **Animaciones Suaves**: Transiciones CSS y Vue
- **Retroalimentación Visual**: Loading states, progress indicators
- **Accesibilidad**: Componentes accesibles con ARIA
- **Tema Peruano**: Colores y elementos inspirados en Perú

## 🚀 Funcionalidades Avanzadas

### Persistencia de Datos
- Guarda automáticamente las preferencias del usuario
- Carga preferencias al iniciar la aplicación
- Opción para limpiar datos guardados

### Sistema de Scoring Avanzado
- Evaluación multifactorial
- Bonificaciones por combinaciones especiales
- Explicaciones detalladas de por qué se recomienda cada destino

### Experiencia de Usuario
- Validación en tiempo real del formulario
- Estados de carga con animaciones
- Feedback visual para cada acción
- Diálogos informativos con detalles completos

## 📈 Métricas del Sistema

- **8 Destinos Principales** con información detallada
- **8 Tipos de Actividades** diferentes
- **5 Rangos de Presupuesto y Duración**
- **3 Tipos de Clima** cubiertos
- **5 Modalidades de Grupo** soportadas
- **Algoritmo de 100 puntos** de scoring máximo

## 🔮 Roadmap Futuro

- [ ] Más destinos (Amazonas, Cajamarca, Huánuco)
- [ ] Integración con APIs de clima en tiempo real
- [ ] Modo offline con PWA
- [ ] Exportación de itinerarios en PDF
- [ ] Sistema de favoritos y comparación
- [ ] Recomendaciones basadas en temporada
- [ ] Chat bot integrado para consultas
- [ ] Integración con redes sociales

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📜 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autores

- Desarrollado como parte del curso de Sistemas Inteligentes
- Sistema Experto implementado completamente en JavaScript
- Año: 2025

---

¡Explora Perú de manera inteligente con nuestro sistema experto! 🏔️🌊🏛️

**No se requiere backend - Todo funciona en el navegador** ✨
