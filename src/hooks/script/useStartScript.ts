import { useMutation } from '@tanstack/react-query';
import { blueprintsApi } from '@/shared/api/BlueprintsClient';
import type {
  StartJobRequest,
  StartJobResponse,
  InvalidInputError,
  PlainError,
} from '@/shared/api/generated/data-contracts';
import type { AxiosError } from 'axios';
import { ValueType } from '@/shared/api/generated/data-contracts';

export interface StartScriptFormInput {
  in_params: { type: string; data: string }[];
  notify_by_email: boolean;
}

export const useStartScript = ({ id }: { id: string }) => {
  const { isPending, error, mutate } = useMutation<
    StartJobResponse,
    AxiosError<InvalidInputError | PlainError>,
    StartScriptFormInput
  >({
    mutationKey: ['startScript', id],
    mutationFn: async (value: StartScriptFormInput) => {
      const request: StartJobRequest = {
        values: value.in_params.map((param) => ({
          type: param.type as ValueType,
          value: param.data,
        })),
      };
      const response = await blueprintsApi.startJob(id, request);
      return response.data;
    },
  });

  return { isPending, error, mutate };
};
