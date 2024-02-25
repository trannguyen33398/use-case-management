export interface Process {
  id: string;
  name: string;
  type: string;
  focusField: boolean | string;
  parentId: string;
  parentName: string;
  active: boolean | string;
}

export type Processes = { total: number; data: Process[] };

export type ProcessDetail = { data: Process };
