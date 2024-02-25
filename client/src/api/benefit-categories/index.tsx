import { BenefitCategory, BenefitCategoryDetail, BenefitCategories } from "../../types/benefit-categories";
import http from "../../utils/http";
export const getListBenefitCategory = (
  page: number | string,
  limit: number | string,
  name?: string,
  signal?: AbortSignal
) =>
  http.get<BenefitCategories>("/api/v1/benefit-category/", {
    params: {
      page,
      limit,
      name
    },
    signal,
  });

export const getBenefitCategory = (benefitId: string, signal?: AbortSignal) =>
  http.get<BenefitCategoryDetail>(`/api/v1/benefit-category/${benefitId}`, {
    signal,
  });

export const updateBenefitCategory = (
  benefitId: string,
  data: BenefitCategory,
  signal?: AbortSignal
) =>
  http.put<BenefitCategory>(`/api/v1/benefit-category/${benefitId}`, {
    signal,
    ...data,
  });


  export const createBenefitCategory = (
    data: BenefitCategory,
    signal?: AbortSignal
  ) =>
    http.post<BenefitCategory>(`/api/v1/benefit-category/`, {
      signal,
      ...data,
    });
  