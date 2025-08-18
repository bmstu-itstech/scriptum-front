import { useMutation } from '@tanstack/react-query';
import { uploadFileScript } from '@/shared/api/script/uploadFileScript';

export const useUploadFile = () => {
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ['uploadFile'],
    mutationFn: (file: File) => uploadFileScript(file),
  });

  return { isPending, error, mutateAsync };
};
