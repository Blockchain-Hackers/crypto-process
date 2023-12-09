import type { Trigger, Function, WorkflowCookieData } from '@/types/workflow';
import { useCookies } from '@vueuse/integrations/useCookies'
import { defineStore } from 'pinia';

const cookies = useCookies(["workflow"]);
export const useWorkflowStore = defineStore('workflow', {
  state: () => ({
    workflows: cookies.get<WorkflowCookieData>('workflow') || {
      trigger: null,
      steps: []
    },
  }),
  getters: {
    getTrigger: () => {
      return cookies.get<WorkflowCookieData>('workflow')?.trigger
    },
    getStep: () => (localId:string) => {
      const steps = cookies.get<WorkflowCookieData>('workflow')?.steps
      return steps.find((step) => step.localId === localId) ?? null
    }
  },
  actions: {
    setSelectedTriggerStep({trigger, localId}: {trigger:Trigger, localId:string}) {
      const existingTrigger = cookies.get<WorkflowCookieData>('workflow')?.trigger
      if(existingTrigger?.localId === localId) {
        return
      }

      cookies.set('workflow', {
        trigger: {
          localId,
          canAddNextStep: true,
          formData: null,
        },
        steps: cookies.get<WorkflowCookieData>('workflow')?.steps ?? []
      })
    },
    setSelectedFunctionStep({function_, localId}: {function_:Function, localId:string}) {
      const stepsCookie = cookies.get<WorkflowCookieData>('workflow')?.steps
      const existingSteps = [...(stepsCookie ?? [])]
      // check existing steps for the id
      existingSteps.map((step) => {
        if(step.localId === localId) {
          return
        }
      })
        
      cookies.set('workflow', {
        trigger: cookies.get<WorkflowCookieData>('workflow')?.trigger,
        steps: [
          ...existingSteps,
          { localId, canAddNextStep: false, formData: null }
        ]
      })
    },
    createNextStep() {
      const existingSteps = cookies.get<WorkflowCookieData>('workflow')?.steps ?? []
      const localId = new Date().toJSON()
      const payload:WorkflowCookieData = {
        trigger: cookies.get<WorkflowCookieData>('workflow')?.trigger,
        steps: [
          ...existingSteps,
          { localId, canAddNextStep: false, formData: null }
        ]
      }
      cookies.set('workflow', payload)
      this.workflows = payload
    }
  }
})