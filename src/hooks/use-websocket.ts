import { useEffect, useState } from "react";

const useWebSocket = (url: string, onMessage?: (message: string) => void) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const newSocket = new WebSocket(url);

    const handleOpen = () => {
      setIsLoading(false);
      setIsReady(true);
    };

    const handleMessage = (event: MessageEvent) => {
      setMessage(event.data);
      if (onMessage) onMessage(event.data);
    };

    const handleClose = () => {
      setIsLoading(false);
      setIsReady(false);
    };

    const handleError = () => {
      setIsLoading(false);
    };

    newSocket.addEventListener("open", handleOpen);
    newSocket.addEventListener("message", handleMessage);
    newSocket.addEventListener("close", handleClose);
    newSocket.addEventListener("error", handleError);

    setSocket(newSocket);

    return () => {
      if (newSocket && newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const send = (data: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(data);
    }
  };

  return { message, isLoading, isReady, socket, send };
};

export default useWebSocket;
