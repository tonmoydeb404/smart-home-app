import { useCallback, useEffect, useRef, useState } from "react";
import useNativeWebSocket from "react-native-use-websocket";

const useWebSocket = (
  url: string | undefined,
  onMessage?: (message: string) => void
) => {
  const didUnmount = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const { sendMessage, lastMessage, readyState, getWebSocket } =
    useNativeWebSocket(url || "wss://echo.websocket.org", {
      onOpen: () => {
        console.log("OPEN");

        setIsLoading(false);
        setIsReady(true);
      },
      onClose: (e) => {
        console.log("CLOSE", e);
        setIsLoading(false);
        setIsReady(false);
      },
      onError: (e) => {
        console.log("ERROR", e);
        setIsReady(false);
        setIsLoading(false);
      },
      onMessage(event) {
        if (typeof event?.data === "string" && onMessage) onMessage(event.data);
      },
      retryOnError: true,
      shouldReconnect: () => didUnmount.current === false && !url,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
    });

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  const send = useCallback(
    (data: string) => {
      if (readyState === 1) {
        sendMessage(data);
      }
    },
    [readyState]
  );

  const reconnect = () => {
    console.log("Reconnect");
  };

  return { message: lastMessage, isLoading, isReady, send, reconnect };
};

export default useWebSocket;
