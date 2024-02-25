import { MyOptions } from "../../utils/utils";

export interface Sprint {
  id: string | null;
  name: null;
  bundleId: string | null;
  bundleName: null;
  plannedFrom: null;
  plannedTo: null;
  step: number;
  description: null;
  status: null;
  developmentStatus: null;
  iterationStatus: null;
  implementationStatus: null;
  handoverStatus: null;
  implementedAt: null;
  documents: null;
  useCases: MyOptions[] | string[] | [];
}

export type Sprints = { total: number; data: Sprint[] };

export type SprintDetail = { data: Sprint };
