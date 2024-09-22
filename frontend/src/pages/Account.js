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
import {useAuthContext} from "../hooks/useAuthContext";
import {useEffect, useState} from "react";

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
  const { user } = useAuthContext();
  const [authConfig, setAuthConfig] = useState(null);
  const [billAcc, setBillAcc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    fetchBillAccount(config);
    setAuthConfig(config);
  }, [user]);
  const fetchBillAccount = (config) => {
    setLoading(true);
    axios
        .get("api/billing/my-account", config)
        .then((response) => {
          if (response.data.code === "00" && response.data.content) {
            setBillAcc(response.data.content);
          } else {
            setError("Failed to retrieve bills. Please try again later.");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching billAcc:", error);
          setError("An error occurred while fetching bill Acc. Please try again later.");
          setLoading(false);
        });
  };

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
  if(loading)return <div>Loading...</div>

if(!loading)
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
            alt={"avatar"}
            src={"https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"}
            sx={{ width: "100px", height: "100px", margin: "0 auto" }}
          />

          {/* Profile Details */}
          <TableContainer component={Paper} sx={{ marginTop: "2em" }}>
            <Table aria-label="user profile table">
              <TableBody>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Customer Id
                  </TableCell>
                  <TableCell align="center">{user.roleDetails.customerId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Bill Account Number
                  </TableCell>
                  <TableCell align="center">{billAcc.billAccId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="center">{user.roleDetails.firstName + " "+user.roleDetails.lastName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Mobile Number
                  </TableCell>
                  <TableCell align="center">{user.roleDetails.mobileNumber}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Account Balance
                  </TableCell>
                  <TableCell align="center">{"Rs. "+ billAcc.currentBalance}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell align="center">{billAcc.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

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
