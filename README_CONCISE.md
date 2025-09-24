# Sistema Experto de Viajes - Perú 🇵🇪

Motor de inferencia **Forward Chaining** que recomienda destinos turísticos en Perú basado en tus preferencias.

## ✨ Características

- **Motor de Inferencia Real**: Forward Chaining Algorithm implementado desde cero
- **35+ Reglas de Producción**: Sistema experto basado en conocimiento
- **Panel de Debug Educativo**: Ve el proceso de inferencia paso a paso
- **5 Estrategias de Resolución**: HIGHEST_PRIORITY, REFRACTION, RANDOM, etc.
- **Prevención de Bucles Infinitos**: Principio de refracción automático
- **100% en Español**: Código, variables y UI completamente localizados

## 🚀 Instalación

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`

## 🎮 Uso

1. **Completa 4 preferencias**: Actividad, Presupuesto, Duración, Clima
2. **Haz clic en "Buscar Destinos"**
3. **Ve las recomendaciones** con nivel de confianza
4. **Opcional**: Abre el panel de debug para ver cómo funciona la inferencia

## 🧠 Cómo Funciona

### Sistema de Reglas

```typescript
{
  name: "Cultura + Presupuesto Medio → Cusco",
  antecedents: ["actividad_preferida_cultura", "presupuesto_media"],
  consequent: "destino_recomendado_cusco-machu-picchu",
  priority: 9,
  confidence: 0.95
}
```

### Algoritmo Forward Chaining

1. Convierte preferencias en **hechos**
2. Encuentra reglas que pueden **dispararse**
3. Resuelve **conflictos** entre reglas candidatas
4. **Dispara** regla seleccionada y deriva nuevos hechos
5. Repite hasta que no haya más reglas aplicables
6. Genera **recomendaciones** finales

## 🗂️ Destinos

- **Cusco-Machu Picchu**: Cultura e historia andina
- **Lima**: Gastronomía y cultura urbana
- **Iquitos-Amazonas**: Naturaleza y aventura
- **Máncora**: Playas y relax
- **Arequipa-Colca**: Arquitectura colonial
- **Ica-Huacachina**: Desierto y oasis

## 🛠️ Stack Técnico

- **Vue.js 3 + TypeScript**: Frontend reactivo
- **Tailwind CSS**: Estilos modernos
- **Motor de Inferencia Propio**: Implementación desde cero
- **Vite**: Build tool rápido

## 📂 Estructura

```
src/
├── lib/inferenceEngine.ts        # Motor Forward Chaining
├── data/rulesKnowledgeBase.ts    # 35+ reglas de producción
├── composables/useInferenceEngine.ts # Vue integration
└── App.vue                       # UI principal con debug panel
```

## 🎓 Valor Educativo

**Único panel de debug** que muestra:

- 📝 Hechos iniciales derivados de preferencias
- 🔥 Reglas que se dispararon y por qué
- 💡 Nuevos hechos derivados por inferencia
- 🎯 Recomendaciones finales con explicaciones
- 📋 Traza completa del algoritmo paso a paso

**Perfecto para entender** cómo funcionan realmente los sistemas expertos.

---

**🧠 Sistema Experto Real • 🔬 Transparencia Total • 🎓 Educativo**
