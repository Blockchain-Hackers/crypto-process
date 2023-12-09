export type FunctionParameter = {
  _id: string;
  name: string;
  type: string;
  path: string;
  formElement: string; // input, select, textarea
  formType: string; // text, number, email, password, checkbox, radio, select, textarea
  hint: string;
  options?: {
    name: string;
    value: string | number;
  }[]
  created_at: string;
  updated_at: string;
}
export type Function = {
  _id: string;
  name: string;
  parameters: FunctionParameter[];
  code: string;
  slug: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export type TriggerParameter = {
  name: string;
  value: string;
  type: string;
  formElement: string; // input, select, textarea
  formType: string; // text, number, email, password, checkbox, radio, select, textarea
  hint?: string;
  // this options should probably be called "selectOptions"
  options?: {
    name: string;
    value: string | number;
  }[]
}
export type Trigger = {
  _id: string;
  name: string;
  slug: string;
  parameters: TriggerParameter[];
  created_at: string;
  updated_at: string;
  __v: number;
}

export type StepData<T> = {
  _id: string | null,
  localId: string,
  canAddNextStep: boolean,
  formData: T | null,
}

export type WorkflowTriggerData = StepData<Trigger>
export type WorkflowFunctionData = StepData<Function>
export type WorkflowCookieData = {
  trigger: WorkflowTriggerData,
} & {
  steps: WorkflowFunctionData[]
}