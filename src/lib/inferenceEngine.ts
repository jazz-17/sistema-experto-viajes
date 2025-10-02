/**
 * Motor de Inferencia para Sistema Experto de Viajes en Perú
 * Implementa Algoritmo de Encadenamiento Hacia Adelante
 * Basado en requisitos del curso de Sistemas Inteligentes
 */

import type { Fact, InferenceResult, Rule, TravelRecommendation } from '@/types'

/**
 * Estrategias de Resolución de Conflictos
 */
export enum ConflictResolutionStrategy {
  FIRST_RULE = 'first', // Seleccionar primera regla que se dispara
  HIGHEST_PRIORITY = 'priority', // Seleccionar regla con mayor prioridad
  REFRACTION = 'refraction', // Seleccionar regla no ejecutada anteriormente
  RANDOM = 'random', // Seleccionar arbitrariamente
  LEAST_ANTECEDENTS = 'general', // Seleccionar regla más general (menos antecedentes)
}

/**
 * Motor de Inferencia de Encadenamiento Hacia Adelante
 */
export class MotorDeEncadenamientoProgresivo {
  private baseDeConocimientos: Rule[]
  private baseDeHechos: Map<string, Fact>
  private consecuentesTerminales: string[]
  private strategia: ConflictResolutionStrategy
  private executionTrace: string[]

  constructor(
    baseDeConocimientos: Rule[],
    baseDeHechos: Fact[],
    consecuentesTerminales: string[],
    strategia: ConflictResolutionStrategy = ConflictResolutionStrategy.HIGHEST_PRIORITY,
  ) {
    this.baseDeConocimientos = baseDeConocimientos
    this.baseDeHechos = new Map()
    this.consecuentesTerminales = consecuentesTerminales
    this.strategia = strategia
    this.executionTrace = []

    // Inicializar base de hechos
    baseDeHechos.forEach((fact) => {
      this.baseDeHechos.set(fact.id, fact)
    })
  }

  /**
   * Algoritmo principal de inferencia - Encadenamiento Hacia Adelante
   */
  public inferir(): InferenceResult {
    let sw_di = true // Regla disparada
    const firedRules: Rule[] = []
    const derivedFacts: Fact[] = []

    this.executionTrace = []
    this.executionTrace.push('=== INICIO DEL MOTOR DE INFERENCIA ===')
    this.executionTrace.push(`Hechos iniciales: ${Array.from(this.baseDeHechos.keys()).join(', ')}`)
    this.executionTrace.push(`Consecuentes terminales: ${this.consecuentesTerminales.join(', ')}`)

    let iteration = 1

    while (sw_di) {
      // Continúa hasta que no se puedan disparar más reglas (no solo hasta la primera solución)
      this.executionTrace.push(`\n--- Iteración ${iteration} ---`)

      // Resolver conflictos y seleccionar regla a disparar
      const result = this.resolverConflicto()
      sw_di = result.sw_di

      if (sw_di && result.selectedRule) {
        const rule = result.selectedRule

        // Disparar la regla
        this.fireRule(rule)
        firedRules.push(rule)

        // Agregar nuevo hecho a la base de hechos
        const newFact: Fact = {
          id: rule.consequent,
          value: true,
          confidence: rule.confidence,
        }

        this.baseDeHechos.set(rule.consequent, newFact)
        derivedFacts.push(newFact)

        this.executionTrace.push(`🔥 Regla disparada: ${rule.name}`)
        this.executionTrace.push(`   Nuevo hecho derivado: ${rule.consequent}`)

        // Marcar regla como ejecutada (principio de refracción) - IMPORTANTE: Esto previene bucles infinitos
        rule.executed = true
      } else {
        this.executionTrace.push('⛔ No hay reglas que se puedan disparar')
      }

      iteration++

      // Verificación de seguridad: Prevenir bucles infinitos con múltiples salvaguardas
      if (iteration > 50) {
        this.executionTrace.push(
          '⚠️ Límite de iteraciones alcanzado (50) - Probable bucle infinito detectado',
        )
        console.error('BUCLE INFINITO DETECTADO: Más de 50 iteraciones. Deteniendo inferencia.')
        break
      }

      // Seguridad adicional: Si seguimos disparando los mismos tipos de reglas, detener
      if (firedRules.length > 20) {
        const recentRules = firedRules.slice(-10).map((r) => r.name)
        const uniqueRecentRules = new Set(recentRules)
        if (uniqueRecentRules.size <= 2) {
          this.executionTrace.push(
            '⚠️ Patrón repetitivo detectado - Deteniendo para evitar bucle infinito',
          )
          console.error(
            'PATRÓN REPETITIVO DETECTADO: Mismas reglas disparándose repetidamente. Deteniendo inferencia.',
          )
          break
        }
      }
    }

    // Generar recomendaciones finales
    const recommendations = this.generateRecommendations()

    this.executionTrace.push('\n=== RESULTADO FINAL ===')
    this.executionTrace.push(`Reglas disparadas: ${firedRules.length}`)
    this.executionTrace.push(`Nuevos hechos: ${derivedFacts.length}`)
    this.executionTrace.push(`Recomendaciones: ${recommendations.length}`)

    return {
      firedRules,
      derivedFacts,
      executionTrace: this.executionTrace,
      finalRecommendations: recommendations,
    }
  }

  /**
   * Resolver conflictos entre múltiples reglas disparables
   * Implementación de Resolver_conflicto(Rx, Cx, sw_di)
   */
  private resolverConflicto(): { selectedRule: Rule | null; sw_di: boolean } {
    const fireableRules = this.obtenerReglasActivables()

    if (fireableRules.length === 0) {
      return { selectedRule: null, sw_di: false }
    }

    this.executionTrace.push(`Reglas candidatas: ${fireableRules.map((r) => r.name).join(', ')}`)

    let selectedRule: Rule

    switch (this.strategia) {
      case ConflictResolutionStrategy.FIRST_RULE:
        selectedRule = fireableRules[0]
        this.executionTrace.push(`Estrategia: Primera regla -> ${selectedRule.name}`)
        break

      case ConflictResolutionStrategy.HIGHEST_PRIORITY:
        selectedRule = fireableRules.reduce((prev, current) =>
          current.priority > prev.priority ? current : prev,
        )
        this.executionTrace.push(
          `Estrategia: Mayor prioridad -> ${selectedRule.name} (${selectedRule.priority})`,
        )
        break

      case ConflictResolutionStrategy.REFRACTION:
        const unexecutedRules = fireableRules.filter((rule) => !rule.executed)
        selectedRule = unexecutedRules.length > 0 ? unexecutedRules[0] : fireableRules[0]
        this.executionTrace.push(`Estrategia: Refracción -> ${selectedRule.name}`)
        break

      case ConflictResolutionStrategy.RANDOM:
        selectedRule = fireableRules[Math.floor(Math.random() * fireableRules.length)]
        this.executionTrace.push(`Estrategia: Aleatoria -> ${selectedRule.name}`)
        break

      case ConflictResolutionStrategy.LEAST_ANTECEDENTS:
        selectedRule = fireableRules.reduce((prev, current) =>
          current.antecedents.length < prev.antecedents.length ? current : prev,
        )
        this.executionTrace.push(
          `Estrategia: Más general -> ${selectedRule.name} (${selectedRule.antecedents.length} antecedentes)`,
        )
        break

      default:
        selectedRule = fireableRules[0]
    }

    return { selectedRule, sw_di: true }
  }

  /**
   * Obtener todas las reglas que se pueden disparar (todos los antecedentes están satisfechos)
   */
  private obtenerReglasActivables(): Rule[] {
    return this.baseDeConocimientos.filter((rule) => {
      // Saltar reglas ya ejecutadas para prevenir bucles infinitos (principio de refracción)
      if (rule.executed) {
        return false
      }

      // Verificar si el hecho consecuente ya existe para prevenir derivación redundante
      if (this.baseDeHechos.has(rule.consequent)) {
        return false
      }

      // Verificar si todos los antecedentes están en la base de hechos
      return rule.antecedents.every((antecedent) => {
        const fact = this.baseDeHechos.get(antecedent)
        return fact && this.isFactTrue(fact)
      })
    })
  }

  /**
   * Disparar una regla - ejecutar su acción
   */
  private fireRule(rule: Rule): void {
    // En este sistema experto de viajes, disparar una regla significa derivar un nuevo hecho
    // La lógica real se maneja en el bucle principal de inferencia
    this.executionTrace.push(`   Antecedentes satisfechos: ${rule.antecedents.join(', ')}`)
    this.executionTrace.push(`   Consecuente derivado: ${rule.consequent}`)
  }

  /**
   * Verificar si un hecho se considera verdadero
   */
  private isFactTrue(fact: Fact): boolean {
    if (typeof fact.value === 'boolean') {
      return fact.value
    }
    if (typeof fact.value === 'string') {
      return fact.value !== '' && fact.value !== 'false'
    }
    if (typeof fact.value === 'number') {
      return fact.value > 0
    }
    return false
  }

  /**
   * Generar recomendaciones de viaje basadas en hechos derivados
   */
  private generateRecommendations(): TravelRecommendation[] {
    const recommendations: TravelRecommendation[] = []

    // Buscar hechos de recomendación de destinos
    this.baseDeHechos.forEach((fact, factId) => {
      if (factId.startsWith('destino_recomendado_') && this.isFactTrue(fact)) {
        const destinationId = factId.replace('destino_recomendado_', '')
        const confidence = fact.confidence || 0.5

        // Encontrar razones de las reglas disparadas
        const reasons = this.findRecommendationReasons(destinationId)

        recommendations.push({
          destinationId,
          confidence,
          reasons,
          score: confidence * 100,
        })
      }
    })

    // Ordenar por confianza
    return recommendations.sort((a, b) => b.confidence - a.confidence)
  }

  /**
   * Encontrar razones por las que un destino fue recomendado
   */
  private findRecommendationReasons(destinationId: string): string[] {
    const reasons: string[] = []

    this.baseDeConocimientos.forEach((rule) => {
      if (rule.consequent === `destino_recomendado_${destinationId}` && rule.executed) {
        reasons.push(rule.description || `Regla ${rule.name} aplicada`)
      }
    })

    return reasons
  }

  /**
   * Agregar un nuevo hecho a la base de hechos
   */
  public addFact(fact: Fact): void {
    this.baseDeHechos.set(fact.id, fact)
  }

  /**
   * Obtener la base de hechos actual
   */
  public getFactBase(): Map<string, Fact> {
    return new Map(this.baseDeHechos)
  }

  /**
   * Obtener la traza de ejecución
   */
  public getExecutionTrace(): string[] {
    return [...this.executionTrace]
  }

  /**
   * Resetear el motor de inferencia
   */
  public reset(initialFacts: Fact[]): void {
    this.baseDeHechos.clear()
    this.executionTrace = []

    // Resetear el estado de ejecución de las reglas
    this.baseDeConocimientos.forEach((rule) => {
      rule.executed = false
    })

    // Re-inicializar la base de hechos
    initialFacts.forEach((fact) => {
      this.baseDeHechos.set(fact.id, fact)
    })
  }
}
