import { Machine, MachineDetail, Machines } from "../../types/machines";
import http from "../../utils/http";
export const getListMachine = (
  page: number | string,
  limit: number | string,
  name?: string,
  signal?: AbortSignal
) =>
  http.get<Machines>("/api/v1/machine/", {
    params: {
      page,
      limit,
      name
    },
    signal,
  });

export const getMachine = (machineId: string, signal?: AbortSignal) =>
  http.get<MachineDetail>(`/api/v1/machine/${machineId}`, {
    signal,
  });

export const updateMachine = (
  machineId: string,
  data: Machine,
  signal?: AbortSignal
) =>
  http.put<Machine>(`/api/v1/machine/${machineId}`, {
    signal,
    ...data,
  });


  export const createMachine = (
    data: Machine,
    signal?: AbortSignal
  ) =>
    http.post<Machine>(`/api/v1/machine/`, {
      signal,
      ...data,
    });
  