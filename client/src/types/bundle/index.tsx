import { MyOptions } from "../../utils/utils";

export interface Bundle {
  id: string ;
  name: string;
  description: string ;
  useCases: MyOptions[] | string[] | [];

}


export type Bundles = { total: number; data: Bundle[] };

export type BundleDetail = { data: Bundle };
