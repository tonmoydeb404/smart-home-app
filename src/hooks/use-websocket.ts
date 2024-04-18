import { useEffect, useRef, useState } from "react";

const useWebSocket = (url: string, onMessage?: (message: string) => void) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const reconnectCount = useRef(0);

  const connectWebSocket = () => {
    setIsLoading(true);
    const newSocket = new WebSocket(url);

    const handleOpen = () => {
      setIsLoading(false);
      setIsReady(true);
      reconnectCount.current = 0; // Reset reconnect count on successful connection
    };

    const handleMessage = (event: MessageEvent) => {
      setMessage(event.data);
      if (onMessage) onMessage(event.data);
    };

    const handleClose = () => {
      setIsLoading(false);
      setIsReady(false);
      reconnect();
    };

    const handleError = () => {
      setIsLoading(false);
      reconnect();
    };

    newSocket.addEventListener("open", handleOpen);
    newSocket.addEventListener("message", handleMessage);
    newSocket.addEventListener("close", handleClose);
    newSocket.addEventListener("error", handleError);

    setSocket(newSocket);
  };

  const reconnect = () => {
    const maxReconnectAttempts = 5;
    const reconnectInterval = 3000; // 3 seconds

    if (reconnectCount.current < maxReconnectAttempts) {
      setTimeout(() => {
        reconnectCount.current++;
        connectWebSocket();
      }, reconnectInterval);
    } else {
      // console.log("Max reconnect attempts reached");
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const send = (data: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(data);
    }
  };

  return { message, isLoading, isReady, socket, send, reconnect };
};

export default useWebSocket;
