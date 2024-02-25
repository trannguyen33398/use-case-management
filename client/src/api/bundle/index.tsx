import { Bundle, BundleDetail, Bundles } from "../../types/bundle";
import http from "../../utils/http";
export const getListBundle = (
  page: number | string,
  limit: number | string,
  name?: string,
  signal?: AbortSignal
) =>
  http.get<Bundles>("/api/v1/bundle/", {
    params: {
      page,
      limit,
      name
    },
    signal,
  });

export const getBundle = (bundleId: string, signal?: AbortSignal) =>
  http.get<BundleDetail>(`/api/v1/bundle/${bundleId}`, {
    signal,
  });

export const updateBundle = (
  bundleId: string,
  data: Bundle,
  signal?: AbortSignal
) =>
  http.put<Bundle>(`/api/v1/bundle/${bundleId}`, {
    signal,
    ...data,
  });


  export const createBundle = (
    data: Bundle,
    signal?: AbortSignal
  ) =>
    http.post<Bundle>(`/api/v1/bundle/`, {
      signal,
      ...data,
    });
  