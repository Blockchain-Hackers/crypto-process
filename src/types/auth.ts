export type Account = {
  _id: string;
  name: string;
  account_type: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  __v: number;
  type: string;
}

export type User = {
  id: string;
  email: string;
  image_url: string;
  accounts: Account[];
  hasSetPrivateKey: boolean;
}