import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Avatar,
  IconButton,
  Badge,
  Paper,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { styled } from "styled-components";
import io from "socket.io-client";

// Establish the Socket.IO connection
const socket = io("http://localhost:8080"); // Update with your server URL

// Styled Chat Bubble
const ChatBubble = styled(Paper)(({ isAgent }) => ({
  padding: "10px 16px",
  marginBottom: "12px",
  maxWidth: "70%",
  alignSelf: isAgent ? "flex-start" : "flex-end",
  backgroundColor: isAgent ? "#f0f0f0" : "#2196f3",
  color: isAgent ? "black" : "white",
  borderRadius: isAgent ? "8px 8px 8px 0px" : "8px 8px 0px 8px",
}));

// Chat Header (Agent/User Info)
const ChatHeader = ({ agentName, agentAvatar, onlineStatus }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      padding: "16px",
      backgroundColor: "#f5f5f5",
      borderBottom: "1px solid #ddd",
    }}
  >
    <Avatar src={agentAvatar} alt={agentName} sx={{ marginRight: "10px" }} />
    <Typography variant="h6">{agentName}</Typography>
    <Badge
      sx={{ marginLeft: "auto" }}
      color={onlineStatus ? "success" : "error"}
      variant="dot"
    >
      <Typography variant="body2" sx={{ color: "#777" }}>
        {onlineStatus ? "Online" : "Offline"}
      </Typography>
    </Badge>
  </Box>
);

// Main Chat Page Component
const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [agentOnline, setAgentOnline] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    // Socket.IO connection to get messages from server
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    // Socket.IO to check if agent is typing
    socket.on("agentTyping", (status) => {
      setIsTyping(status);
    });

    // Socket.IO to check agent online status
    socket.on("agentOnlineStatus", (status) => {
      setAgentOnline(status);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("agentTyping");
      socket.off("agentOnlineStatus");
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: "customer",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.emit("sendMessage", message);
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      scrollToBottom();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // Handle file sending logic (e.g., send to server via Socket.IO)
    console.log("File selected:", file);
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container maxWidth="md" sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Chat Header */}
      <ChatHeader agentName="Agent Smith" agentAvatar="/agent.jpg" onlineStatus={agentOnline} />

      {/* Chat Body */}
      <Box
        sx={{
          flexGrow: 1,
          padding: "16px",
          backgroundColor: "#f9f9f9",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} isAgent={msg.sender === "agent"}>
            <Typography variant="body1">{msg.text}</Typography>
            <Typography variant="caption" sx={{ marginTop: "8px", textAlign: "right" }}>
              {msg.timestamp}
            </Typography>
          </ChatBubble>
        ))}
        {isTyping && (
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <CircularProgress size={20} />
            <Typography variant="body2" sx={{ marginLeft: "8px" }}>
              Agent is typing...
            </Typography>
          </Box>
        )}
        <div ref={messageEndRef} />
      </Box>

      {/* Message Input Field */}
      <Box sx={{ display: "flex", padding: "18px", borderTop: "1px solid #ddd", backgroundColor: "#f5f5f5" }}>
        <IconButton component="label" color="primary">
          <AttachFileIcon />
          <input type="file" hidden onChange={handleFileUpload} />
        </IconButton>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? handleSendMessage() : null)}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "var(--primary)", color: "white" }}
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          sx={{ marginLeft: "8px" }}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default ChatPage;
