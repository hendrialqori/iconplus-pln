<script setup lang="ts">
import { Button } from './components/ui/button';
import { Rocket, Save, Workflow, Code } from 'lucide-vue-next';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from './components/ui/breadcrumb';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import CodeEditor from './components/CodeEditor.vue';
import CanvasEditor from './components/CanvasEditor.vue';
</script>

<template>
  <main>
    <header class="bg-gray-100 border-b py-3 flex items-center justify-between px-6">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="text-primary font-medium">
              Workflow Definitions
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem class="font-medium text-black">
              sample_perkalian
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 class="text-lg font-medium">sample_perkalian</h1>
      </div>
      <div class="space-x-2">
        <Button>
          <Rocket class="size-4" />
          Execute
        </Button>
        <Button variant="outline">
          <Save class="size-4" />
          Save
        </Button>
      </div>
    </header>
    <section class="h-[calc(100vh_-_75px)]">
      <ResizablePanelGroup class="h-full" direction="horizontal">
        <ResizablePanel class="font-sans relative">
          <CanvasEditor />
        </ResizablePanel>
        <ResizableHandle with-handle />
        <ResizablePanel :default-size="30" :max-size="50" :min-size="30" class="p-2">
          <Tabs default-value="workflow">
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
              <Card>
                <CardHeader>
                  <CardTitle class="font-semibold">Workflow Details</CardTitle>
                  <CardDescription>
                    Making change value automaticaly save.
                  </CardDescription>
                </CardHeader>
                <CardContent class="flex flex-col gap-3">
                  <fieldset class="flex flex-col gap-2">
                    <Label for="name">Name</Label>
                    <Input id="name" default-value="sample_perkalian" />
                  </fieldset>
                  <fieldset class="flex flex-col gap-2">
                    <Label for="username">Description</Label>
                    <Input id="username" default-value="perkalian sederhana" />
                  </fieldset>
                </CardContent>
              </Card>
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
