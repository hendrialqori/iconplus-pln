<script setup lang="ts">
import { Workflow, Code } from 'lucide-vue-next'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodeEditor from './components/CodeEditor.vue'
import { defineAsyncComponent, Suspense } from 'vue'
import CanvasEditorLoader from './components/CanvasEditorLoader.vue'
import CanvasEditorError from './components/CanvasEditorError.vue'
import Header from './components/Header.vue'
import FormWorkflowDetail from './components/FormWorkflowDetail.vue'

// render async component canvas to prevent blocking rendering
const CanvasEditor = defineAsyncComponent({
  loader: () => import('./components/CanvasEditor.vue'),
  errorComponent: CanvasEditorError,
})
</script>

<template>
  <main>
    <Header />
    <section class="h-[calc(100vh_-_75px)]">
      <ResizablePanelGroup class="h-full" direction="horizontal">
        <ResizablePanel class="font-sans relative">
          <Suspense>
            <CanvasEditor />
            <template #fallback>
              <CanvasEditorLoader />
            </template>
          </Suspense>
        </ResizablePanel>
        <ResizableHandle with-handle />
        <ResizablePanel :default-size="30" :max-size="50" :min-size="30" class="p-2">
          <Tabs default-value="code">
            <TabsList>
              <TabsTrigger class="w-32" value="workflow">
                <Workflow />
                Workflow
              </TabsTrigger>
              <TabsTrigger class="w-32" value="code">
                <Code />
                Code
              </TabsTrigger>
            </TabsList>
            <TabsContent value="workflow">
              <FormWorkflowDetail />
            </TabsContent>
            <TabsContent value="code">
              <CodeEditor />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  </main>
</template>

<style scoped></style>
