import { useCallback, useState } from "react";

const useModal = <T>(
  defaultOpen: boolean = false,
  defaultData: T | null = null
) => {
  const [open, setOpen] = useState(defaultOpen);
  const [data, setData] = useState(defaultData);

  const onOpen = useCallback((openData: T) => {
    setOpen(true);
    setData(openData);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    setData(null);
  }, []);

  return { open, data, onOpen, onClose };
};

export default useModal;
