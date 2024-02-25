import { CommunicationStream, CommunicationStreamDetail, CommunicationStreams } from "../../types/communication-streams";
import http from "../../utils/http";
export const getListCommunicationStream = (
  page: number | string,
  limit: number | string,
  name?: string,
  signal?: AbortSignal
) =>
  http.get<CommunicationStreams>("/api/v1/communication-stream/", {
    params: {
      page,
      limit,
      name
    },
    signal,
  });

export const getCommunicationStream = (communicationStreamId: string, signal?: AbortSignal) =>
  http.get<CommunicationStreamDetail>(`/api/v1/communication-stream/${communicationStreamId}`, {
    signal,
  });

export const updateCommunicationStream = (
  communicationStreamId: string,
  data: CommunicationStream,
  signal?: AbortSignal
) =>
  http.put<CommunicationStream>(`/api/v1/communication-stream/${communicationStreamId}`, {
    signal,
    ...data,
  });


  export const createCommunicationStream = (
    data: CommunicationStream,
    signal?: AbortSignal
  ) =>
    http.post<CommunicationStream>(`/api/v1/communication-stream/`, {
      signal,
      ...data,
    });
  