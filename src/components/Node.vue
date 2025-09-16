<script setup lang="ts">
type Props = {
  index: number
  x: number
  y: number
  text: string
  taskReference: string
  type: string
}

const props = defineProps<Props>()
const emits = defineEmits<{
  remove: [number]
  add: [number]
  jump: [string]
}>()

function countChars(str: string): number {
  return str ? str.length : 0
}

const charWidth = 10
// Hitung lebar rectangle berdasarkan teks yang paling panjang antara main text & type
let rectWidth = countChars(props.text)

rectWidth = rectWidth * (rectWidth > 20 ? 8 : 10)
</script>

<template>
  <v-group :config="{ x: props.x, y: props.y }" @click="emits('jump', props.taskReference)">
    <!-- Rectangle -->
    <v-rect
      :config="{
        x: -rectWidth / 2,
        y: 0,
        width: rectWidth,
        height: 80,
        fill: '#ffffff',
        cornerRadius: 5,
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 10,
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowOpacity: 0.5,
      }"
    />

    <!-- Main Text -->
    <v-text
      :config="{
        x: (-countChars(props.text) * charWidth) / 2,
        y: 15,
        width: countChars(props.text) * charWidth,
        text: props.text,
        fontSize: 14,
        fill: '#000000',
        align: 'center',
      }"
    />

    <!-- Type Text -->
    <v-text
      :config="{
        x: (-countChars(props.type) * charWidth) / 2,
        y: 45,
        width: countChars(props.type) * charWidth,
        text: props.type,
        fontSize: 12,
        fill: '#000000',
        align: 'center',
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowBlur: 4,
        shadowOffsetX: 1,
        shadowOffsetY: 1,
      }"
    />

    <!-- Tombol Close di kanan atas -->
    <v-group :config="{ x: rectWidth / 2, y: 10 }" @click="emits('remove', props.index)">
      <v-circle
        :config="{
          x: -10,
          y: -10,
          radius: 10,
          fill: 'white',
          stroke: 'gray',
          strokeWidth: 1,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 5,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          shadowOpacity: 0.5,
        }"
      />
      <v-text
        :config="{
          x: -14,
          y: -17,
          text: '×',
          fontSize: 16,
          fontStyle: 'bold',
          fill: '#C27E79',
        }"
      />
    </v-group>

    <!-- Arrow bawah rectangle -->
    <v-arrow
      :config="{
        points: [0, 80, 0, 130],
        pointerLength: 5,
        pointerWidth: 5,
        fill: '#9F9F9F',
        stroke: '#9F9F9F',
        strokeWidth: 1,
      }"
    />

    <!-- Tombol Plus di bawah rectangle -->
    <v-group :config="{ x: 0, y: 80 }" @click="emits('add', props.index)">
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
