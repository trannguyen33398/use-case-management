import http from "../../utils/http";
import { UseCaseCreate, UseCaseDetail, UseCaseEdit, UseCasesList } from "../../types/use-cases";
export const getListUseCase = (
  page: number | string,
  limit: number | string,
  name?: string,
  signal?: AbortSignal
) =>
  http.get<UseCasesList>("/api/v1/use-case/", {
    params: {
      page,
      limit,
      name,
    },
    signal,
  });

export const getUseCase = (useCaseId: string, signal?: AbortSignal) =>
  http.get<UseCaseDetail>(`/api/v1/use-case/${useCaseId}`, {
    signal,
  });

export const updateUseCase = (
  useCaseId: string,
  data: UseCaseEdit,
  signal?: AbortSignal
) =>
  http.put<UseCaseEdit>(`/api/v1/use-case/${useCaseId}`, {
    signal,
    ...data,
  });

export const createUseCase = (data: UseCaseCreate, signal?: AbortSignal) =>
  http.post<UseCaseCreate>(`/api/v1/use-case/`, {
    signal,
    ...data,
  });
