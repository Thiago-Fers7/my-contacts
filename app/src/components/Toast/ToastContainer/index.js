import { useEffect, useState } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

import { toastEventManager } from '../../../utils/toast';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prev) => [
        ...prev, { id: Math.random(), type, text },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  function handleRemoveMessage(id) {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  }

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={() => handleRemoveMessage(message.id)}
        />
      ))}
    </Container>
  );
}
