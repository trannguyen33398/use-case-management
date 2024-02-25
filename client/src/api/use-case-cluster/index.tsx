import http from "../../utils/http";
import { Plant, PlantDetail, Plants } from "../../types/plants";
import { UseCaseCluster, UseCaseClusterDetail, UseCaseClusters } from "../../types/use-case-cluster";
export const getListUseCaseCluster = (
  page: number | string,
  limit: number | string,
  name?: string,
  signal?: AbortSignal
) =>
  http.get<UseCaseClusters>("/api/v1/use-case-cluster/", {
    params: {
      page,
      limit,
      name,
    },
    signal,
  });

export const getUseCaseCluster = (useCaseClusterId: string, signal?: AbortSignal) =>
  http.get<UseCaseClusterDetail>(`/api/v1/use-case-cluster/${useCaseClusterId}`, {
    signal,
  });

export const updateUseCaseCluster = (
  plantId: string,
  data: UseCaseCluster,
  signal?: AbortSignal
) =>
  http.put<UseCaseCluster>(`/api/v1/use-case-cluster/${plantId}`, {
    signal,
    ...data,
  });

export const createUseCaseCluster = (data: UseCaseCluster, signal?: AbortSignal) =>
  http.post<UseCaseCluster>(`/api/v1/use-case-cluster/`, {
    signal,
    ...data,
  });
