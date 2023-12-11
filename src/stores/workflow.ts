import type {
  Function,
  FunctionParameter,
  Trigger,
  WorkflowCookieData,
  WorkflowFunctionData,
  WorkflowTriggerData,
} from "@/types/workflow";
import { defineStore } from "pinia";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useFunctionsStore } from "./functions";
import { useTriggerStore } from "./triggers";
import { generateSlug } from "random-word-slugs";
import { useAuthStore } from "./auth";
import axios from "axios";

const cookies = useCookies(["workflow"]);
export const useWorkflowStore = defineStore("workflow", {
  state: () => ({
    workflows: cookies.get<WorkflowCookieData>("workflow") || {
      trigger: null,
      steps: [],
    },
    creatingWorkflow: false
  }),
  getters: {
    getTrigger: () => {
      return cookies.get<WorkflowCookieData>("workflow")?.trigger;
    },
    getStep: () => (localId: string) => {
      const steps = cookies.get<WorkflowCookieData>("workflow")?.steps;
      return steps.find((step) => step.localId === localId) ?? null;
    },
    hasSteps: (state) => state.workflows.steps.length > 0,
    getTriggerOrFunctionById: () => ({_id, isTrigger}: {_id:string, isTrigger:boolean}) => {
      if (isTrigger) {
        return useTriggerStore().triggers.find((trigger) => trigger._id === _id)
      }
      return useFunctionsStore().functions.find((function_) => function_._id === _id)
    },
    isAddedStepsCompleted: (state) => {
      if(!state.workflows.steps) return false
      return state.workflows.steps.every((step) => step.canAddNextStep)
    },
    isTriggerCompleted: (state) => {
      if(!state.workflows.trigger) return false
      return state.workflows.trigger.formData !== null
    },
  },
  actions: {
    setSelectedTriggerStep({
      trigger,
      localId,
    }: {
      trigger: Trigger;
      localId: string;
    }) {
      const triggerPayload: WorkflowTriggerData = {
        _id: trigger._id,
        localId,
        name: trigger.name,
        outputs: trigger.outputs,
        canAddNextStep: true,
        formData: null,
        slug: trigger.slug,
        type: trigger.type,
      };

      cookies.set("workflow", {
        trigger: triggerPayload,
        steps: cookies.get<WorkflowCookieData>("workflow")?.steps ?? [],
      });
      this.workflows.trigger = triggerPayload;
    },
    setSelectedFunctionStep({
      function_,
      localId,
    }: {
      function_: Function;
      localId: string;
    }) {
      const stepsCookie = cookies.get<WorkflowCookieData>("workflow")?.steps;
      const existingSteps = [...(stepsCookie ?? [])];
      const stepPayload: WorkflowFunctionData = {
        _id: function_._id,
        localId,
        name: function_.name,
        canAddNextStep: false,
        formData: null,
        outputs: function_.outputs,
        slug: function_.slug,
        type: function_.type,
      };

      let stepExists = false;
      existingSteps.map((step, i) => {
        if (step.localId === localId) {
          existingSteps[i] = stepPayload;
          stepExists = true;
        }
      });
      if (!stepExists) existingSteps.push(stepPayload);

      cookies.set("workflow", {
        trigger: cookies.get<WorkflowCookieData>("workflow")?.trigger,
        steps: existingSteps,
      });
      this.workflows.steps = existingSteps;
    },
    updateStep({
      localId,
      data,
      isTrigger,
    }: {
      localId: string;
      data: any;
      isTrigger: boolean;
    }) {
      if (isTrigger) {
        const existingTrigger =
          cookies.get<WorkflowCookieData>("workflow")?.trigger;
        if (!existingTrigger) return;

        const triggerPayload: WorkflowTriggerData = {
          ...existingTrigger,
          formData: data.formData,
        };
        cookies.set("workflow", {
          trigger: triggerPayload,
          steps: cookies.get<WorkflowCookieData>('workflow')?.steps
        })
        this.workflows.trigger = triggerPayload
        return
      }

      const existingSteps = cookies.get<WorkflowCookieData>("workflow")?.steps;
      existingSteps?.map((step, i) => {
        if (step.localId === localId) {
          // console.log(data);
          existingSteps[i].formData = data.formData;
          // existingSteps[i].outputs = data.outputs;
          existingSteps[i].canAddNextStep = true;
        }
      });
      cookies.set("workflow", {
        trigger: cookies.get<WorkflowCookieData>("workflow")?.trigger,
        steps: existingSteps,
      });
      this.workflows.steps = existingSteps;
    },
    createNextStep() {
      const existingSteps =
        cookies.get<WorkflowCookieData>("workflow")?.steps ?? [];
      const localId = new Date().toJSON();
      const payload: WorkflowCookieData = {
        trigger: cookies.get<WorkflowCookieData>("workflow")?.trigger,
        steps: [
          ...existingSteps,
          {
            _id: null,
            localId,
            name: undefined,
            canAddNextStep: false,
            formData: null,
            outputs: [],
            slug: "",
            type: "",
          },
        ],
      };
      cookies.set("workflow", payload);
      this.workflows = payload;
    },
    removeStep({localId}: {localId:string}) {
      const existingSteps = cookies.get<WorkflowCookieData>('workflow')?.steps
      const newSteps = existingSteps?.filter((step) => step.localId !== localId)
      cookies.set('workflow', {
        trigger: cookies.get<WorkflowCookieData>('workflow')?.trigger,
        steps: newSteps
      })
      this.workflows.steps = newSteps ?? []
    },
    clearWorkflowCreation() {
      cookies.remove("workflow");
      this.workflows = {
        trigger: null,
        steps: [],
      };
    },
    toJSON() {
      // get all triggers, their params and outputs also function params and outputs, reduce parameters to object from array
      const workflow = cookies.get<WorkflowCookieData>("workflow");
      const trigger = workflow?.trigger;
      const steps = workflow?.steps;
      const object = {
        trigger: {
          _id: trigger?._id,
          name: trigger?.name,
          outputs: trigger?.outputs?.reduce(
            (acc: Record<string, any>, output) => {
              acc[output.name] = output.type;
              return acc;
            },
            {}
          ),
        },
        steps: steps?.map((step) => ({
          _id: step._id,
          name: step.name,
          outputs: step.outputs?.reduce((acc: Record<string, any>, output) => {
            acc[output.name] = output.type;
            return acc;
          }, {}),
        })),
      };
      return JSON.parse(JSON.stringify(object));
    },
    createWorkflow():Promise<boolean> {
      this.creatingWorkflow = true
      const authstore = useAuthStore();

      return new Promise(async (resolve, reject) => {
        try {
          this.creatingWorkflow = true
          const trigger = this.workflows.trigger
          const triggerPayload = {
            name: trigger?.slug,
            slug: trigger?.slug,
            parameters: (trigger?.formData as FunctionParameter[] | null)?.map((param) => ({
              name: param.name,
              value: param?.valueRef,
              type: param?.type,
            })),
            trigger_id: trigger?._id,
            type: trigger?.type,
          }
          const steps = this.workflows.steps
          const stepsPayload = {
            steps: steps?.map((step) => ({
              name: step.name,
              parameters: (step.formData as FunctionParameter[] | null)?.map((param) => ({
                name: param.name,
                value: param?.valueRef,
                type: param?.type,
              })),
              function_id: step._id,
              function: step.slug,
            }))
          }
          const res = await axios.post(
            '/v1/flows',
            {
              name: generateSlug(5),
              trigger: triggerPayload,
              steps: stepsPayload.steps
            },
            authstore.getAuthHeader
          )
          // console.log({ workflowResponse: res.data })
          resolve(true)
        } catch (error) {
          reject(error);
        } finally {
          this.creatingWorkflow = false
        }
      });
    },
    fetchWorkflows():Promise<any[]> {
      const authstore = useAuthStore();
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await axios.get(
            "/v1/flows",
            authstore.getAuthHeader
          );
          resolve(data.data as any[]);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
