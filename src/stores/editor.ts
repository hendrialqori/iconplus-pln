import { ref } from 'vue'
import { defineStore } from 'pinia'
import { EditorView } from 'codemirror'
import { EditorSelection } from '@codemirror/state'

export const useEditorStore = defineStore('editor', () => {
    const isEditorReady = ref(false)
    const editor = ref<EditorView | null>(null)

    function setEditor(newEditor: EditorView) {
        editor.value = newEditor
        isEditorReady.value = true
    }

    function jumpToCode(text: string) {
        if (!editor.value) return
        const doc = editor.value.state.doc.toString()
        const index = doc.indexOf(text)
        if (index === -1) {
            console.warn('Text not found:', text)
            return
        }
        editor.value.dispatch({
            selection: EditorSelection.cursor(index),
            scrollIntoView: true,
        })
        editor.value.scrollDOM.scrollIntoView({
            behavior: 'instant',
            block: 'center',
        })
    }

    return { editor, isEditorReady, setEditor, jumpToCode }
})
