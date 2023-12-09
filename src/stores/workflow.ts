import type {
  Trigger,
  Function,
  WorkflowCookieData,
  WorkflowFunctionData,
  WorkflowTriggerData
} from '@/types/workflow';
import { useCookies } from '@vueuse/integrations/useCookies'
import { defineStore } from 'pinia';
import { useTriggerStore } from './triggers';
import { useFunctionsStore } from './functions';

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
    },
    getTriggerOrFunctionById: () => ({_id, isTrigger}: {_id:string, isTrigger:boolean}) => {
      if (isTrigger) {
        return useTriggerStore().triggers.find((trigger) => trigger._id === _id)
      }
      return useFunctionsStore().functions.find((function_) => function_._id === _id)
    },
  },
  actions: {
    setSelectedTriggerStep({trigger, localId}: {trigger:Trigger, localId:string}) {
      const triggerPayload:WorkflowTriggerData = {
        _id: trigger._id,
        localId,
        canAddNextStep: true,
        formData: null
      }

      cookies.set('workflow', {
        trigger: triggerPayload,
        steps: cookies.get<WorkflowCookieData>('workflow')?.steps ?? []
      })
    },
    setSelectedFunctionStep({function_, localId}: {function_:Function, localId:string}) {
      const stepsCookie = cookies.get<WorkflowCookieData>('workflow')?.steps
      const existingSteps = [...(stepsCookie ?? [])]
      const stepPayload:WorkflowFunctionData = {
        _id: function_._id,
        localId,
        canAddNextStep: false,
        formData: null
      }

      let stepExists = false
      existingSteps.map((step,i) => {
        if (step.localId === localId) {
          existingSteps[i] = stepPayload
          stepExists = true
        }
      })
      if(!stepExists) existingSteps.push(stepPayload)

      cookies.set('workflow', {
        trigger: cookies.get<WorkflowCookieData>('workflow')?.trigger,
        steps: existingSteps
      })
    },
    createNextStep() {
      const existingSteps = cookies.get<WorkflowCookieData>('workflow')?.steps ?? []
      const localId = new Date().toJSON()
      const payload:WorkflowCookieData = {
        trigger: cookies.get<WorkflowCookieData>('workflow')?.trigger,
        steps: [
          ...existingSteps,
          {
            _id: null,
            localId,
            canAddNextStep: false,
            formData: null
          }
        ]
      }
      cookies.set('workflow', payload)
      this.workflows = payload
    }
  }
})