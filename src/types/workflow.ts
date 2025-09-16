interface TaskInputParameters {
  [key: string]: any
}

export interface Task {
  name: string
  taskReferenceName: string
  description?: string
  inputParameters: TaskInputParameters
  type: string
  dynamicTaskNameParam?: string | null
  caseValueParam?: string | null
  caseExpression?: string | null
  scriptExpression?: string | null
  dynamicForkJoinTasksParam?: string | null
  dynamicForkTasksParam?: string | null
  dynamicForkTasksInputParamName?: string | null
  startDelay?: number
  subWorkflowParam?: any
  sink?: string | null
  optional?: boolean
  taskDefinition?: any
  rateLimited?: any
  asyncComplete?: boolean
  loopCondition?: any
  retryCount?: number | null
  evaluatorType?: string | null
  expression?: string | null
}

export interface Workflow {
  ownerApp: string | null
  createTime: number
  updateTime: number
  createdBy: string | null
  updatedBy: string | null
  accessPolicy: Record<string, any>
  name: string
  description: string
  version: number
  tasks: Task[]
  inputParameters: string[]
  outputParameters: Record<string, string>
  failureWorkflow: string | null
  schemaVersion: number
  restartable: boolean
  workflowStatusListenerEnabled: boolean
  ownerEmail: string
  timeoutPolicy: string
  timeoutSeconds: number
  variables: Record<string, any>
  inputTemplate: Record<string, any>
}
