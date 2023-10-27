export interface BoxSpec {
  id: number;
  idGroup: number;
  name: string;
  type: 'CCTV';
}

export interface DustbinState {
  accepts: string[];
  lastDroppedItem: any;
}

export interface IApiError {
  message: string;
  description: string;
  statusCode: string | number;
}

export interface BoxState {
  id: number;
  idGroup: number;
  name: string;
  type: 'CCTV';
}

export type ActionType = 'list' | 'new' | 'edit';
