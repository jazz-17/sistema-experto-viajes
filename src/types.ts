// Types for the inference engine
export interface Fact {
  id: string
  value: string | boolean | number
  confidence?: number
}

export interface Rule {
  id: string
  name: string
  priority: number
  antecedents: string[] // Facts that must be true
  consequent: string // Fact that becomes true if rule fires
  confidence: number // Rule confidence (0-1)
  executed: boolean // For refraction principle
  description?: string
}

export interface InferenceResult {
  firedRules: Rule[]
  derivedFacts: Fact[]
  executionTrace: string[]
  finalRecommendations: TravelRecommendation[]
}

export interface TravelRecommendation {
  destinationId: string
  confidence: number
  reasons: string[]
  score: number
}

export interface TravelPreferences {
  actividad_preferida?: string
  presupuesto?: string
  clima_preferido?: string
  duracion?: string
  tipo_grupo?: string
}

export interface ExtendedRecommendation extends TravelRecommendation {
  destination: {
    id: string
    name: string
    description: string
    region: string
    image: string
    activities: string[]
    climate: string[]
    altitude: string
    avgTemperature: string
    bestMonths: string[]
    accommodations: string
    localFood: string
    localTransport: string
  }
}
