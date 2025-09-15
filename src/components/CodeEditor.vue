<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { basicSetup, EditorView } from 'codemirror'
import { json } from '@codemirror/lang-json'
import { useEditorStore } from '@/stores/editor'

const editorEl = useTemplateRef("editorEl")
const editorStore = useEditorStore()

const data = { "ownerApp": null, "createTime": 1733184000000, "updateTime": 1757917847054, "createdBy": null, "updatedBy": null, "accessPolicy": {}, "name": "workflow_standar_billing_pecahan_rm_non_rm_s2_diatas_200_kva", "description": "Workflow Standar Billing Pecahan RM Non RM S2 diatas 200 kVA (init 2 tasks)", "version": 1, "tasks": [{ "name": "hari_pakai", "taskReferenceName": "hari_pakai_ref_1", "description": "Hari Pakai", "inputParameters": { "evaluatorType": "javascript", "tglbacaakhir": "${workflow.input.data.tglbacaakhir}", "tglbacalalu": "${workflow.input.data.tglbacalalu}", "flag_mutasi_j": "${workflow.input.data.flag_mutasi_j}", "expression": "function generatedFunction() { var flag = parseInt($.flag_mutasi_j, 10); if (flag === 1) { return 30; } var tglAwal = new Date($.tglbacalalu.substr(0, 4), parseInt($.tglbacalalu.substr(4, 2)) - 1, parseInt($.tglbacalalu.substr(6, 2))); var tglAkhir = new Date($.tglbacaakhir.substr(0, 4), parseInt($.tglbacaakhir.substr(4, 2)) - 1, parseInt($.tglbacaakhir.substr(6, 2))); var haripakai = (tglAkhir - tglAwal) / (1000 * 60 * 60 * 24); return Math.round(haripakai); } generatedFunction();" }, "type": "INLINE", "optional": false, "asyncComplete": false }, { "name": "hari_baca_akhir", "taskReferenceName": "hari_baca_akhir_ref_1", "description": "Hari Baca Akhir", "inputParameters": { "evaluatorType": "javascript", "tglbacalalu": "${workflow.input.data.tglbacalalu}", "tglbacaakhir": "${workflow.input.data.tglbacaakhir}", "expression": "function generatedFunction() { var year = parseInt($.tglbacaakhir.substr(0, 4)); var month = parseInt($.tglbacaakhir.substr(4, 2)) - 1; var day = parseInt($.tglbacaakhir.substr(6, 2)); if (day === 1) { if (month === 0) { year -= 1; month = 11; } else { month -= 1; } } var haripakai_bulan = new Date(year, month + 1, 0).getDate(); return haripakai_bulan; } generatedFunction();" }, "type": "INLINE", "optional": false, "asyncComplete": false }], "inputParameters": ["data"], "outputParameters": { "haripakai": "${hari_pakai_ref_1.output.result}", "haribaca_akhir": "${hari_baca_akhir_ref_1.output.result}" } }

onMounted(() => {
    if (editorEl.value) {
        const view = new EditorView({
            doc: JSON.stringify(data, null, 2),
            extensions: [basicSetup, json()],
            parent: editorEl.value,
        })
        editorStore.setEditor(view) // simpan ke Pinia
    }
})
</script>

<template>
    <div ref="editorEl" class="w-full h-[calc(100vh_-_140px)] overflow-y-auto text-sm border rounded-sm"></div>
</template>
