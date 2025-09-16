<script setup lang="ts">
import { ref, onMounted, useTemplateRef, computed } from 'vue'
import Konva from 'konva'
import { sleep } from '@/lib/utils'
import StartNode from './StartNode.vue'
import Node from './Node.vue'
import EndNode from './EndNode.vue'
import { Button } from './ui/button'
import { Focus, Loader, ZoomIn, ZoomOut } from 'lucide-vue-next'
import { useWorkflowStore } from '@/stores/workflow'
import { useEditorStore } from '@/stores/editor'
import CanvasEditorLoader from './CanvasEditorLoader.vue'
import CanvasEditorError from './CanvasEditorError.vue'

const workflowStore = useWorkflowStore()
const editorStore = useEditorStore()

const stageEl = useTemplateRef('stageEl')
const layerEl = useTemplateRef('layerEl')

// Stage size
const stageSize = ref({
  width: (window.innerWidth * 50) / 100,
  height: window.innerHeight,
  draggable: true,
})

const centerX = stageSize.value.width! / 2
const centerY = 20

const circleRadius = 35
const zoomFactor = 0.1

const endNodeY = computed(() => {
  const tasks = workflowStore.workflow?.tasks
  if (tasks?.length == 0) {
    return centerY + 130 * tasks.length + 165
  }
  return centerY + 130 * tasks?.length! + 170
})

const cacheLayer = async (ms: number = 0) => {
  await sleep(ms)
  layerEl.value.getNode().cache()
}
const unCacheLayer = async (ms: number = 0) => {
  await sleep(ms)
  layerEl.value.getNode().clearCache()
}

function handleMouseEnter() {
  cacheLayer()
}

function handleMouseLeave() {
  unCacheLayer()
}

function jumpingToRefCode(ref: string) {
  editorStore.jumpToCode(ref)
}

function updateCodeEditor() {
  if (editorStore.editor) {
    const view = editorStore.editor
    const newDoc = JSON.stringify(workflowStore.workflow, null, 2)

    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: newDoc },
    })
  }
}

async function addItem(index: number) {
  workflowStore.addTask(index)

  layerEl.value.getNode().clearCache()
  await sleep(100)
  layerEl.value.getNode().cache()

  updateCodeEditor()
}

async function removeItem(index: number) {
  unCacheLayer()

  await sleep(100)
  workflowStore.removeTask(index)

  await sleep(100)
  cacheLayer()

  updateCodeEditor()
}

function zoomIn() {
  cacheLayer()

  if (!stageEl.value) return
  const stage = stageEl.value.getNode()
  stage.scale({
    x: stage.scaleX() + zoomFactor,
    y: stage.scaleY() + zoomFactor,
  })
}

function zoomOut() {
  cacheLayer()

  if (!stageEl.value) return

  const stage = stageEl.value.getNode()
  stage.scale({
    x: Math.max(stage.scaleX() - zoomFactor, 0.1), // minimal scale 0.1
    y: Math.max(stage.scaleY() - zoomFactor, 0.1),
  })
}

function focusCenter() {
  cacheLayer()
  if (!stageEl.value) return
  const stage = stageEl.value.getNode()
  stage.to({
    x: stageSize.value.width! / 2 - centerX * stage.scaleX(),
    y: centerY,
    duration: 0.3,
    easing: Konva.Easings.EaseInOut,
  })
}

onMounted(async () => {
  if (stageEl.value) {
    const container = stageEl.value.getNode().container()
    container.style.backgroundColor = '#f3f4f6'
  }
})
</script>

<template>
  <template v-if="workflowStore.success">
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
    <v-stage ref="stageEl" :config="stageSize" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <v-layer ref="layerEl">
        <StartNode :x="centerX" :y="centerY + 40" :circleRadius="circleRadius" @add="addItem(-1)" />
        <Node v-for="(item, index) in workflowStore.workflow?.tasks" :key="JSON.stringify(item)" :index="index"
          :x="centerX" :y="centerY + 130 * (index + 1)" :text="item.name" :taskReference="item.taskReferenceName"
          :type="item.type" @add="addItem" @remove="removeItem" @jump="jumpingToRefCode" />
        <EndNode :x="centerX" :y="endNodeY" :radius="circleRadius" />
      </v-layer>
    </v-stage>
  </template>
  <CanvasEditorLoader v-if="workflowStore.loading" />
  <CanvasEditorError v-if="workflowStore.error" />
</template>
