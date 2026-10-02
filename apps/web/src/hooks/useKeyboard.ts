import { useEffect } from 'react';

export const useKeyboard = (key: string, callback: (e: KeyboardEvent) => void, ctrlKey: boolean = false) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === key.toLowerCase() && (!ctrlKey || event.ctrlKey || event.metaKey)) {
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, ctrlKey]);
};
