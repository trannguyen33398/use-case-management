export interface Machine {
    id: string
    name: string
    parentId: string
    parentName: string
    description: string
    priority: number
    status: string 
    active: boolean | string
  }
  
  export type Machines = {total: number,data:Machine[]}

  export type MachineDetail = {data:Machine}
