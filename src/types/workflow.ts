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
  }[];
  created_at: string;
  updated_at: string;
  valueRef?: any;
};
export type Function = {
  _id: string;
  name: string;
  parameters: FunctionParameter[];
  outputs: { name: string; type: string }[];
  code: string;
  slug: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  __v: number;
};

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
  }[];
  valueRef?: any;
};
export type Trigger = {
  _id: string;
  name: string;
  slug: string;
  parameters: TriggerParameter[];
  created_at: string;
  updated_at: string;
  outputs: { name: string; type: string }[];
  __v: number;
};

export type StepData<T> = {
  _id: string | null;
  localId: string;
  name: string | undefined;
  canAddNextStep: boolean;
  formData: T | null;
  outputs?: { name: string; type: string }[];
};

export type WorkflowTriggerData = StepData<TriggerParameter>;
export type WorkflowFunctionData = StepData<FunctionParameter>;
export type WorkflowCookieData = {
  trigger: WorkflowTriggerData | null;
} & {
  steps: WorkflowFunctionData[];
};
