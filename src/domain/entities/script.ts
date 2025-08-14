export interface IScriptBit {
  type: string;
  name: string;
  description: string;
  unit: string;
}

export interface IScriptSend {
  script_name: string;
  script_description: string;
  in_fields: IScriptBit[];
  out_fields: IScriptBit[];
  file_id: number;
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

export interface IScriptFileCreateReturn {
  file_id: number;
  message: string;
}
export interface IScriptCreateReturn {
  script_id: number;
  message: string;
}

export interface IScriptStart {
  in_params: IScriptBit[];
  notify_by_email: boolean;
}
