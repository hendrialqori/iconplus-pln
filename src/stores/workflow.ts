import type { Task, Workflow } from '@/types/workflow'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWorkflowStore = defineStore('workflow', () => {
  const workflow = ref<Workflow>()
  const loading = ref(false)
  const success = ref(false)
  const error = ref<string | null>(null)

  async function fetchWorkflows() {
    loading.value = true
    error.value = null

    try {
      const endpoint =
        'http://localhost:8080/api/metadata/workflow/workflow_standar_billing_mutasi_beban_blok_ke_beban_blok_v2'
      const res = await fetch(endpoint)

      if (!res.ok) throw new Error(`HTTP error! ${res.status}`)
      const data = await res.json()

      workflow.value = data
      success.value = true
    } catch (err: any) {
      error.value = err.message || 'Gagal fetch data'
    } finally {
      loading.value = false
    }
  }

  function addTask(index: number, newTask?: Partial<Task>) {
    if (!workflow.value) return
    if (!workflow.value.tasks) workflow.value.tasks = []

    const defaultTask: Task = {
      name: `task_${workflow.value.tasks.length + 1}`,
      taskReferenceName: `ref_${workflow.value.tasks.length + 1}`,
      type: 'INLINE',
      inputParameters: {
        evaluatorType: '',
        tglcabut: '',
        tglbacaawal: '',
        expression: '',
      },
      dynamicTaskNameParam: null,
      caseValueParam: null,
      caseExpression: null,
      scriptExpression: null,
      dynamicForkJoinTasksParam: null,
      dynamicForkTasksParam: null,
      dynamicForkTasksInputParamName: null,
      startDelay: 0,
      subWorkflowParam: null,
      sink: null,
      optional: false,
      taskDefinition: null,
      rateLimited: null,
      asyncComplete: false,
      loopCondition: null,
      retryCount: null,
      evaluatorType: null,
      expression: null,
    }

    const taskToAdd: Task = {
      ...defaultTask,
    }
    workflow.value.tasks.splice(index + 1, 0, taskToAdd)
  }

  function removeTask(index: number) {
    workflow.value?.tasks.splice(index, 1)
  }

  function changeWorkflowCode(newValue: string) {
    console.log(JSON.parse(newValue))
    workflow.value = JSON.parse(newValue)
  }

  return {
    workflow,
    loading,
    success,
    error,
    fetchWorkflows,
    addTask,
    removeTask,
    changeWorkflowCode,
  }
})
