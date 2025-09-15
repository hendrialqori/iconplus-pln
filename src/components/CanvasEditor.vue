<script setup lang="ts">
import { ref, onMounted, useTemplateRef, computed } from 'vue'
import Konva from "konva"
import { sleep } from '@/lib/utils'
import StartNode from './StartNode.vue'
import Node from './Node.vue'
import EndNode from './EndNode.vue'
import { Button } from './ui/button'
import { Focus, ZoomIn, ZoomOut } from 'lucide-vue-next'

const stageEl = useTemplateRef('stageEl')
const layerEl = useTemplateRef('layerEl')

// Stage size
const stageSize = ref({
    width: window.innerWidth * 70 / 100,
    height: window.innerHeight,
    draggable: true
})

const centerX = stageSize.value.width! / 2
const centerY = 180

const circleRadius = 35
const zoomFactor = 0.1

const items = ref([
    { text: 'hari_baca_akhir_ref_hari_baca_akhir_ref', type: 'INLINE' }
])

const endNodeY = computed(() => {
    if (items.value.length == 0) {
        return centerY + 130 * items.value.length + 165
    } else {
        return centerY + 130 * items.value.length + 170
    }
})

async function addItem(index: number) {
    items.value.splice(index + 1, 0, {
        text: `hari_pakai_ref_${items.value.length + 1}`,
        type: 'INLINE'
    })

    await sleep(100)
    layerEl.value.getNode().cache()
}

async function removeItem(index: number) {
    layerEl.value.getNode().clearCache();

    await sleep(100)
    items.value.splice(index, 1)

    await sleep(100)
    layerEl.value.getNode().cache()
}

function zoomIn() {
    if (!stageEl.value) return
    const stage = stageEl.value.getNode()
    stage.scale({
        x: stage.scaleX() + zoomFactor,
        y: stage.scaleY() + zoomFactor
    })
    focusCenter()
}

function zoomOut() {
    if (!stageEl.value) return
    const stage = stageEl.value.getNode()
    stage.scale({
        x: Math.max(stage.scaleX() - zoomFactor, 0.1),  // minimal scale 0.1
        y: Math.max(stage.scaleY() - zoomFactor, 0.1)
    })
    focusCenter()
}

function focusCenter() {
    if (!stageEl.value) return
    const stage = stageEl.value.getNode()
    stage.to({
        x: stageSize.value.width! / 2 - centerX * stage.scaleX(),
        y: stageSize.value.height! / 4 - centerY * stage.scaleY(),
        duration: 0.3,
        easing: Konva.Easings.EaseInOut
    })
}

onMounted(() => {
    if (stageEl.value) {
        const container = stageEl.value.getNode().container()
        container.style.backgroundColor = '#f3f4f6'

        focusCenter()
    }
})
</script>

<template>
    <div class="rounded-lg shadow w-max p-1 bg-white absolute flex gap-1 top-3 left-3 z-10">
        <Button @click="focusCenter" variant="outline" size="icon" class="size-8">
            <Focus class="size-4" />
        </Button>
        <Button @click="zoomIn" variant="outline" size="icon" class="size-8">
            <ZoomIn class="size-4" />
        </Button>
        <Button @click="zoomOut" variant="outline" size="icon" class="size-8">
            <ZoomOut class="size-4" />
        </Button>
    </div>
    <v-stage ref="stageEl" :config="stageSize">
        <v-layer ref="layerEl" :config="{
            x: stageSize.width! / 2 - centerX,
            y: stageSize.height! / 4 - centerY
        }">
            <StartNode :x="centerX" :y="centerY + 40" :circleRadius="circleRadius" @add="addItem(-1)" />
            <Node v-for="(item, index) in items" :key="item.text" :index="index" :x="centerX"
                :y="centerY + 130 * (index + 1)" :text="item.text" :type="item.type" @add="addItem"
                @remove="removeItem" />
            <EndNode :x="centerX" :y="endNodeY" :radius="circleRadius" />
        </v-layer>
    </v-stage>
</template>
