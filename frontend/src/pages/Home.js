import * as React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography, Avatar, Snackbar, Alert } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import styled from "styled-components";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const BootstrapDialog = styled(Dialog)(() => ({
  "& .MuiDialogContent-root": {
    padding: "1.5em",
  },
  "& .MuiDialogActions-root": {
    padding: "1em",
  },
}));

// Dummy user data to simulate dynamic content
const userData = {
  name: "John Doe",
  email: "johndoe@gmail.com",
  phone: "0766023645",
  profilePicture: "https://i.pravatar.cc/150?img=3",
};

function Profile() {
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePasswords = () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrorMessage("New passwords do not match.");
      return false;
    }
    return true;
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (!validatePasswords()) {
      setSnackbarOpen(true);
      return;
    }

    const email = userData.email; // Replace with actual user email
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/changePassword",
        { ...formData, email }
      );
      if (response.status === 200) {
        setSnackbarOpen(true);
        handleClose();
      }
    } catch (error) {
      setErrorMessage("Failed to change password.");
      setSnackbarOpen(true);
    }
  };

  return (
      <div className="homepage-container">
        <div className="content-wrapper">
          <h1>Welcome to Sri Tel</h1>
          <p>Manage your account and services through this app.</p>
          <p>Login to get started.</p>
        </div>
      </div>
  );
}

export default Profile;
