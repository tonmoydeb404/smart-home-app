import { useEffect, useState } from "react";

const useWebSocket = (url: string, onMessage?: (message: string) => void) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [reconnectCount, setReconnectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      console.log("OPEN");

      setIsLoading(false);
      setIsReady(true);
    };

    newSocket.onmessage = (event: MessageEvent) => {
      // console.log("MESSAGE");
      setMessage(event.data);
      if (onMessage) onMessage(event.data);
    };

    newSocket.onclose = (e) => {
      console.log("CLOSE", e);
      setIsLoading(false);
      setIsReady(false);
    };

    newSocket.onerror = (e) => {
      console.log("ERROR", e);
      setIsReady(false);
      setIsLoading(false);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, reconnectCount]);

  const send = (data: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(data);
    }
  };

  const reconnect = () => {
    setReconnectCount((prev) => prev + 1);
  };

  return { message, isLoading, isReady, socket, send, reconnect };
};

export default useWebSocket;
