import { MyOptions } from "../../utils/utils";

export interface Benefit {
  id: string ;
  name: string;
  parentId: string | null;
  parentName: string | null;
  comments: string | null;
  type: string | null;
  sprintId: string | null;
  sprintStatus: string | null;
  calculationInput: string | null;
  savings: number |string | null;
  reliability: string[] | MyOptions[];
  useCases: MyOptions[] | string[] | [];
  benefitCategories: MyOptions[] | string[] | [];
}


export type Benefits = { total: number; data: Benefit[] };

export type BenefitDetail = { data: Benefit };
