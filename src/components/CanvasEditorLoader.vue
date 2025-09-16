<script setup lang="ts">
import { Loader } from 'lucide-vue-next'
</script>
<template>
  <div class="absolute inset-0 bg-white flex items-center justify-center">
    <div class="flex items-center gap-1">
      <Loader class="size-4 animate-spin duration-200" />
      <p>Prepare stage ...</p>
    </div>
  </div>
</template>
