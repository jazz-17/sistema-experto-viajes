import { ref, computed } from 'vue'
import { MotorDeEncadenamientoProgresivo, ConflictResolutionStrategy } from '../lib/inferenceEngine'
import {
  BASE_DE_CONOCIMIENTOS,
  DESTINATION_INFO,
  CONSECUENTES_TERMINALES,
} from '../data/rulesKnowledgeBase'
import type { ExtendedRecommendation, TravelPreferences, Fact } from '@/types'

// Función para crear hechos a partir de las preferencias del usuario
function createFactsFromPreferences(preferences: TravelPreferences): Fact[] {
  const facts: Fact[] = []

  if (preferences.actividad_preferida) {
    facts.push({
      id: `actividad_preferida_${preferences.actividad_preferida}`,
      value: true,
      confidence: 1.0,
    })
  }

  if (preferences.presupuesto) {
    facts.push({
      id: `presupuesto_${preferences.presupuesto}`,
      value: true,
      confidence: 1.0,
    })
  }

  if (preferences.duracion) {
    facts.push({
      id: `duracion_${preferences.duracion}`,
      value: true,
      confidence: 1.0,
    })
  }

  if (preferences.tipo_grupo) {
    facts.push({
      id: `tipo_grupo_${preferences.tipo_grupo}`,
      value: true,
      confidence: 1.0,
    })
  }

  if (preferences.clima_preferido) {
    facts.push({
      id: `clima_preferido_${preferences.clima_preferido}`,
      value: true,
      confidence: 1.0,
    })
  }

  return facts
}

export function useInferenceEngine() {
  const isLoading = ref(false)
  const recommendations = ref<ExtendedRecommendation[]>([])
  const executionTrace = ref<string[]>([])
  const firedRules = ref<string[]>([])
  const debugInfo = ref<any>(null) // Agregado para panel de debug

  const ejecutarInferencia = async (preferences: TravelPreferences) => {
    isLoading.value = true

    try {
      // Limpiar estado anterior
      recommendations.value = []
      debugInfo.value = null
      executionTrace.value = []
      firedRules.value = []

      // Convertir preferencias a hechos
      const BASE_DE_HECHOS = createFactsFromPreferences(preferences)

      // CRUCIAL: Resetear estado de ejecución de todas las reglas antes de crear el motor
      BASE_DE_CONOCIMIENTOS.forEach((regla) => {
        regla.executed = false
      })

      // Crear instancia del motor de inferencia - De vuelta a HIGHEST_PRIORITY pero con más reglas
      const engine = new MotorDeEncadenamientoProgresivo(
        BASE_DE_CONOCIMIENTOS,
        BASE_DE_HECHOS,
        CONSECUENTES_TERMINALES,
        ConflictResolutionStrategy.HIGHEST_PRIORITY, // De vuelta a la estrategia original
      )

      const result = engine.inferir()

      // Store execution trace and fired rules for debugging
      executionTrace.value = result.executionTrace
      firedRules.value = result.firedRules.map((rule: any) => rule.name)

      // Store complete debug information
      debugInfo.value = {
        inputFacts: BASE_DE_HECHOS,
        firedRules: result.firedRules,
        derivedFacts: result.derivedFacts,
        executionTrace: result.executionTrace,
        finalRecommendations: result.finalRecommendations,
        totalRulesInKB: BASE_DE_CONOCIMIENTOS.length,
        timestamp: new Date().toLocaleString(),
      }

      // Create extended recommendations with full destination info
      const extendedRecommendations = result.finalRecommendations.map((rec: any) => {
        const destination = DESTINATION_INFO[rec.destinationId]
        return {
          ...rec,
          destination: destination || {
            id: rec.destinationId,
            name: rec.destinationId,
            description: 'Destino no encontrado',
            region: 'Desconocido',
            image: '❓',
            activities: [],
            climate: [],
            altitude: 'N/A',
            avgTemperature: 'N/A',
            bestMonths: [],
            accommodations: 'N/A',
            localFood: 'N/A',
            localTransport: 'N/A',
          },
        }
      })

      // Sort by confidence score (descending)
      recommendations.value = extendedRecommendations.sort(
        (a: any, b: any) => b.confidence - a.confidence,
      )
    } catch (error) {
      console.error('Error running inference:', error)
      recommendations.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    isLoading,
    recommendations,
    debugInfo, // Added for debug panel

    // Methods
    ejecutarInferencia,
  }
}
