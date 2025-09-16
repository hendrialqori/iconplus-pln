<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next'
</script>
<template>
  <div class="absolute inset-0 bg-white text-red-700 flex items-center justify-center">
    <div class="flex items-center gap-1">
      <AlertTriangle class="size-4" />
      <p>Error while prepare stage :(</p>
    </div>
  </div>
</template>
