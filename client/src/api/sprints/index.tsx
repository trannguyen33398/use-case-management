import { Sprint, SprintDetail, Sprints } from "../../types/sprint";
import http from "../../utils/http";
export const getListSprint = (
  page: number | string,
  limit: number | string,
  name?: string,
  signal?: AbortSignal
) =>
  http.get<Sprints>("/api/v1/sprint/", {
    params: {
      page,
      limit,
      name,
    },
    signal,
  });

export const getSprint = (sprintId: string, signal?: AbortSignal) =>
  http.get<SprintDetail>(`/api/v1/sprint/${sprintId}`, {
    signal,
  });

export const updateSprint = (
  sprintId: string,
  data: Sprint,
  signal?: AbortSignal
) =>
  http.put<Sprint>(`/api/v1/sprint/${sprintId}`, {
    signal,
    ...data,
  });

export const createSprint = (data: Sprint, signal?: AbortSignal) =>
  http.post<Sprint>(`/api/v1/sprint/`, {
    signal,
    ...data,
  });
