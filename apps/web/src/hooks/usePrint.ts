import { useCallback } from 'react';

export const usePrint = () => {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return { handlePrint };
};
