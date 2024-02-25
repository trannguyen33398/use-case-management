import http from "../../utils/http";
import { Plant, PlantDetail, Plants } from "../../types/plants";
export const getListPlant = (
  page: number | string,
  limit: number | string,
  name?: string,
  signal?: AbortSignal
) =>
  http.get<Plants>("/api/v1/plant/", {
    params: {
      page,
      limit,
      name,
    },
    signal,
  });

export const getPlant = (plantId: string, signal?: AbortSignal) =>
  http.get<PlantDetail>(`/api/v1/plant/${plantId}`, {
    signal,
  });

export const updatePlant = (
  plantId: string,
  data: Plant,
  signal?: AbortSignal
) =>
  http.put<Plant>(`/api/v1/plant/${plantId}`, {
    signal,
    ...data,
  });

export const createPlant = (data: Plant, signal?: AbortSignal) =>
  http.post<Plant>(`/api/v1/plant/`, {
    signal,
    ...data,
  });
