import { ref, computed } from 'vue'
import { ForwardChainingEngine, ConflictResolutionStrategy } from '../lib/inferenceEngine'
import { travelRules, destinationInfo } from '../data/rulesKnowledgeBase'
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

  const getRecommendations = async (preferences: TravelPreferences) => {
    // Prevenir múltiples llamadas concurrentes
    if (isLoading.value) {
      console.warn('⚠️ Inferencia ya en proceso, ignorando nueva solicitud')
      return
    }

    isLoading.value = true

    try {
      // Limpiar estado anterior
      recommendations.value = []
      debugInfo.value = null
      executionTrace.value = []
      firedRules.value = []

      // Convertir preferencias a hechos
      const facts = createFactsFromPreferences(preferences)

      // CRUCIAL: Resetear estado de ejecución de todas las reglas antes de crear el motor
      travelRules.forEach((rule) => {
        rule.executed = false
      })

      // Debug: Verificar que las reglas se resetearon correctamente
      const executedRulesCount = travelRules.filter((rule) => rule.executed).length
      console.log(
        `🔄 DEBUG: Reglas reseteadas. Reglas marcadas como ejecutadas: ${executedRulesCount}/${travelRules.length}`,
      )

      // Definir consecuentes terminales (recomendaciones de destinos) - simplificado
      const terminalConsequents = [
        'destino_recomendado_cusco-machu-picchu',
        'destino_recomendado_lima',
        'destino_recomendado_iquitos-amazonas',
        'destino_recomendado_mancora',
        'destino_recomendado_arequipa-colca',
        'destino_recomendado_ica-huacachina-paracas',
      ]

      // Crear instancia del motor de inferencia - De vuelta a HIGHEST_PRIORITY pero con más reglas
      const engine = new ForwardChainingEngine(
        travelRules,
        facts,
        terminalConsequents,
        ConflictResolutionStrategy.HIGHEST_PRIORITY, // De vuelta a la estrategia original
      )

      // Ejecutar inferencia con timeout de seguridad
      const inferencePromise = new Promise((resolve, reject) => {
        try {
          const result = engine.infer()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })

      // Timeout de 10 segundos para evitar cuelgues
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Timeout: La inferencia tomó demasiado tiempo (>10s)'))
        }, 10000)
      })

      const result = (await Promise.race([inferencePromise, timeoutPromise])) as any

      // Debug logging
      console.log('🔍 DEBUG: Facts created from preferences:', facts)
      console.log('� DEBUG: Total rules in knowledge base:', travelRules.length)
      console.log(
        '�🔥 DEBUG: Fired rules:',
        result.firedRules.map((r: any) => r.name),
      )
      console.log('📊 DEBUG: Final recommendations:', result.finalRecommendations)
      console.log('🔍 DEBUG: Execution trace:', result.executionTrace)

      // Store execution trace and fired rules for debugging
      executionTrace.value = result.executionTrace
      firedRules.value = result.firedRules.map((rule: any) => rule.name)

      // Store complete debug information
      debugInfo.value = {
        inputFacts: facts,
        firedRules: result.firedRules,
        derivedFacts: result.derivedFacts,
        executionTrace: result.executionTrace,
        finalRecommendations: result.finalRecommendations,
        totalRulesInKB: travelRules.length,
        timestamp: new Date().toLocaleString(),
      }

      // Create extended recommendations with full destination info
      const extendedRecommendations = result.finalRecommendations.map((rec: any) => {
        const destination = destinationInfo[rec.destinationId]
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
    getRecommendations,
  }
}
