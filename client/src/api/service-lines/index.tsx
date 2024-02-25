import http from "../../utils/http";
import {
  ServiceLine,
  ServiceLineDetail,
  ServiceLines,
} from "../../types/service-lines";
export const getListServiceLine = (
  page: number | string,
  limit: number | string,
  name?: string,
  signal?: AbortSignal
) =>
  http.get<ServiceLines>("/api/v1/service-line/", {
    params: {
      page,
      limit,
      name,
    },
    signal,
  });

export const getServiceLine = (serviceLineId: string, signal?: AbortSignal) =>
  http.get<ServiceLineDetail>(`/api/v1/service-line/${serviceLineId}`, {
    signal,
  });

export const updateServiceLine = (
  serviceLineId: string,
  data: ServiceLine,
  signal?: AbortSignal
) =>
  http.put<ServiceLine>(`/api/v1/service-line/${serviceLineId}`, {
    signal,
    ...data,
  });

export const createServiceLine = (data: ServiceLine, signal?: AbortSignal) =>
  http.post<ServiceLine>(`/api/v1/service-line/`, {
    signal,
    ...data,
  });
