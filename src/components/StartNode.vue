<script setup lang="ts">
type Props = {
  x: number
  y: number
  circleRadius?: number
}

const props = defineProps<Props>()

const emits = defineEmits<{
  add: []
}>()

// Default circle radius jika tidak diberikan
const radius = props.circleRadius || 35

function handleAdd() {
  emits('add')
}
</script>

<template>
  <v-group :config="{ x: props.x, y: props.y }">
    <!-- Circle Start -->
    <v-circle
      :config="{
        x: 0,
        y: 0,
        radius: radius,
        fill: '#ffffff',
        stroke: '#82A3B1',
        strokeWidth: 3,
      }"
    />

    <!-- Text di tengah circle -->
    <v-text
      :config="{
        x: -15,
        y: -7,
        text: 'Start',
        fontSize: 14,
        fill: '#000000',
      }"
    />

    <!-- Arrow di bawah circle -->
    <v-arrow
      :config="{
        points: [0, radius, 0, radius + 50],
        pointerLength: 5,
        pointerWidth: 5,
        fill: '#9F9F9F',
        stroke: '#9F9F9F',
        strokeWidth: 1,
      }"
    />

    <!-- Tombol plus di bawah circle -->
    <v-group
      :config="{ x: 0, y: radius }"
      @click="handleAdd"
      @mouseleave="() => ($el.style.cursor = 'default')"
    >
      <v-circle
        :config="{
          x: 0,
          y: 0,
          radius: 10,
          fill: 'white',
          shadowColor: 'rgba(0,0,0,0.6)',
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          shadowOpacity: 0.5,
        }"
      />
      <v-text
        :config="{
          x: -4,
          y: -6,
          text: '+',
          fontSize: 14,
          fontStyle: 'bold',
          fill: '#000',
        }"
      />
    </v-group>
  </v-group>
</template>
