export type FunctionParameter = {
  name: string;
  type: string;
  path: string;
  dataType: string;
  _id: string;
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