<script setup lang="ts">
import { reactive } from 'vue';

const props = withDefaults(defineProps<{
  primary?: boolean;

}>(), {
  primary: false,
});

const { primary } = reactive(props);
</script>

<template>
  <button class="btn" :class="{ primary }">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 0.5rem 1rem;
}
.btn.primary {
  background: hsl(239, 100%, 27%);
  color: #fff;
}
</style>
