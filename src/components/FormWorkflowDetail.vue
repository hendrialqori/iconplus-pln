<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useWorkflowStore } from '@/stores/workflow'

const workflowStore = useWorkflowStore()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="font-semibold">Workflow Details</CardTitle>
      <CardDescription> Making change value automaticaly save. </CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-3">
      <fieldset class="flex flex-col gap-2">
        <Label for="name">Name</Label>
        <Input id="name" :default-value="workflowStore.workflow?.name || '-'" />
      </fieldset>
      <fieldset class="flex flex-col gap-2">
        <Label for="username">Description</Label>
        <Input id="username" :default-value="workflowStore.workflow?.description || '-'" />
      </fieldset>
    </CardContent>
  </Card>
</template>
