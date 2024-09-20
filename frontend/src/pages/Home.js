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
    <div>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "hsl(233deg 36% 38%)",
            padding: "2em",
            width: "100%",
            maxWidth: "500px",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          {/* Profile Picture */}
          <Avatar
            alt={userData.name}
            src={userData.profilePicture}
            sx={{ width: "100px", height: "100px", margin: "0 auto" }}
          />

          {/* Profile Details */}
          <TableContainer component={Paper} sx={{ marginTop: "2em" }}>
            <Table aria-label="user profile table">
              <TableBody>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="center">{userData.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell align="center">{userData.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Mobile Number
                  </TableCell>
                  <TableCell align="center">{userData.phone}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Change Password Button */}
          <Box sx={{ marginTop: "2em" }}>
            <Button variant="contained" style={{backgroundColor: "var(--primary)"}} onClick={handleClickOpen}>
              Change Password
            </Button>
          </Box>

          {/* Password Change Dialog */}
          <BootstrapDialog open={open} onClose={handleClose}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1em",
              }}
            >
              <DialogTitle>Change Password</DialogTitle>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogContent>
              <form onSubmit={changePassword}>
                <FormControl fullWidth>
                  <TextField
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    sx={{ marginBottom: "1.5em" }}
                    required
                  />
                  <TextField
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    sx={{ marginBottom: "1.5em" }}
                    required
                  />
                  <TextField
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    type="password"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "1.5em" }}>
                  <Button type="submit" variant="contained" style={{backgroundColor: "var(--primary)"}}>
                    Change
                  </Button>
                </Box>
              </form>
            </DialogContent>
          </BootstrapDialog>
        </Box>
      </Container>

      {/* Snackbar for Error Handling */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Profile;
