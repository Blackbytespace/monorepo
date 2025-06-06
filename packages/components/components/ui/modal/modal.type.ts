export type TModal = {
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  closeable?: boolean;
  class?: string;
  id?: string;
};
