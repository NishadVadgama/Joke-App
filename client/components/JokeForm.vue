<script lang="ts" setup>
import { ref } from '@nuxtjs/composition-api'

// Type
export type JokeForm = {
  loading: Boolean
}

// Refs / Reactive
const number = ref()
const replacement = ref('')
const form = ref()

// Input validation rules.
const rules = {
  required: (v: any): Boolean | String => !!v || 'Required.',
  number: (v: any): Boolean | String => {
    if (!isNaN(parseInt(v)) && v >= 0 && v <= 10) return true
    return 'Number has to be between 0 and 10'
  },
  replacement: (v: any): Boolean | String => {
    if (!v?.trim()) return true
    if (v?.length > 10) {
      return 'Text should not exceed 10 characters!'
    }
    const pattern = /^([a-zA-Z]+)$/
    if (!pattern.test(v)) {
      return 'Only alpha characters supported!'
    }
    return true
  },
}

// Emits
const emit = defineEmits<{
  (e: 'handleModifyJoke', number: Number, replacement: String): void
}>()

// Handle submit joke form
const handleSubmitJokeForm = () => {
  // Validation
  if (form.value.validate() === true && typeof number.value !== 'undefined') {
    emit('handleModifyJoke', parseInt(number.value), replacement.value)
  }
}
</script>

<template>
  <v-card elevation="5">
    <v-card-title class="text-center">Modify a joke</v-card-title>
    <v-card-text><hr /></v-card-text>
    <v-form ref="form">
      <v-container>
        <v-row class="d-flex justify-center align-center">
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="number"
              type="number"
              label="Number"
              :rules="[rules.required, rules.number]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="replacement"
              label="Replacement"
              :rules="[rules.replacement]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex justify-center align-center">
            <v-btn
              color="primary"
              elevation="2"
              rounded
              @click="handleSubmitJokeForm"
              >Get new joke</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
