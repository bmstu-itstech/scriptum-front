export interface IScriptBit {
  type: string;
  name: string;
  description: string;
  unit: string;
}

export interface IScript {
  script_id: number;
  fields: IScriptBit[];
  path: string;
  owner: number;
  visibility: 'private' | 'global';
  created_at: Date;
}

export interface IScriptStart {
  in_params: IScriptBit[];
  notify_by_email: boolean;
}
