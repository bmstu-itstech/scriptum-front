import { useMutation } from '@tanstack/react-query';
import { filesApi } from '@/shared/api/FilesClient';

export const useUploadFile = () => {
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ['uploadFile'],
    mutationFn: (file: File) => filesApi.uploadFile({ attachment: file }),
  });

  return { isPending, error, mutateAsync };
};
