import { type IScriptFileCreateReturn } from '@/domain/entities/script';
import { client } from '../axios';

const uploadFileScript: (file: File) => Promise<IScriptFileCreateReturn> = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await client.post(`/scripts/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (res.status >= 300) {
    throw new Error();
  }
  return res.data;
};

export { uploadFileScript };
