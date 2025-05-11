import { useState, useEffect, useCallback, useRef } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";

export const useSocket = ({ currentUserId, API_BASE_URL, onMessageReceived }) => {
  const [connectionError, setConnectionError] = useState(null);
  const audioRef = useRef(null);
  const socketRef = useRef(null);

  // Initialize Socket.IO connection
  const initializeSocket = useCallback(() => {
    if (!API_BASE_URL) {
      console.error("useSocket: Missing API_BASE_URL");
      setConnectionError("Socket configuration error: Missing API URL");
      return;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    console.log("useSocket: Initializing Socket.IO with URL:", API_BASE_URL);
    socketRef.current = io(API_BASE_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on("connect", () => {
      console.log("Socket.IO connected:", socketRef.current.id);
      setConnectionError(null);
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Socket.IO connect_error:", err.message);
      setConnectionError(`Failed to connect to chat server: ${err.message}`);
      toast.error("Cannot connect to chat server. Please try again.");
    });

    socketRef.current.on("reconnect", (attempt) => {
      console.log("Socket.IO reconnected after attempt:", attempt);
    });

    socketRef.current.on("reconnect_failed", () => {
      console.error("Socket.IO reconnect_failed");
      setConnectionError("Unable to reconnect to chat server");
      toast.error("Reconnection to chat server failed");
    });

    return () => {
      socketRef.current.off("connect");
      socketRef.current.off("connect_error");
      socketRef.current.off("reconnect_failed");
    };
  }, [API_BASE_URL]);

  // Attempt to reconnect
  const handleReconnect = () => {
    console.log("useSocket: Attempting to reconnect...");
    initializeSocket();
  };

  // Initialize socket on mount
  useEffect(() => {
    initializeSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("Socket.IO disconnected");
      }
    };
  }, [initializeSocket]);

  // Notification sound
  useEffect(() => {
    if (!API_BASE_URL) {
      console.log("Notification sound: Skipping, no API_BASE_URL");
      return;
    }
    audioRef.current = new Audio(`${API_BASE_URL}/sounds/notification.mp3`);
    if (audioRef.current && typeof audioRef.current.load === "function") {
      console.log("Notification sound: Loading audio");
      audioRef.current.load();
    } else {
      console.warn("Notification sound: Audio load not supported");
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [API_BASE_URL]);

  // Subscribe to sockets
  useEffect(() => {
    if (!currentUserId || !socketRef.current) {
      console.log("Socket: Skipping, no currentUserId or socket");
      return;
    }
    console.log("Socket: Joining room", currentUserId);
    socketRef.current.emit("join_room", currentUserId);
    const handler = (data) => {
      console.log("Socket: Received message", data);
      if (data.sender !== currentUserId && data.playSound) {
        if (audioRef.current && typeof audioRef.current.play === "function") {
          audioRef.current.play().catch((err) => console.error("Audio play error:", err));
        } else {
          console.warn("Socket: Audio play not supported");
        }
      }
      if (data.receiver === currentUserId) {
        onMessageReceived(data);
      }
    };
    socketRef.current.on("receive_message", handler);
    return () => socketRef.current.off("receive_message", handler);
  }, [currentUserId, onMessageReceived]);

  const emitMessage = (messageData) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("send_message", messageData);
      console.log("Socket.IO message emitted:", messageData);
    } else {
      console.error("Cannot emit message: Socket not connected");
      setConnectionError("Cannot send message: Socket not connected");
      toast.error("Cannot send message: No connection to chat server");
    }
  };

  return { socket: socketRef.current, connectionError, handleReconnect, emitMessage };
};