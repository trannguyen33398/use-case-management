interface MyOptions {
  id: string;
  value: string;
  name: string;
}

export interface UseCaseCreate {
  id: string | null;
  name: string | null;
  processParentId: string | null;
  parentId: string | null;
  parentName: string | null;
  systems: MyOptions[] | any[];
  useCaseClusters: MyOptions[] | any[];
  plantId: string | null;
  processId: string | null;
  priority: number;
  machines: MyOptions[] | any[];
  risks: MyOptions[] | any[];
  type: string | null;
  category: string | null;
  descriptionRating:string | null;
  serviceLines: MyOptions[] | any[];
  responsiblePerson: string | null;
  collectedAt: string | null;
  targetDefinition: string | null;
  majorIssueDefinition: string | null;
  relevantTags: string | null;
  blockPoints: string | null;
  blockingPointsToServiceLines: MyOptions[] | any[];
  comment: string | null;
  projectName: string | null;
  communicationStreams: MyOptions[] | any[];
  active: boolean | string | null;
}





export interface UseCaseEdit extends UseCaseCreate {
  processParentName: string | null;
  processName:string | null;
  plantName:string | null;
}

export type UseCasesList = { total: number; data: UseCaseEdit[] |[] };

 export type UseCaseDetail = { data: UseCaseEdit };
