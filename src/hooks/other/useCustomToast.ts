import { toast, type TypeOptions, type ToastContent } from 'react-toastify';

export const useCustomToast = () => {
  const notify = (content: ToastContent, type: TypeOptions) => {
    toast(content, { type: type, draggable: true, position: 'bottom-right', autoClose: 3000 });
  };
  return notify;
};
