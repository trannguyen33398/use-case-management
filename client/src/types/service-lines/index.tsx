export interface ServiceLine {
  id: string;
  name: string;
  description: string;
  responsiblePerson: string;
  parentId: string;
  parentName: string;
  active: boolean | string;
}

export type ServiceLines = { total: number; data: ServiceLine[] };

export type ServiceLineDetail = { data: ServiceLine };
