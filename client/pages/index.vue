<script lang="ts" setup>
import { onMounted, useContext, ref } from '@nuxtjs/composition-api'
import JokeCard from '~/components/JokeCard.vue'
import JokeForm from '~/components/JokeForm.vue'

const { $axios } = useContext()

// Refs
const loading = ref<Boolean>(false)
const joke = ref<String>('')
const errors = ref<String[]>([])

// Fetch joke when component mount
onMounted(async () => await fetchJoke())

// Handle Get Joke callback
const handleGetJoke = async () => await fetchJoke()

// Handle Modify Joke callback
const handleModifyJoke = async (number: Number, replacement: String) => {
  // Start loader
  loading.value = true
  // Clear previous errors
  errors.value = []
  try {
    // Post payload
    const payload = {
      number,
      replacement,
    }
    const res = await $axios
      .$post('http://localhost:8000/jokes', payload)
      .catch((error) => {
        // Display error
        if (error?.response?.data?.message) {
          errors.value = error.response.data.message
        }
      })
    // Assign joke
    if (res?.joke) {
      joke.value = res.joke
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
  // End loader
  loading.value = false
}

// Fetching a joke
const fetchJoke = async () => {
  // Start loader
  loading.value = true
  // Clear previous errors
  errors.value = []
  try {
    const res = await $axios
      .$get('http://localhost:8000/jokes')
      .catch((error) => {
        // Display error
        if (error?.response?.data?.message) {
          errors.value = error.response.data.message
        }
      })
    // Assign joke
    if (res?.joke) joke.value = res.joke
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
  // End loader
  loading.value = false
}
</script>
<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-alert v-if="errors.length" border="top" color="red" dark dismissible>
        Error occurred
        <template v-for="(error, index) in errors">
          <span :key="index"
            ><br />
            - {{ error }}</span
          >
        </template>
      </v-alert>
      <JokeCard
        :errors="errors"
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
