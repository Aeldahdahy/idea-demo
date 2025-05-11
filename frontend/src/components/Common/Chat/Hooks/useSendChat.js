import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useSendChat = ({ API_BASE_URL, updateMessages, currentUserId, currentUserData, currentUserRole, emitMessage, onFetchUsers }) => {
  const [inputMessage, setInputMessage] = useState("");

  const sendSocketMessage = useCallback(async (selectedUser) => {
    if (!inputMessage.trim() || !selectedUser || !currentUserId) {
      console.log('sendSocketMessage: Invalid input', { inputMessage, selectedUser, currentUserId });
      return false;
    }
    const now = Date.now();
    const messageData = {
      sender: currentUserId,
      receiver: selectedUser._id,
      message: inputMessage,
      timestamp: now,
      senderName: currentUserData.fullName,
      senderImage: currentUserData.image,
      senderRole: currentUserRole,
    };
    emitMessage(messageData);

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${API_BASE_URL}/api/chats`,
        {
          sender: currentUserId,
          receiver: selectedUser._id,
          message: inputMessage,
          senderName: currentUserData.fullName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return {
        id: `local-${now}`,
        sender: currentUserId,
        receiver: selectedUser._id,
        text: inputMessage,
        senderName: currentUserData.fullName,
        senderImage: currentUserData.image,
        side: "right",
        seen: true,
        timestamp: now,
      };
    } catch (e) {
      console.error("Persist chat error:", e);
      toast.error("Failed to save message");
      return false;
    }
  }, [inputMessage, currentUserId, currentUserData, currentUserRole, API_BASE_URL, emitMessage]);

  const sendEmailReply = useCallback(async (selectedUser) => {
    if (!inputMessage.trim() || !selectedUser || !currentUserId) {
      console.log('sendEmailReply: Invalid input', { inputMessage, selectedUser, currentUserId });
      return false;
    }
    try {
      console.log('sendEmailReply: Sending email to', selectedUser.email);
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${API_BASE_URL}/api/send-email`,
        {
          email: selectedUser.email,
          message: selectedUser.originalMessage,
          reply: inputMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Reply sent via email");
        if (selectedUser.messageId) {
          updateMessages(selectedUser.messageId, "Replied");
        }
        return true;
      } else {
        toast.error(res.data.message || "Failed to send email");
        return false;
      }
    } catch (e) {
      console.error('sendEmail error:', e);
      toast.error("Email send failed");
      return false;
    }
  }, [inputMessage, currentUserId, API_BASE_URL, updateMessages]);

  return {
    inputMessage,
    setInputMessage,
    sendSocketMessage,
    sendEmailReply,
  };
};