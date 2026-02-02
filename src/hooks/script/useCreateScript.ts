import { useMutation } from '@tanstack/react-query';
import { blueprintsApi } from '@/shared/api/BlueprintsClient';
import type {
  CreateBlueprintRequest,
  CreateBlueprintResponse,
  InvalidInputError,
  PlainError,
} from '@/shared/api/generated/data-contracts';
import type { AxiosError } from 'axios';

export const useCreateScript = () => {
  const { data, isPending, error, isSuccess, mutate } = useMutation<
    CreateBlueprintResponse,
    AxiosError<InvalidInputError | PlainError>,
    CreateBlueprintRequest
  >({
    mutationKey: ['createScript'],
    mutationFn: async (values: CreateBlueprintRequest) => {
      const response = await blueprintsApi.createBlueprint(values);
      return response.data;
    },
  });

  return { data, isPending, error, isSuccess, mutate };
};
