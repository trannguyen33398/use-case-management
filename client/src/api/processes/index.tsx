import http from "../../utils/http";
import { Process, ProcessDetail, Processes } from "../../types/processes";
export const getListProcess = (
  page: number | string,
  limit: number | string,
  name?: string,
  signal?: AbortSignal
) =>
  http.get<Processes>("/api/v1/process/", {
    params: {
      page,
      limit,
      name,
    },
    signal,
  });

export const getProcess = (processId: string, signal?: AbortSignal) =>
  http.get<ProcessDetail>(`/api/v1/process/${processId}`, {
    signal,
  });

export const updateProcess = (
  processId: string,
  data: Process,
  signal?: AbortSignal
) =>
  http.put<Process>(`/api/v1/process/${processId}`, {
    signal,
    ...data,
  });

export const createProcess = (data: Process, signal?: AbortSignal) =>
  http.post<Process>(`/api/v1/process/`, {
    signal,
    ...data,
  });
