import { useQuery } from '@tanstack/react-query';
import { getScriptById } from '@/shared/api/script/getScriptById';
import { scriptElementUsecase2 } from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.usecase';

export const useGetScriptById = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getScript', id],
    queryFn: () => getScriptById(id),
    placeholderData: scriptElementUsecase2, //убрать когда будет бэкенд
  });

  return { data, isLoading, error };
};
