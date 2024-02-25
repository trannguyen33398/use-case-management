export interface Risk {
    id: string
    name: string
    parentId: string
    parentName: string
    description: string
    priority: number
    active: boolean | string
  }
  
  export type Risks = {total: number,data:Risk[]}

  export type  RiskDetail = {data:Risk}
