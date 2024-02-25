import { Risk, RiskDetail, Risks } from "../../types/risks";
import http from "../../utils/http";
export const getListRisk = (
  page: number | string,
  limit: number | string,
  name?: string,
  signal?: AbortSignal
) =>
  http.get<Risks>("/api/v1/risk/", {
    params: {
      page,
      limit,
      name
    },
    signal,
  });

export const getRisk = (riskId: string, signal?: AbortSignal) =>
  http.get<RiskDetail>(`/api/v1/risk/${riskId}`, {
    signal,
  });

export const updateRisk = (
  riskId: string,
  data: Risk,
  signal?: AbortSignal
) =>
  http.put<Risk>(`/api/v1/risk/${riskId}`, {
    signal,
    ...data,
  });


  export const createRisk = (
    data: Risk,
    signal?: AbortSignal
  ) =>
    http.post<Risk>(`/api/v1/risk/`, {
      signal,
      ...data,
    });
  