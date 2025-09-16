<script lang="ts" setup>
type Props = {
  x: number
  y: number
  radius: number
}

const props = defineProps<Props>()
</script>

<template>
  <v-group :config="{ x: props.x, y: props.y }">
    <v-circle
      :config="{
        x: 0,
        y: 0,
        radius: props.radius,
        fill: '#ffffff',
        stroke: '#82A3B1',
        strokeWidth: 3,
      }"
    />
    <v-text
      :config="{
        x: -13,
        y: -7,
        text: 'End',
        fontSize: 14,
        fill: '#000000',
      }"
    />
  </v-group>
</template>
