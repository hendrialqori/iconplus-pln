<script lang="ts" setup>
import { Save } from 'lucide-vue-next'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from './ui/breadcrumb'
import { Button } from './ui/button'
import { useWorkflowStore } from '@/stores/workflow'

const workflowStore = useWorkflowStore()
</script>

<template>
    <header class="bg-gray-100 border-b py-3 flex items-center justify-between px-6">
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem class="text-primary font-medium"> Workflow Definitions </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem class="font-medium text-black">
                        {{ workflowStore.workflow?.name ?? '-' }}
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 class="text-lg font-medium">{{ workflowStore.workflow?.name ?? '-' }}</h1>
        </div>
        <div class="space-x-2">
            <Button>
                <Save class="size-4" />
                Save
            </Button>
        </div>
    </header>
</template>
