<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white/95 backdrop-blur-sm shadow-lg border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="text-center">
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Sistema Experto de Viajes - Perú
            </h1>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Streamlined Preferences Panel -->
        <div class="lg:col-span-1">
          <div
            class="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-slate-200 p-6 sticky top-8"
          >
            <div class="text-center mb-6">
              <h2 class="text-xl font-bold text-slate-800 mb-2">Tus Preferencias</h2>
              <p class="text-sm text-slate-600">Ayúdanos a encontrar tu destino ideal</p>
            </div>

            <form @submit.prevent="obtenerRecomendaciones" class="space-y-6">
              <!-- Activity Type - Most Important -->
              <div class="space-y-3">
                <label class="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                  <span>🎯</span>
                  <span>¿Qué te gusta hacer?</span>
                </label>
                <select
                  v-model="preferencias.actividad_preferida"
                  required
                  class="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">Selecciona una actividad</option>
                  <option value="cultura">🏛️ Cultura e Historia</option>
                  <option value="aventura">🏔️ Aventura y Deportes</option>
                  <option value="naturaleza">🌿 Naturaleza y Vida Silvestre</option>
                  <option value="gastronomia">🍽️ Gastronomía</option>
                  <option value="relax">🏖️ Relax y Playas</option>
                  <option value="trekking">🥾 Trekking y Caminatas</option>
                  <option value="fotografia">📸 Fotografía</option>
                </select>
              </div>

              <!-- Duration - Very Important -->
              <div class="space-y-3">
                <label class="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                  <span>📅</span>
                  <span>¿Cuánto tiempo tienes?</span>
                </label>
                <select
                  v-model="preferencias.duracion"
                  required
                  class="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">Selecciona duración</option>
                  <option value="1-3">🚀 Fin de semana (1-3 días)</option>
                  <option value="4-7">🗓️ Una semana (4-7 días)</option>
                  <option value="7+">🏝️ Vacaciones largas (7+ días)</option>
                </select>
              </div>

              <!-- Budget - Important -->
              <div class="space-y-3">
                <label class="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                  <span>💰</span>
                  <span>¿Cuál es tu presupuesto?</span>
                </label>
                <select
                  v-model="preferencias.presupuesto"
                  required
                  class="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">Selecciona presupuesto</option>
                  <option value="baja">💚 Económico (< S/ 1,000)</option>
                  <option value="media">💛 Medio (S/ 1,000 - S/ 3,000)</option>
                  <option value="alta">💙 Alto (> S/ 3,000)</option>
                </select>
              </div>

              <!-- Climate Preference - Added fourth preference -->
              <div class="space-y-3">
                <label class="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                  <span>🌡️</span>
                  <span>¿Qué clima prefieres?</span>
                </label>
                <select
                  v-model="preferencias.clima_preferido"
                  required
                  class="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">Selecciona clima</option>
                  <option value="calido">☀️ Cálido y tropical</option>
                  <option value="templado">🌤️ Templado y moderado</option>
                  <option value="frio">❄️ Frío de montaña</option>
                </select>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="cargando || !formularioValido"
                class="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:scale-105"
              >
                <div v-if="cargando" class="flex items-center justify-center space-x-2">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analizando...</span>
                </div>
                <div v-else class="flex items-center justify-center space-x-2">
                  <span>🔍</span>
                  <span>Buscar Destinos</span>
                </div>
              </button>

              <!-- Warning message if multiple clicks -->
              <div
                v-if="cargando"
                class="text-xs text-center text-amber-600 mt-2 bg-amber-50 rounded-lg px-3 py-2 border border-amber-200"
              >
                ⚠️ Por favor espera, el motor de inferencia está procesando...
              </div>
            </form>

            <!-- Quick Stats -->
            <div v-if="recomendaciones.length > 0" class="mt-6 pt-6 border-t border-slate-200">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">{{ recomendaciones.length }}</div>
                <div class="text-sm text-slate-600">destinos recomendados</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="lg:col-span-2">
          <!-- Welcome Message -->
          <div
            v-if="recomendaciones.length === 0 && !cargando && !formularioEnviado"
            class="text-center py-16"
          >
            <div class="text-6xl mb-4">🇵🇪</div>
            <h2 class="text-2xl font-bold text-slate-800 mb-4">Descubre Perú</h2>
            <p class="text-slate-600 max-w-md mx-auto">
              Completa el formulario para que nuestro sistema experto te recomiende los mejores
              destinos basados en tus preferencias.
            </p>
          </div>

          <!-- No Results Message -->
          <div
            v-if="recomendaciones.length === 0 && !cargando && formularioEnviado"
            class="text-center py-16"
          >
            <div class="text-6xl mb-4">😔</div>
            <h2 class="text-2xl font-bold text-slate-800 mb-4">No encontramos coincidencias</h2>
            <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-md mx-auto">
              <p class="text-slate-700 mb-4">
                No pudimos encontrar destinos que coincidan exactamente con tus preferencias.
              </p>
              <p class="text-sm text-slate-600 mb-4">
                Intenta ajustar alguna de tus preferencias para obtener mejores recomendaciones.
              </p>
              <div class="text-xs text-slate-500">
                💡 Tip: Si seleccionas "No me importa / Variado" en el clima, obtendrás más
                opciones.
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="cargando" class="text-center py-16">
            <div
              class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"
            ></div>
            <h2 class="text-xl font-semibold text-slate-800">Analizando tus preferencias...</h2>
            <p class="text-slate-600">Nuestro motor de inferencia está trabajando</p>
          </div>

          <!-- Recommendations - Show up to 4 results -->
          <div v-if="recomendaciones.length > 0" class="space-y-6">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-slate-800 mb-2">Tus Destinos Recomendados</h2>
              <p class="text-slate-600">Ordenados por compatibilidad con tus preferencias</p>

              <!-- Debug Toggle Button -->
              <div class="mt-4">
                <button
                  @click="mostrarDebug = !mostrarDebug"
                  class="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 transition-all"
                >
                  <span>{{ mostrarDebug ? '🔬' : '🔧' }}</span>
                  <span>{{
                    mostrarDebug ? 'Ocultar Debug' : 'Mostrar Proceso de Inferencia'
                  }}</span>
                </button>
              </div>
            </div>

            <div
              v-for="(recomendacion, index) in recomendaciones.slice(0, 3)"
              :key="recomendacion.destinationId"
              class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border ring-1 ring-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div class="p-6">
                <!-- Header with confidence -->
                <div class="flex justify-between items-start mb-4">
                  <div class="flex items-center space-x-3">
                    <div class="text-4xl">{{ recomendacion.destination.image }}</div>
                    <div>
                      <h3 class="text-xl font-bold text-slate-800">
                        {{ recomendacion.destination.name }}
                      </h3>
                      <p class="text-sm text-slate-600">{{ recomendacion.destination.region }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-2xl font-bold text-blue-600">
                      {{ Math.round(recomendacion.confidence * 100) }}%
                    </div>
                    <div class="text-xs text-slate-500">compatibilidad</div>
                  </div>
                </div>

                <!-- Description -->
                <p class="text-slate-700 mb-4">{{ recomendacion.destination.description }}</p>

                <!-- Key Info Grid -->
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="bg-slate-50 rounded-lg p-3">
                    <div class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Altitud
                    </div>
                    <div class="text-sm font-medium text-slate-800">
                      {{ recomendacion.destination.altitude }}
                    </div>
                  </div>
                  <div class="bg-slate-50 rounded-lg p-3">
                    <div class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Temperatura
                    </div>
                    <div class="text-sm font-medium text-slate-800">
                      {{ recomendacion.destination.avgTemperature }}
                    </div>
                  </div>
                </div>

                <!-- Activities -->
                <div class="mb-4">
                  <div class="text-sm font-semibold text-slate-700 mb-2">
                    Actividades principales:
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="actividad in recomendacion.destination.activities.slice(0, 4)"
                      :key="actividad"
                      class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                    >
                      {{ actividad }}
                    </span>
                  </div>
                </div>

                <!-- Why this destination -->
                <div v-if="recomendacion.reasons.length > 0" class="border-t border-slate-200 pt-4">
                  <div class="text-sm font-semibold text-slate-700 mb-2">
                    ¿Por qué este destino?
                  </div>
                  <ul class="space-y-1">
                    <li
                      v-for="razon in recomendacion.reasons.slice(0, 3)"
                      :key="razon"
                      class="text-sm text-slate-600 flex items-start space-x-2"
                    >
                      <span class="text-green-500 mt-0.5">✓</span>
                      <span>{{ razon }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Debug Panel -->
          <div v-if="debugInfo && recomendaciones.length > 0 && mostrarDebug" class="mt-8">
            <div
              class="bg-slate-900 text-green-400 rounded-2xl shadow-xl border border-slate-700 overflow-hidden"
            >
              <div class="bg-slate-800 px-6 py-4 border-b border-slate-700">
                <div class="flex items-center space-x-3">
                  <div class="text-2xl">🔬</div>
                  <div>
                    <h3 class="text-lg font-bold text-white">
                      Panel de Debug - Motor de Inferencia
                    </h3>
                    <p class="text-sm text-slate-400">Proceso de razonamiento paso a paso</p>
                  </div>
                  <div class="ml-auto text-xs text-slate-500">{{ debugInfo.timestamp }}</div>
                </div>
              </div>

              <div class="p-6 space-y-6 max-h-96 overflow-y-auto">
                <!-- Input Facts -->
                <div>
                  <h4 class="text-sm font-bold text-green-300 mb-2 flex items-center">
                    <span class="mr-2">📝</span> HECHOS INICIALES
                  </h4>
                  <div class="bg-slate-800 rounded-lg p-3">
                    <div
                      v-for="fact in debugInfo.inputFacts"
                      :key="fact.id"
                      class="text-xs text-slate-300"
                    >
                      • {{ fact.id }} = {{ fact.value }} (confianza: {{ fact.confidence }})
                    </div>
                  </div>
                </div>

                <!-- Fired Rules -->
                <div>
                  <h4 class="text-sm font-bold text-yellow-300 mb-2 flex items-center">
                    <span class="mr-2">🔥</span> REGLAS DISPARADAS ({{
                      debugInfo.firedRules.length
                    }})
                  </h4>
                  <div class="bg-slate-800 rounded-lg p-3 space-y-2">
                    <div
                      v-for="rule in debugInfo.firedRules"
                      :key="rule.id"
                      class="border-l-2 border-yellow-500 pl-3"
                    >
                      <div class="text-xs font-semibold text-yellow-400">{{ rule.name }}</div>
                      <div class="text-xs text-slate-400">
                        Si: {{ rule.antecedents.join(', ') }} → Entonces: {{ rule.consequent }}
                      </div>
                      <div class="text-xs text-slate-500">
                        Prioridad: {{ rule.priority }} | Confianza:
                        {{ Math.round(rule.confidence * 100) }}%
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Derived Facts -->
                <div>
                  <h4 class="text-sm font-bold text-blue-300 mb-2 flex items-center">
                    <span class="mr-2">💡</span> HECHOS DERIVADOS ({{
                      debugInfo.derivedFacts.length
                    }})
                  </h4>
                  <div class="bg-slate-800 rounded-lg p-3">
                    <div
                      v-for="fact in debugInfo.derivedFacts"
                      :key="fact.id"
                      class="text-xs text-blue-300"
                    >
                      ✓ {{ fact.id }} = {{ fact.value }} (confianza: {{ fact.confidence }})
                    </div>
                  </div>
                </div>

                <!-- Final Recommendations -->
                <div>
                  <h4 class="text-sm font-bold text-purple-300 mb-2 flex items-center">
                    <span class="mr-2">🎯</span> RECOMENDACIONES FINALES ({{
                      debugInfo.finalRecommendations.length
                    }})
                  </h4>
                  <div class="bg-slate-800 rounded-lg p-3 space-y-2">
                    <div
                      v-for="rec in debugInfo.finalRecommendations"
                      :key="rec.destinationId"
                      class="border-l-2 border-purple-500 pl-3"
                    >
                      <div class="text-xs font-semibold text-purple-400">
                        {{ rec.destinationId }}
                      </div>
                      <div class="text-xs text-slate-400">
                        Confianza: {{ Math.round(rec.confidence * 100) }}% | Score: {{ rec.score }}
                      </div>
                      <div class="text-xs text-slate-500">
                        Razones: {{ rec.reasons.slice(0, 2).join(', ') }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Execution Statistics -->
                <div>
                  <h4 class="text-sm font-bold text-cyan-300 mb-2 flex items-center">
                    <span class="mr-2">📊</span> ESTADÍSTICAS
                  </h4>
                  <div class="bg-slate-800 rounded-lg p-3 text-xs text-slate-300">
                    <div class="grid grid-cols-2 gap-2">
                      <div>
                        Total de reglas en KB:
                        <span class="text-cyan-400">{{ debugInfo.totalRulesInKB }}</span>
                      </div>
                      <div>
                        Reglas disparadas:
                        <span class="text-yellow-400">{{ debugInfo.firedRules.length }}</span>
                      </div>
                      <div>
                        Hechos iniciales:
                        <span class="text-green-400">{{ debugInfo.inputFacts.length }}</span>
                      </div>
                      <div>
                        Hechos derivados:
                        <span class="text-blue-400">{{ debugInfo.derivedFacts.length }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Execution Trace -->
                <div>
                  <h4 class="text-sm font-bold text-orange-300 mb-2 flex items-center">
                    <span class="mr-2">📋</span> TRAZA DE EJECUCIÓN
                  </h4>
                  <div class="bg-slate-800 rounded-lg p-3 max-h-40 overflow-y-auto">
                    <div
                      v-for="(step, index) in debugInfo.executionTrace"
                      :key="index"
                      class="text-xs text-slate-300 mb-1 font-mono"
                    >
                      {{ step }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useInferenceEngine } from '@/composables/useInferenceEngine'
import type { TravelPreferences } from '@/types'

// Composable - Motor de Inferencia
const {
  isLoading,
  recommendations,
  getRecommendations: ejecutarInferencia,
  debugInfo,
} = useInferenceEngine()
const cargando = isLoading
const recomendaciones = recommendations

// Estado del formulario
const preferencias = ref<TravelPreferences>({
  actividad_preferida: '',
  presupuesto: '',
  duracion: '',
  clima_preferido: '',
})

// Estado de envío del formulario
const formularioEnviado = ref(false)

// Estado del panel de debug
const mostrarDebug = ref(false)

// Validación del formulario
const formularioValido = computed(() => {
  return (
    preferencias.value.actividad_preferida &&
    preferencias.value.presupuesto &&
    preferencias.value.duracion &&
    preferencias.value.clima_preferido
  )
})

// Manejador de envío del formulario
const obtenerRecomendaciones = async () => {
  // Prevenir múltiples envíos si ya está cargando
  if (cargando.value || !formularioValido.value) {
    console.warn('⚠️ Formulario ya procesándose o inválido, ignorando envío')
    return
  }

  formularioEnviado.value = true
  mostrarDebug.value = false // Ocultar debug al hacer nueva consulta

  try {
    await ejecutarInferencia(preferencias.value)
  } catch (error) {
    console.error('Error al obtener recomendaciones:', error)
    formularioEnviado.value = false
  }
}
</script>

<style scoped>
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Focus styles */
select:focus {
  outline: none;
}

/* Animation for results */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
</style>
