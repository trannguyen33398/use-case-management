import { Benefit, BenefitDetail, Benefits } from "../../types/benefits";
import http from "../../utils/http";
export const getListBenefit = (
  page: number | string,
  limit: number | string,
  name?: string,
  signal?: AbortSignal
) =>
  http.get<Benefits>("/api/v1/benefit/", {
    params: {
      page,
      limit,
      name
    },
    signal,
  });

export const getBenefit = (benefitId: string, signal?: AbortSignal) =>
  http.get<BenefitDetail>(`/api/v1/benefit/${benefitId}`, {
    signal,
  });

export const updateBenefit = (
  benefitId: string,
  data: Benefit,
  signal?: AbortSignal
) =>
  http.put<Benefit>(`/api/v1/benefit/${benefitId}`, {
    signal,
    ...data,
  });


  export const createBenefit = (
    data: Benefit,
    signal?: AbortSignal
  ) =>
    http.post<Benefit>(`/api/v1/benefit/`, {
      signal,
      ...data,
    });
  