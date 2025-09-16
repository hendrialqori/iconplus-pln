<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { basicSetup, EditorView } from 'codemirror'
import { json } from '@codemirror/lang-json'
import { useEditorStore } from '@/stores/editor'
import { useWorkflowStore } from '@/stores/workflow'
import { debounce } from '@/lib/utils'
import { tomorrow } from 'thememirror'

const editorEl = useTemplateRef('editorEl')
const editorStore = useEditorStore()
const workflowStore = useWorkflowStore()

onMounted(async () => {
  await workflowStore.fetchWorkflows()

  if (editorEl.value) {
    const view = new EditorView({
      doc: JSON.stringify(workflowStore.workflow, null, 2),
      extensions: [
        basicSetup,
        tomorrow,
        json(),
        onChangeExtension((value) => {
          workflowStore.changeWorkflowCode(value)
        }),
      ],
      parent: editorEl.value,
    })
    editorStore.setEditor(view)
  }
})

let ignoreProgrammatic = false
function onChangeExtension(callback: (value: string) => void, delay = 300) {
  const debounced = debounce((value: string) => {
    if (ignoreProgrammatic) return
    callback(value)
  }, delay)

  return EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      debounced(update.state.doc.toString())
    }
  })
}
</script>

<template>
  <div
    ref="editorEl"
    class="w-full h-[calc(100vh_-_140px)] overflow-y-auto text-sm border rounded-sm"
  ></div>
</template>
