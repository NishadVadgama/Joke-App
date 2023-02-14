<script lang="ts" setup>
// Type
export type JokeCard = {
  loading: Boolean
  joke: String
}

// Props
const props = defineProps<JokeCard>()

// Emits
const emit = defineEmits<{
  (e: 'handleGetJoke'): void
}>()
</script>

<template>
  <v-card elevation="5" :loading="props.loading">
    <v-card-title>
      <span class="user-select-none">Tell me a joke</span>
      <v-spacer />
      <v-tooltip right>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            :disabled="props.loading"
            v-bind="attrs"
            v-on="on"
            @click="emit('handleGetJoke')"
          >
            <v-icon light>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Get new joke</span>
      </v-tooltip>
    </v-card-title>
    <v-card-text>
      <v-banner color="secondary" outlined rounded>
        <div class="subtitle-1 user-select-none">{{ props.joke }}</div>
      </v-banner>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.user-select-none {
  user-select: none;
}
</style>
