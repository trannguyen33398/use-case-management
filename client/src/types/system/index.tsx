export interface System {
    id: string
    name: string
    parentId: string
    parentName: string
    description: string
    category: string
    toolName: string 
    active: boolean | string
  }
  
  export type Systems = {total: number,data:System[]}

  export type SystemDetail = {data:System}
