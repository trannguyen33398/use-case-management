export interface UseCaseCluster {
    id: string;
    name: string;
    description: string;
    parentId: string;
    parentName: string;
    active: boolean | string;
  }
  
  export type UseCaseClusters = { total: number; data: UseCaseCluster[] };
  
  export type UseCaseClusterDetail = { data: UseCaseCluster };
  