<script lang="ts" setup>
import { ref } from '@nuxtjs/composition-api'
import JokeCard from '~/components/JokeCard.vue'
import JokeForm from '~/components/JokeForm.vue'

// Refs
const loading = ref<Boolean>(false)
const joke = ref<String>(
  'Why do C# and Java developers keep breaking their keyboards? Because they use a strongly typed language.'
)

// Handle Get Joke callback
const handleGetJoke = async () => {
  loading.value = true
  await setTimeout(() => {
    loading.value = false
  }, 2000)
}

// Handle Modify Joke callback
const handleModifyJoke = async (number: Number, replacement: String) => {
  loading.value = true
  await setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>
<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <JokeCard
        :joke="joke"
        :loading="loading"
        @handleGetJoke="handleGetJoke"
      />
      <JokeForm
        class="mt-5"
        :loading="loading"
        @handleModifyJoke="handleModifyJoke"
      />
    </v-col>
  </v-row>
</template>
