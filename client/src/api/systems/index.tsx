import { System, SystemDetail, Systems } from "../../types/system";
import http from "../../utils/http";
export const getListSystem = (
  page: number | string,
  limit: number | string,
  name?: string,
  signal?: AbortSignal
) =>
  http.get<Systems>("/api/v1/system/", {
    params: {
      page,
      limit,
      name
    },
    signal,
  });

export const getSystem = (systemId: string, signal?: AbortSignal) =>
  http.get<SystemDetail>(`/api/v1/system/${systemId}`, {
    signal,
  });

export const updateSystem = (
  systemId: string,
  data: System,
  signal?: AbortSignal
) =>
  http.put<System>(`/api/v1/system/${systemId}`, {
    signal,
    ...data,
  });


  export const createSystem = (
    data: System,
    signal?: AbortSignal
  ) =>
    http.post<System>(`/api/v1/system/`, {
      signal,
      ...data,
    });
  