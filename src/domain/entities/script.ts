export interface IScriptBit {
  type: string;
  name: string;
  description: string;
  unit: string;
}

export interface IScript {
  script_id: number;
  script_name: string;
  script_description: string;
  in_fields: IScriptBit[];
  out_fields: IScriptBit[];
  file_id: number;
  owner: number;
  visibility: 'private' | 'global';
  created_at: string;
}

export interface IScriptStart {
  in_params: IScriptBit[];
  notify_by_email: boolean;
}
