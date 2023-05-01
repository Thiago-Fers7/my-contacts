import { useCallback, useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';

export default function useToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prev) => [
        ...prev, {
          id: Math.random(), type, text, duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  }, []);

  return {
    messages,
    handleRemoveMessage,
  };
}
